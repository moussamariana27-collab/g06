// CENA DA LOJA DE CONSTRUÇÃO - Minigame de vendas

// Aqui acontece toda a lógica do jogo dentro da loja de material de construção.
// O jogador precisa responder perguntas da Lígia e
// encher a barra de satisfação pra fechar a venda.

class LojaDeConstrução extends Combate {

    // Construtor da cena - define o nome da cena no Phaser
    constructor() {
        super('LojaDeConstrução');
    }

    // Método chamado ao iniciar a cena - recebe dados de outras cenas
    init(data) {
        super.init(data);
    }

    // Carregamento de assets (imagens, sprites, etc.)
    preload() {
        super.preload();

        // Carrega a imagem de fundo da loja
        this.load.image('bgLojaDeConstrução', 'assets/LojaDeConstrução_fundo.png');

        // Carrega o spritesheet da NPC (Construtora)
        this.load.spritesheet('Construtora', 'assets/Lígia.png', {
            frameWidth: 640,
            frameHeight: 1080
        });

        // Lista de sprites possíveis para o jogador
        const sprites = {
            'JOSÉ':  { file: 'assets/joseCorpo.png' },
            'MARIA': { file: 'assets/mariaCorpo.png' },
            'JOÃO':  { file: 'assets/joaoCorpo.png' },
            'PAULA': { file: 'assets/paulaCorpo.png' }
        };

        // Seleciona o sprite baseado no personagem escolhido anteriormente
        const dadosSprite = sprites[this.personagemEscolhido];

        // Validação: se não existir o personagem, mostra erro
        if (!dadosSprite) {
            console.error('Personagem inválido:', this.personagemEscolhido);
            return;
        }

        // Carrega a imagem do jogador
        this.load.image('personagemLojaDeConstrução', dadosSprite.file);
    }

    // Criação da cena (tudo que aparece na tela)
    create() {

        // Cria o fundo e adapta ao tamanho da tela
        this.bg = this.add.image(0, 0, 'bgLojaDeConstrução')
            .setOrigin(0.5)
            .setDepth(0)
            .setPosition(this.scale.width / 2, this.scale.height / 2)
            .setDisplaySize(this.scale.width, this.scale.height);

        // Ajusta o fundo caso a tela mude de tamanho
        this.resizeBackground();

        // Cria a NPC
        this.criarConstrutora();

        // Cria o jogador
        this.criarPlayer();

        // Inicializa o sistema de combate (base do minigame)
        this.initCombate({
            satisfacaoInicial: 34,
            questoes: [

            // Saudação inicial
            {
                pergunta: "LÍGIA:\n Olá! Boa tarde, pode falar.",
                certo: "Boa tarde, Lígia! Sou Gerente de Negócios da Cielo. Passei aqui porque tenho uma proposta pensada especialmente pro segmento de materiais de construção. A senhora teria alguns minutos pra ouvir?",
                errado: "Oi! Vim ver se você quer trocar de maquininha. A Cielo tá com umas condições aí...",
                resposta: true
            },

            // Pergunta 1 — Taxas e prazo de recebimento no parcelado
            {
                pergunta: "LÍGIA:\n A gente vende bastante no parcelado, mas as taxas pesam demais e o prazo pra receber não ajuda. Fico apertada no caixa toda vez que faço uma venda grande.",
                certo: "Entendo, Lígia. Na Cielo, estruturamos uma taxa customizada já atrelada à Antecipação de Recebíveis de forma integral. A senhora recebe o valor total da venda parcelada em D0 ou D1, inclusive fins de semana, sem a cobrança de taxas de antecipação avulsas por parcela.",
                errado: "É o padrão do varejo, Lígia. O que sugerimos é habilitar a Antecipação Automática. Assim, o sistema adianta o valor das vendas parceladas cobrando uma taxa fixa de desconto sobre o volume útil do dia, protegendo seu caixa contra a desvalorização.",
                resposta: true
            },

            // Pergunta 2 — D0 e D1: entender as modalidades de recebimento
            {
                pergunta: "LÍGIA:\n Esse tal de D0 e D1 que você mencionou... qual a diferença? E tem algum custo a mais pra receber no mesmo dia?",
                certo: "A grande vantagem é que D0 (mesmo dia) e D1 (dia seguinte) consideram dias corridos. Vendendo no sábado ou domingo, o dinheiro entra no próprio fim de semana. A taxa acordada é única e já engloba essa agilidade, sem tarifa extra de transferência.",
                errado: "No D0 o repasse ocorre no mesmo dia, sujeito à tarifa de liquidez imediata. No D1, o valor entra no próximo dia útil, que é o formato mais econômico. A maioria dos lojistas opta pelo D1 para não pagar spread em transações de fim de semana.",
                resposta: true
            },

            // Pergunta 3 — Previsibilidade: medo de taxa mudar no meio do caminho
            {
                pergunta: "LÍGIA:\n Pra falar a verdade, já fui enganada antes. Começou com taxa boa e depois mudou. Como eu sei que não vai acontecer a mesma coisa com a Cielo?",
                certo: "Na Cielo, a sua condição comercial é registrada e travada em contrato. Nós não fazemos reajustes unilaterais de balcão, garantindo total previsibilidade para a senhora calcular seu preço de venda.",
                errado: "Nossa taxa acompanha a Selic, Lígia. Como somos 100% transparentes, nós avisamos com 30 dias de antecedência qualquer reajuste de mercado, para a senhora ter tempo de se programar.",
                resposta: true
            },

            // Pergunta 4 — Parcelado em reformas grandes: como não perder vendas
            {
                pergunta: "LÍGIA:\n E quando eu vendo parcelado em reformas grandes, às vezes o cliente quer parcelas longas. Eu perco dinheiro nisso ou a Cielo resolve?",
                certo: "A Cielo resolve! Com a nossa antecipação, a senhora vende em até 12x e recebe o valor integral de uma vez (descontada a taxa acordada) em D0 ou D1. A senhora ganha poder de venda sem descapitalizar.",
                errado: "Para vendas muito longas, nós liberamos o valor mês a mês, conforme o cliente paga as parcelas. Assim a senhora não paga a taxa de antecipação e protege 100% da sua margem de lucro.",
                resposta: true
            },

            // Pergunta 5 — Fechamento: simplificar a gestão do dia a dia
            {
                pergunta: "LÍGIA:\n Olha, você explicou bem. Mas eu sou só eu aqui na loja. Não tenho equipe de financeiro. Preciso de algo simples que eu mesma consiga acompanhar.",
                certo: "O app Cielo Gestão centraliza tudo. A senhora visualiza suas vendas, faz simulador de parcelamento na hora pro cliente e acompanha o saldo a receber, tudo de forma muito intuitiva direto no celular.",
                errado: "Nós enviamos relatórios financeiros detalhados por e-mail toda sexta-feira, Lígia. Além disso, a senhora pode baixar o extrato em planilhas no nosso portal sempre que for fazer o fechamento do mês.",
                resposta: true
            }

        ],

        posicaoSpawn: { x: 710, y: 966 },

        });

        // Cria interface do jogo (UI)
        this.createUI();
        
        // Mostra a primeira pergunta
        this.mostrarQuestao();
        
        // Exibe a barra de satisfação
        this.barraSatisfacao();

        // Liga a atualização do NPC ao sistema de combate
        this.updateNPC = this.faceConstrutora;

        // Executa a expressão inicial da NPC
        this.faceConstrutora();

        // Tecla espaço volta para a cidade
        this.input.keyboard.once('keydown-SPACE', () => {
            this.musica.stop();
            this.scene.start('Cidade', { character: this.personagemEscolhido });
        });

        // Tecla ENTER também volta
        this.input.keyboard.once('keydown-ENTER', () => {
            this.musica.stop();
            this.scene.start('Cidade', { character: this.personagemEscolhido });
        });
    }

