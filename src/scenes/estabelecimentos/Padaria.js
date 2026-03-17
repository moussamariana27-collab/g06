// CENA DA PADARIA - Minigame de vendas

// Aqui acontece toda a lógica do jogo dentro da padaria.
// O jogador precisa responder perguntas do Seu João e
// encher a barra de satisfação pra fechar a venda.
var padeiro

class Padaria extends Phaser.Scene {

    constructor() {
        // Registra a cena com o nome 'Padaria' pro Phaser identificar
        super({ key: 'Padaria' });
    }

    // Recebe o personagem escolhido da cena anterior
    init(data) {
        this.characterEscolhido = data?.character || null;
    }

    // PRELOAD — roda antes de tudo
    // Carrega os assets que a cena vai usar.
    // Se qualquer um desses falhar, a cena quebra.

    preload() {

        // Fundo da padaria (imagem estática)
        this.load.image('bgPadaria', 'assets/padaria_interior.png');

        // Spritesheet do padeiro — cada frame tem 459x768px
        // (importante medir certo, senão o sprite fica cortado ou duplicado)
        this.load.spritesheet('padeiro', 'assets/padeiroDeVerdade.png', {
            frameWidth: 459,
            frameHeight: 768
        });

        // Imagem do jogador (personagem do vendedor)
        this.load.image('player', 'assets/gn-negra-comercio.png');

    }

    // CREATE — roda uma vez quando a cena inicia
    // Aqui montamos o cenário, os personagens e
    // iniciamos o fluxo do minigame.

    create() {

        // Coloca o fundo e estica pra ocupar a tela toda
        const bg = this.add.image(0, 0, 'bgPadaria')
            .setOrigin(0, 0)   // ancora no canto superior esquerdo
            .setDepth(0);      // camada mais baixa (fica atrás de tudo)

        bg.setDisplaySize(this.scale.width, this.scale.height);

        // Texto de instrução no rodapé — tá invisível por enquanto
        // (foi deixado aqui provavelmente pra usar depois ou tá em teste)
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

        // Posiciona o padeiro no lado direito da tela
        // O setFlip(true, false) espelha ele horizontalmente
        // pra ele ficar de frente pro jogador
        padeiro = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'padeiro'
        )
            .setDepth(2)          // na frente do fundo
            .setScale(0.55)       // reduz o tamanho (o sprite original é bem grande)
            .setFlip(true, false);

        this.anims.create({
            key: "bravo",
            frames: this.anims.generateFrameNumbers('padeiro', {start:0, end:0}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "estavel",
            frames: this.anims.generateFrameNumbers('padeiro', {start:1, end:1}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "feliz",
            frames: this.anims.generateFrameNumbers('padeiro', {start:2, end:2}),
            frameRate: 1,
            repeat: -1
        });

        // Posiciona o jogador no lado esquerdo
        this.add.image(
            (this.scale.width * 1 / 3) - 100,
            this.scale.height - 270,
            'player'
        )
            .setDepth(1)
            .setScale(0.9);

        // Atalhos de teclado pra voltar pra cidade (ESPAÇO ou ENTER)
        // O .once() garante que só dispara uma vez, evitando bug de múltiplos fires
        this.input.keyboard.once('keydown-SPACE', () => this.scene.start('Cidade', { character: this.characterEscolhido }));
        this.input.keyboard.once('keydown-ENTER', () => this.scene.start('Cidade', { character: this.characterEscolhido }));

        // Satisfação começa em 34 — já dá uma largada pra não começar zerado
        // Com 3 acertos consecutivos (33 cada) chega em 100 e vence
        this.satisfacao = 34;

        // Banco de perguntas do minigame
        // Cada objeto tem: a pergunta, a resposta certa, a errada,
        // e qual das duas é a correta (resposta: true = a "certo" é a certa)
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

            // TODO: essas três abaixo ainda são placeholder — precisam de conteúdo real
            { pergunta: "teste teste teste 3", certo: "cielo", errado: "pix", resposta: true },
            { pergunta: "etset etset etset 4", certo: "resolverei o seu problema, seu Joao!", errado: "senhor,mas!!!...", resposta: true },
            { pergunta: "teste teste teste 5", certo: "certoo", errado: "errado", resposta: true }

        ];

        // Começa pela primeira pergunta (índice 0)
        this.questaoAtual = 0;

        // Inicializa a interface, exibe a primeira pergunta e desenha a barra
        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();
        this.facePadeiro();

    }

 
    // createUI — monta os elementos de interface
    // Cria os textos clicáveis e o objeto da barra.
    // As posições são fixas — se a resolução mudar muito, pode desalinhar.

    createUI() {

        // Caixa de texto onde a pergunta do Seu João aparece
        this.lugarQuestao = this.add.text(
            900,
            500,
            "",   // começa vazio, é preenchido em mostrarQuestao()
            {
                fontSize: "32px",
                color: "#000",
                backgroundColor: "#ffffff",
                padding: 32,
                fontFamily: "Pixelify Sans"
            }
        ).setDepth(3);

        // Opção A — fica no canto esquerdo inferior
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
        ).setInteractive().setDepth(3); // setInteractive() é obrigatório pra receber cliques

        // Opção B — logo abaixo da opção A
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

