var config = {
    type: Phaser.AUTO,

    width: window.innerWidth,
    height: window.innerHeight,

    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    pixelArt: true,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },

    scene: [
        TelaInicial,
        CharacterSelectScene,
        CharacterInfoScene,   // ← agora é só uma, serve pra todos os personagens
        MainScene,
        CidadeScene,
        Farmacia,
        LojaDeRoupa,
        Padaria,
        SalaoDeBeleza
    ]
};

var game = new Phaser.Game(config);