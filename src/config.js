/**
 * Arquivo de configuração principal do jogo.
 */
var config = {
    // Define o tipo de renderização 
    type: Phaser.AUTO,
    
    // Dimensões da tela do jogo em pixels
    width: 800,
    height: 640,

    // Configurações de integração com o HTML e responsividade
    parent: 'game-container', // Vincula o jogo à <div> específica no HTML
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta o tamanho do jogo para caber na tela (mantendo proporção)
        autoCenter: Phaser.Scale.CENTER_BOTH // Centraliza o canvas horizontal e verticalmente
    },

    // Configurações de renderização visual
    pixelArt: true, // Desativa antialiasing para manter a nitidez do pixel art

    // Configurações do sistema de física
    physics: {
        default: 'arcade', // Utiliza o sistema de física leve "Arcade"
        arcade: {
            gravity: { y: 0 }, // Gravidade zero para movimentação top-down (vista de cima)
            debug: false // Visualização de caixas de colisão 
        }
    },

    // Lista de cenas do jogo (a primeira da lista é a inicial)
    scene: [TelaInicial, MainScene]
};

// Cria a instância do jogo passando o objeto de configuração
var game = new Phaser.Game(config);