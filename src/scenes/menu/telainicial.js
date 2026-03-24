class TelaInicial extends Phaser.Scene {
    constructor() {
        super({ key: 'telaInicial' });
    }

    // Carrega os arquivos que serão utilizados nesta cena
    preload() {
        this.load.image('fundo', 'assets/telainicial.jpeg');
        this.load.image('imagemBotao', 'assets/btnJogar.png');
        this.load.image('nome', 'assets/nomeTela.png');
        this.load.audio('musicamenu', 'assets/musicamenu.mp3')
    }

   create() {
    // add música 
    this.musica = this.sound.add('musicamenu', {
        loop: true,
        volume: 0.40
    });
    this.musica.play();

    // Define centroX como metade da largura da tela
    let centroX = this.cameras.main.width / 2;

    // Define centroY como metade da altura da tela
    let centroY = this.cameras.main.height / 2;

    // Adiciona a imagem de fundo nas coordenadas centroX e centroY
    this.add.image(centroX, centroY, 'fundo');

    // Adiciona a imagem do nome do jogo nas coordenadas indicadas e aumenta seu tamanho em 200%
    this.add.image(centroX, centroY - 100, 'nome').setScale(3);

    // Adiciona a imagem do botão, posiciona nas coordenadas indicadas e aumenta seu tamanho em 30%
    let btnIniciar = this.add.image(centroX, centroY + 150, 'imagemBotao').setScale(1.3);

    // Torna o botão interativo e altera o cursor do mouse ao passar sobre ele
    btnIniciar.setInteractive({ cursor: 'pointer' });

    // Define o comportamento do botão quando o mouse passa por cima
    btnIniciar.on('pointerover',  () => btnIniciar.setScale(1.5));

    // Define o comportamento do botão quando o mouse sai de cima dele
    btnIniciar.on('pointerout',   () => btnIniciar.setScale(1.3));

    // Define o comportamento do botão quando ele é pressionado
    btnIniciar.on('pointerdown',  () => btnIniciar.setScale(1.0));

    // Define o comportamento quando o botão é solto
    btnIniciar.on('pointerup', () => {
        btnIniciar.setScale(1.3);

        // Inicia a cena de seleção de personagem
        this.scene.start('CharacterSelectScene');
    });
   }
}