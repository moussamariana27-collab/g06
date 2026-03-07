class CidadeScene extends Phaser.Scene {
    constructor() { super({ key: 'Cidade' }); }

    init(data) { this.characterEscolhido = data.character; }

    preload() {
        this.load.tilemapTiledJSON('mapaCidade', 'assets/cidade_cielo.json');
        this.load.image('cidade', 'assets/cidade_tileset.png');

        const sprites = {
            'JOSÉ':  { file: 'assets/jose.png',  frameWidth: 267, frameHeight: 346 },
            'MARIA': { file: 'assets/Maria.png', frameWidth: 244, frameHeight: 360 },
            'JOÃO':  { file: 'assets/joao.png',  frameWidth: 398, frameHeight: 506 },
            'PAULA': { file: 'assets/paula.png', frameWidth: 244, frameHeight: 349 },
        };

        const skin = sprites[this.characterEscolhido];
        this.load.spritesheet('sheetPersonagem', skin.file, {
            frameWidth: skin.frameWidth, frameHeight: skin.frameHeight
        });
    }

    create() {
        const map = this.make.tilemap({ key: 'mapaCidade' });
        const tiles = map.addTilesetImage('cidade', 'cidade');
        map.createLayer('Fundo', tiles, 0, 0);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        const spawnObj = map.getObjectLayer('spawn').objects[0];
        const spawnX = spawnObj.x + spawnObj.width / 2;
        const spawnY = spawnObj.y + spawnObj.height / 2;

        this.personagem = this.physics.add.sprite(spawnX, spawnY, 'sheetPersonagem', 0).setScale(0.2);
        this.personagem.setCollideWorldBounds(true);
        this.personagem.body.setSize(22, 20);
        this.personagem.body.setOffset(17, 40);

        this.cameras.main.startFollow(this.personagem);
        this.cameras.main.setZoom(2.5);
        this.cursor = this.input.keyboard.createCursorKeys();

        const grupoColisoes = this.physics.add.staticGroup();
        map.getObjectLayer('colisoes').objects.filter(o => o.width > 0 && o.height > 0).forEach(o => {
            const b = this.add.rectangle(o.x + o.width/2, o.y + o.height/2, o.width, o.height);
            this.physics.add.existing(b, true);
            grupoColisoes.add(b);
        });
        this.physics.add.collider(this.personagem, grupoColisoes);

        const cemasDisponiveis = ['MainScene', 'LojaDeRoupa', 'Farmacia', 'Padaria', 'Posto', 'SalaoDeBeleza'];
        map.getObjectLayer('zonas').objects.filter(o => o.width > 0 && o.height > 0 && o.type !== '').forEach(o => {
            const zona = this.add.zone(o.x + o.width/2, o.y + o.height/2, o.width, o.height);
            this.physics.world.enable(zona);
            zona.body.setAllowGravity(false);
            zona.body.moves = false;
            this.physics.add.overlap(this.personagem, zona, () => {
                if (o.type === 'Hotel') {
                    if (!this.avisoHotel) {
                        this.avisoHotel = this.add.text(
                            this.cameras.main.scrollX + 512, this.cameras.main.scrollY + 80,
                            '🏨 Hotel — Em breve!',
                            { fontSize: '28px', fill: '#ffffff', backgroundColor: '#000000', padding: { x: 12, y: 8 } }
                        ).setOrigin(0.5).setDepth(10);
                        this.time.delayedCall(2000, () => { if (this.avisoHotel) { this.avisoHotel.destroy(); this.avisoHotel = null; } });
                    }
                } else if (cemasDisponiveis.includes(o.type)) {
                    this.scene.start(o.type, { character: this.characterEscolhido });
                }
            });
        });
    }

    update() {
        this.personagem.setVelocity(0);
        const vel = 200;

        if (this.cursor.left.isDown) {
            this.personagem.setVelocityX(-vel);
            this.personagem.setFlipX(true);
            this.personagem.setFrame(0);
        } else if (this.cursor.right.isDown) {
            this.personagem.setVelocityX(vel);
            this.personagem.setFlipX(false);
            this.personagem.setFrame(0);
        } else if (this.cursor.up.isDown) {
            this.personagem.setVelocityY(-vel);
            this.personagem.setFrame(1);
        } else if (this.cursor.down.isDown) {
            this.personagem.setVelocityY(vel);
            this.personagem.setFrame(3);
        }
    }
}