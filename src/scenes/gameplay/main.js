class MainScene extends Phaser.Scene {
    constructor() { super({ key: 'MainScene' }); }

    init(data) {
        this.characterEscolhido = data?.character || null;
    }

    // Carrega as imagens
    preload() {
        console.log('Personagem escolhido:', this.characterEscolhido);
        this.load.tilemapTiledJSON('mapaEscritorio', 'assets/escritorio.json');
        this.load.image('escritoriTileset', 'assets/escritorio_tileset.png');
        this.load.audio('escritorio', 'assets/escritorio.mp3')

        // Define os sprites de cada personagem disponível com suas dimensões
        const sprites = {
            'JOSÉ':  { file: 'assets/josePronto.png',  frameWidth: 16, frameHeight: 32 },
            'MARIA': { file: 'assets/mariaPronto.png', frameWidth: 16, frameHeight: 32 },
            'JOÃO':  { file: 'assets/joaoPronto.png',  frameWidth: 16, frameHeight: 32 },
            'PAULA': { file: 'assets/paulaPronto.png', frameWidth: 16, frameHeight: 32 },
        };

        // Obtém os dados do personagem escolhido
        const dadosSprite = sprites[this.characterEscolhido];
        // Verifica se o personagem é válido antes de carregar
        if (!dadosSprite) { console.error('Personagem inválido:', this.characterEscolhido); return; }
        // Carrega a spritesheet do personagem escolhido
        this.load.spritesheet('sheetPersonagem', dadosSprite.file, {
            frameWidth: dadosSprite.frameWidth, frameHeight: dadosSprite.frameHeight
        });
    }

    // Cria todos os elementos da cena 
    create() {
        const map = this.make.tilemap({ key: 'mapaEscritorio' });
        const tiles = map.addTilesetImage('escritorio', 'escritoriTileset');
        map.createLayer('Fundo', tiles, 0, 0);

        // add música 
        this.musica = this.sound.add('escritorio', {
            loop: true,
            volume: 0.40
        });
        this.musica.play();
        
        // Define o limite do mundo físico
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // Define os limites da câmera 
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Define onde o personagem começa
        let spawnX = 550, spawnY = 300;
        // Tenta encontrar a posição de spawn no mapa
        const spawnLayer = map.getObjectLayer('spawn');
        if (spawnLayer?.objects.length > 0) {
            const objetoSpawn = spawnLayer.objects[0];
            spawnX = objetoSpawn.x + objetoSpawn.width / 2;
            spawnY = objetoSpawn.y + objetoSpawn.height / 2;
        }

        // Cria o sprite do personagem na posição de spawn
        this.personagem = this.physics.add.sprite(spawnX, spawnY, 'sheetPersonagem', 0).setScale(3.0);
        // Faz o personagem não sair dos limites do mapa
        this.personagem.setCollideWorldBounds(true);
        // Ajusta automaticamente a hitbox para o tamanho do sprite
        this.personagem.body.setSize(
            this.personagem.width,
            this.personagem.height
        );

        // Centraliza a hitbox no sprite
        this.personagem.body.setOffset(0, 0);

        // Faz a câmera seguir o personagem
        this.cameras.main.startFollow(this.personagem);
        // Define o zoom da câmera
        this.cameras.main.setZoom(1.0);
        // Cria o controle das setas do teclado
        this.cursor = this.input.keyboard.createCursorKeys();

        // Cria um grupo para as colisões do mapa
        const grupoColisoes = this.physics.add.staticGroup();
        // Obtém a camada de colisões do mapa
        const colisaoLayer = map.getObjectLayer('colisoes');
        // Se houver colisões, adiciona cada uma ao grupo
        if (colisaoLayer) {
            colisaoLayer.objects.filter(o => o.width > 0 && o.height > 0).forEach(o => {
                // Cria um retângulo invisível para cada colisão
                const b = this.add.rectangle(o.x + o.width / 2, o.y + o.height / 2, o.width, o.height);
                // Adiciona física ao retângulo
                this.physics.add.existing(b, true);
                // Adiciona ao grupo de colisões
                grupoColisoes.add(b);
            });
            // Define colisão entre personagem e grupo de colisões
            this.physics.add.collider(this.personagem, grupoColisoes);
        }

        // Obtém a camada da porta do mapa
        const portaLayer = map.getObjectLayer('porta');
        if (portaLayer) {
            // Para cada porta encontrada
            portaLayer.objects.filter(o => o.width > 0 && o.height > 0).forEach(o => {
                // Cria uma zona invisível na posição da porta
                const zona = this.add.zone(o.x + o.width / 2, o.y + o.height / 2, o.width, o.height);
                // Adiciona física à zona
                this.physics.world.enable(zona);
                // A zona não é afetada por gravidade
                zona.body.setAllowGravity(false);
                // A zona não se move
                zona.body.moves = false;
                // Se o personagem tocar a zona, para a música e muda para a cena da cidade
                this.physics.add.overlap(this.personagem, zona, () => {
                    this.musica.stop(); // 
                    this.scene.start('Cidade', { character: this.characterEscolhido });
                });
            });
        }

        // Obtém a camada do diálogo com o professor do mapa
        const professorLayer = map.getObjectLayer('professor');
        if (professorLayer?.objects.length > 0) {
            const obj = professorLayer.objects[0];
            // Calcula o centro da zona do dialogo
            const profX = obj.x + obj.width / 2;
            const profY = obj.y + obj.height / 2;

            // Cria a zona do dialogo
            this.zonaProfessor = this.add.zone(profX, profY, obj.width, obj.height);
            // Adiciona física à zona
            this.physics.world.enable(this.zonaProfessor);
            // A zona não é afetada por gravidade
            this.zonaProfessor.body.setAllowGravity(false);
            // A zona não se move
            this.zonaProfessor.body.moves = false;

            // Se o personagem tocar a zona do dialogo
            this.physics.add.overlap(this.personagem, this.zonaProfessor, () => {
                // Verifica se a zona está ativa
                if (!this.zonaProfessor.active) return;

                // Desativa a zona imediatamente para não repetir
                this.zonaProfessor.setActive(false);
                this.zonaProfessor.body.enable = false;

                // Pausa a cena atual (música continua tocando durante o tutorial)
                this.scene.pause();
                // Inicia a cena do tutorial
                this.scene.launch('tutorial', { cenaOrigem: 'MainScene', character: this.characterEscolhido });
            });
        }

        // Quando a cena volta do tutorial, reativa a zona do professor após 1 segundo
        this.events.on('resume', () => {
            this.time.delayedCall(1000, () => {
                if (this.zonaProfessor) {
                    this.zonaProfessor.setActive(true);
                    this.zonaProfessor.body.enable = true;
                }
            });
        });

        // AQUI TEMOS AS ANIMAÇÕES DAS SPRITESHEETS DOS PERSONAGENS JOGÁVEIS
        // TODOS OS ARQUIVOS ESTÃO PADRONIZADOS, POR ISSO OS VALORES PARA OS FRAMES SÃO IGUAIS PARA QUALQUER QUE SEJA O PERSONAGEM

        this.anims.create({
            key: "up",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 54, end: 59 }),
            repeat: -1
        });

        this.anims.create({
            key: "down",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 66, end: 71 }),
            repeat: -1
        });

        this.anims.create({
            key: "left",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 60, end: 65 }),
            repeat: -1
        });

        this.anims.create({
            key: "right",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 48, end: 53 }),
            repeat: -1
        });
    }

    // Atualiza o estado do jogo a cada frame
    update() {
        // Define a velocidade do personagem como 0 
        this.personagem.setVelocity(0);
        // Velocidade de movimento do personagem
        const vel = 200;

        const animsOk = this.anims.exists('left') && this.anims.exists('right') && this.anims.exists('up') && this.anims.exists('down');

        // Movimento para esquerda
        if (this.cursor.left.isDown) {
            this.personagem.setVelocityX(-vel);
            if (animsOk) this.personagem.play('left', true);

        // Movimento para direita
        } else if (this.cursor.right.isDown) {
            this.personagem.setVelocityX(vel);
            if (animsOk) this.personagem.play('right', true);

        // Movimento para cima
        } else if (this.cursor.up.isDown) {
            this.personagem.setVelocityY(-vel);
            if (animsOk) this.personagem.play('up', true);

        // Movimento para baixo
        } else if (this.cursor.down.isDown) {
            this.personagem.setVelocityY(vel);
            if (animsOk) this.personagem.play('down', true);
        } else {
            this.personagem.stop();
        }
    }
}