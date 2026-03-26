// CENA DA PADARIA - Minigame de vendas

// Aqui acontece toda a lógica do jogo dentro da padaria.
// O jogador precisa responder perguntas do Seu João e
// encher a barra de satisfação pra fechar a venda.

class Padaria extends Combate {

    constructor() {
        super('Padaria');
    }

    init(data) {
        super.init(data);
    }

    preload() {
        super.preload();

        // Fundo
        this.load.image('bgPadaria', 'assets/padaria_interior.png');

        // NPC (padeiro)
        this.load.spritesheet('padeiro', 'assets/padeiroDeVerdade.png', {
            frameWidth: 459,
            frameHeight: 768
        });

        // Personagem do jogador
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

        this.load.image('personagemPadaria', dadosSprite.file);
    }

    create() {
        // Fundo da padaria — imagem responsiva que se adapta ao tamanho da tela
        this.bg = this.add.image(0, 0, 'bgPadaria')
            .setOrigin(0.5)
            .setDepth(0)
            .setPosition(this.scale.width / 2, this.scale.height / 2)
            .setDisplaySize(this.scale.width, this.scale.height);

        // Adapta o fundo se a tela for redimensionada
        this.resizeBackground();

        // Cria o sprite do padeiro (NPC)
        this.criarPadeiro();

        // Cria o sprite do jogador na cena
        this.criarPlayer();

        // Inicializa o sistema de combate (satisfação, questões e lógica de vitória/derrota)
        // A satisfação começa em 34 — já dá uma largada pra não começar zerado
        // Com 3 acertos consecutivos (33 cada) chega em 100 e vence
        this.initCombate({
            satisfacaoInicial: 34,
            questoes: 
                [

            {
                pergunta: "SEU TIÃO: Bom dia! Seja bem-vindo à padaria. Em que posso ajudar?",
                certo: "Bom dia, Seu Tião! Sou Gerente de Negócios da Cielo e passei aqui porque acredito que tenho uma proposta que pode fazer diferença pro seu negócio. O senhor teria alguns minutinhos pra conversar?",
                soDialogo: true
            },

            {
                pergunta: "SEU TIÃO: Bom dia, eu sei que você trabalha com a Cielo, mas já tive muitos problemas com outras adquirentes. Em situações de emergência, prefiro vender no dinheiro pra receber na hora e evitar dor de cabeça. Então, não tenho interesse em contratar novos serviços agora.",
                certo: "Entendo sua preocupação, Seu Tião. Com o ‘Vendeu, Tá na Conta’ da Cielo, vendas até 18h59 caem no mesmo dia, inclusive em fins de semana e feriados, ajudando no seu fluxo de caixa sem depender só do dinheiro físico.",
                errado: "Infelizmente não temos uma solução para isso, Seu Tião. Se quiser receber no mesmo dia, o ideal seria continuar vendendo apenas no dinheiro.",
                resposta: true
            },

            {
                pergunta: "SEU TIÃO: Outra coisa... eu já me perco com documentos de venda e nota fiscal. Trocar de empresa vai me dar mais dor de cabeça ainda. Como eu vou controlar meu estoque de pão e fechar o caixa sem me enrolar?",
                certo: "Pode ficar tranquilo com isso, Seu Tião. A Cielo Smart tem controle de estoque digital e fechamento de caixa simplificado. O senhor consegue acompanhar tudo direto na maquininha, de forma prática e sem precisar lidar com papelada.",
                errado: "Seu Tião, a documentação é simples e eu posso te ajudar com isso. O importante é que o investimento vale a pena!",
                resposta: true
            },

            {
                pergunta: "SEU TIÃO: Pra falar a verdade, o que mais me preocupa são as taxas. Já me prometeram uma coisa e depois mudaram tudo. Como eu sei que isso não vai acontecer de novo?",
                certo: "Essa é uma preocupação muito válida, Seu Tião. Na Cielo, todas as taxas e condições ficam definidas em contrato. Além disso, com planos de fidelidade, é possível garantir as taxas por um período, como 12 meses, trazendo mais segurança e previsibilidade pro senhor.",
                errado: "As taxas mudam todo mês, Seu Tião. Isso é normal no mercado, não tem muito o que fazer.",
                resposta: true 
            },

            { 
                pergunta: "SEU TIÃO: E quando eu vendo parcelado? Porque aí o dinheiro demora pra cair, e meu fornecedor de farinha não espera. A Cielo resolve isso?",
                certo: "Resolve sim, Seu Tião! A Cielo oferece antecipação de recebíveis, então o senhor pode receber antes das parcelas, pagando uma taxa. E o melhor: essas taxas são combinadas em contrato, com condições claras, trazendo mais controle e previsibilidade pro seu negócio.",
                errado: "Infelizmente não tem solução, Seu Tião. O senhor vai precisar esperar as parcelas caírem normalmente.",
                resposta: true 
            },

            {
                pergunta: "SEU TIÃO: Olha, você explicou bem... mas ainda fico com receio. Vale mesmo a pena trocar agora?",
                certo: "Com certeza, Seu Tião. Pelo que o senhor me contou, a Cielo resolve seus principais pontos: recebimento rápido, controle do negócio e taxas claras. Podemos começar de forma simples e segura, e eu acompanho o senhor nesse início. Vamos dar esse próximo passo juntos?",
                errado: "Bom, aí já é uma decisão do senhor. Se quiser depois a gente vê isso com mais calma.",
                resposta: true
            }
        ],
            posicaoSpawn: { x: 130, y: 550 } 
        });

        // Cria a interface de usuário (UI) herdada da classe Combate
        this.createUI();
        
        // Exibe a primeira questão na tela
        this.mostrarQuestao();
        
        // Mostra a barra visual de satisfação do NPC
        this.barraSatisfacao();

        // Conecta o método de expressão do NPC ao sistema de atualização da base
        // Qualquer mudança em this.satisfacao acionará facePadeiro()
        this.updateNPC = this.facePadeiro;
        this.facePadeiro();

        // Input: retorna para a cidade ao pressionar ESPAÇO ou ENTER
        this.input.keyboard.once('keydown-SPACE', () => {
            // Para a música de batalha antes de voltar
            this.musica.stop();
            this.scene.start('Cidade', { character: this.personagemEscolhido });
        });

        this.input.keyboard.once('keydown-ENTER', () => {
            // Para a música de batalha antes de voltar
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

    // CRIA NPC
    criarPadeiro() {

        this.padeiro = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'padeiro'
        )
            .setDepth(2)
            .setScale(0.55)
            .setFlip(true, false);

        // Animações
        this.anims.create({
            key: "bravoPadeiro",
            frames: this.anims.generateFrameNumbers('padeiro', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: "estavelPadeiro",
            frames: this.anims.generateFrameNumbers('padeiro', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: "felizPadeiro",
            frames: this.anims.generateFrameNumbers('padeiro', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: -1
        });
    }

    // CRIA PLAYER
    criarPlayer() {

        let escala = 1;
        let posX = (this.scale.width * 1 / 3) - 100;
        let posY = this.scale.height - 270;

        if (this.personagemEscolhido === 'JOSÉ' || this.personagemEscolhido === 'JOÃO') {
            escala = 0.5;
            posX -= 20;
            posY -= 60;
        }

        this.add.image(posX, posY, 'personagemPadaria')
            .setDepth(1)
            .setScale(escala);
    }

    // LÓGICA DO NPC (chamada pela classe base)
    facePadeiro() {

        if (this.satisfacao === 34) {
            this.padeiro.play('estavelPadeiro', true);
            return;
        }

        else if (this.satisfacao === 1) {
            this.padeiro.play('bravoPadeiro', true);
            return;
        }

        else if (this.satisfacao === 67) {
            this.padeiro.play('felizPadeiro', true);
            return;
        }

        else if (this.satisfacao < 0 || this.satisfacao === 100) {
            this.padeiro.play('felizPadeiro', true);
        }
    }
}