        // Quando clicar em qualquer opção, passa o valor dela pra função resposta()
        // O .valor é uma propriedade customizada que a gente seta em mostrarQuestao()
        this.opcaoUm.on("pointerdown", () => {
            this.resposta(this.opcaoUm.valor);
        });

        this.opcaoDois.on("pointerdown", () => {
            this.resposta(this.opcaoDois.valor);
        });

        // Objeto de gráficos pra desenhar a barra de satisfação
        // É reutilizado — a cada update chama .clear() antes de redesenhar
        this.barra = this.add.graphics();

    }


    // mostrarQuestao — atualiza a tela com a pergunta atual
    // Sorteia qual opção aparece em cima e qual aparece embaixo
    // pra evitar que o jogador decore a posição da resposta certa

    mostrarQuestao() {

        let perguntaAtual = this.questoes[this.questaoAtual];

        this.lugarQuestao.setText(perguntaAtual.pergunta);

        // 50% de chance de trocar as opções de lugar
        let trocarLugar = Math.random() < 0.5;

        if (trocarLugar) {
            // Certo em cima, errado embaixo
            this.opcaoUm.setText(perguntaAtual.certo);
            this.opcaoDois.setText(perguntaAtual.errado);

            this.opcaoUm.valor = true;   // true = essa é a resposta certa
            this.opcaoDois.valor = false;

        } else {
            // Errado em cima, certo embaixo
            this.opcaoDois.setText(perguntaAtual.certo);
            this.opcaoUm.setText(perguntaAtual.errado);

            this.opcaoUm.valor = false;
            this.opcaoDois.valor = true;

        }

    }


    // resposta — processa o clique do jogador
    // Compara a decisão com a resposta esperada,
    // ajusta a satisfação e decide o que acontece em seguida

    resposta(decisaoJogador) {

        let perguntaAtual = this.questoes[this.questaoAtual];

        // Acertou: +33 de satisfação / Errou: -33
        if (decisaoJogador === perguntaAtual.resposta) {
            this.satisfacao += 33;
        } else {
            this.satisfacao -= 33;
        }

        // Redesenha a barra com o novo valor
        this.barraSatisfacao();

        // Bateu 100? Vitória imediata, nem precisa terminar as perguntas
        if (this.satisfacao >= 100) {
            this.vitoria();
            return;
        }

        // Ficou negativo? Derrota e volta pro início
        if (this.satisfacao < 0) {
            this.derrota();
            return; // para aqui pra não chamar proximaPergunta() junto
        }

        this.proximaPergunta();

    }


    // proximaPergunta — avança o índice e checa se acabou

    proximaPergunta() {

        this.questaoAtual += 1;

        // Se já passou da última pergunta, o cliente manda embora
        if (this.questaoAtual >= this.questoes.length) {
            this.fimDasPerguntas();
            return;
        }

        this.mostrarQuestao();
        this.facePadeiro();
    }


    // barraSatisfacao — redesenha a barra do zero
    // Usa Graphics do Phaser, que é basicamente um canvas manual.
    // O .clear() apaga o que tava antes pra não acumular camadas.

    barraSatisfacao() {

        this.barra.clear();

        // Trilho cinza/preto da barra (fundo, tamanho fixo de 1000px)
        this.barra.fillStyle(0x000000);
        this.barra.fillRect(300, 50, 1000, 20);

        // Preenchimento verde que cresce conforme a satisfação sobe
        // satisfacao * 10 porque a barra tem 1000px e satisfacao vai de 0 a 100
        this.barra.fillStyle(0x00ff00);
        this.barra.fillRect(300, 50, this.satisfacao * 10, 20);

    }

    facePadeiro() {
        if (this.satisfacao === 34) {
            padeiro.play('estavel', true);
            return;
        }
        if (this.satisfacao === 1) {
            padeiro.play('bravo', true)
            return;
        } 
        if (this.satisfacao === 67) {
            padeiro.play('feliz', true)
            return;
        } 
        if (this.satisfacao<0 || this.satisfacao === 100){
            padeiro.play('estavel',true)
            return;
        }
    }

    // vitoria — exibe mensagem de sucesso e vai pra Cidade
    // Esconde a UI do minigame pra não ficar sobrepondo o texto

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

        // Esconde tudo da UI pra tela ficar limpa
        this.barra.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);

        // Aguarda 4 segundos e manda pro mapa da cidade
        this.time.delayedCall(4000, () => {
            this.scene.start('Cidade', { character: this.characterEscolhido });
        });

    }

    // derrota — exibe mensagem de falha e volta pro menu principal

    derrota() {

        this.add.text(
            (this.scale.width / 2) - 870,
            (this.scale.height / 2) - 200,
            "VOCÊ NÃO FOI CAPAZ DE CONQUISTAR O CLIENTE",
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

        // Volta pro MainScene (tela inicial/menu) após 4s
        this.time.delayedCall(4000, () => {
            this.scene.start('MainScene');
        });

    }


    // fimDasPerguntas — acontece quando o jogador respondeu tudo
    // mas a satisfação não chegou em 100 nem foi a zero
    // Ou seja: não convenceu o suficiente, o cliente dispensa

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

        // Também volta pro menu principal após 4s
        this.time.delayedCall(4000, () => {
            this.scene.start('MainScene');
        });

    }

}