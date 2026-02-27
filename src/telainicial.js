class TelaInicial extends Phaser.Scene {
    constructor() {
        // Define a chave de identificação da cena (usada para troca de cenas)
        super({ key: 'telaInicial' });
    }

    preload() {
        // Carregamento dos recursos visuais da tela inicial
        this.load.image('fundo', '../g06/src/assets/fundo.png');
        this.load.image('button', '../g06/src/assets/button.png');
    }

    create() {
        //  Configuração do Cenário 
        this.add.image(400, 320, 'fundo'); 
        
        //  Criação do Botão de Iniciar 
        let btnIniciar = this.add.image(400, 525, 'button').setScale(0.5);
        
        // Habilita a interatividade do botão
        btnIniciar.setInteractive({ cursor: 'pointer' });

        //  Eventos de Mouse do Botão 

        // Quando o mouse passa por cima aumenta levemente o botão
        btnIniciar.on('pointerover', () => {
            btnIniciar.setScale(0.6); 
        });

        // Quando o mouse sai de cima: volta ao tamanho original
        btnIniciar.on('pointerout', () => {
            btnIniciar.setScale(0.5);
        });

        // Quando o botão é pressionado diminui para dar efeito de clique
        btnIniciar.on('pointerdown', () => {
            btnIniciar.setScale(0.45); 
        });

        // Quando o clique é solto restaura tamanho e inicia o jogo
        btnIniciar.on('pointerup', () => {
            btnIniciar.setScale(0.5); 
            // Troca para a cena principal do jogo (MainScene)
            this.scene.start('mainScene'); 
        });
    }

    update() {
        // Loop de atualização (vazio pois a tela inicial é estática)
    }
}