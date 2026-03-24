class Posto extends Combate {

    constructor() {
        super('Posto');
    }

    init(data) {
        super.init(data);
    }

    preload() {

        // Fundo
        this.load.image('bgPosto', 'assets/FundoPosto.png');

        // NPC (padeiro)
        this.load.spritesheet('Frentista', 'assets/Roberta.png', {
            frameWidth: 640,
            frameHeight: 1080
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

        this.load.image('personagemFrentista', dadosSprite.file);
    }

    create() {

        // Fundo
        const bg = this.add.image(0, 0, 'bgPosto')
            .setOrigin(0, 0)
            .setDepth(0);

        bg.setDisplaySize(this.scale.width, this.scale.height);

        // NPC
        this.criarFrentista();

        // Jogador
        this.criarPlayer();

        // Configura combate (usa classe base)
        this.initCombate({
            satisfacaoInicial: 34,
            questoes: [

            {
                pergunta:"SEU TIÃO:O problema é que oque eu também vendo no fim de semana, até no domingo. Tem hora que eu preciso do dinheiro rápido numa emergência. E aí eu preciso vender no dinheiro, não tem jeito!",
                certo: "Tem jeito sim SR. João! A CIELO tem um serviço chamado'Vendeu, Tá na Conta', com ele todas as vendas que o senhor fez até 18:59 o valor cai na sua conta no mesmo dia, inclusive nos finais de semana e feriados! O dinheiro cai na conta em poucas horas.",
                errado: "Infelizmente nós não trabalhalhamos fim de semana, Seu João. Se o senhor quiser o dinheiro no mesmo dia vai ter que vender no físico.",
                resposta: true
            },

            {
                pergunta: "SRA. ROBERTA: \n' Eu movimento uma média de 750 mil por dia, mas meu lucro por litro é muito baixo. Meu contrato atual me dá uma taxa de antecipação que vocês não oferecem. Por que eu trocaria meu fluxo de caixa garantido pelo serviço do 'Vendeu, Tá na Conta' se o custo efetivo total pode corroer minha margem?",
                certo: "Sra. Roberta, o 'Vendeu, Tá na Conta' não é só antecipação, é liquidez imediata em dias não úteis. Ter o dinheiro das vendas de sábado e domingo na conta no próprio domingo permite ao senhor negociar melhor com a distribuidora, economizando no custo do produto, o que paga qualquer diferença de taxa.",
                errado: "Nós temos as taxas mais competitivas do mercado para grandes volumes, Sra. Robeta. Se a senhora me mostrar seu contrato, eu consigo uma carência de 3 meses e uma taxa de antecipação fixa que vai garantir que o senhor receba tudo em D+1 sem sustos.",
                resposta: true
            },

            { 
                pergunta:  "SRA. ROBERTA: Minhas máquinas ficam na pista, levam sol, chuva e respingo de gasolina. Já perdi muita maquininha dessas novas porque a tela parou de ler ou a bateria inchou no calor. Esses terminais novos resistem a esse ambiente ou vou ter que chamar o suporte todo dia?",
                certo: "A Cielo Smart e a LIO On foram projetadas para o uso severo. Além da bateria de longa duração e do carregador magnético que evita desgaste de conectores, o hardware possui um teclado físico com película de silicone para acessibilidade e proteção. E se houver qualquer falha, nosso suporte técnico é prioritário com troca garantida para não parar suas bombas.", 
                errado: "Nossas máquinas são as melhores do mercado e a senhora pode usar uma capa protetora de borracha. Se ela quebrar, o seguro da Cielo cobre o dano físico e nós enviamos uma nova pelo correio em até 3 dias úteis para a senhora.",
                resposta: true 
            },
            
            {
                pergunta:  "SRA. ROBERTA:\n A concorrência me dá exclusividade e taxa zero na bandeira X. Por que eu colocaria a Cielo aqui e complicaria a vida dos meus frentistas com duas máquinas diferentes, se a maioria dos meus clientes usam essa bandeira?", 
                certo: "Porque exclusividade é um risco para o seu posto, Sra. Roberta a Cielo aceita mais de 80 bandeiras diferentes, incluindo vouchers e cartões frota que a concorrência não lê. Ao focar em uma só, o senhor perde caminhoneiros ou frotas de empresas que usam um cartão específico. A Cielo garante que atenda qualquer cliente.",
                errado: "A Cielo também pode fazer acordos de exclusividade se o volume for alto. Podemos oferecer uma taxa zero para a senhora em nas principais bandeiras por pelo menos 6 meses.",
                resposta: true 
            },
            
            { 
                pergunta: "SRA. ROBERTA:\ n Eu tenho 3 turnos de frentistas e 12 máquinas rodando. No final do dia, é um inferno bater o que caiu na conta com o que cada um vendeu. A concorrência me manda um relatório por e-mail no dia seguinte. O que vocês oferecem pra mim não ficar perdendo tempo?",
                certo: "A Cielo LIO On possui o app Cielo Gestão, que faz a conciliação em tempo real. O fechamento de caixa é feito com um clique direto na máquina ou pelo celular. A senhora enxerga exatamente o que cada terminal vendeu, separa por turno e o relatório é instantâneo. ",
                errado: "Nós imprimimos um relatório detalhado em cada máquina ao final do turno. O frentista só precisa grampear esse papel no fechamento dele e a senhora confere tudo de uma vez no final da semana pelo nosso portal no computador.",
                resposta: true 
            }

        ]
        });

        // UI e lógica (HERDADO)
        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();

        // Liga o NPC ao sistema base
        this.updateNPC = this.faceFrentista;
        this.faceFrentista();

        // Voltar pra cidade
        this.input.keyboard.once('keydown-SPACE', () =>
            this.scene.start('Cidade', { character: this.personagemEscolhido })
        );

        this.input.keyboard.once('keydown-ENTER', () =>
            this.scene.start('Cidade', { character: this.personagemEscolhido })
        );
    }

    // CRIA NPC
    criarFrentista() {

        this.Frentista = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'Frentista'
        )
            .setDepth(2)
            .setScale(0.55)
            .setFlip(true, false);

        // Animações
        this.anims.create({
            key: "bravoFrentista",
            frames: this.anims.generateFrameNumbers('Frentista', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: "estavelFrentista",
            frames: this.anims.generateFrameNumbers('Frentista', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: "felizFrentista",
            frames: this.anims.generateFrameNumbers('Frentista', { start: 2, end: 2 }),
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

        this.add.image(posX, posY, 'personagemFrentista')
            .setDepth(1)
            .setScale(escala);
    }

    // LÓGICA DO NPC (chamada pela classe base)
    faceFrentista() {

        if (this.satisfacao === 34) {
            this.Frentista.play('estavelFrentista', true);
            return;
        }

        else if (this.satisfacao === 1) {
            this.Frentista.play('bravoFrentista', true);
            return;
        }

        else if (this.satisfacao === 67) {
            this.Frentista.play('felizFrentista', true);
            return;
        }

        else if (this.satisfacao < 0 || this.satisfacao === 100) {
            this.Frentista.play('felizFrentista', true);
        }
    }
}