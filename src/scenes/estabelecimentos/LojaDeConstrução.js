// CENA DA LOJA DE CONSTRUÇÃO - Minigame de vendas

// Aqui acontece toda a lógica do jogo dentro da loja de material de construção.
// O jogador precisa responder perguntas do Seu Tião e
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

            // Pergunta 1 — Taxas e prazo de recebimento no parcelado
            {
                pergunta: "LÍGIA:\n A gente vende bastante no parcelado, mas as taxas pesam demais e o prazo pra receber não ajuda. Fico apertado no caixa toda vez que faço uma venda grande.",
                certo: "Conseguimos montar uma condição personalizada pro seu negócio, Seu Tião — com taxas mais equilibradas e recebimento em até 1 dia, no D0 ou D1, inclusive em sábados, domingos e feriados. Assim o senhor vende no parcelado sem comprometer o fluxo de caixa.",
                errado: "As taxas são padrão pra todo mundo e o prazo de recebimento é sempre o mesmo. Infelizmente não tem muito o que fazer nesse ponto.",
                resposta: true
            },

            // Pergunta 2 — D0 e D1: entender as modalidades de recebimento
            {
                pergunta: "LÍGIA:\n Esse tal de D0 e D1 que você mencionou... qual a diferença? E tem algum custo a mais pra receber no mesmo dia?",
                certo: "No D0 o valor cai na conta no mesmo dia da venda, e no D1 no dia seguinte — ambos contando dias corridos, incluindo fins de semana e feriados. A escolha é sua de acordo com o que faz mais sentido pro fluxo do seu caixa.",
                errado: "D0 e D1 são modalidades com custo adicional. O mais barato sempre será aguardar o prazo padrão, que garante que o senhor pague menos taxa no final do mês.",
                resposta: true
            },

            // Pergunta 3 — Previsibilidade: medo de taxa mudar no meio do caminho
            {
                pergunta: "LÍGIA:\n Pra falar a verdade, já fui enganada antes. Começou com taxa boa e depois mudou. Como eu sei que não vai acontecer a mesma coisa com a Cielo?",
                certo: "Todas as condições acordadas ficam registradas em contrato, Seu Tião. Isso garante total transparência e previsibilidade — sem surpresas no meio do caminho que comprometam a margem do seu negócio.",
                errado: "As taxas podem mudar sim, Seu Tião. Isso é algo que depende do mercado e acontece com todas as operadoras. O importante é sempre acompanhar o extrato.",
                resposta: true
            },

            // Pergunta 4 — Parcelado em reformas grandes: como não perder vendas
            {
                pergunta: "LÍGIA:\n E quando eu vendo parcelado em reformas grandes, às vezes o cliente quer parcelas longas. Eu perco dinheiro nisso ou a Cielo resolve?",
                certo: "A Cielo resolve sim. Com a antecipação de recebíveis, o senhor oferece parcelamento pro cliente e ainda assim recebe em D0 ou D1 — aumentando o ticket médio das suas vendas sem apertar o caixa.",
                errado: "Infelizmente quanto mais longo o parcelamento, maior a taxa. Nesses casos o ideal é limitar o parcelamento a no máximo 3 vezes pra não comprometer sua margem.",
                resposta: true
            },

            // Pergunta 5 — Fechamento: simplificar a gestão do dia a dia
            {
                pergunta: "LÍGIA:\n Olha, você explicou bem. Mas eu sou só eu aqui na loja. Não tenho equipe de financeiro. Preciso de algo simples que eu mesma consiga acompanhar.",
                certo: "A operação é fácil, rápida e sem complicação. O app Cielo Gestão permite que o senhor acompanhe todas as vendas, o fluxo de caixa e o que vai receber direto pelo celular — sem precisar de equipe especializada.",
                errado: "Bom, aí já é decisão do senhor ver se tem estrutura. O sistema tem bastante funcionalidade e pode exigir um tempo de adaptação pra usar tudo direitinho.",
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