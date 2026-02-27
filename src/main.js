// ============================================================
// CENA 1: MAIN SCENE (Fase com WASD e mapa simples)
// ============================================================
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'mainScene' });
    }

    preload() {
        this.load.image('mapa', '../g06/src/assets/mapa.png');
        this.load.spritesheet('sheetFrente', '../g06/src/assets/frente.png', { frameWidth: 48, frameHeight: 64 });
        this.load.spritesheet('sheetCostas', '../g06/src/assets/costas.png', { frameWidth: 48, frameHeight: 64 });
        this.load.spritesheet('sheetLado',   '../g06/src/assets/lado.png',   { frameWidth: 48, frameHeight: 64 });
    }

    create() {
        // Mapa
        let mapa = this.add.image(0, 0, 'mapa').setOrigin(0, 0);
        this.physics.world.setBounds(0, 0, mapa.width, mapa.height);
        this.cameras.main.setBounds(0, 0, mapa.width, mapa.height);

        // Personagem
        this.personagem = this.physics.add.sprite(100, 200, 'sheetFrente').setScale(4.7);
        this.personagem.setCollideWorldBounds(true);
        this.personagem.body.setSize(20, 30);
        this.personagem.body.setOffset(6, 30);

        // Câmera
        this.cameras.main.startFollow(this.personagem);
        this.cameras.main.setZoom(1.0);

        // Controles WASD
        this.cursor = this.input.keyboard.addKeys({
            'up':    Phaser.Input.Keyboard.KeyCodes.W,
            'down':  Phaser.Input.Keyboard.KeyCodes.S,
            'left':  Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D
        });

        // Animações
        // DICA: se seus sprites tiverem apenas 1 frame, mude end: 1 para end: 0
        this.anims.create({
            key: 'andarFrente',
            frames: this.anims.generateFrameNumbers('sheetFrente', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'andarCostas',
            frames: this.anims.generateFrameNumbers('sheetCostas', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'andarLado',
            frames: this.anims.generateFrameNumbers('sheetLado', { start: 0, end: 0 }),
            frameRate: 5,
            repeat: -1
        });

        // Transição para a próxima cena com ESPAÇO
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('gameScene');
        });
    }

    update() {
        // Zera velocidade todo frame
        this.personagem.setVelocity(0);

        const vel = 200;
        let isMoving = false;

        // Prioridade: horizontal > vertical (evita conflito de animação)
        if (this.cursor.left.isDown) {
            this.personagem.setVelocityX(-vel);
            this.personagem.setFlipX(true);
            this.personagem.anims.play('andarLado', true);
            isMoving = true;
        }
        else if (this.cursor.right.isDown) {
            this.personagem.setVelocityX(vel);
            this.personagem.setFlipX(false);
            this.personagem.anims.play('andarLado', true);
            isMoving = true;
        }
        else if (this.cursor.up.isDown) {
            this.personagem.setVelocityY(-vel);
            this.personagem.anims.play('andarCostas', true);
            isMoving = true;
        }
        else if (this.cursor.down.isDown) {
            this.personagem.setVelocityY(vel);
            this.personagem.anims.play('andarFrente', true);
            isMoving = true;
        }

        // Para a animação quando parado
        if (!isMoving) {
            this.personagem.anims.stop();
        }
    }
}