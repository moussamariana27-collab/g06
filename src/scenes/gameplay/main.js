class MainScene extends Phaser.Scene {
    constructor() { super({ key: 'MainScene' }); }

    init(data) {
        this.characterEscolhido = data.character;
    }

    preload() {
        this.load.tilemapTiledJSON('mapaEscritorio', 'assets/escritorio.json');
        this.load.image('escritoriTileset', 'assets/escritorio_tileset.png');

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
        const map = this.make.tilemap({ key: 'mapaEscritorio' });
        const tiles = map.addTilesetImage('escritorio', 'escritoriTileset');
        map.createLayer('Fundo', tiles, 0, 0);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        let spawnX = 100, spawnY = 200;
        const spawnLayer = map.getObjectLayer('spawn');
        if (spawnLayer?.objects.length > 0) {
            const s = spawnLayer.objects[0];
            spawnX = s.x + s.width / 2;
            spawnY = s.y + s.height / 2;
        }

        this.personagem = this.physics.add.sprite(spawnX, spawnY, 'sheetPersonagem', 0).setScale(0.3);
        this.personagem.setCollideWorldBounds(true);
        this.personagem.body.setSize(22, 20);
        this.personagem.body.setOffset(17, 40);

        this.cameras.main.startFollow(this.personagem);
        this.cameras.main.setZoom(1.0);
        this.cursor = this.input.keyboard.createCursorKeys();

        // --- Colisões do mapa ---
        const grupoColisoes = this.physics.add.staticGroup();
        const colisaoLayer = map.getObjectLayer('colisoes');
        if (colisaoLayer) {
            colisaoLayer.objects.filter(o => o.width > 0 && o.height > 0).forEach(o => {
                const b = this.add.rectangle(o.x + o.width / 2, o.y + o.height / 2, o.width, o.height);
                this.physics.add.existing(b, true);
                grupoColisoes.add(b);
            });
            this.physics.add.collider(this.personagem, grupoColisoes);
        }

        // --- Porta para a Cidade ---
        const portaLayer = map.getObjectLayer('porta');
        if (portaLayer) {
            portaLayer.objects.filter(o => o.width > 0 && o.height > 0).forEach(o => {
                const zona = this.add.zone(o.x + o.width / 2, o.y + o.height / 2, o.width, o.height);
                this.physics.world.enable(zona);
                zona.body.setAllowGravity(false);
                zona.body.moves = false;
                this.physics.add.overlap(this.personagem, zona, () => {
                    this.scene.start('Cidade', { character: this.characterEscolhido });
                });
            });
        }

        // --- Zona invisível do professor ---
        const professorLayer = map.getObjectLayer('professor');
        if (professorLayer?.objects.length > 0) {
            const obj = professorLayer.objects[0];
            const profX = obj.x + obj.width / 2;
            const profY = obj.y + obj.height / 2;

            this.zonaProfessor = this.add.zone(profX, profY, obj.width, obj.height);
            this.physics.world.enable(this.zonaProfessor);
            this.zonaProfessor.body.setAllowGravity(false);
            this.zonaProfessor.body.moves = false;

            this.physics.add.overlap(this.personagem, this.zonaProfessor, () => {
                // ✅ só dispara se a zona estiver ativa
                if (!this.zonaProfessor.active) return;

                // ✅ desativa a zona imediatamente para não repetir
                this.zonaProfessor.setActive(false);
                this.zonaProfessor.body.enable = false;

                this.scene.pause();
                this.scene.launch('tutorial', { cenaOrigem: 'MainScene', character: this.characterEscolhido });
            });
        }

        // ✅ Ao voltar do tutorial: reativa a zona após 1s (tempo de o jogador sair)
        this.events.on('resume', () => {
            this.time.delayedCall(1000, () => {
                if (this.zonaProfessor) {
                    this.zonaProfessor.setActive(true);
                    this.zonaProfessor.body.enable = true;
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