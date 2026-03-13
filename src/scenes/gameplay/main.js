class MainScene extends Phaser.Scene {
    constructor() { super({ key: 'MainScene' }); }

    init(data) {
        this.characterEscolhido = data?.character || null;
    }

    // Carrega as imagens
    preload() {
        this.load.tilemapTiledJSON('mapaEscritorio', 'assets/escritorio.json');
        this.load.image('escritoriTileset', 'assets/escritorio_tileset.png');

        // Define os sprites de cada personagem disponível com suas dimensões
        const sprites = {
            'JOSÉ':  { file: 'assets/jose.png',  frameWidth: 267, frameHeight: 346 },
            'MARIA': { file: 'assets/Maria.png', frameWidth: 244, frameHeight: 360 },
            'JOÃO':  { file: 'assets/joao.png',  frameWidth: 398, frameHeight: 506 },
            'PAULA': { file: 'assets/paula.png', frameWidth: 244, frameHeight: 349 },
        };

        // Obtém os dados do personagem escolhido
        const dadosSprite = sprites[this.characterEscolhido];
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
        this.personagem = this.physics.add.sprite(spawnX, spawnY, 'sheetPersonagem', 0).setScale(0.3);
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
                // Se o personagem tocar a zona, muda para a cena da cidade
                this.physics.add.overlap(this.personagem, zona, () => {
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

                // Pausa a cena atual
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
    }

    // Atualiza o estado do jogo a cada frame
    update() {
        // Define a velocidade do personagem como 0 
        this.personagem.setVelocity(0);
        // Velocidade de movimento do personagem
        const vel = 200;

        // Se a seta esquerda está pressionada
        if (this.cursor.left.isDown) {
            // Move para a esquerda
            this.personagem.setVelocityX(-vel);
            // Inverte a imagem (virado para esquerda)
            this.personagem.setFlipX(true);
            // Define o frame (imagem) do personagem parado
            this.personagem.setFrame(0);
        } 
        // Se a seta direita está pressionada
        else if (this.cursor.right.isDown) {
            // Move para a direita
            this.personagem.setVelocityX(vel);
            // Define a imagem normal (virado para direita)
            this.personagem.setFlipX(false);
            // Define o frame (imagem) do personagem parado
            this.personagem.setFrame(0);
        } 
        // Se a seta para cima está pressionada
        else if (this.cursor.up.isDown) {
            // Move para cima
            this.personagem.setVelocityY(-vel);
            // Define o frame (imagem) para o personagem de costas
            this.personagem.setFrame(1);
        } 
        // Se a seta para baixo está pressionada
        else if (this.cursor.down.isDown) {
            // Move para baixo
            this.personagem.setVelocityY(vel);
            // Define o frame (imagem) para o personagem de frente
            this.personagem.setFrame(3);
        }
    }
}