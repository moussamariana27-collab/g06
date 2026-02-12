var config = {
    //o navegador escolhe o tipo de renderizador.
    type: Phaser.AUTO,
    width: 800,
    height: 640,

    //Define as funções executadas durante o ciclo de vida do jogo.
    scene: {
        preload: preload, //Executado uma vez no início, é usado para carregar recursos.
        create: create, //Executado uma vez após o preload, é onde os objetos do jogo são criados e adicionados à cena.
        update: update //Atualização em tempo real do jogo.
    }
};

var game = new Phaser.Game(config);
var btnIniciar;

function preload(){
    //carregando elementos
    this.load.image('fundo', 'assets/fundo.png');
    this.load.image('button', 'assets/button.png');
}

function create(){
    //adicionando elementos e ajustando posições
    this.add.image(400, 325, 'fundo');
    btnIniciar = this.add.image(400, 525, 'button').setScale(0.5);
    
    // Transforma o cursor em uma 'mãozinha' quando passa no botão
    btnIniciar.setInteractive({cursor: 'pointer'});

    // Aumenta o botão quando o cursor passa em cima
    btnIniciar.on('pointerover', () => {
        btnIniciar.setScale(0.6); 
    });

    // Volta o botão ao tamanho normal quando o mouse sai de cima
    btnIniciar.on('pointerout', () => {
        btnIniciar.setScale(0.5);
    });

    // Diminui o botão quando clicado
    iniciar.on('pointerdown', () => {
        iniciar.setScale(0.45); 
    });

    // Retorna o botão ao tamanho normal
    iniciar.on('pointerup', () => {
        iniciar.setScale(0.5); 
    });

}

function update() {
}
