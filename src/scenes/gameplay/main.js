class Escritorio extends Phaser.Scene {
    constructor() { super({ key: 'Escritorio' }); }

    init(data) {
        this.personagemEscolhido = data?.character || null;
    }

    preload() {
        this.load.tilemapTiledJSON('mapaEscritorio', 'assets/escritorio.json');
        this.load.image('escritoriTileset', 'assets/escritorio_tileset.png');
        this.load.image('estadualEmPe', 'assets/estadual_em_pe.png');
        this.load.audio('escritorio', 'assets/escritorio.mp3');

        const sprites = {
            'JOSÉ':  { file: 'assets/josePronto.png',  frameWidth: 16, frameHeight: 32 },
            'MARIA': { file: 'assets/mariaPronto.png', frameWidth: 16, frameHeight: 32 },
            'JOÃO':  { file: 'assets/joaoPronto.png',  frameWidth: 16, frameHeight: 32 },
            'PAULA': { file: 'assets/paulaPronto.png', frameWidth: 16, frameHeight: 32 },
        };

        const dadosSprite = sprites[this.personagemEscolhido];
        if (!dadosSprite) { console.error('Personagem inválido:', this.personagemEscolhido); return; }
        this.load.spritesheet('sheetPersonagem', dadosSprite.file, {
            frameWidth: dadosSprite.frameWidth, frameHeight: dadosSprite.frameHeight
        });
    }

    create() {
        const map = this.make.tilemap({ key: 'mapaEscritorio' });
        const tiles = map.addTilesetImage('escritorio', 'escritoriTileset');
        map.createLayer('Fundo', tiles, 0, 0);

        // Adiciona música
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
        const spawnLayer = map.getObjectLayer('spawn');
        if (spawnLayer?.objects.length > 0) {
            const objetoSpawn = spawnLayer.objects[0];
            spawnX = objetoSpawn.x + objetoSpawn.width / 2;
            spawnY = objetoSpawn.y + objetoSpawn.height / 2;
        }

        // Cria o sprite do personagem na posição de spawn
        this.personagem = this.physics.add.sprite(spawnX, spawnY, 'sheetPersonagem', 0).setScale(3.0);
        this.personagem.setCollideWorldBounds(true);
        this.personagem.body.setSize(
            this.personagem.width,
            this.personagem.height
        );

        // Voltar pra cidade com SPACE
        this.input.keyboard.once('keydown-SPACE', () => {
            this.musica.stop();
            this.scene.start('Cidade', { character: this.personagemEscolhido });
        });

        this.personagem.body.setOffset(0, 0);

        // Faz a câmera seguir o personagem
        this.cameras.main.startFollow(this.personagem);
        this.cameras.main.setZoom(1.0);
        this.cursor = this.input.keyboard.createCursorKeys();

        // Colisões do mapa
        const grupoColisoes = this.physics.add.staticGroup();
        const colisaoLayer = map.getObjectLayer('colisoes');
        if (colisaoLayer) {
            colisaoLayer.objects.filter(objetoColisao => objetoColisao.width > 0 && objetoColisao.height > 0).forEach(objetoColisao => {
                const retanguloColisao = this.add.rectangle(
                    objetoColisao.x + objetoColisao.width / 2,
                    objetoColisao.y + objetoColisao.height / 2,
                    objetoColisao.width,
                    objetoColisao.height
                );
                this.physics.add.existing(retanguloColisao, true);
                grupoColisoes.add(retanguloColisao);
            });
            this.physics.add.collider(this.personagem, grupoColisoes);
        }

        // Porta de saída
        const portaLayer = map.getObjectLayer('porta');
        if (portaLayer) {
            portaLayer.objects.filter(o => o.width > 0 && o.height > 0).forEach(o => {
                const zona = this.add.zone(o.x + o.width / 2, o.y + o.height / 2, o.width, o.height);
                this.physics.world.enable(zona);
                zona.body.setAllowGravity(false);
                zona.body.moves = false;
                this.physics.add.overlap(this.personagem, zona, () => {
                    this.musica.stop();
                    this.scene.start('Cidade', { character: this.personagemEscolhido });
                });
            });
        }

        // Zona do professor
        const professorLayer = map.getObjectLayer('professor');
        if (professorLayer?.objects.length > 0) {
            const obj = professorLayer.objects[0];
            const profX = obj.x + obj.width / 2;
            const profY = obj.y + obj.height / 2;

            const estadual = this.add.image(profX, profY, 'estadualEmPe').setOrigin(0.5, 0.5).setScale(0.25);

            this.tweens.add({
                targets: estadual,
                y: profY - 15,
                duration: 600,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.inout'
            });

            this.zonaProfessor = this.add.zone(profX, profY, obj.width, obj.height);
            this.physics.world.enable(this.zonaProfessor);
            this.zonaProfessor.body.setAllowGravity(false);
            this.zonaProfessor.body.moves = false;

            this.physics.add.overlap(this.personagem, this.zonaProfessor, () => {
                if (!this.zonaProfessor.active) return;

                this.zonaProfessor.setActive(false);
                this.zonaProfessor.body.enable = false;

                this.scene.pause();
                this.scene.launch('Tutorial', { cenaOrigem: 'Escritorio', character: this.personagemEscolhido });
            });
        }

        // Reativa a zona do professor ao voltar do tutorial
        this.events.on('resume', () => {
            this.time.delayedCall(1000, () => {
                if (this.zonaProfessor) {
                    this.zonaProfessor.setActive(true);
                    this.zonaProfessor.body.enable = true;
                }
            });
        });

        // Animações do personagem
        this.anims.create({
            key: "up",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem', { start: 54, end: 59 }),
            repeat: -1
        });

        this.anims.create({
            key: "down",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem', { start: 66, end: 71 }),
            repeat: -1
        });

        this.anims.create({
            key: "left",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem', { start: 60, end: 65 }),
            repeat: -1
        });

        this.anims.create({
            key: "right",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem', { start: 48, end: 53 }),
            repeat: -1
        });

        // Exibe o pop-up de tutorial ao entrar na cena
        this.mostrarTutorial();
    }

    mostrarTutorial() {
        // Bloqueia o movimento durante o tutorial
        this.tutorialAtivo = true;

        const { width, height } = this.cameras.main;
        const cx = width / 2;
        const cy = height / 2;

        // Container pai — setScrollFactor(0) mantém tudo fixo na tela
        const container = this.add.container(0, 0).setScrollFactor(0).setDepth(100);

        // Fundo escuro semi-transparente
        const overlay = this.add.rectangle(cx, cy, width, height, 0x000000, 0.65)
            .setScrollFactor(0);
        container.add(overlay);

        // Painel central
        const painelW = 420, painelH = 320;
        const painel = this.add.rectangle(cx, cy, painelW, painelH, 0x1a1a2e, 1)
            .setStrokeStyle(2, 0x4a9eff)
            .setScrollFactor(0);
        container.add(painel);

        // Título
        const titulo = this.add.text(cx, cy - 130, '📋  BEM-VINDO AO MESTRE DE VENDAS!', {
            fontSize: '18px', fontFamily: 'Arial', color: '#4a9eff',
            fontStyle: 'bold'
        }).setOrigin(0.5, 0.5).setScrollFactor(0);
        container.add(titulo);

        // Descrição do jogo
        const descricao = this.add.text(cx, cy - 90,
            'Explore o escritório, converse com\no Professor e descubra os desafios!', {
            fontSize: '13px', fontFamily: 'Arial', color: '#cccccc',
            align: 'center', lineSpacing: 6
        }).setOrigin(0.5, 0.5).setScrollFactor(0);
        container.add(descricao);

        // Separador
        const sep = this.add.rectangle(cx, cy - 56, 360, 1, 0x4a9eff, 0.4)
            .setScrollFactor(0);
        container.add(sep);

        // Label de controles
        const labelControles = this.add.text(cx, cy - 40, '🕹️  CONTROLES', {
            fontSize: '14px', fontFamily: 'Arial', color: '#4a9eff', fontStyle: 'bold'
        }).setOrigin(0.5, 0.5).setScrollFactor(0);
        container.add(labelControles);

        // Teclas com descrição
        const teclas = [
            { icone: '⬆', label: 'Mover para cima',     offsetY: -10 },
            { icone: '⬇', label: 'Mover para baixo',    offsetY:  14 },
            { icone: '⬅', label: 'Mover para esquerda', offsetY:  38 },
            { icone: '➡', label: 'Mover para direita',  offsetY:  62 },
        ];

        teclas.forEach(({ icone, label, offsetY }) => {
            const baseY = cy - 5;

            const teclaFundo = this.add.rectangle(cx - 120, baseY + offsetY, 32, 24, 0x2a2a4e, 1)
                .setStrokeStyle(1, 0x666688)
                .setScrollFactor(0);
            container.add(teclaFundo);

            const teclaTexto = this.add.text(cx - 120, baseY + offsetY, icone, {
                fontSize: '14px', fontFamily: 'Arial', color: '#ffffff'
            }).setOrigin(0.5, 0.5).setScrollFactor(0);
            container.add(teclaTexto);

            const descTexto = this.add.text(cx - 96, baseY + offsetY, label, {
                fontSize: '12px', fontFamily: 'Arial', color: '#bbbbbb'
            }).setOrigin(0, 0.5).setScrollFactor(0);
            container.add(descTexto);
        });

        // Separador 2
        const sep2 = this.add.rectangle(cx, cy + 82, 360, 1, 0x4a9eff, 0.4)
            .setScrollFactor(0);
        container.add(sep2);

        // Dica de interação
        const dicaInteracao = this.add.text(cx, cy + 100,
            '💬  Para falar com o Professor,\n     chegue perto dele!', {
            fontSize: '13px', fontFamily: 'Arial', color: '#cccccc',
            lineSpacing: 6
        }).setOrigin(0.5, 0.5).setScrollFactor(0);
        container.add(dicaInteracao);

        // Fecha o pop-up ao clicar no 'X'
        const fecharTutorial = () => {
            container.destroy();
            this.tutorialAtivo = false;
        };

        const xButton = this.add.text(cx + painelW / 2 - 20, cy - painelH / 2 + 20, 'X', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
        }).setOrigin(0.5).setScrollFactor(0).setInteractive({ useHandCursor: true });
        container.add(xButton);

        xButton.on('pointerdown', fecharTutorial);

        xButton.on('pointerover', () => {
            xButton.setShadow(0, 0, '#ff0000', 10);
        });
        
        xButton.on('pointerout', () => {
            xButton.setShadow(0, 0, '#ff0000', 0);
        });
    }

    update() {
        // Congela o personagem enquanto o tutorial estiver aberto
        if (this.tutorialAtivo) {
            this.personagem.setVelocity(0);
            return;
        }

        this.personagem.setVelocity(0);
        const vel = 200;

        const animsOk = this.anims.exists('left') && this.anims.exists('right') &&
                        this.anims.exists('up')   && this.anims.exists('down');

        if (this.cursor.left.isDown) {
            this.personagem.setVelocityX(-vel);
            if (animsOk) this.personagem.play('left', true);

        } else if (this.cursor.right.isDown) {
            this.personagem.setVelocityX(vel);
            if (animsOk) this.personagem.play('right', true);

        } else if (this.cursor.up.isDown) {
            this.personagem.setVelocityY(-vel);
            if (animsOk) this.personagem.play('up', true);

        } else if (this.cursor.down.isDown) {
            this.personagem.setVelocityY(vel);
            if (animsOk) this.personagem.play('down', true);

        } else {
            this.personagem.stop();
        }
    }
}