class Padaria extends Phaser.Scene {
    constructor() {
        super({ key: 'Padaria' });
    }

    // AQUI CARREGAMOS AS IMAGENS DA PAGINA

    preload() {
        this.load.image('bgPadaria', 'assets/padaria_interior.png'); // IMAGEM DO FUNDO
        this.load.spritesheet('padeiro', 'assets/padeiroDeVerdade.png', { frameWidth: 459, frameHeight: 768 });   // IMAGEM DO PADEIRO
        this.load.image('player', 'assets/gn-negra-comercio.png');

    }

    // AQUI CRIAMOS OS ELEMENTOS PRINCIPAIS DO JOGO

    create() {

        // CRIAMOS A IMAGEM DE FUNDO

        const bg = this.add.image(0, 0, 'bgPadaria').setOrigin(0, 0).setDepth(0);
        bg.setDisplaySize(this.scale.width, this.scale.height);                            

        this.add.text(this.scale.width / 2, this.scale.height - 40, 'Pressione ESPAÇO para voltar', {   
            fontSize: '16px', fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 6 }
        }).setOrigin(0.5).setVisible(false);

        // CRIAMOS O PADEIRO

        this.add.sprite((this.scale.width * 2/3) + 40, this.scale.height - 400, 'padeiro').setDepth(2).setScale(0.55).setFlip(true, false)   
        
        // CRIAMOS O JOGADOR

        this.add.image((this.scale.width * 1/3) - 100, this.scale.height - 270, 'player').setDepth(1).setScale(0.9)

        this.input.keyboard.once('keydown-SPACE', () => this.scene.start('Cidade'));
        this.input.keyboard.once('keydown-ENTER', () => this.scene.start('Cidade'));

        this.satisfacao = 34;       // AQUI DEFINIMOS ONDE A BARRA DE SATISFACAO COMECA

        this.questoes = [           // AQUI DEFINIMOS AS PERGUNTAS E RESPOSTAS CORRETAS E INCORRETAS
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
            {
                pergunta: "teste teste teste 3",
                certo: "cielo",
                errado: "pix",
                resposta: true
            },
            {
                pergunta: "etset etset etset 4",
                certo: "receba",
                errado: "bora bil",
                resposta: true
            },
            {
                pergunta: "teste teste teste 5",
                certo: "nao",
                errado: "nao 2",
                resposta: true
            },
        ];