    // Ajusta o fundo conforme tamanho da tela
    resizeBackground() {
        const largura = this.scale.width;
        const altura = this.scale.height;

        this.bg.setPosition(largura / 2, altura / 2);
        this.bg.setDisplaySize(largura, altura);
    }

    // Cria a NPC (Construtora)
    criarConstrutora() {

        this.Construtora = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'Construtora'
        )
            .setDepth(2)
            .setScale(0.55)
            .setFlip(true, false);

        // Animação: bravo
        this.anims.create({
            key: "bravoConstrutora",
            frames: this.anims.generateFrameNumbers('Construtora', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        // Animação: neutro
        this.anims.create({
            key: "estavelConstrutora",
            frames: this.anims.generateFrameNumbers('Construtora', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        // Animação: feliz
        this.anims.create({
            key: "felizConstrutora",
            frames: this.anims.generateFrameNumbers('Construtora', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: -1
        });
    }

    // Cria o personagem do jogador
    criarPlayer() {

        let escala = 1;
        let posX = (this.scale.width * 1 / 3) - 100;
        let posY = this.scale.height - 270;

        // Ajustes específicos para alguns personagens
        if (this.personagemEscolhido === 'JOSÉ' || this.personagemEscolhido === 'JOÃO') {
            escala = 0.5;
            posX -= 20;
            posY -= 60;
        }

        // Adiciona o sprite na tela
        this.add.image(posX, posY, 'personagemLojaDeConstrução')
            .setDepth(1)
            .setScale(escala);
    }

    // Controla a expressão da NPC baseado na satisfação
    faceConstrutora() {

        // Estado inicial (neutro)
        if (this.satisfacao === 34) {
            this.Construtora.play('estavelConstrutora', true);
            return;
        }

        // Muito insatisfeito
        else if (this.satisfacao === 1) {
            this.Construtora.play('bravoConstrutora', true);
            return;
        }

        // Satisfeito
        else if (this.satisfacao === 67) {
            this.Construtora.play('felizConstrutora', true);
            return;
        }

        // Vitória ou valor inválido
        else if (this.satisfacao < 0 || this.satisfacao === 100) {
            this.Construtora.play('felizConstrutora', true);
        }
    }
}