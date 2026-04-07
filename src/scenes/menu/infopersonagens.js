class InfoPersonagem extends Phaser.Scene {
    constructor() { super("InfoPersonagem"); }

    preload() {
        this.load.image('fundoInfo', 'assets/fundo2.png');
        this.load.image('botaoVoltar', 'assets/btnVoltar.png');
        this.load.image('botaoJogar', 'assets/btnJogar.png');

        // Carrega a imagem de informacao de cada personagem.
        this.load.image('infoJOSE',  'assets/info_jose.png');
        this.load.image('infoMARIA', 'assets/info_maria.png');
        this.load.image('infoJOAO',  'assets/info_joao.png');
        this.load.image('infoPAULA', 'assets/info_paula.png');
    }

    create(data) {
        const { centerX, centerY } = this.cameras.main;
        this.personagemEscolhido = utilitariosJogo.resolverChavePersonagem(
            data?.personagem,
            utilitariosJogo.chavesPersonagem,
            null
        );

        if (!this.personagemEscolhido) {
            this.scene.start('SelecaoPersonagem');
            return;
        }

        // Carrega a imagem de fundo ajustada a tela.
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'fundoInfo')
            .setDisplaySize(this.scale.width, this.scale.height);

        // Exibe a imagem de informacoes do personagem selecionado.
        const chaveInfo = 'info' + this.personagemEscolhido;
        this.add.image(centerX, centerY, chaveInfo).setScale(1);

        // Botao de voltar para a selecao de personagem.
        const botaoVoltar = this.add.image(centerX - 400, 200, 'botaoVoltar').setScale(1.3);
        botaoVoltar.setInteractive({ cursor: 'pointer' });
        botaoVoltar.on('pointerover', () => botaoVoltar.setScale(1.5));
        botaoVoltar.on('pointerout', () => botaoVoltar.setScale(1.3));
        botaoVoltar.on('pointerdown', () => botaoVoltar.setScale(1.2));
        botaoVoltar.on('pointerup', () => {
            botaoVoltar.setScale(1.3);
            // Volta para a cena de selecao de personagem.
            this.scene.start('SelecaoPersonagem');
        });

        // Botao de jogar com o personagem escolhido.
        const botaoJogar = this.add.image(centerX + 400, 200, 'botaoJogar').setScale(1.3);
        botaoJogar.setInteractive({ cursor: 'pointer' });
        botaoJogar.on('pointerover', () => botaoJogar.setScale(1.5));
        botaoJogar.on('pointerout', () => botaoJogar.setScale(1.3));
        botaoJogar.on('pointerdown', () => botaoJogar.setScale(1.2));
        botaoJogar.on('pointerup', () => {
            botaoJogar.setScale(1.3);

            // Inicia o jogo com o personagem escolhido.
            utilitariosJogo.iniciarCenaSeDisponivel(this, 'Escritorio', {
                personagem: this.personagemEscolhido
            });
        
        });
    }
}