        this.questaoAtual = 0;      // AQUI DEFINIMOS UMA VÁRIAVEL questaoAtual DO TIPO FLOAT = 0
        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();
    }

    // AQUI CRIAMOS OS PRINCIPAIS ELEMENTOS DA INTERFACE DO USUÁRIO ( POSIÇÕES DAS QUESTÕES; POSIÇÕES DAS RESPOSTAS E SEUS VALORES; BARRA DE CONVENCIMENTO)

    createUI() {

        this.lugarQuestao = this.add.text(900,500,"", {     // DEFINIMOS ONDE FICAM AS QUESTOES NA TELA (STRING NULL POIS SERA DEFINIDA POSTERIORMENTE)
            fontSize: "32px",
            color: "#000",
            backgroundColor: "#ffffff",
            padding: 32,
            fontFamily: "Pixelify Sans"
        }).setDepth(3);

        this.opcaoUm = this.add.text(100,550,"",{          // DEFINIMOS A PRIMEIRA POSIÇÃO PARA AS RESPOSTAS
            backgroundColor: '#ffffff',
            color: "#000",
            padding: 24,
            fontSize: "24px",
            fontFamily: "Pixelify Sans"
        }).setInteractive().setDepth(3);

        this.opcaoDois = this.add.text(100,660,"",{       // DEFINIMOS A SEGUNDA POSIÇÃO PARA AS RESPOSTAS
            backgroundColor: '#ffffff',
            color: "#000",
            padding: 24,
            fontSize: "24px",
            fontFamily: "Pixelify Sans"
        }).setInteractive().setDepth(3);

        this.opcaoUm.on("pointerdown", () => {              // DEFINIMOS O VALOR DA PROPRIEDADE resposta PARA QUANDO opcaoUm
            this.resposta(this.opcaoUm.valor);
        });

        this.opcaoDois.on("pointerdown", () => {            // DEFINIMOS O VALOR DA PROPRIEDADE resposta PARA QUANDO opcaoDois
            this.resposta(this.opcaoDois.valor);
        });

        this.barra = this.add.graphics();                   // DEFINIMOS A BARRA DE CONVENCIMENTO

    };

    mostrarQuestao() {

        // AQUI É CRIADO UMA VÁRIAVEL peruntaAtual QUE INDICA QUAL É A QUESTÃO EM QUE ESTÁ SENDO TRABALHADA
        // ISSO É FEITO CHAMANDO DENTRO DA ARRAY questoes O ELEMENTO QUE ESTÁ SENDO TRABALHADO, JÁ QUE questaoAtual É O NÚMERO ASSOCIADO À ESSE ELEMENTO

        let perguntaAtual = this.questoes[this.questaoAtual];  

        // AQUI É DEFINIDO DENTRO DO LUGAR EM QUE FICA A QUESTÃO QUAL SERÁ A PERGUNTA

        this.lugarQuestao.setText(perguntaAtual.pergunta);

        // AQUI NÓS DEFINIMOS UMA VÁRIAVEL DO TIPO BOOLEAN, QUE É TRUE QUANDO Math.random É MENOR QUE 0.5, E É FALSE PARA SENDO MAIOR. (A FUNÇÃO Math.random() DEVOLVE APENAS VALORES 0=< x =< 1)

        let trocarLugar = Math.random() < 0.5

        // AQUI UTILIZAMOS UM ARGUMENTO DO TIPO if else COM A CONDIÇÃO trocarLugar PARA TROCAR A POSIÇÃO DAS RESPOSTAS DE FORMA ALEATÓRIA

        if (trocarLugar) {
            this.opcaoUm.setText(perguntaAtual.certo);     // opcaoUm É O add.text DA OPÇÃO CORRETA
            this.opcaoDois.setText(perguntaAtual.errado);  // opcaoDois É O add.text DA OPÇÃO ERRADA

            this.opcaoUm.valor = true;
            this.opcaoDois.valor = false;
        } else {
            this.opcaoDois.setText(perguntaAtual.certo);   // opcaoDois É O add.text DA OPÇÃO CORRETA
            this.opcaoUm.setText(perguntaAtual.errado);    // opcaoUm É O add.text DA OPÇÃO ERRADA

            this.opcaoUm.valor = false;
            this.opcaoDois.valor = true;
        }

    };

    resposta(decisaoJogador) {                            // AQUI DEFINIMOS COMO FUNCIONA O SISTEMA DE RESPOSTA

        let perguntaAtual = this.questoes[this.questaoAtual];

        if (decisaoJogador === perguntaAtual.resposta) {
            this.satisfacao += 33;
        } else {
            this.satisfacao -= 33;
        };

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


    proximaPergunta() {                                     // AQUI CONTINUAMOS AS PERGUNTAS, PARA QUE SE ACABAREM, O JOGADOR PERDE: fimDasPerguntas()
        this.questaoAtual += 1;

        if (this.questaoAtual >= this.questoes.length) {
            this.fimDasPerguntas();
            return;
        }

        this.mostrarQuestao();
    };


    barraSatisfacao() {
                
        this.barra.clear();

        this.barra.fillStyle(0x000000)
        this.barra.fillRect(300,50,1000,20);

        this.barra.fillStyle(0x00ff00);
        this.barra.fillRect(300,50,this.satisfacao*10,20);
    };

    vitoria() {
        this.add.text(this.scale.width/3, this.scale.height/2, "VOCÊ CONVENCEU O CLIENTE", {
            color: '#000',
            backgroundColor: '#ffffff',
            fontSize: 64,
            padding: 128
        });
        this.barra.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);
        this.time.delayedCall(4000, () => {this.scene.start('Cidade')});
    }

    derrota() {
        this.add.text(this.scale.width/3, this.scale.height/2, "VOCÊ NÃO FOI CAPAZ DE CONSQUISTAR O CLIENTE", {
            color: '#000',
            backgroundColor: '#ffffff',
            fontSize: 64,
            padding: 128
        });
        this.barra.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);
        this.time.delayedCall(4000, () => {this.scene.start('MainScene')});
    }

    fimDasPerguntas() {
        this.add.text(this.scale.width/3, this.scale.height/2, "O CLIENTE TE MANDOU EMBORA", {
            color: '#000',
            backgroundColor: '#ffffff',
            fontSize: 64,
            padding: 128
        });
        this.barra.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);
        this.time.delayedCall(4000, () => {this.scene.start('MainScene')}); 
    }
    };





