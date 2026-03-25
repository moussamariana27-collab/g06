class InfoPersonagem extends Phaser.Scene {
    constructor() { super("InfoPersonagem"); }

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

        // Armazena o personagem escolhido para usar nos botões de navegação
        this.personagemEscolhido = data.character;

        // Carrega a imagem de fundo responsiva
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'fundoInfo')
            .setDisplaySize(this.scale.width, this.scale.height);

        // Exibe a imagem de informações do personagem selecionado
        const chaveInfo = 'info' + data.character;
        this.add.image(centerX, centerY, chaveInfo).setScale(1);

        // BOTÃO VOLTAR — retorna para a seleção de personagem
        let botaoVoltar = this.add.image(centerX - 400, 200, 'botaoVoltar').setScale(1.3);
        botaoVoltar.setInteractive({ cursor: 'pointer' });
        botaoVoltar.on('pointerover',  () => botaoVoltar.setScale(1.5));
        botaoVoltar.on('pointerout',   () => botaoVoltar.setScale(1.3));
        botaoVoltar.on('pointerdown',  () => botaoVoltar.setScale(1.2));
        botaoVoltar.on('pointerup',    () => {
            botaoVoltar.setScale(1.3);
            // Volta para a cena de seleção de personagem
            this.scene.start('SelecaoPersonagem');
        });

        // BOTÃO JOGAR — inicia o jogo com o personagem escolhido
        let botaoJogar = this.add.image(centerX + 400, 200, 'botaoJogar').setScale(1.3);
        botaoJogar.setInteractive({ cursor: 'pointer' });
        botaoJogar.on('pointerover',  () => botaoJogar.setScale(1.5));
        botaoJogar.on('pointerout',   () => botaoJogar.setScale(1.3));
        botaoJogar.on('pointerdown',  () => botaoJogar.setScale(1.2));
        botaoJogar.on('pointerup',    () => {
            botaoJogar.setScale(1.3);
             
            // Para a música do menu antes de iniciar o jogo
            const musica = this.sound.get('musicamenu');
            if (musica) musica.stop();

            // Inicia o jogo passando o personagem escolhido
            this.scene.start('Escritorio', { character: this.personagemEscolhido});
        
        });
    }
}