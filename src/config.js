/**
 * Arquivo de configuração principal do jogo.
 * IMPORTANTE: este arquivo deve ser carregado APÓS todos os
 * arquivos de cena (telainicial.js, main.js, game.js).
 */
var config = {
    // Define o tipo de renderização
    type: Phaser.AUTO,

    // Dimensões da tela do jogo em pixels
    width: 800,
    height: 640,

    // Integração com o HTML
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.FIT,          // Ajusta mantendo proporção
        autoCenter: Phaser.Scale.CENTER_BOTH // Centraliza na tela
    },

    // Mantém nitidez do pixel art
    pixelArt: true,

    // Sistema de física top-down (sem gravidade)
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false // mude para true para ver hitboxes
        }
    },

    // Lista de cenas — a primeira da lista é carregada automaticamente
    scene: [TelaInicial, MainScene, CidadeScene, Farmacia, LojaDeRoupa, Padaria, SalaoDeBeleza]
};

// Inicia o jogo
var game = new Phaser.Game(config);