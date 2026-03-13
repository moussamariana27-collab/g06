class Padaria extends Phaser.Scene {

    constructor() {
        super({ key: 'Padaria' });
    }

    // AQUI CARREGAMOS AS IMAGENS DA PAGINA
    preload() {

        this.load.image('bgPadaria', 'assets/padaria_interior.png');
        this.load.spritesheet('padeiro', 'assets/padeiroDeVerdade.png', {
            frameWidth: 459,
            frameHeight: 768
        });
        this.load.image('player', 'assets/gn-negra-comercio.png');

    }

    // AQUI CRIAMOS OS ELEMENTOS PRINCIPAIS DO JOGO
    create() {

        const bg = this.add.image(0, 0, 'bgPadaria')
            .setOrigin(0, 0)
            .setDepth(0);

        bg.setDisplaySize(this.scale.width, this.scale.height);

        this.add.text(
            this.scale.width / 2,
            this.scale.height - 40,
            'Pressione ESPAÇO para voltar',
            {
                fontSize: '16px',
                fill: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 10, y: 6 }
            }
        ).setOrigin(0.5).setVisible(false);

        // PADEIRO
        this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'padeiro'
        )
            .setDepth(2)
            .setScale(0.55)
            .setFlip(true, false);

        // JOGADOR
        this.add.image(
            (this.scale.width * 1 / 3) - 100,
            this.scale.height - 270,
            'player'
        )
            .setDepth(1)
            .setScale(0.9);

        this.input.keyboard.once('keydown-SPACE', () => this.scene.start('Cidade'));
        this.input.keyboard.once('keydown-ENTER', () => this.scene.start('Cidade'));

        this.satisfacao = 34;

        this.questoes = [

            {
                pergunta: "SEU JOÃO:\nOlha, eu já tive maquininhas antes, mas\ndemorava séculos pro dinheiro cair na\nminha conta. Eu quero saber quando que\no dinheiro cai na minha conta.",
                certo: "No dia seguinte seu João! O débito cai em D+1.",
                errado: "Demora um pouco seu João, o débito cai em um mês",
                resposta: true
            },

            {
                pergunta: "SEU JOÃO:\nBeleza, mas me responde uma coisa: às\nvezes eu vendo parcelado e o dinheiro\ndemora pra cair. O meu fornecedor de\nfarinha não espera... A Cielo resolve isso?",
                certo: "A Cielo tem a antecipação de recebíveis!\nVocê recebe adiantado pagando uma pequena taxa.",
                errado: "Infelizmente não tem jeito Seu João. Tem\nque esperar as parcelas caírem.",
                resposta: true
            },

            { pergunta: "teste teste teste 3", certo: "cielo", errado: "pix", resposta: true },
            { pergunta: "etset etset etset 4", certo: "resolverei o seu problema, seu Joao!", errado: "senhor,mas!!!...", resposta: true },
            { pergunta: "teste teste teste 5", certo: "certoo", errado: "errado", resposta: true }

        ];

        this.questaoAtual = 0;

        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();

    }

    // UI
    createUI() {

        this.lugarQuestao = this.add.text(
            900,
            500,
            "",
            {
                fontSize: "32px",
                color: "#000",
                backgroundColor: "#ffffff",
                padding: 32,
                fontFamily: "Pixelify Sans"
            }
        ).setDepth(3);

        this.opcaoUm = this.add.text(
            100,
            550,
            "",
            {
                backgroundColor: '#ffffff',
                color: "#000",
                padding: 24,
                fontSize: "24px",
                fontFamily: "Pixelify Sans"
            }
        ).setInteractive().setDepth(3);

        this.opcaoDois = this.add.text(
            100,
            660,
            "",
            {
                backgroundColor: '#ffffff',
                color: "#000",
                padding: 24,
                fontSize: "24px",
                fontFamily: "Pixelify Sans"
            }
        ).setInteractive().setDepth(3);

        this.opcaoUm.on("pointerdown", () => {
            this.resposta(this.opcaoUm.valor);
        });

        this.opcaoDois.on("pointerdown", () => {
            this.resposta(this.opcaoDois.valor);
        });

        this.barra = this.add.graphics();

    }

    mostrarQuestao() {

        let perguntaAtual = this.questoes[this.questaoAtual];

        this.lugarQuestao.setText(perguntaAtual.pergunta);

        let trocarLugar = Math.random() < 0.5;

        if (trocarLugar) {

            this.opcaoUm.setText(perguntaAtual.certo);
            this.opcaoDois.setText(perguntaAtual.errado);

            this.opcaoUm.valor = true;
            this.opcaoDois.valor = false;

        } else {

            this.opcaoDois.setText(perguntaAtual.certo);
            this.opcaoUm.setText(perguntaAtual.errado);

            this.opcaoUm.valor = false;
            this.opcaoDois.valor = true;

        }

    }

    resposta(decisaoJogador) {

        let perguntaAtual = this.questoes[this.questaoAtual];

        if (decisaoJogador === perguntaAtual.resposta) {
            this.satisfacao += 33;
        } else {
            this.satisfacao -= 33;
        }

        this.barraSatisfacao();

        if (this.satisfacao === 100) {
            this.vitoria();
        }

        if (this.satisfacao < 0) {
            this.derrota();
            return;
        }

        this.proximaPergunta();

    }

    proximaPergunta() {

        this.questaoAtual += 1;

        if (this.questaoAtual >= this.questoes.length) {
            this.fimDasPerguntas();
            return;
        }

        this.mostrarQuestao();

    }

    barraSatisfacao() {

        this.barra.clear();

        this.barra.fillStyle(0x000000);
        this.barra.fillRect(300, 50, 1000, 20);

        this.barra.fillStyle(0x00ff00);
        this.barra.fillRect(300, 50, this.satisfacao * 10, 20);

    }

    vitoria() {

        this.add.text(
            (this.scale.width / 2) - 600,
            (this.scale.height / 2) - 200,
            "VOCÊ CONVENCEU O CLIENTE",
            {
                color: '#000',
                backgroundColor: '#ffffff',
                fontSize: 64,
                padding: 128
            }
        ).setDepth(4);

        this.barra.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);

        this.time.delayedCall(4000, () => {
            this.scene.start('Cidade');
        });

    }

    derrota() {

        this.add.text(
            (this.scale.width / 2) - 870,
            (this.scale.height / 2) - 200,
            "VOCÊ NÃO FOI CAPAZ DE CONSQUISTAR O CLIENTE",
            {
                color: '#000',
                backgroundColor: '#ffffff',
                fontSize: 58,
                padding: 120
            }
        ).setDepth(4);

        this.barra.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);

        this.time.delayedCall(4000, () => {
            this.scene.start('MainScene');
        });

    }

    fimDasPerguntas() {

        this.add.text(
            (this.scale.width / 2) - 600,
            (this.scale.height / 2) - 200,
            "O CLIENTE TE MANDOU EMBORA",
            {
                color: '#000',
                backgroundColor: '#ffffff',
                fontSize: 64,
                padding: 128
            }
        ).setDepth(4);

        this.barra.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);

        this.time.delayedCall(4000, () => {
            this.scene.start('MainScene');
        });

    }

}