// CENA DA PADARIA - Minigame de vendas

// Aqui acontece toda a lógica do jogo dentro da padaria.
// O jogador precisa responder perguntas do Seu João e
// encher a barra de satisfação pra fechar a venda.

class Mercado extends Combate {

    constructor() {
        super('Mercado');
    }

    init(data) {
        super.init(data);
    }

    preload() {

        // Fundo
        this.load.image('bgMercado', '/assets/mercado_interior.png');

        // NPC (padeiro)
        this.load.spritesheet('vendedor', '/assets/Ruan.png', {
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

        const dadosSprite = sprites[this.characterEscolhido];

        if (!dadosSprite) {
            console.error('Personagem inválido:', this.characterEscolhido);
            return;
        }

        this.load.image('personagemMercado', dadosSprite.file);
    }

    create() {

        // Fundo
        this.bg = this.add.image(0, 0, 'bgMercado')
            .setOrigin(0.5)
            .setDepth(0)
            .setPosition(this.scale.width / 2, this.scale.height / 2)
            .setDisplaySize(this.scale.width, this.scale.height);

        this.resizeBackground();

        // NPC
        this.criarVendedor();

        // Jogador
        this.criarPlayer();

        // Configura combate (usa classe base)
        this.initCombate({
            satisfacaoInicial: 34,
            questoes: 
                [

            {
                pergunta:"SR. RUAN: Meu mercado não para um segundo. São milhares de transações mensais e o seu sistema travar no sábado à tarde, a fila vai parar lá na rua! Como garanto que sua máquina aguenta o trabalho?",
                certo: "Sr. Ruan, a Cielo evoluiu para um módulo de pagamento muito mais robusto e rápido. Nossas máquinas têm Wi-Fi dual-band e conexão 4G estável para garantir que a venda seja aprovada instantaneamente, sem filas.",
                errado: "Ela aguenta sim, Sr. Carlos. O senhor só não pode abrir muitos aplicativos, porque aí vai sobrecarregar a memória da maquininha durante o dia.",
                resposta: true
            },

            {
                pergunta: "SR. RUAN: Escuta aqui, jovem: eu gastei uma fortuna integrando o software da concorrência com o meu estoque e faturamento. Se eu trocar para a Cielo, vou ter que parar meu sistema por semanas e gastar mais dinheiro implementando o de vocês? Não vale a pena!",
                certo: "Pelo contrário, Sr. Ruan! A Cielo Smart é baseada em Android aberto, o que facilita a migração. Além disso, temos o portal Cielo Desenvolvedores com toda a documentação pronta para que seu TI integre seu sistema atual sem custos extras de licença, mantendo sua operação rodando enquanto viramos a chave.",
                errado: "O senhor pode usar os nossos apps prontos da Cielo Store por um tempo. Eles são gratuitos e, enquanto isso, sua equipe de TI vai trabalhando com calma na integração definitiva em um ou dois meses.",
                resposta: true
            },

            { 
                pergunta: "SR. RUAN: Olha, a concorrência me dá uma taxa de MDR quase zero no débito porque meu volume é gigante. Se eu migrar para a Cielo, vou pagar mais caro. O que vocês me oferecem para compensar essa diferença no meu balanço?",
                certo: "Sr. Ruan, mais do que taxa, oferecemos eficiência operacional. Com a 'Cielo Gestão' e a integração direta no PDV, o senhor reduz erros de digitação e perdas no fechamento de caixa. Sem contar que com o  'Vendeu, tá na conta'  que oferta um recebimento acelerado compensa qualquer fração de taxa", 
                errado: "Nós cobrimos qualquer oferta da concorrência, Sr. Ruan! Se o senhor me mostrar o seu extrato atual, eu consigo uma taxa menor hoje mesmo para fecharmos o contrato agora.", 
                resposta: true 
            },
            
            {
                 pergunta: "SR. RUAN: E se o sistema Android da sua máquina for hackeado e clonar os cartões dos meus clientes? Eu vou sair como o culpado! Como a Cielo protege meu negócio de um vazamento de dados?", 
                 certo: "A Cielo Smart utiliza um ambiente criptografado e isolado para o módulo de pagamento, independente do Android. Além disso, seguimos rigorosamente os padrões PCI-DSS e a LGPD, garantindo que os dados sensíveis nunca fiquem expostos.",
                 errado: "O sistema Android 10 é muito seguro e possui antivírus. Além disso, o senhor pode contratar um seguro de dados à parte para ficar totalmente tranquilo.", 
                 resposta: true 
            },
            
            { 
                pergunta: "SR. RUAN: Se uma máquina der defeito no meio do meu 'Sábado de Ofertas' com o mercado lotado, quanto tempo eu fico com o caixa parado? A concorrência me troca o equipamento em 4 horas. Vocês batem esse tempo?", 
                certo:  "Nós trabalhamos com suporte prioritário para o varejo de grande porte. Além da troca rápida, a Cielo Smart permite que o senhor venda via 'Cielo Tap' no celular de qualquer funcionário como opção imediata, garantindo que nenhuma venda seja perdida enquanto o novo terminal chega.",
                errado: "Nosso suporte funciona em horário comercial e a troca ocorre em até 24 horas úteis. Mas nossas máquinas são as mais duráveis do mercado e dificilmente o senhor terá esse problema..",
                resposta: true 
            }

        ]
        });

        // UI e lógica (HERDADO)
        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();

        // Liga o NPC ao sistema base
        this.updateNPC = this.faceVendedor;
        this.faceVendedor();

        // Voltar pra cidade
        this.input.keyboard.once('keydown-SPACE', () =>
            this.scene.start('Cidade', { character: this.characterEscolhido })
        );

        this.input.keyboard.once('keydown-ENTER', () =>
            this.scene.start('Cidade', { character: this.characterEscolhido })
        );
    }

    resizeBackground() {

        const largura = this.scale.width;
        const altura = this.scale.height;

        this.bg.setPosition(largura / 2, altura / 2);
        this.bg.setDisplaySize(largura, altura);
}

    // CRIA NPC
    criarVendedor() {

        this.vendedor = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'vendedor'
        )
            .setDepth(2)
            .setScale(0.55)
            .setFlip(true, false);

        // Animações
        this.anims.create({
            key: "bravoVendedor",
            frames: this.anims.generateFrameNumbers('vendedor', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: "estavelVendedor",
            frames: this.anims.generateFrameNumbers('vendedor', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: "felizVendedor",
            frames: this.anims.generateFrameNumbers('vendedor', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: -1
        });
    }

    // CRIA PLAYER
    criarPlayer() {

        let escala = 1;
        let posX = (this.scale.width * 1 / 3) - 100;
        let posY = this.scale.height - 270;

        if (this.characterEscolhido === 'JOSÉ' || this.characterEscolhido === 'JOÃO') {
            escala = 0.5;
            posX -= 20;
            posY -= 60;
        }

        this.add.image(posX, posY, 'personagemMercado')
            .setDepth(1)
            .setScale(escala);
    }

    // LÓGICA DO NPC (chamada pela classe base)
    faceVendedor() {

        if (this.satisfacao === 34) {
            this.vendedor.play('estavelVendedor', true);
            return;
        }

        if (this.satisfacao === 1) {
            this.vendedor.play('bravoVendedor', true);
            return;
        }

        if (this.satisfacao === 67) {
            this.vendedor.play('felizVendedor', true);
            return;
        }

        if (this.satisfacao < 0 || this.satisfacao === 100) {
            this.vendedor.play('felizVendedor', true);
        }
    }
}