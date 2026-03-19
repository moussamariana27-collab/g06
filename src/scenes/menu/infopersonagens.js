class CharacterInfoScene extends Phaser.Scene {
    constructor() { super("CharacterInfoScene"); }

    preload() {
        this.load.image('fundoInfo', 'assets/fundo2.png');
        this.load.image('botaoVoltar', 'assets/btnVoltar.png');
        this.load.image('botaoJogar', 'assets/btnJogar.png');

        // Carrega a imagem de info de cada personagem
        this.load.image('infoJOSÉ',  'assets/info_jose.png');
        this.load.image('infoMARIA', 'assets/info_maria.png');
        this.load.image('infoJOÃO',  'assets/info_joao.png');
        this.load.image('infoPAULA', 'assets/info_paula.png');
    }

    create(data) {
        const { centerX, centerY } = this.cameras.main;

        // Guarda o personagem escolhido para usar nos botões
        this.characterEscolhido = data.character;

        // Fundo
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'fundoInfo')
            .setDisplaySize(this.scale.width, this.scale.height);

        // Imagem de info do personagem escolhido
        const infoKey = 'info' + data.character; // ex: 'infoJOSE'
        this.add.image(centerX, centerY, infoKey).setScale(1);

        // BOTÃO VOLTAR
        let btnVoltar = this.add.image(centerX - 400, 200, 'botaoVoltar').setScale(1.3);
        btnVoltar.setInteractive({ cursor: 'pointer' });
        btnVoltar.on('pointerover',  () => btnVoltar.setScale(1.5));
        btnVoltar.on('pointerout',   () => btnVoltar.setScale(1.3));
        btnVoltar.on('pointerdown',  () => btnVoltar.setScale(1.2));
        btnVoltar.on('pointerup',    () => {
            btnVoltar.setScale(1.3);
            this.scene.start('CharacterSelectScene');
        });

        // BOTÃO JOGAR — repassa o personagem escolhido pra MainScene
        let btnJogar = this.add.image(centerX + 400, 200, 'botaoJogar').setScale(1.3);
        btnJogar.setInteractive({ cursor: 'pointer' });
        btnJogar.on('pointerover',  () => btnJogar.setScale(1.5));
        btnJogar.on('pointerout',   () => btnJogar.setScale(1.3));
        btnJogar.on('pointerdown',  () => btnJogar.setScale(1.2));
        btnJogar.on('pointerup',    () => {
            btnJogar.setScale(1.3);
            // Repassa o personagem escolhido para a próxima cena
            this.scene.start('MainScene', { character: this.characterEscolhido});
        });
    }
}