class Mercado extends Phaser.Scene {

    constructor() {
        // Registra a cena com o nome 'Supermercado' pro Phaser identificar
        super({ key: 'Mercado' });
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
        this.load.image('bgMercado', '/assets/mercado_interior.png');

        // Spritesheet do vendedor — cada frame tem 459x768px
        // (importante medir certo, senão o sprite fica cortado ou duplicado)
        this.load.spritesheet('vendedor', '/assets/Ruan.png', {
            frameWidth: 640,
            frameHeight: 1080
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
        const bg = this.add.image(0, 0, 'bgMercado')
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

        // Posiciona o vendedor no lado direito da tela
        // O setFlip(true, false) espelha ele horizontalmente
        // pra ele ficar de frente pro jogador
        vendedor = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'vendedor'
        )
            .setDepth(2)          // na frente do fundo
            .setScale(0.55)       // reduz o tamanho (o sprite original é bem grande)
            .setFlip(true, false);

        this.anims.create({
            key: "bravoVendedor",
            frames: this.anims.generateFrameNumbers('vendedor', {start:0, end:0}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "estavelVendedor",
            frames: this.anims.generateFrameNumbers('vendedor', {start:1, end:1}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "felizVendedor",
            frames: this.anims.generateFrameNumbers('vendedor', {start:2, end:2}),
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
                pergunta:"SR. RUAN:\n Meu mercado não para um segundo. São milhares de transações mensais e o seu sistema travar no sábado à tarde, a fila vai parar lá na rua! Como garanto que sua máquina aguenta o trabalho?",
                certo: "Sr. Ruan, a Cielo evoluiu para um módulo de pagamento muito mais robusto e rápido. Nossas máquinas têm Wi-Fi dual-band e conexão 4G estável para garantir que a venda seja aprovada instantaneamente, sem filas.",
                errado: "Ela aguenta sim, Sr. Ruan. O senhor só não pode abrir muitos aplicativos, porque aí vai sobrecarregar a memória da maquininha durante o dia.",
                resposta: true
            },

            {
                pergunta: "SR. RUAN:\n Escuta aqui, jovem: eu gastei uma fortuna integrando o software da concorrência com o meu estoque e faturamento. Se eu trocar para a Cielo, vou ter que parar meu sistema por semanas e gastar mais dinheiro implementando o de vocês? Não vale a pena!",
                certo: "Pelo contrário, Sr. Ruan! A Cielo Smart é baseada em Android aberto, o que facilita a migração. Além disso, temos o portal Cielo Desenvolvedores com toda a documentação pronta para que seu TI integre seu sistema atual sem custos extras de licença, mantendo sua operação rodando enquanto viramos a chave.",
                errado: "O senhor pode usar os nossos apps prontos da Cielo Store por um tempo. Eles são gratuitos e, enquanto isso, sua equipe de TI vai trabalhando com calma na integração definitiva em um ou dois meses.",
                resposta: true
            },

            { 
                pergunta: "SR. RUAN:\n Olha, a concorrência me dá uma taxa de MDR quase zero no  débito porque meu volume é gigante. Se eu migrar para a Cielo, vou pagar mais caro. O que vocês me oferecem para compensar essa diferença no meu balanço?",
                certo: "Sr. Ruan, mais do que taxa, oferecemos eficiência operacional. Com a 'Cielo Gestão' e a integração direta no PDV, o senhor reduz erros de digitação e perdas no fechamento de caixa. Sem contar que com o  'Vendeu, tá na conta' que oferta um recebimento acelerado compensa qualquer fração de taxa.", 
                errado: "Nós cobrimos qualquer oferta da concorrência, Sr. Ruan! Se o senhor me mostra o seu extrato atual, eu consigo uma taxa menor hoje mesmo para fecharmos o contrato agora.", 
                resposta: true 
            },
            
            {
                 pergunta: "SR. RUAN:\n E se o sistema Android da sua máquina for hackeado e clonar os cartões dos meus clientes? Eu vou sair como o culpado! Como a Cielo protege meu negócio de um vazamento de dados?", 
                 certo: "A Cielo Smart utiliza um ambiente criptografado e isolado para o módulo de pagamento, independente do Android. Além disso, seguimos rigorosamente os padrões PCI-DSS e a LGPD, garantindo que os dados sensíveis nunca fiquem expostos.",
                 errado: "O sistema Android 10 é muito seguro e possui antivírus. Além disso, o senhor pode contratar um seguro de dados à parte para ficar totalmente tranquilo.", 
                 resposta: true 
            },
            
            { 
                pergunta: "SR. RUAN:\nSe uma máquina der defeito no meio do meu 'Sábado de Ofertas' com o mercado lotado, quanto tempo eu fico com o caixa parado? A concorrência me troca o equipamento em 4 horas.Vocês batem esse tempo?", 
                certo:  "Nós trabalhamos com suporte prioritário para o varejo de grande porte. Além da troca rápida, a Cielo Smart permite que o senhor venda via 'Cielo Tap' no celular de qualquer funcionário como opção imediata, garantindo que nenhuma venda seja perdida enquanto o novo terminal chega.",
                errado: "Nosso suporte funciona em horário comercial e a troca ocorre em até 24 horas úteis. Mas nossas máquinas são as mais duráveis do mercado e dificilmente o senhor terá esse problema.",
                resposta: true 
            }

        ];

        // Começa pela primeira pergunta (índice 0)
        this.questaoAtual = 0;

        // Inicializa a interface, exibe a primeira pergunta, desenha a barra e cria o personagem
        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();
        this.faceVendedor();
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
        this.faceVendedor();
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

    faceVendedor() {
        if (this.satisfacao === 34) {
            vendedor.play('estavelVendedor', true);
            return;
        }
        if (this.satisfacao === 1) {
            vendedor.play('bravoVendedor', true)
            return;
        } 
        if (this.satisfacao === 67) {
            vendedor.play('felizVendedor', true)
            return;
        } 
        if (this.satisfacao<0 || this.satisfacao === 100){
            vendedor.play('estavelVendedor',true)
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