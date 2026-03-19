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

        // Imagens dos personagens jogaveis
        const sprites = {
            'JOSÉ':  { file: 'assets/joseCorpo.png'},
            'MARIA': { file: 'assets/mariaCorpo.png'},
            'JOÃO':  { file: 'assets/joaoCorpo.png' },
            'PAULA': { file: 'assets/paulaCorpo.png'}
        };
        // Dados do personagem atual
        const dadosSprite = sprites[this.characterEscolhido];
        // Verifica se o personagem é válido antes de carregar
        if (!dadosSprite) { console.error('Personagem inválido:', this.characterEscolhido); return; }
        // Carrega a spritesheet do personagem escolhido
        this.load.image('personagemPadaria', dadosSprite.file );

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
            key: "bravoPadeiro",
            frames: this.anims.generateFrameNumbers('padeiro', {start:0, end:0}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "estavelPadeiro",
            frames: this.anims.generateFrameNumbers('padeiro', {start:1, end:1}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "felizPadeiro",
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
                pergunta:"SEU TIÃO:O problema é que oque eu também vendo no fim de semana, até no domingo. Tem hora que eu preciso do dinheiro rápido numa emergência. E aí eu preciso vender no dinheiro, não tem jeito!",
                certo: "Tem jeito sim SR. João! A CIELO tem um serviço chamado'Vendeu, Tá na Conta', com ele todas as vendas que o senhor fez até 18:59 o valor cai na sua conta no mesmo dia, inclusive nos finais de semana e feriados! O dinheiro cai na conta em poucas horas.",
                errado: "Infelizmente nós não trabalhalhamos fim de semana, Seu João. Se o senhor quiser o dinheiro no mesmo dia vai ter que vender no físico.",
                resposta: true
            },

            {
                pergunta: "SEU TOÃO:Outra coisa, eu já fico perdido com os documentos de venda e nota fiscal, trocar de empresa daria muita dor de cabeça. Como eu vou controlar meu estoque de pão e fechar o caixa sem me enrolar?",
                certo: "Mas nós também pensamos nisso! A Cielo Smart controle de estoque digital e o senhor fecha o caixa com um clique, tudo direto na máquina, sem papelada.",
                errado: "Mas seu João a documentação é pouca eu te ajudo a resolver! Te garanto que o investimento vale a pena!",
                resposta: true
            },

            { 
                pergunta: "SEU TIÃO:Essas maquininhas novas são de tela, meus dedos são grossos e calejados da padaria, eu tenho dificuldade de mexer nisso. Não tem um jeito mais fácil não?",
                certo: "Pode ficar tranquilo, Seu João! Nossas máquinas têm teclado físico e/ou película de silicone para facilitar o toque, então o senhor não precisa usar só a tela.", 
                errado: "É questão de costume, Seu João. Hoje em dia tudo é touch, o senhor vai ter que se adaptar de um jeito ou de outro.", 
                resposta: true 
            },
            
            {
                 pergunta: "SEU TIÃO:Olha, eu já tive maquininhas antes, mas\ndemorava séculos pro dinheiro cair na\nminha conta. Eu quero saber quando que\no dinheiro cai na minha conta.", 
                 certo: "No dia seguinte seu João! O débito cai em D+1.",
                 errado: "Demora um pouco seu João, o débito cai em um mês", 
                 resposta: true 
            },
            
            { 
                pergunta: "SEU TIÃO:Beleza, mas me responde uma coisa: às\nvezes eu vendo parcelado e o dinheiro\ndemora pra cair. O meu fornecedor de\nfarinha não espera... A Cielo resolve isso?", 
                certo:  "A Cielo tem a antecipação de recebíveis!\nVocê recebe adiantado pagando uma pequena taxa.",
                errado: "Infelizmente não tem jeito Seu João. Tem\nque esperar as parcelas caírem.",
                resposta: true 
            }

        ];

        // Começa pela primeira pergunta (índice 0)
        this.questaoAtual = 0;

        // Inicializa a interface, exibe a primeira pergunta, desenha a barra e cria o personagem
        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();
        this.facePadeiro();
        this.createPersonagem()
    }

 
    // createUI — monta os elementos de interface
    // Cria os textos clicáveis e o objeto da barra.
    // As posições são fixas — se a resolução mudar muito, pode desalinhar.

    createUI() {

    this.graficosUI = [];

    // ─── CAIXA DE PERGUNTA ────────────────────────────────────────
    const perguntaX = 900;
    const perguntaY = 600;
    const perguntaW = 500;
    const perguntaH = 200;

    // Borda preta externa
    this.graficosUI.push(
        this.add.graphics().setDepth(2)
            .fillStyle(0x111111, 1)
            .fillRoundedRect(perguntaX, perguntaY, perguntaW, perguntaH, 16)
    );
    // Moldura azul claro
    this.graficosUI.push(
        this.add.graphics().setDepth(3)
            .fillStyle(0xb8d4f0, 1)
            .fillRoundedRect(perguntaX + 6, perguntaY + 6, perguntaW - 12, perguntaH - 12, 12)
    );
    // Aro azul mais claro
    this.graficosUI.push(
        this.add.graphics().setDepth(4)
            .fillStyle(0xddeeff, 1)
            .fillRoundedRect(perguntaX + 10, perguntaY + 10, perguntaW - 20, perguntaH - 20, 8)
    );
    // Fundo escuro (área do texto)
    this.graficosUI.push(
        this.add.graphics().setDepth(5)
            .fillStyle(0xf5f9ff, 1)
            .fillRoundedRect(perguntaX + 14, perguntaY + 14, perguntaW - 28, perguntaH - 28, 6)
    );

    this.lugarQuestao = this.add.text(
        perguntaX + 22,
        perguntaY + 24,
        "",
        {
            fontSize: "26px",
            color: "#000000",
            wordWrap: { width: perguntaW - 48 },
            fontFamily: "Pixelify Sans"
        }
    ).setDepth(6);

    // ─── OPÇÃO A ──────────────────────────────────────────────────
    const opcA_X = 110;
    const opcA_Y = 580;
    const opcA_W = 620;
    const opcA_H = 110;

    this.graficosUI.push(
        this.add.graphics().setDepth(2)
            .fillStyle(0x111111, 1)
            .fillRoundedRect(opcA_X, opcA_Y, opcA_W, opcA_H, 12)
    );
    this.graficosUI.push(
        this.add.graphics().setDepth(3)
            .fillStyle(0xb8d4f0, 1)
            .fillRoundedRect(opcA_X + 4, opcA_Y + 4, opcA_W - 8, opcA_H - 8, 9)
    );
    this.graficosUI.push(
        this.add.graphics().setDepth(4)
            .fillStyle(0xddeeff, 1)
            .fillRoundedRect(opcA_X + 8, opcA_Y + 8, opcA_W - 16, opcA_H - 16, 6)
    );
    this.graficosUI.push(
        this.add.graphics().setDepth(5)
            .fillStyle(0xf5f9ff, 1)
            .fillRoundedRect(opcA_X + 12, opcA_Y + 12, opcA_W - 24, opcA_H - 24, 4)
    );

    this.opcaoUm = this.add.text(
        opcA_X + 18,
        opcA_Y + 18,
        "",
        {
            color: "#1a1a2e",
            fontSize: "20px",
            wordWrap: { width: opcA_W - 36 },
            fontFamily: "Pixelify Sans"
        }
    ).setInteractive().setDepth(6);

    // ─── OPÇÃO B ──────────────────────────────────────────────────
    const opcB_X = 110;
    const opcB_Y = 720;
    const opcB_W = 620;
    const opcB_H = 110;

    this.graficosUI.push(
        this.add.graphics().setDepth(2)
            .fillStyle(0x111111, 1)
            .fillRoundedRect(opcB_X, opcB_Y, opcB_W, opcB_H, 12)
    );
    this.graficosUI.push(
        this.add.graphics().setDepth(3)
            .fillStyle(0xb8d4f0, 1)
            .fillRoundedRect(opcB_X + 4, opcB_Y + 4, opcB_W - 8, opcB_H - 8, 9)
    );
    this.graficosUI.push(
        this.add.graphics().setDepth(4)
            .fillStyle(0xddeeff, 1)
            .fillRoundedRect(opcB_X + 8, opcB_Y + 8, opcB_W - 16, opcB_H - 16, 6)
    );
    this.graficosUI.push(
        this.add.graphics().setDepth(5)
            .fillStyle(0xf5f9ff, 1)
            .fillRoundedRect(opcB_X + 12, opcB_Y + 12, opcB_W - 24, opcB_H - 24, 4)
    );

    this.opcaoDois = this.add.text(
        opcB_X + 18,
        opcB_Y + 18,
        "",
        {
            color: "#1a1a2e",
            fontSize: "20px",
            wordWrap: { width: opcB_W - 36 },
            fontFamily: "Pixelify Sans"
        }
    ).setInteractive().setDepth(6);

    this.opcaoUm.on("pointerdown",  () => this.resposta(this.opcaoUm.valor));
    this.opcaoDois.on("pointerdown", () => this.resposta(this.opcaoDois.valor));

    this.barra = this.add.graphics();
}

    createPersonagem() {

        let escala = 1;
        let posicaoX = (this.scale.width * 1 / 3) - 100;
        let posicaoY = this.scale.height - 270;

        if (this.characterEscolhido === 'JOSÉ' || this.characterEscolhido === 'JOÃO') {
                escala = 0.5;
                posicaoX = (this.scale.width * 1 / 3) - 80;
                posicaoY = this.scale.height - 330;
        } else {escala = 1;
                posicaoX = (this.scale.width * 1 / 3) - 100;
                posicaoY = this.scale.height - 270;
        }


        this.personagem = this.physics.add.sprite(posicaoX, posicaoY, 'personagemPadaria', 0).setDepth(1).setScale(escala);
    };


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
            padeiro.play('estavelPadeiro', true);
            return;
        }
        if (this.satisfacao === 1) {
            padeiro.play('bravoPadeiro', true)
            return;
        } 
        if (this.satisfacao === 67) {
            padeiro.play('felizPadeiro', true)
            return;
        } 
        if (this.satisfacao<0 || this.satisfacao === 100){
            padeiro.play('estavelPadeiro',true)
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