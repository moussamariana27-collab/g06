// Cena de combate do supermercado.

class Mercado extends Combate {

    constructor() {
        super('Mercado');
    }

    init(data) {
        super.init(data);
        // Define as cenas de feedback usadas ao fim da fase.
        this.cenaVitoria = 'FeedbackVitoriaSupermercado';
        this.cenaDerrota = 'FeedbackDerrotaSupermercado';
        this.vitorias = this.registry.get('estabelecimentosVencidos');
    }

    preload() {
        super.preload(); 

        // Carrega fundo, NPC e sprite do personagem escolhido.
        this.load.image('bgMercado', 'assets/mercado_interior.png');

        this.load.spritesheet('ruan', 'assets/Ruan.png', {
            frameWidth: 640,
            frameHeight: 1080
        });

        const sprites = {
            'JOSE':  { file: 'assets/joseCorpo.png' },
            'MARIA': { file: 'assets/mariaCorpo.png' },
            'JOAO':  { file: 'assets/joaoCorpo.png' },
            'PAULA': { file: 'assets/paulaCorpo.png' }
        };

        const dadosSprite = sprites[this.personagemEscolhido];

        if (!dadosSprite) {
            console.error('Personagem inválido:', this.personagemEscolhido);
            return;
        }

        this.load.image('personagemMercado', dadosSprite.file);
    }

    create() {
        // Monta o cenario e os personagens da fase.
        this.bg = this.add.image(0, 0, 'bgMercado')
            .setOrigin(0.5)
            .setDepth(0)
            .setPosition(this.scale.width / 2, this.scale.height / 2)
            .setDisplaySize(this.scale.width, this.scale.height);

        this.resizeBackground();
        this.criarRuan();
        this.criarPlayer();

        //Botão no canto superior esquerdo (30, 30)
        this.criarBotaoSair(30, 30, () => {
        this.scene.start('Cidade', { 
        personagem: this.personagemEscolhido, 
        posicaoSpawn: { x: 380, y: 929.5 } // Posição exata de retorno no mapa
        });
    });

        // Inicializa perguntas, barra de satisfacao e ponto de retorno.
        this.initCombate({
            satisfacaoInicial: 34,
            questoes: [

            {
                // Saudacao inicial.
                pergunta: "SR. RUAN:\n Boa tarde! Veio falar com quem?",
                certo: "Boa tarde, Sr. Ruan! Sou Gerente de Negócios da Cielo. Vim até aqui porque tenho uma proposta com condições especiais pro seu segmento. O senhor teria alguns minutos pra conversar?",
                soDialogo: true
            },

            {
                pergunta: "SR. RUAN:\n Sempre achei TEF e Pinpad muito complicado. Prefiro continuar como estou, com as maquininhas que já tenho aqui.",
                certo: "Mas, sem TEF e Pinpad a sua conciliação fica muito mais complicada — e aposto que deixa passar uma coisa ou outra no fechamento, né?",
                errado: "É verdade! Com o volume de vendas que tem aqui, nem faz cócegas no seu faturamento. Desculpe fazer o senhor perder tempo!",
                resposta: true
            },

            {
                pergunta: "SR. RUAN:\n Tá, me convenceu sobre a conciliação. Mas o que a Cielo tem de diferente pra um supermercado do meu tamanho?",
                certo: "A Cielo está apresentando condições exclusivas pro seu ramo de atividade, além de ofertar TEF e Pinpad pra aumentar sua segurança e estabilidade nas vendas.",
                errado: "As condições são as mesmas para todos os clientes. O que muda é o volume de transações que o senhor vai processar.",
                resposta: true
            },

            { 
                pergunta: "SR. RUAN:\n A concorrência me dá taxa de MDR quase zero no débito pelo meu volume. Se eu migrar pra Cielo, vou perder essa vantagem?",
                certo: "Sr. Ruan, mais do que taxa, entregamos eficiência operacional. Com TEF integrado ao PDV e a 'Cielo Gestão', o senhor reduz perdas no fechamento de caixa. O 'Vendeu, tá na conta' ainda garante recebimento acelerado que compensa qualquer fração de taxa.", 
                errado: "Nós cobrimos qualquer oferta da concorrência! Me mostra o extrato atual e eu consigo uma taxa menor hoje mesmo pra fecharmos o contrato agora.", 
                resposta: true 
            },
            
            {
                pergunta: "SR. RUAN:\n E a segurança? Tenho medo de um vazamento de dados dos meus clientes. Como a Cielo garante isso num volume tão alto de transações?", 
                certo: "Com TEF e Pinpad da Cielo, o ambiente de pagamento é criptografado e isolado. Seguimos rigorosamente PCI-DSS e LGPD, garantindo que os dados sensíveis nunca fiquem expostos.",
                errado: "O sistema possui antivírus atualizado. Além disso, o senhor pode contratar um seguro de dados à parte pra ficar totalmente tranquilo.", 
                resposta: true 
            },
            
            { 
                pergunta: "SR. RUAN:\n Fechei com vocês, mas a maquininha chegou e tá parada embaixo da bancada. Não tive tempo de testar ainda.", 
                certo: "Bora aproveitar que estou aqui e testar agora! Tem um cliente ali no caixa — a gente já passa uma venda, ativa o equipamento e garante que tudo funciona direitinho.",
                errado: "Sem problema, Sr. Ruan. Quando o senhor tiver tempo, é só ligar pro nosso suporte que eles orientam a ativação.",
                resposta: true 
            }
        ],

        posicaoSpawn: { x: 380, y: 925.5 },

        });

        // Cria a interface herdada da classe base.
        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();

        // Liga a expressao do NPC ao valor atual da satisfacao.
        this.updateNPC = this.faceRuan;
        this.faceRuan();

    }

