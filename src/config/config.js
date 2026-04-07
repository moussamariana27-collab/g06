// Configuracao principal do Phaser.
// Reune as opcoes globais do jogo e registra todas as cenas.
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    scale: {
        // Redimensiona o canvas para acompanhar a tela do navegador.
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    // Mantem o visual pixelado dos sprites.
    pixelArt: true,

    physics: {
        // Usa fisica arcade em todas as cenas.
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    // Define a ordem de carregamento das cenas do jogo.
    scene: [
        TelaInicial,
        SelecaoPersonagem,
        InfoPersonagem,
        Escritorio,
        Tutorial,
        Cidade,
        LojaDeRoupa,
        Padaria,
        Posto,
        SalaoDeBeleza,
        Mercado,
        LojaDeConstrução,
        FeedbackDerrotaPadaria,
        FeedbackVitoriaPadaria,
        FeedbackDerrotaSalaoDeBeleza,
        FeedbackVitoriaSalaoDeBeleza,
        FeedbackDerrotaPosto,
        FeedbackVitoriaPosto,
        FeedbackDerrotaSupermercado,
        FeedbackVitoriaSupermercado,
        FeedbackDerrotaLojaDeRoupa,
        FeedbackVitoriaLojaDeRoupa,
        FeedbackDerrotaMateriaisConstrucao,
        FeedbackVitoriaMateriaisConstrucao,
        
    ]
};

// Instancia o jogo com a configuracao acima.
const game = new Phaser.Game(config);
