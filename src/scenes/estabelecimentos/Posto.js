// Cena do posto de combustivel.

// O minigame do posto acontece nesta cena.
// O jogador responde as perguntas da cliente
// e preenche a barra de satisfacao para fechar a venda.

class Posto extends Combate {

    constructor() {
        super('Posto');
    }

    init(data) {
        super.init(data);
    }

    preload() {

        super.preload(); // Carrega a musica de batalha.

        // Fundo
        this.load.image('bgPosto', 'assets/FundoPosto.png');

        // NPC (Roberta)
        this.load.spritesheet('roberta', 'assets/Roberta.png', {
            frameWidth: 640,
            frameHeight: 1080
        });

        // Personagem do jogador
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

        this.load.image('personagemPosto', dadosSprite.file);
    }

    create() {

        // Fundo
        this.fundoCena = this.add.image(0, 0, 'bgPosto')
            .setOrigin(0, 0)
            .setDepth(0);

        this.fundoCena.setDisplaySize(this.scale.width, this.scale.height);

        // NPC
        this.criarRoberta();

        // Jogador
        this.criarPlayer();

        //Botão no canto superior esquerdo (30, 30)
        this.criarBotaoSair(30, 30, () => {
        this.scene.start('Cidade', { 
        personagem: this.personagemEscolhido, 
        posicaoSpawn: { x: 813, y: 220.5 } // Posição exata de retorno no mapa
        });
    });

        // Configura combate (usa classe base)
        this.initCombate({
            satisfacaoInicial: 34,
            questoes: [

            {
                // Saudacao inicial.
                pergunta: "SRA. ROBERTA:\n Boa tarde! Com quem eu falo?",
                certo: "Boa tarde, Sra. Roberta! Sou Gerente de Negócios da Cielo. Vim pessoalmente até aqui porque tenho uma proposta estruturada pro seu nível de operação. A senhora teria alguns minutos pra conversar?",
                soDialogo: true
            },

            {
                // Abre a conversa falando sobre previsibilidade de taxas.
                pergunta: "SRA. ROBERTA:\n Já tive problema com maquininha que começou com taxa boa e depois subiu. Não tenho como aceitar surpresa no meio do caminho no meu nível de faturamento.",
                certo: "Todas as condições acordadas ficam formalizadas em contrato, Sra. Roberta. Com o acordo comercial estruturado para postos de alto faturamento, garantimos estabilidade nas taxas por 12 meses, trazendo total previsibilidade pro seu caixa.",
                errado: "As taxas podem mudar sim, Sra. Roberta. Isso depende do mercado — é algo normal que acontece com todos os players.",
                resposta: true
            },

            {
                // Explica o recebimento rapido em dias nao uteis.
                pergunta: "SRA. ROBERTA:\n Eu movimento uma média de 750 mil por dia, mas às vezes preciso do dinheiro rápido num fim de semana pra fechar com a distribuidora. Como a Cielo resolve isso?",
                certo: "Com o 'Vendeu, Tá na Conta', todas as vendas feitas até 18h59 caem na sua conta no mesmo dia — inclusive sábado, domingo e feriados. Isso permite negociar melhor com a distribuidora e reduzir o custo do produto, pagando qualquer diferença de taxa.",
                errado: "Infelizmente o crédito em finais de semana segue o calendário bancário, Sra. Roberta. Se precisar do dinheiro no mesmo dia, a opção é incentivar o pagamento em dinheiro físico.",
                resposta: true
            },

            { 
                // Destaca a durabilidade do equipamento na pista.
                pergunta: "SRA. ROBERTA:\n Minhas máquinas ficam na pista, levam sol, chuva e respingo de gasolina. Já perdi muito terminal porque a tela parou ou a bateria inchou no calor. Os da Cielo aguentam esse ambiente?",
                certo: "A Cielo Smart e a LIO On foram projetadas para uso severo, com bateria de longa duração, carregador magnético que evita desgaste de conectores e teclado físico com película de silicone. Se houver qualquer falha, o suporte técnico é prioritário e a troca é garantida pra não parar suas bombas.", 
                errado: "Nossas máquinas são as melhores do mercado e a senhora pode usar uma capa protetora de borracha. Se quebrar, enviamos uma nova pelo correio em até 3 dias úteis.", 
                resposta: true 
            },
            
            {
                // Mostra o risco de trabalhar com exclusividade.
                pergunta: "SRA. ROBERTA:\n A concorrência me dá exclusividade e taxa zero em uma bandeira. Por que eu colocaria a Cielo aqui e complicaria a vida dos meus frentistas com duas máquinas diferentes?", 
                certo: "Exclusividade é um risco pro seu posto, Sra. Roberta. A Cielo aceita mais de 80 bandeiras, incluindo vouchers e cartões frota que a concorrência não lê. Focar em uma só significa perder caminhoneiros e frotas corporativas — a Cielo garante que o senhor atenda qualquer cliente que chegar na pista.",
                errado: "A Cielo também pode fazer acordos de exclusividade se o volume for alto. Podemos oferecer taxa zero nas principais bandeiras por pelo menos 6 meses.", 
                resposta: true 
            },
            
            { 
                // Explica a conciliacao e a gestao por turno.
                pergunta: "SRA. ROBERTA:\n Tenho 3 turnos de frentistas e 12 máquinas rodando. No final do dia é um inferno bater o que caiu na conta com o que cada um vendeu. Como a Cielo resolve isso?",
                certo: "Com o app Cielo Gestão na LIO On, a conciliação é feita em tempo real. O fechamento de caixa é com um clique direto na máquina ou pelo celular — a senhora enxerga exatamente o que cada terminal vendeu, separado por turno, com relatório instantâneo.",
                errado: "Imprimimos um relatório detalhado em cada máquina ao final do turno. O frentista grampeia no fechamento e a senhora confere tudo no final da semana pelo nosso portal.",
                resposta: true 
            }
        ],

        posicaoSpawn: { x: 813, y: 220.5 },

        });

        // Cria a interface herdada.
        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();

        // Liga o NPC ao sistema base.
        this.updateNPC = this.faceRoberta;
        this.faceRoberta();

    }

