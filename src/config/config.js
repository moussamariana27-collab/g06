var config = {
    type: Phaser.AUTO,



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
            debug: false
        }
    },

    scene: [
        TelaInicial,
        SelecaoPersonagem,
        InfoPersonagem,
        Escritorio,
        Tutorial,
        Cidade,
        Farmacia,
        LojaDeRoupa,
        Padaria,
        Posto,
        SalaoDeBeleza,
        Mercado
    ]
};

var game = new Phaser.Game(config);