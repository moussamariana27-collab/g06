// ============================================================
//  game.js — GameScene (Fase principal do jogo)
//  Convertido para classe Phaser.Scene para integrar com
//  o sistema de cenas do config.js
// ============================================================

class GameScene extends Phaser.Scene {

    // --- PARÂMETROS CONFIGURÁVEIS ---
    static get VELOCIDADE_JOGADORA() { return 150; } // pixels por segundo
    static get ESCALA_JOGADORA()     { return 2.5;  } // fator de escala do sprite
    static get POS_INICIAL_X()       { return 1500; } // posição inicial X no mapa
    static get POS_INICIAL_Y()       { return 1500; } // posição inicial Y no mapa

    constructor() {
        super({ key: 'gameScene' });
    }

    // ============================================================
    //  PRELOAD — carrega todos os assets antes de exibir a cena
    // ============================================================
    preload() {

        // Mapa exportado do Tiled como JSON
        this.load.tilemapTiledJSON('mapa', 'assets/mapinha.json');

        // Tilesets
        this.load.image('img_chao',       'assets/chao.png');
        this.load.image('img_padaria',    'assets/padaria.png');
        this.load.image('img_loja_roupa', 'assets/lojinhas.png');
        this.load.image('img_cielo',      'assets/ct.png');
        this.load.image('img_asfalto',    'assets/asfalto.png');

        // Sprite sheet da personagem — cada frame tem 16x32 px
        // frame 0 = direita | frame 1 = cima | frame 2 = esquerda | frame 3 = baixo
        this.load.spritesheet('mulher', 'assets/spritepersonagem1.png', {
            frameWidth: 16,
            frameHeight: 32
        });

        // Exibe erro no console se algum asset falhar ao carregar
        this.load.on('loaderror', function (arquivo) {
            console.error('Erro ao carregar asset:', arquivo.key, '→', arquivo.src);
        });
    }

    // ============================================================
    //  CREATE — monta a cena uma única vez ao iniciar
    // ============================================================
    create() {

        // --- MAPA ---
        const tilemapa = this.make.tilemap({ key: 'mapa' });

        // Conecta cada imagem ao nome do tileset definido no Tiled.
        // 'cielo ' e 'asfalto ' têm espaço no final — é como estão no JSON do Tiled.
        const tilesetChao      = tilemapa.addTilesetImage('chao',       'img_chao');
        const tilesetPadaria   = tilemapa.addTilesetImage('padaria',    'img_padaria');
        const tilesetLojaRoupa = tilemapa.addTilesetImage('loja roupa', 'img_loja_roupa');
        const tilesetCielo     = tilemapa.addTilesetImage('cielo ',   'img_cielo');   // espaço intencional — igual ao JSON do Tiled
        const tilesetAsfalto   = tilemapa.addTilesetImage('asfalto ', 'img_asfalto'); // espaço intencional — igual ao JSON do Tiled

        // Salvaguarda: verifica se todos os tilesets foram vinculados
        const todosTilesets = [tilesetChao, tilesetPadaria, tilesetLojaRoupa, tilesetCielo, tilesetAsfalto];
        const nomesTodosTs  = ['chao', 'padaria', 'loja roupa', 'cielo ', 'asfalto '];
        todosTilesets.forEach(function (ts, i) {
            if (!ts) console.error('Tileset não encontrado no mapa:', nomesTodosTs[i]);
        });

        // --- CAMADAS DO MAPA ---
        const camadaGraminhaLayer = tilemapa.createLayer('graminha', todosTilesets, 0, 0);
        const camadaLojasLayer    = tilemapa.createLayer('lojas',    todosTilesets, 0, 0);

        if (camadaLojasLayer) {
            camadaLojasLayer.setCollisionByExclusion([-1]);
        } else {
            console.error('Camada "lojas" não encontrada no mapa.');
        }

        // --- JOGADORA ---
        const posX = Phaser.Math.Clamp(GameScene.POS_INICIAL_X, 0, tilemapa.widthInPixels);
        const posY = Phaser.Math.Clamp(GameScene.POS_INICIAL_Y, 0, tilemapa.heightInPixels);

        this.jogadorSprite = this.physics.add.sprite(posX, posY, 'mulher');
        this.jogadorSprite.setScale(GameScene.ESCALA_JOGADORA);
        this.jogadorSprite.setCollideWorldBounds(true);

        this.physics.world.setBounds(0, 0, tilemapa.widthInPixels, tilemapa.heightInPixels);

        if (camadaLojasLayer) {
            this.physics.add.collider(this.jogadorSprite, camadaLojasLayer);
        }

        // --- ANIMAÇÕES ---
        this.anims.create({
            key: 'andar_esquerda',
            frames: this.anims.generateFrameNumbers('mulher', { start: 2, end: 2 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'andar_cima',
            frames: this.anims.generateFrameNumbers('mulher', { start: 1, end: 1 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'andar_direita',
            frames: this.anims.generateFrameNumbers('mulher', { start: 0, end: 0 }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'andar_baixo',
            frames: this.anims.generateFrameNumbers('mulher', { start: 3, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        // --- CÂMERA ---
        this.cameras.main.startFollow(this.jogadorSprite);
        this.cameras.main.setBounds(0, 0, tilemapa.widthInPixels, tilemapa.heightInPixels);

        // --- CONTROLES ---
        this.teclasCursor = this.input.keyboard.createCursorKeys();
    }

    // ============================================================
    //  UPDATE — executado a cada frame (~60x por segundo)
    // ============================================================
    update() {

        if (!this.jogadorSprite || !this.teclasCursor) return;

        this.jogadorSprite.setVelocity(0);

        const vel = Phaser.Math.Clamp(GameScene.VELOCIDADE_JOGADORA, 50, 400);

        if (this.teclasCursor.left.isDown) {
            this.jogadorSprite.setVelocityX(-vel);
            this.jogadorSprite.anims.play('andar_esquerda', true);
        }
        else if (this.teclasCursor.right.isDown) {
            this.jogadorSprite.setVelocityX(vel);
            this.jogadorSprite.anims.play('andar_direita', true);
        }
        else if (this.teclasCursor.up.isDown) {
            this.jogadorSprite.setVelocityY(-vel);
            this.jogadorSprite.anims.play('andar_cima', true);
        }
        else if (this.teclasCursor.down.isDown) {
            this.jogadorSprite.setVelocityY(vel);
            this.jogadorSprite.anims.play('andar_baixo', true);
        }
        else {
            this.jogadorSprite.anims.stop();
        }

        // Normaliza velocidade diagonal (para uso futuro)
        if (this.jogadorSprite.body.velocity.length() > 0) {
            this.jogadorSprite.body.velocity.normalize().scale(vel);
        }
    }
}