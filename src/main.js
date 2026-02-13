class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'mainScene' });
    }

    preload() {
        // Carregamento de recursos (imagens e spritesheets)
        this.load.image('mapa', './assets1/mapa.png');
        this.load.spritesheet('sheetFrente', './assets1/frente.png', { frameWidth: 48, frameHeight: 64 });
        this.load.spritesheet('sheetCostas', './assets1/costas.png', { frameWidth: 48, frameHeight: 64 });
        this.load.spritesheet('sheetLado', './assets1/lado.png', { frameWidth: 48, frameHeight: 64 });
    }

    create() {
        //  Configuração do Ambiente 
        // Cria o mapa e define a origem no canto superior esquerdo (0,0)
        let mapa = this.add.image(0, 0, 'mapa').setOrigin(0, 0);

        // Define os limites do mundo físico (colisão) e da câmera visual
        this.physics.world.setBounds(0, 0, mapa.width, mapa.height);
        this.cameras.main.setBounds(0, 0, mapa.width, mapa.height);

        // Configuração do Personagem 
        this.personagem = this.physics.add.sprite(100, 200, 'sheetFrente').setScale(4.7);
        
        // Propriedades de física do personagem
        this.personagem.setCollideWorldBounds(true); // Impede sair do mapa
        this.personagem.body.setSize(20, 30); // Ajuste da caixa de colisão (hitbox)
        this.personagem.body.setOffset(6, 30); // Centralização da caixa de colisão

        // Configuração da Câmera
        this.cameras.main.startFollow(this.personagem);
        this.cameras.main.setZoom(1.0); // Nível de zoom da câmera

        // Configuração dos Controles 
        this.cursor = this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

        // Criação das Animações do Personagem
        // Animação de andar para baixo (frente)
        this.anims.create({
            key: 'andarFrente', 
            frames: this.anims.generateFrameNumbers('sheetFrente', { start: 0, end: 1 }), // Utiliza os frames 0 e 1 da spritesheet
            frameRate: 5, // Define a velocidade da animação (5 quadros por segundo)
            repeat: -1 // O valor -1 indica que a animação deve rodar em loop infinito enquanto durar o movimento
        });

        // Animação de andar para cima (costas)
        this.anims.create({
            key: 'andarCostas',
            frames: this.anims.generateFrameNumbers('sheetCostas', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });

        // Animação de andar para os lados (esquerda/direita)
        this.anims.create({
            key: 'andarLado',
            frames: this.anims.generateFrameNumbers('sheetLado', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
    }

    update() {
        // Reseta a velocidade do personagem a cada quadro para evitar inércia 
        this.personagem.setVelocity(0);
        
        // Flag para verificar se o personagem está em movimento
        let isMoving = false;

        // Lógica de Movimentação Horizontal
        if (this.cursor.left.isDown) {
            this.personagem.setVelocityX(-200);
            this.personagem.setFlipX(true); // Espelha o sprite para esquerda
            this.personagem.anims.play('andarLado', true);
            isMoving = true;
        } 
        else if (this.cursor.right.isDown) {
            this.personagem.setVelocityX(200);
            this.personagem.setFlipX(false); // Sprite normal para direita
            this.personagem.anims.play('andarLado', true);
            isMoving = true;
        } 
        
        // Lógica de Movimentação Vertical
        // O uso de 'else if' aqui prioriza o movimento lateral, evitando bugs visuais na diagonal
        if (this.cursor.up.isDown) {
            this.personagem.setVelocityY(-200);
            this.personagem.anims.play('andarCostas', true);
            isMoving = true;
        } 
        else if (this.cursor.down.isDown) {
            this.personagem.setVelocityY(200);
            this.personagem.anims.play('andarFrente', true);
            isMoving = true;
        } 

        // Se nenhuma tecla estiver pressionada, para a animação atual
        if (!isMoving) {
            this.personagem.anims.stop();
        }
    }
}