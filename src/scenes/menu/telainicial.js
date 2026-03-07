class TelaInicial extends Phaser.Scene {
    constructor() {
        super({ key: 'telaInicial' });
    }

    preload() {
        this.load.image('fundo', 'assets/telainicial.jpeg');
        this.load.image('button', 'assets/btnJogar.png');
        this.load.image('nome', 'assets/nomeTela.png');
    }

    create() {
        let centroX = this.cameras.main.width / 2;
        let centroY = this.cameras.main.height / 2;

        this.add.image(centroX, centroY, 'fundo');
        this.add.image(centroX, centroY - 100, 'nome').setScale(3);

        let btnIniciar = this.add.image(centroX, centroY + 150, 'button').setScale(1.3);
        btnIniciar.setInteractive({ cursor: 'pointer' });

        btnIniciar.on('pointerover',  () => btnIniciar.setScale(1.5));
        btnIniciar.on('pointerout',   () => btnIniciar.setScale(1.3));
        btnIniciar.on('pointerdown',  () => btnIniciar.setScale(1.0));
        btnIniciar.on('pointerup',    () => {
            btnIniciar.setScale(1.3);
            this.scene.start('CharacterSelectScene');
        });
    }

    update() {}
}
