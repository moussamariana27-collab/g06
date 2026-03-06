var config = {
    type: Phaser.AUTO,

    // Usa as dimensões reais da janela do navegador
    width: window.innerWidth,
    height: window.innerHeight,

    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.RESIZE,        // Redimensiona dinamicamente com a janela
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
        CharacterInfoScene,
        CharacterInfoScene2,
        CharacterInfoScene3,
        CharacterInfoScene4,
        MainScene,
        CidadeScene,
        Farmacia,
        LojaDeRoupa,
        Padaria,
        SalaoDeBeleza
    ]
};

var game = new Phaser.Game(config);