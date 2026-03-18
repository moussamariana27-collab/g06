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
                pergunta: "Olha, eu já tive maquininhas antes, mas\ndemorava séculos pro dinheiro cair na\nminha conta. Eu quero saber quando que\no dinheiro cai na minha conta.",
                certo: "No dia seguinte seu João! O débito cai em D+1.",
                errado: "Demora um pouco seu João, o débito cai em um mês",
                resposta: true
            },

            {
                pergunta: "Beleza, mas me responde uma coisa: às\nvezes eu vendo parcelado e o dinheiro\ndemora pra cair. O meu fornecedor de\nfarinha não espera... A Cielo resolve isso?",
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

        // Array para armazenar todos os graphics da UI — usado pra ocultá-los em vitoria/derrota
        this.graficosUI = [];

        // ---------------------------------------------------------
        // CAIXA DE PERGUNTA — design em 3 camadas (estilo Tutorial.js)
        // ---------------------------------------------------------
        const perguntaX = 550;
        const perguntaY = 420;
        const perguntaW = 700;
        const perguntaH = 180;

        // Camada 1: borda azul escura
        this.graficosUI.push(this.add.graphics().setDepth(2).fillStyle(0x5078D8, 1).fillRoundedRect(perguntaX, perguntaY, perguntaW, perguntaH, 20));
        // Camada 2: borda azul clara (inset de 8px)
        this.graficosUI.push(this.add.graphics().setDepth(3).fillStyle(0xA0C8F0, 1).fillRoundedRect(perguntaX + 8, perguntaY + 8, perguntaW - 16, perguntaH - 16, 16));
        // Camada 3: fundo claro (inset de 16px) — área do texto
        this.graficosUI.push(this.add.graphics().setDepth(4).fillStyle(0xE8F0FF, 1).fillRoundedRect(perguntaX + 16, perguntaY + 16, perguntaW - 32, perguntaH - 32, 12));

        // Texto da pergunta do Seu João
        this.lugarQuestao = this.add.text(
            perguntaX + 24,
            perguntaY + 24,
            "",   // começa vazio, é preenchido em mostrarQuestao()
            {
                fontSize: "28px",
                color: "#000000",
                wordWrap: { width: perguntaW - 56 },
                fontFamily: "Pixelify Sans"
            }
        ).setDepth(5);

        // ---------------------------------------------------------
        // OPÇÃO A — canto esquerdo inferior (design em 3 camadas)
        // ---------------------------------------------------------
        const opcA_X = 50;
        const opcA_Y = 600;
        const opcA_W = 420;
        const opcA_H = 90;

        // Camada 1: borda azul escura
        this.graficosUI.push(this.add.graphics().setDepth(2).fillStyle(0x5078D8, 1).fillRoundedRect(opcA_X, opcA_Y, opcA_W, opcA_H, 15));
        // Camada 2: borda azul clara (inset de 6px)
        this.graficosUI.push(this.add.graphics().setDepth(3).fillStyle(0xA0C8F0, 1).fillRoundedRect(opcA_X + 6, opcA_Y + 6, opcA_W - 12, opcA_H - 12, 12));
        // Camada 3: fundo claro (inset de 12px)
        this.graficosUI.push(this.add.graphics().setDepth(4).fillStyle(0xE8F0FF, 1).fillRoundedRect(opcA_X + 12, opcA_Y + 12, opcA_W - 24, opcA_H - 24, 9));

        // Opção A — fica no canto esquerdo inferior
        this.opcaoUm = this.add.text(
            opcA_X + 18,
            opcA_Y + 18,
            "",
            {
                color: "#000000",
                fontSize: "22px",
                wordWrap: { width: opcA_W - 36 },
                fontFamily: "Pixelify Sans"
            }
        ).setInteractive().setDepth(5); // setInteractive() é obrigatório pra receber cliques

        // ---------------------------------------------------------
        // OPÇÃO B — logo abaixo da opção A (design em 3 camadas)
        // ---------------------------------------------------------
        const opcB_X = 50;
        const opcB_Y = 720;
        const opcB_W = 420;
        const opcB_H = 90;

        // Camada 1: borda azul escura
        this.graficosUI.push(this.add.graphics().setDepth(2).fillStyle(0x5078D8, 1).fillRoundedRect(opcB_X, opcB_Y, opcB_W, opcB_H, 15));
        // Camada 2: borda azul clara (inset de 6px)
        this.graficosUI.push(this.add.graphics().setDepth(3).fillStyle(0xA0C8F0, 1).fillRoundedRect(opcB_X + 6, opcB_Y + 6, opcB_W - 12, opcB_H - 12, 12));
        // Camada 3: fundo claro (inset de 12px)
        this.graficosUI.push(this.add.graphics().setDepth(4).fillStyle(0xE8F0FF, 1).fillRoundedRect(opcB_X + 12, opcB_Y + 12, opcB_W - 24, opcB_H - 24, 9));

        // Opção B — logo abaixo da opção A
        this.opcaoDois = this.add.text(
            opcB_X + 18,
            opcB_Y + 18,
            "",
            {
                color: "#000000",
                fontSize: "22px",
                wordWrap: { width: opcB_W - 36 },
                fontFamily: "Pixelify Sans"
            }
        ).setInteractive().setDepth(5);

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

        const textoX = (this.scale.width / 2) - 600;
        const textoY = (this.scale.height / 2) - 200;
        const textoW = 1200;
        const textoH = 300;

        // Camada 1: borda azul escura
        this.add.graphics().setDepth(3).fillStyle(0x5078D8, 1).fillRoundedRect(textoX, textoY, textoW, textoH, 20);
        // Camada 2: borda azul clara (inset de 8px)
        this.add.graphics().setDepth(3).fillStyle(0xA0C8F0, 1).fillRoundedRect(textoX + 8, textoY + 8, textoW - 16, textoH - 16, 16);
        // Camada 3: fundo claro (inset de 16px)
        this.add.graphics().setDepth(3).fillStyle(0xE8F0FF, 1).fillRoundedRect(textoX + 16, textoY + 16, textoW - 32, textoH - 32, 12);

        this.add.text(
            textoX + textoW / 2,
            textoY + textoH / 2,
            "VOCÊ CONVENCEU O CLIENTE",
            {
                color: '#000000',
                fontSize: 64,
                fontFamily: "Pixelify Sans"             
            }
        ).setDepth(4).setOrigin(0.5);

        // Esconde tudo da UI pra tela ficar limpa
        this.barra.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);
        this.graficosUI.forEach(g => g.setVisible(false));

        // Aguarda 4 segundos e manda pro mapa da cidade
        this.time.delayedCall(4000, () => {
            this.scene.start('Cidade', { character: this.characterEscolhido });
        });

    }

    // derrota — exibe mensagem de falha e volta pro menu principal

    derrota() {

        const textoX = (this.scale.width / 2) - 650;
        const textoY = (this.scale.height / 2) - 200;
        const textoW = 1300;
        const textoH = 300;

        // Camada 1: borda azul escura
        this.add.graphics().setDepth(3).fillStyle(0x5078D8, 1).fillRoundedRect(textoX, textoY, textoW, textoH, 20);
        // Camada 2: borda azul clara (inset de 8px)
        this.add.graphics().setDepth(3).fillStyle(0xA0C8F0, 1).fillRoundedRect(textoX + 8, textoY + 8, textoW - 16, textoH - 16, 16);
        // Camada 3: fundo claro (inset de 16px)
        this.add.graphics().setDepth(3).fillStyle(0xE8F0FF, 1).fillRoundedRect(textoX + 16, textoY + 16, textoW - 32, textoH - 32, 12);

        this.add.text(
            textoX + textoW / 2,
            textoY + textoH / 2,
            "VOCÊ NÃO FOI CAPAZ DE CONQUISTAR O CLIENTE",
            {
                color: '#000000',
                fontSize: 58,
                wordWrap: { width: textoW - 64 },
                fontFamily: "Pixelify Sans"
            }
        ).setDepth(4).setOrigin(0.5);

        this.barra.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);
        this.graficosUI.forEach(g => g.setVisible(false));

        // Volta pro MainScene (tela inicial/menu) após 4s
        this.time.delayedCall(4000, () => {
            this.scene.start('MainScene');
        });

    }


    // fimDasPerguntas — acontece quando o jogador respondeu tudo
    // mas a satisfação não chegou em 100 nem foi a zero
    // Ou seja: não convenceu o suficiente, o cliente dispensa

    fimDasPerguntas() {

        const textoX = (this.scale.width / 2) - 600;
        const textoY = (this.scale.height / 2) - 200;
        const textoW = 1200;
        const textoH = 300;

        // Camada 1: borda azul escura
        this.add.graphics().setDepth(3).fillStyle(0x5078D8, 1).fillRoundedRect(textoX, textoY, textoW, textoH, 20);
        // Camada 2: borda azul clara (inset de 8px)
        this.add.graphics().setDepth(3).fillStyle(0xA0C8F0, 1).fillRoundedRect(textoX + 8, textoY + 8, textoW - 16, textoH - 16, 16);
        // Camada 3: fundo claro (inset de 16px)
        this.add.graphics().setDepth(3).fillStyle(0xE8F0FF, 1).fillRoundedRect(textoX + 16, textoY + 16, textoW - 32, textoH - 32, 12);

        this.add.text(
            textoX + textoW / 2,
            textoY + textoH / 2,
            "O CLIENTE TE MANDOU EMBORA",
            {
                color: '#000000',
                fontSize: 64,
                fontFamily: "Pixelify Sans"
            }
        ).setDepth(4).setOrigin(0.5);

        this.barra.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);
        this.graficosUI.forEach(g => g.setVisible(false));

        // Também volta pro menu principal após 4s
        this.time.delayedCall(4000, () => {
            this.scene.start('MainScene');
        });

    }

}