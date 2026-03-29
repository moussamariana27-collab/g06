class TelaInicial extends Phaser.Scene {
    constructor() {
        super({ key: 'TelaInicial' });
    }

    // Carrega os arquivos que serÃ£o utilizados nesta cena
    preload() {
        this.load.image('fundo', 'assets/telainicial.jpeg');
        this.load.image('imagemBotao', 'assets/btnJogar.png');
        this.load.image('nome', 'assets/nomeTela.png');
        this.load.audio('musicamenu', 'assets/menuMusic.mp3');
    }

    create() {
        // Toca a mÃºsica do menu
        this.musica = this.sound.add('musicamenu', {
            loop: true,
            volume: 0.40
        });
        this.musica.play();

        // Define o centro da tela
        const centroX = this.cameras.main.width / 2;
        const centroY = this.cameras.main.height / 2;

        // Adiciona a imagem de fundo
        this.add.image(centroX, centroY, 'fundo');

        // Adiciona o nome do jogo no topo da tela
        this.add.image(centroX, centroY - 100, 'nome').setScale(3);

        // Cria o botÃ£o de inÃ­cio com efeito de escala
        const botaoIniciar = this.add.image(centroX, centroY + 150, 'imagemBotao').setScale(1.3);

        // Torna o botÃ£o interativo e altera o cursor do mouse ao passar sobre ele
        botaoIniciar.setInteractive({ cursor: 'pointer' });

        // Aumenta a escala do botÃ£o quando o mouse passa sobre ele
        botaoIniciar.on('pointerover', () => botaoIniciar.setScale(1.5));

        // Diminui a escala quando o mouse sai do botÃ£o
        botaoIniciar.on('pointerout', () => botaoIniciar.setScale(1.3));

        // Reduz a escala quando o botÃ£o Ã© pressionado
        botaoIniciar.on('pointerdown', () => botaoIniciar.setScale(1.0));

        // Volta Ã  escala original e inicia a cena de seleÃ§Ã£o de personagem
        botaoIniciar.on('pointerup', () => {
            botaoIniciar.setScale(1.3);
            this.scene.start('SelecaoPersonagem');
        });
    }
}
