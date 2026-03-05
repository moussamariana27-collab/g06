// ============================================================
// CENA 1: MAIN SCENE (Escritório com Tiled, setas e colisões)
// ============================================================
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'mainScene' });
    }

    preload() {
        // Mapa Tiled
        this.load.tilemapTiledJSON('mapa', 'src/assets/escritorio.json');
        this.load.image('escritorio', 'src/assets/escritorio_tileset.png');

        // Sprites do personagem
        this.load.spritesheet('sheetFrente', 'src/assets/frente.png', { frameWidth: 48, frameHeight: 64 });
        this.load.spritesheet('sheetCostas', 'src/assets/costas.png', { frameWidth: 48, frameHeight: 64 });
        this.load.spritesheet('sheetLado',   'src/assets/lado.png',   { frameWidth: 48, frameHeight: 64 });
    }

    create() {
        // ---- MAPA ----
        const map = this.make.tilemap({ key: 'mapa' });
        const tiles = map.addTilesetImage('escritorio', 'escritorio');
        map.createLayer('Fundo', tiles, 0, 0);

        const mapaWidth  = map.widthInPixels;
        const mapaHeight = map.heightInPixels;

        this.physics.world.setBounds(0, 0, mapaWidth, mapaHeight);
        this.cameras.main.setBounds(0, 0, mapaWidth, mapaHeight);

        // ---- PERSONAGEM ----
        this.personagem = this.physics.add.sprite(100, 200, 'sheetFrente').setScale(3);
        this.personagem.setCollideWorldBounds(true);
        this.personagem.body.setSize(20, 20);
        this.personagem.body.setOffset(17, 40);

        // ---- CÂMERA ----
        this.cameras.main.startFollow(this.personagem);
        this.cameras.main.setZoom(1.0);

        // ---- CONTROLES (teclas de seta) ----
        this.cursor = this.input.keyboard.createCursorKeys();

        // ---- ANIMAÇÕES ----
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

        // ---- COLISÕES ----
        const grupoColisoes = this.physics.add.staticGroup();

        map.getObjectLayer('colisoes').objects
            .filter(obj => obj.width > 0 && obj.height > 0)
            .forEach(obj => {
                const bloco = this.add.rectangle(
                    obj.x + obj.width  / 2,
                    obj.y + obj.height / 2,
                    obj.width,
                    obj.height
                );
                this.physics.add.existing(bloco, true); // true = estático
                grupoColisoes.add(bloco);
            });

        this.physics.add.collider(this.personagem, grupoColisoes);
        this.physics.world.createDebugGraphic();
        // ---- PORTA → CIDADE ----
        map.getObjectLayer('porta').objects
            .filter(obj => obj.width > 0 && obj.height > 0)
            .forEach(obj => {
                const zona = this.add.zone(
                    obj.x + obj.width  / 2,
                    obj.y + obj.height / 2,
                    obj.width,
                    obj.height
                );
                this.physics.world.enable(zona);
                zona.body.setAllowGravity(false);
                zona.body.moves = false;

                this.physics.add.overlap(this.personagem, zona, () => {
                    this.scene.start(obj.type); // obj.type = "Cidade"
                });
            });
    }

    update() {
        this.personagem.setVelocity(0);

        const vel = 200;
        let isMoving = false;

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

        if (!isMoving) {
            this.personagem.anims.stop();
        }
    }
}
