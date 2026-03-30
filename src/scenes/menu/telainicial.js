class TelaInicial extends Phaser.Scene {
    constructor() {
        super({ key: 'TelaInicial' });
    }

    // Carrega os arquivos que serão utilizados nesta cena
    preload() {
        this.load.image('fundo', 'assets/telainicial.jpeg');
        this.load.image('imagemBotao', 'assets/btnJogar.png');
        this.load.image('nome', 'assets/nomeTela.png');
        this.load.audio('musicamenu', 'assets/menuMusic.mp3');
    }

    create() {
        // Toca a música do menu
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

        // Cria o botão de início com efeito de escala
        const botaoIniciar = this.add.image(centroX, centroY + 150, 'imagemBotao').setScale(1.3);

        // Torna o botão interativo e altera o cursor do mouse ao passar sobre ele
        botaoIniciar.setInteractive({ cursor: 'pointer' });

        // Aumenta a escala do botão quando o mouse passa sobre ele
        botaoIniciar.on('pointerover', () => botaoIniciar.setScale(1.5));

        // Diminui a escala quando o mouse sai do botão
        botaoIniciar.on('pointerout', () => botaoIniciar.setScale(1.3));

        // Reduz a escala quando o botão é pressionado
        botaoIniciar.on('pointerdown', () => botaoIniciar.setScale(1.0));

        // Volta à escala original e inicia a cena de seleção de personagem
        botaoIniciar.on('pointerup', () => {
            botaoIniciar.setScale(1.3);
            this.scene.start('SelecaoPersonagem');
        });
    }
}