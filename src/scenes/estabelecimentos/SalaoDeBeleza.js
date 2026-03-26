class SalaoDeBeleza extends Combate {

    constructor() {
        super('SalaoDeBeleza');
    }

    init(data) {
        super.init(data);
    }

    preload() {
        super.preload(); 

        this.load.image('bgSalaoDeBeleza', 'assets/salaodebeleza_interior.png');
        
        this.load.spritesheet('cabelereira', 'assets/Leila.png', {
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

        this.load.image('personagemSalaoDeBeleza', dadosSprite.file);
    }

    create() {
        this.fundoCena = this.add.image(0, 0, 'bgSalaoDeBeleza')
            .setOrigin(0, 0)
            .setDepth(0);

        this.fundoCena.setDisplaySize(this.scale.width, this.scale.height);

        this.criarCabelereira();
        this.criarPlayer();

        this.initCombate({
            satisfacaoInicial: 34,
            questoes: [

            {
                // Saudação inicial (Apenas Diálogo)
                pergunta: "DONA LEILA: Oi, tudo bem? Você tem horário marcado?",
                certo: "Oi, Dona Leila! Sou Gerente de Negócios da Cielo. Vim até aqui porque tenho uma proposta que acredito que vai fazer sentido pro seu salão. A senhora teria alguns minutinhos pra ouvir?",
                soDialogo: true
            },
            {
                pergunta: "DONA LEILA: Quando a cliente paga no crédito, sinto que as taxas pesam demais. Como vocês conseguem me ajudar nisso?",
                certo: "Conseguimos ajustar uma condição que faça sentido pro seu faturamento, com taxas equilibradas e sem perder o controle dos custos.",
                errado: "As taxas são padrão e não mudam muito, independente do tipo de negócio.",
                resposta: true
            },
            {
                pergunta: "DONA LEILA: Tenho medo de oferecer parcelamento e acabar perdendo dinheiro. Como fico de olho nisso?",
                certo: "Com a Cielo você oferece parcelamento de forma estratégica, aumentando seu ticket médio sem perder o controle dos custos.",
                errado: "Parcelamento sempre tem risco. O melhor é só aceitar pagamento à vista mesmo.",
                resposta: true
            },
            { 
                pergunta: "DONA LEILA: Se eu aceitar crédito parcelado, quando esse dinheiro cai na minha conta?", 
                certo: "Com a antecipação de recebíveis da Cielo, você recebe o valor integral no dia seguinte e mantém seu fluxo de caixa saudável.", 
                errado: "Você precisa aguardar cada parcela cair separadamente — pode levar meses até receber tudo.", 
                resposta: true 
            },
            { 
                pergunta: "DONA LEILA: Meu salão é pequeno. Faz sentido contratar a Cielo pra um negócio do meu tamanho?", 
                certo: "Faz sim! A solução é ajustada ao seu faturamento — desde pequenos salões até grandes redes, a operação é simples e acessível.", 
                errado: "Na verdade, o ideal é para negócios maiores com volume alto de transações.", 
                resposta: true 
            },
            { 
                pergunta: "DONA LEILA: Tenho medo de complicar minha rotina aqui no salão. Não quero depender de suporte o tempo todo.", 
                certo: "A operação é fácil, rápida e sem complicação — e o suporte técnico está disponível 24h pra te ajudar sempre que precisar.", 
                errado: "É um sistema completo, vai exigir um bom tempo de adaptação da sua equipe.", 
                resposta: true 
            }

        ],

        posicaoSpawn: { x: 410, y: 555 }, 

        });

        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();

        this.updateNPC = this.faceCabelereira;
        this.faceCabelereira();

    }

    criarCabelereira() {
        this.cabelereira = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'cabelereira'
        )
            .setDepth(2)
            .setScale(0.55)
            .setFlip(true, false);

        this.anims.create({
            key: "bravoCabelereira",
            frames: this.anims.generateFrameNumbers('cabelereira', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: "estavelCabelereira",
            frames: this.anims.generateFrameNumbers('cabelereira', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: "felizCabelereira",
            frames: this.anims.generateFrameNumbers('cabelereira', { start: 2, end: 2 }),
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

        this.add.image(posX, posY, 'personagemSalaoDeBeleza')
            .setDepth(1)
            .setScale(escala);
    }

    faceCabelereira() {
        if (this.satisfacao === 34) {
            this.cabelereira.play('estavelCabelereira', true);
            return;
        } else if (this.satisfacao === 1) {
            this.cabelereira.play('bravoCabelereira', true);
            return;
        } else if (this.satisfacao === 67) {
            this.cabelereira.play('felizCabelereira', true);
            return;
        } else if (this.satisfacao < 0 || this.satisfacao === 100) {
            this.cabelereira.play('felizCabelereira', true);
        }
    }
}