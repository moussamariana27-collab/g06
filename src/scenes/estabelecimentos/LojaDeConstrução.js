// CENA DA LOJA DE CONSTRUÇÃO - Minigame de vendas

class LojaDeConstrução extends Combate {

    constructor() {
        super('LojaDeConstrução');
    }

    init(data) {
        super.init(data);
    }

    preload() {
        super.preload();

        this.load.image('bgLojaDeConstrução', 'assets/LojaDeConstrução_fundo.png');

        this.load.spritesheet('Construtora', 'assets/Lígia.png', {
            frameWidth: 640,
            frameHeight: 1080
        });

        const sprites = {
            'JOSÉ':  { file: 'assets/joseCorpo.png' },
            'MARIA': { file: 'assets/mariaCorpo.png' },
            'JOÃO':  { file: 'assets/joaoCorpo.png' },
            'PAULA': { file: 'assets/paulaCorpo.png' }
        };

        const dadosSprite = sprites[this.personagemEscolhido];

        if (!dadosSprite) {
            console.error('Personagem inválido:', this.personagemEscolhido);
            return;
        }

        this.load.image('personagemLojaDeConstrução', dadosSprite.file);
    }

    create() {
        this.bg = this.add.image(0, 0, 'bgLojaDeConstrução')
            .setOrigin(0.5)
            .setDepth(0)
            .setPosition(this.scale.width / 2, this.scale.height / 2)
            .setDisplaySize(this.scale.width, this.scale.height);

        this.resizeBackground();
        this.criarConstrutora();
        this.criarPlayer();

        this.initCombate({
            satisfacaoInicial: 34,
            questoes: [

            // Saudação inicial (Apenas Diálogo)
            {
                pergunta: "LÍGIA:\n Olá! Boa tarde, pode falar.",
                certo: "Boa tarde, Lígia! Sou Gerente de Negócios da Cielo. Passei aqui porque tenho uma proposta pensada especialmente pro segmento de materiais de construção. A senhora teria alguns minutos pra ouvir?",
                soDialogo: true
            },

            {
                pergunta: "LÍGIA:\n A gente vende bastante no parcelado, mas as taxas pesam demais e o prazo pra receber não ajuda. Fico apertada no caixa toda vez que faço uma venda grande.",
                certo: "Entendo, Lígia. Na Cielo, estruturamos uma taxa customizada já atrelada à Antecipação de Recebíveis de forma integral. A senhora recebe o valor total da venda parcelada em D0 ou D1, inclusive fins de semana, sem a cobrança de taxas de antecipação avulsas por parcela.",
                errado: "É o padrão do varejo, Lígia. O que sugerimos é habilitar a Antecipação Automática. Assim, o sistema adianta o valor das vendas parceladas cobrando uma taxa fixa de desconto sobre o volume útil do dia, protegendo seu caixa contra a desvalorização.",
                resposta: true
            },

            {
                pergunta: "LÍGIA:\n Esse tal de D0 e D1 que você mencionou... qual a diferença? E tem algum custo a mais pra receber no mesmo dia?",
                certo: "A grande vantagem é que D0 (mesmo dia) e D1 (dia seguinte) consideram dias corridos. Vendendo no sábado ou domingo, o dinheiro entra no próprio fim de semana. A taxa acordada é única e já engloba essa agilidade, sem tarifa extra de transferência.",
                errado: "No D0 o repasse ocorre no mesmo dia, sujeito à tarifa de liquidez imediata. No D1, o valor entra no próximo dia útil, que é o formato mais econômico. A maioria dos lojistas opta pelo D1 para não pagar spread em transações de fim de semana.",
                resposta: true
            },

            {
                pergunta: "LÍGIA:\n Pra falar a verdade, já fui enganada antes. Começou com taxa boa e depois mudou. Como eu sei que não vai acontecer a mesma coisa com a Cielo?",
                certo: "Na Cielo, a sua condição comercial é registrada e travada em contrato. Nós não fazemos reajustes unilaterais de balcão, garantindo total previsibilidade para a senhora calcular seu preço de venda.",
                errado: "Nossa taxa acompanha a Selic, Lígia. Como somos 100% transparentes, nós avisamos com 30 dias de antecedência qualquer reajuste de mercado, para a senhora ter tempo de se programar.",
                resposta: true
            },

            {
                pergunta: "LÍGIA:\n E quando eu vendo parcelado em reformas grandes, às vezes o cliente quer parcelas longas. Eu perco dinheiro nisso ou a Cielo resolve?",
                certo: "A Cielo resolve! Com a nossa antecipação, a senhora vende em até 12x e recebe o valor integral de uma vez (descontada a taxa acordada) em D0 ou D1. A senhora ganha poder de venda sem descapitalizar.",
                errado: "Para vendas muito longas, nós liberamos o valor mês a mês, conforme o cliente paga as parcelas. Assim a senhora não paga a taxa de antecipação e protege 100% da sua margem de lucro.",
                resposta: true
            },

            {
                pergunta: "LÍGIA:\n Olha, você explicou bem. Mas eu sou só eu aqui na loja. Não tenho equipe de financeiro. Preciso de algo simples que eu mesma consiga acompanhar.",
                certo: "O app Cielo Gestão centraliza tudo. A senhora visualiza suas vendas, faz simulador de parcelamento na hora pro cliente e acompanha o saldo a receber, tudo de forma muito intuitiva direto no celular.",
                errado: "Nós enviamos relatórios financeiros detalhados por e-mail toda sexta-feira, Lígia. Além disso, a senhora pode baixar o extrato em planilhas no nosso portal sempre que for fazer o fechamento do mês.",
                resposta: true
            }

        ],

        posicaoSpawn: { x: 710, y: 966 },

        });

        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();

        this.updateNPC = this.faceConstrutora;
        this.faceConstrutora();

        this.input.keyboard.once('keydown-SPACE', () => {
            this.musica.stop();
            this.scene.start('Cidade', { character: this.personagemEscolhido });
        });

        this.input.keyboard.once('keydown-ENTER', () => {
            this.musica.stop();
            this.scene.start('Cidade', { character: this.personagemEscolhido });
        });
    }