    // Cria o NPC.
    criarRoberta() {

        this.roberta = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'roberta'
        )
            .setDepth(2)
            .setScale(0.55)
            .setFlip(true, false);

        // Registra as animacoes de humor da Roberta.
        utilitariosJogo.garantirAnimacao(this, {
            key: "bravoRoberta",
            frames: this.anims.generateFrameNumbers('roberta', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        utilitariosJogo.garantirAnimacao(this, {
            key: "estavelRoberta",
            frames: this.anims.generateFrameNumbers('roberta', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        utilitariosJogo.garantirAnimacao(this, {
            key: "felizRoberta",
            frames: this.anims.generateFrameNumbers('roberta', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: -1
        });
    }

    // Cria o jogador.
    criarPlayer() {

        let escala = 1;
        let posX = (this.scale.width * 1 / 3) - 100;
        let posY = this.scale.height - 270;

        if (this.personagemEscolhido === 'JOSE' || this.personagemEscolhido === 'JOAO') {
            escala = 0.5;
            posX -= 20;
            posY -= 60;
        }

        this.add.image(posX, posY, 'personagemPosto')
            .setDepth(1)
            .setScale(escala);
    }

    // Atualiza a expressao do NPC.
    faceRoberta() {

        if (this.satisfacao === 34) {
            this.roberta.play('estavelRoberta', true);
            return;
        }

        else if (this.satisfacao === 1) {
            this.roberta.play('bravoRoberta', true);
            return;
        }

        else if (this.satisfacao === 67) {
            this.roberta.play('felizRoberta', true);
            return;
        }

        else if (this.satisfacao < 0 || this.satisfacao === 100) {
            this.roberta.play('felizRoberta', true);
        }
    }
}
