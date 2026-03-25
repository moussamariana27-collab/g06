class Cidade extends Phaser.Scene {
    constructor() { super({ key: 'Cidade' }); }

    // Recebe o personagem escolhido na cena anterior
    init(data) { this.personagemEscolhido = data?.character || null; }

    preload() {
        this.load.audio('musicacidade', 'assets/mapa.mp3')

        // Carrega o mapa exportado do Tiled no formato JSON
        this.load.tilemapTiledJSON('mapaCidade', 'assets/cidade_cielo.json');

        // Carrega a imagem do tileset utilizado no mapa
        this.load.image('cidade', 'assets/cidade_tileset.png');

        // Objeto que define qual spritesheet usar para cada personagem
        const sprites = {
            'JOSÉ':  { file: 'assets/jose.png',  frameWidth: 16, frameHeight: 32 },
            'MARIA': { file: 'assets/Maria.png', frameWidth: 16, frameHeight: 32 },
            'JOÃO':  { file: 'assets/joao.png',  frameWidth: 16, frameHeight: 32 },
            'PAULA': { file: 'assets/paulaPronto.png', frameWidth: 16, frameHeight: 16 },
        };

        // Seleciona o personagem escolhido pelo jogador
        const dadosSprite = sprites[this.personagemEscolhido];

        // Verifica se o personagem é válido antes de carregar
        if (!dadosSprite) { console.error('Personagem inválido:', this.personagemEscolhido); return; }

        // Carrega o spritesheet correspondente ao personagem escolhido
        this.load.spritesheet('sheetPersonagem', dadosSprite.file, {
            frameWidth: dadosSprite.frameWidth, frameHeight: dadosSprite.frameHeight
        });

    }

    create() {
        // Cria o mapa baseado no JSON carregado
        const map = this.make.tilemap({ key: 'mapaCidade' });

        // Associa o tileset carregado ao mapa
        const tiles = map.addTilesetImage('cidade', 'cidade');

        // Cria a camada visual chamada "Fundo"
        map.createLayer('Fundo', tiles, 0, 0);

        // add música
        this.musica = this.sound.add('musicacidade', {
            loop: true,
            volume: 0.4
        });
        this.musica.play();

        // Define limites da física do jogo e impede o personagem de sair do mapa
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Impede que a câmera saia dos limites do mapa
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Busca o objeto de spawn criado no Tiled
        const spawnObj = map.getObjectLayer('spawn').objects[0];

        // Calcula a posição central do spawn
        const spawnX = spawnObj.x + spawnObj.width / 2;
        const spawnY = spawnObj.y + spawnObj.height / 2;

        // Cria o personagem com física na posição de spawn
        this.personagem = this.physics.add.sprite(spawnX, spawnY, 'sheetPersonagem', 0).setScale(1.0);

        // Ativa colisão do personagem com as bordas do mundo
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

        // Aumenta o zoom da câmera
        this.cameras.main.setZoom(2.5);

        // Captura as teclas direcionais do teclado
        this.cursor = this.input.keyboard.createCursorKeys();

        // Cria um grupo de objetos sólidos usados para colisões
        const grupoColisoes = this.physics.add.staticGroup();

        // Percorre os objetos da layer "colisoes" definidos no Tiled
        const layerColisoes = map.getObjectLayer('colisoes');
        if (layerColisoes) {
            layerColisoes.objects.filter(objetoColisao => objetoColisao.width > 0 && objetoColisao.height > 0).forEach(objetoColisao => {

                // Cria um retângulo invisível representando a área de colisão
                const retanguloColisao = this.add.rectangle(objetoColisao.x + objetoColisao.width/2, objetoColisao.y + objetoColisao.height/2, objetoColisao.width, objetoColisao.height);

                // Adiciona física estática ao objeto
                this.physics.add.existing(retanguloColisao, true);

                // Adiciona o objeto ao grupo de colisões
                grupoColisoes.add(retanguloColisao);
            });

            // Ativa colisão entre o personagem e os objetos do grupo
            this.physics.add.collider(this.personagem, grupoColisoes);
        }

        // Lista de cenas para onde o jogador pode ir
        const cenasDisponiveis = ['Escritorio', 'LojaDeRoupa', 'Farmacia', 'Padaria', 'Posto', 'SalaoDeBeleza'];

        // Percorre as zonas de interação definidas no Tiled
        const layerZonas = map.getObjectLayer('zonas');
        if (layerZonas) {
            layerZonas.objects.filter(zona => zona.width > 0 && zona.height > 0 && zona.type !== '').forEach(zona => {

                // Cria uma zona invisível de interação
                const areaInteracao = this.add.zone(zona.x + zona.width/2, zona.y + zona.height/2, zona.width, zona.height);

                // Ativa física na zona
                this.physics.world.enable(areaInteracao);

                // Desativa gravidade na zona
                areaInteracao.body.setAllowGravity(false);

                // Impede movimentação da zona
                areaInteracao.body.moves = false;

                // Detecta quando o personagem entra na zona
                this.physics.add.overlap(this.personagem, areaInteracao, () => {

                    // Caso a zona seja o Hotel (ainda não implementado)
                    if (zona.type === 'Hotel') {

                        // Evita criar múltiplos avisos ao mesmo tempo
                        if (!this.avisoHotel) {

                            // Exibe um aviso temporário na tela com estilo consistente
                            this.avisoHotel = this.add.text(
                                this.cameras.main.scrollX + 512, this.cameras.main.scrollY + 80,
                                'Hotel — Funcionalidade em desenvolvimento',
                                { 
                                    fontSize: '24px', 
                                    fill: '#ffffff', 
                                    backgroundColor: '#333333', 
                                    padding: { x: 16, y: 12 },
                                    fontFamily: 'Pixelify Sans'
                                }
                            ).setOrigin(0.5).setDepth(10);

                            // Remove o aviso após alguns segundos
                            this.time.delayedCall(2500, () => { 
                                if (this.avisoHotel) { 
                                    this.avisoHotel.destroy(); 
                                    this.avisoHotel = null; 
                                } 
                            });
                        }

                    // Caso a zona leve para outra cena disponível
                    } else if (cenasDisponiveis.includes(zona.type)) {

                        // ✅ Para a música antes de trocar de cena
                        this.musica.stop();

                        // Troca para a cena correspondente
                        this.scene.start(zona.type, { character: this.personagemEscolhido });
                    }
                });
            });
        }

        // AQUI TEMOS AS ANIMAÇÕES DAS SPRITESHEETS DOS PERSONAGENS JOGÁVEIS
        // TODOS OS ARQUIVOS ESTÃO PADRONIZADOS, POR ISSO OS VALORES PARA OS FRAMES SÃO IGUAIS PARA QUALQUER QUE SEJA O PERSONAGEM
        // Spritesheet layout: frames 0-47 (idle), 48-59 (direita), 60-65 (esquerda), 66-71 (baixo), 54-59 (cima) em diversos padrões

        // Movimento para CIMA (frames 54-59)
        this.anims.create({
            key: "up",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 54, end: 59 }),
            repeat: -1
        });

        // Movimento para BAIXO (frames 66-71)
        this.anims.create({
            key: "down",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 66, end: 71 }),
            repeat: -1
        });

        // Movimento para ESQUERDA (frames 60-65)
        this.anims.create({
            key: "left",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 60, end: 65 }),
            repeat: -1
        });

        // Movimento para DIREITA (frames 48-53)
        this.anims.create({
            key: "right",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 48, end: 53 }),
            repeat: -1
        });

    }

    update() {
        // Define a velocidade inicial do personagem como zero
        this.personagem.setVelocity(0);

        // Constante de velocidade de movimento do personagem em pixels/segundo
        const velocidade = 150;

        const animsOk = this.anims.exists('left') && this.anims.exists('right') && this.anims.exists('up') && this.anims.exists('down');

        // Movimento para esquerda
        if (this.cursor.left.isDown) {
            this.personagem.setVelocityX(-velocidade);
            if (animsOk) this.personagem.play('left', true);

        // Movimento para direita
        } else if (this.cursor.right.isDown) {
            this.personagem.setVelocityX(velocidade);
            if (animsOk) this.personagem.play('right', true);

        // Movimento para cima
        } else if (this.cursor.up.isDown) {
            this.personagem.setVelocityY(-velocidade);
            if (animsOk) this.personagem.play('up', true);

        // Movimento para baixo
        } else if (this.cursor.down.isDown) {
            this.personagem.setVelocityY(velocidade);
            if (animsOk) this.personagem.play('down', true);
        } else {
            this.personagem.stop();
        }
    }
}