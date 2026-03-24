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
        CharacterSelectScene,
        CharacterInfoScene,   // cria uma função que serve pra todos os personagens
        MainScene,
        Tutorial,
        CidadeScene,
        Farmacia,
        LojaDeRoupa,
        Padaria,
        SalaoDeBeleza
    ]
};

var game = new Phaser.Game(config);