    resizeBackground() {
        const largura = this.scale.width;
        const altura = this.scale.height;

        this.bg.setPosition(largura / 2, altura / 2);
        this.bg.setDisplaySize(largura, altura);
    }

    criarConstrutora() {
        this.Construtora = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'Construtora'
        )
            .setDepth(2)
            .setScale(0.55)
            .setFlip(true, false);

        this.anims.create({
            key: "bravoConstrutora",
            frames: this.anims.generateFrameNumbers('Construtora', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: "estavelConstrutora",
            frames: this.anims.generateFrameNumbers('Construtora', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: "felizConstrutora",
            frames: this.anims.generateFrameNumbers('Construtora', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: -1
        });
    }

    criarPlayer() {
        let escala = 1;
        let posX = (this.scale.width * 1 / 3) - 100;
        let posY = this.scale.height - 270;

        if (this.personagemEscolhido === 'JOSÉ' || this.personagemEscolhido === 'JOÃO') {
            escala = 0.5;
            posX -= 20;
            posY -= 60;
        }

        this.add.image(posX, posY, 'personagemLojaDeConstrução')
            .setDepth(1)
            .setScale(escala);
    }

    faceConstrutora() {
        if (this.satisfacao === 34) {
            this.Construtora.play('estavelConstrutora', true);
            return;
        } else if (this.satisfacao === 1) {
            this.Construtora.play('bravoConstrutora', true);
            return;
        } else if (this.satisfacao === 67) {
            this.Construtora.play('felizConstrutora', true);
            return;
        } else if (this.satisfacao < 0 || this.satisfacao === 100) {
            this.Construtora.play('felizConstrutora', true);
        }
    }
}