// ============================================================
// CENA 2: CIDADE
// ============================================================
class CidadeScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Cidade' });
    }

    preload() {
        this.load.tilemapTiledJSON('mapaCidade', 'assets/cidade_cielo.json');
        this.load.image('cidade', 'assets/cidade_tileset.png');

        this.load.spritesheet('sheetFrente', 'assets/frente.png', { frameWidth: 48, frameHeight: 64 });
        this.load.spritesheet('sheetCostas', 'assets/costas.png', { frameWidth: 48, frameHeight: 64 });
        this.load.spritesheet('sheetLado',   'assets/lado.png',   { frameWidth: 48, frameHeight: 64 });
    }

    create() {
        // ---- MAPA ----
        const map = this.make.tilemap({ key: 'mapaCidade' });
        const tiles = map.addTilesetImage('cidade', 'cidade');
        map.createLayer('Fundo', tiles, 0, 0);

        const mapaWidth  = map.widthInPixels;
        const mapaHeight = map.heightInPixels;

        this.physics.world.setBounds(0, 0, mapaWidth, mapaHeight);
        this.cameras.main.setBounds(0, 0, mapaWidth, mapaHeight);

        // ---- SPAWN ----
        // Posiciona o personagem no ponto definido na layer "spawn"
        const spawnLayer = map.getObjectLayer('spawn');
        const spawnObj   = spawnLayer.objects[0];
        const spawnX     = spawnObj.x + spawnObj.width  / 2;
        const spawnY     = spawnObj.y + spawnObj.height / 2;

        // ---- PERSONAGEM ----
        this.personagem = this.physics.add.sprite(spawnX, spawnY, 'sheetFrente').setScale(2);
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

        map.getObjectLayer('colisoes').objects
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

        // ---- ZONAS DE TRANSIÇÃO ----
        // Cenas disponíveis: mainScene, LojaDeRoupa, Farmacia, Padaria, Posto, SalaoDeBeleza
        // Hotel: sem cena ainda — exibe mensagem temporária
        const cemasDisponiveis = ['mainScene', 'LojaDeRoupa', 'Farmacia', 'Padaria', 'Posto', 'SalaoDeBeleza'];

        map.getObjectLayer('zonas').objects
            .filter(obj => obj.width > 0 && obj.height > 0 && obj.type !== '')
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
                    if (obj.type === 'Hotel') {
                        // Hotel ainda sem cena — exibe aviso
                        if (!this.avisoHotel) {
                            this.avisoHotel = this.add.text(
                                this.cameras.main.scrollX + 512,
                                this.cameras.main.scrollY + 80,
                                '🏨 Hotel — Em breve!',
                                { fontSize: '28px', fill: '#ffffff', backgroundColor: '#000000', padding: { x: 12, y: 8 } }
                            ).setOrigin(0.5).setDepth(10);

                            this.time.delayedCall(2000, () => {
                                if (this.avisoHotel) {
                                    this.avisoHotel.destroy();
                                    this.avisoHotel = null;
                                }
                            });
                        }
                    } else if (cemasDisponiveis.includes(obj.type)) {
                        this.scene.start(obj.type);
                    }
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