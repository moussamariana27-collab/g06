class CharacterInfoScene2 extends Phaser.Scene {
    constructor() {
        super("CharacterInfoScene2");
    }

    preload() {

        // fundo
        this.load.image('fundoInfo', 'assets/fundo2.png');

        // botões
        this.load.image('botaoVoltar', 'assets/btnVoltar.png');
        this.load.image('botaoJogar', 'assets/btnJogar.png');
    }

    create(data) {

        const { centerX, centerY } = this.cameras.main;

        // fundo
        this.add.image(this.scale.width/2, this.scale.height/2, "fundoInfo")
        .setDisplaySize(this.scale.width, this.scale.height);

        // BOTÃO VOLTAR
        let btnVoltar = this.add.image(centerX - 400, 200, 'botaoVoltar').setScale(1.3);

        btnVoltar.setInteractive({ cursor: 'pointer' });

        btnVoltar.on('pointerover', () => {
            btnVoltar.setScale(1.5);
        });

        btnVoltar.on('pointerout', () => {
            btnVoltar.setScale(1.3);
        });

        btnVoltar.on('pointerdown', () => {
            btnVoltar.setScale(1.2);
        });

        btnVoltar.on('pointerup', () => {
            btnVoltar.setScale(1.3);
            this.scene.start("CharacterSelectScene");
        });

        // BOTÃO CONFIRMAR
        let btnIniciar = this.add.image(centerX + 400, 200, 'botaoJogar').setScale(1.3);

        btnIniciar.setInteractive({ cursor: 'pointer' });

        btnIniciar.on('pointerover', () => {
            btnIniciar.setScale(1.5);
        });

        btnIniciar.on('pointerout', () => {
            btnIniciar.setScale(1.3);
        });

        btnIniciar.on('pointerdown', () => {
            btnIniciar.setScale(1.2);
        });

        btnIniciar.on('pointerup', () => {
            btnIniciar.setScale(1.3);
            this.scene.start("MainScene", {
                character: data.character
            });
        });

    }
}