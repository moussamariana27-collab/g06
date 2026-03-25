class LojaDeRoupa extends Combate {

    constructor() {
        super('LojaDeRoupa');
    }

    init(data) {
        super.init(data);
    }

    preload() {

        // Fundo
        this.load.image('bgLojaDeRoupa', 'assets/lojaderoupa_interior.png');

        // NPC (padeiro)
        this.load.spritesheet('Vendedora', 'assets/Nayara.png', {
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

        this.load.image('personagemLojaDeRoupa', dadosSprite.file);
    }

    create() {

        // Fundo
        this.bg = this.add.image(0, 0, 'bgLojaDeRoupa')
            .setOrigin(0.5)
            .setDepth(0)
            .setPosition(this.scale.width / 2, this.scale.height / 2)
            .setDisplaySize(this.scale.width, this.scale.height);

        this.resizeBackground();

        // NPC
        this.criarVendedora();

        // Jogador
        this.criarPlayer();

        // Configura combate (usa classe base)
        this.initCombate({
            satisfacaoInicial: 34,
            questoes: 
                [

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

        ]
        });

        // UI e lógica (HERDADO)
        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();

        // Liga o NPC ao sistema base
        this.updateNPC = this.faceVendedora;
        this.faceVendedora();

        // Voltar pra cidade
        this.input.keyboard.once('keydown-SPACE', () =>
            this.scene.start('Cidade', { personagem: this.personagemEscolhido })
        );

        this.input.keyboard.once('keydown-ENTER', () =>
            this.scene.start('Cidade', { personagem: this.personagemEscolhido })
        );
    }

    resizeBackground() {

        const largura = this.scale.width;
        const altura = this.scale.height;

        this.bg.setPosition(largura / 2, altura / 2);
        this.bg.setDisplaySize(largura, altura);
}

    // CRIA NPC
    criarVendedora() {

        this.Vendedora = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'Vendedora'
        )
            .setDepth(2)
            .setScale(0.55)
            .setFlip(true, false);

        // Animações
        this.anims.create({
            key: "bravoVendedora",
            frames: this.anims.generateFrameNumbers('Vendedora', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: "estavelVendedora",
            frames: this.anims.generateFrameNumbers('Vendedora', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: "felizVendedora",
            frames: this.anims.generateFrameNumbers('Vendedora', { start: 2, end: 2 }),
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

        this.add.image(posX, posY, 'personagemLojaDeRoupa')
            .setDepth(1)
            .setScale(escala);
    }

    // LÓGICA DO NPC (chamada pela classe base)
    faceVendedora() {

        if (this.satisfacao === 34) {
            this.Vendedora.play('estavelVendedora', true);
            return;
        }

        else if (this.satisfacao === 1) {
            this.Vendedora.play('bravoVendedora', true);
            return;
        }

        else if (this.satisfacao === 67) {
            this.Vendedora.play('felizVendedora', true);
            return;
        }

        else if (this.satisfacao < 0 || this.satisfacao === 100) {
            this.Vendedora.play('felizVendedora', true);
        }
    }
}