    // Mantem o fundo ajustado ao tamanho atual da tela.
    resizeBackground() {
        const largura = this.scale.width;
        const altura = this.scale.height;

        this.bg.setPosition(largura / 2, altura / 2);
        this.bg.setDisplaySize(largura, altura);
    }

    // Cria o NPC e registra as animacoes de humor.
    criarRuan() {
        this.ruan = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'ruan'
        )
            .setDepth(2)
            .setScale(0.55)
            .setFlip(true, false);

        utilitariosJogo.garantirAnimacao(this, {
            key: "bravoRuan",
            frames: this.anims.generateFrameNumbers('ruan', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        utilitariosJogo.garantirAnimacao(this, {
            key: "estavelRuan",
            frames: this.anims.generateFrameNumbers('ruan', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        utilitariosJogo.garantirAnimacao(this, {
            key: "felizRuan",
            frames: this.anims.generateFrameNumbers('ruan', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: -1
        });
    }

    // Posiciona o personagem do jogador na cena.
    criarPlayer() {
        let escala = 1;
        let posX = (this.scale.width * 1 / 3) - 100;
        let posY = this.scale.height - 270;

        if (this.personagemEscolhido === 'JOSE' || this.personagemEscolhido === 'JOAO') {
            escala = 0.5;
            posX -= 20;
            posY -= 60;
        }

        this.add.image(posX, posY, 'personagemMercado')
            .setDepth(1)
            .setScale(escala);
    }

    // Atualiza a animacao do NPC conforme a satisfacao da conversa.
    faceRuan() {
        if (this.satisfacao === 34) {
            this.ruan.play('estavelRuan', true);
            return;
        } else if (this.satisfacao === 1) {
            this.ruan.play('bravoRuan', true);
            return;
        } else if (this.satisfacao === 67) {
            this.ruan.play('felizRuan', true);
            return;
        } else if (this.satisfacao < 0 || this.satisfacao === 100) {
            this.ruan.play('felizRuan', true);
        }
    }
}
