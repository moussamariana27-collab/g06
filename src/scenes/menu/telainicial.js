class TelaInicial extends Phaser.Scene {
    constructor() {
        super({ key: 'TelaInicial' });
    }

    // Carrega os arquivos usados nesta cena.
    preload() {
        this.load.image('fundo', 'assets/telainicial.jpeg');
        this.load.image('imagemBotao', 'assets/btnJogar.png');
        this.load.image('nome', 'assets/nomeTela.png');
        this.load.audio('musicamenu', 'assets/menuMusic.mp3');
    }

    create() {
        // Toca a musica do menu com tratamento seguro.
        this.musica = utilitariosJogo.tocarAudio(this, 'musicamenu', {
            loop: true,
            volume: 0.40
        });

        // Define o centro da tela.
        const centroX = this.cameras.main.width / 2;
        const centroY = this.cameras.main.height / 2;

        // Adiciona a imagem de fundo.
        this.add.image(centroX, centroY, 'fundo');

        // Adiciona o nome do jogo no topo da tela.
        this.add.image(centroX, centroY - 100, 'nome').setScale(3);

        // Cria o botao de inicio com efeito de escala.
        const botaoIniciar = this.add.image(centroX, centroY + 150, 'imagemBotao').setScale(1.3);

        // Torna o botao interativo e ajusta o cursor.
        botaoIniciar.setInteractive({ cursor: 'pointer' });

        // Aumenta a escala do botao ao passar o mouse.
        botaoIniciar.on('pointerover', () => botaoIniciar.setScale(1.5));

        // Diminui a escala quando o mouse sai do botao.
        botaoIniciar.on('pointerout', () => botaoIniciar.setScale(1.3));

        // Reduz a escala quando o botao e pressionado.
        botaoIniciar.on('pointerdown', () => botaoIniciar.setScale(1.0));

        // Volta a escala original e inicia a selecao de personagem.
        botaoIniciar.on('pointerup', () => {
            botaoIniciar.setScale(1.3);
            utilitariosJogo.iniciarCenaSeDisponivel(this, 'SelecaoPersonagem');
        });
    }
}
