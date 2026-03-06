// ============================================================
// CENA 1: MAIN SCENE (Fase com WASD e mapa do escritório)
// ============================================================
class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        this.load.tilemapTiledJSON('mapaEscritorio', 'assets/escritorio.json');
        this.load.image('escritoriTileset', 'assets/escritorio_tileset.png');
        this.load.spritesheet('sheetFrente', 'assets/frente.png', { frameWidth: 48, frameHeight: 64 });
        this.load.spritesheet('sheetCostas', 'assets/costas.png', { frameWidth: 48, frameHeight: 64 });
        this.load.spritesheet('sheetLado',   'assets/lado.png',   { frameWidth: 48, frameHeight: 64 });
    }

    create() {
        // ---- MAPA ----
        const map = this.make.tilemap({ key: 'mapaEscritorio' });
        const tiles = map.addTilesetImage('escritorio', 'escritoriTileset');
        map.createLayer('Fundo', tiles, 0, 0);

        const mapaWidth  = map.widthInPixels;
        const mapaHeight = map.heightInPixels;

        this.physics.world.setBounds(0, 0, mapaWidth, mapaHeight);
        this.cameras.main.setBounds(0, 0, mapaWidth, mapaHeight);

        // ---- SPAWN ----
        let spawnX = 100;
        let spawnY = 200;
        
        // Tentar ler spawn do mapa se existir
        const spawnLayer = map.getObjectLayer('spawn');
        if (spawnLayer && spawnLayer.objects.length > 0) {
            const spawnObj = spawnLayer.objects[0];
            spawnX = spawnObj.x + spawnObj.width  / 2;
            spawnY = spawnObj.y + spawnObj.height / 2;
        }

        // ---- PERSONAGEM ----
        this.personagem = this.physics.add.sprite(spawnX, spawnY, 'sheetFrente').setScale(3);
        this.personagem.setCollideWorldBounds(true);
        this.personagem.body.setSize(22, 20);
        this.personagem.body.setOffset(17, 40);

        // ---- CÂMERA ----
        this.cameras.main.startFollow(this.personagem);
        this.cameras.main.setZoom(1.0);

        // ---- CONTROLES (setas) ----
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

        const colisaoLayer = map.getObjectLayer('colisoes');
        if (colisaoLayer) {
            colisaoLayer.objects
                .filter(obj => obj.width > 0 && obj.height > 0)
                .forEach(obj => {
                    const bloco = this.add.rectangle(
                        obj.x + obj.width  / 2,
                        obj.y + obj.height / 2,
                        obj.width,
                        obj.height
                    );
                    this.physics.add.existing(bloco, true);
                    grupoColisoes.add(bloco);
                });

            this.physics.add.collider(this.personagem, grupoColisoes);
        }

        // ---- PORTA → CIDADE ----
        const portaLayer = map.getObjectLayer('porta');
        if (portaLayer) {
            portaLayer.objects
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
                        this.scene.start(obj.type || '');
                    });
                });
        }
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
        } else if (this.cursor.right.isDown) {
            this.personagem.setVelocityX(vel);
            this.personagem.setFlipX(false);
            this.personagem.anims.play('andarLado', true);
            isMoving = true;
        }
        if (this.cursor.up.isDown) {
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