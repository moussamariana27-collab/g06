// Cena de combate do salao de beleza.
class SalaoDeBeleza extends Combate {

    constructor() {
        super('SalaoDeBeleza');
    }

    init(data) {
        super.init(data);
    }

    preload() {
        super.preload(); 

        // Carrega fundo, NPC e sprite do personagem escolhido.
        this.load.image('bgSalaoDeBeleza', 'assets/salaodebeleza_interior.png');
        
        this.load.spritesheet('cabelereira', 'assets/Leila.png', {
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

        this.load.image('personagemSalaoDeBeleza', dadosSprite.file);
    }

    create() {
        // Monta o cenario e os personagens da fase.
        this.fundoCena = this.add.image(0, 0, 'bgSalaoDeBeleza')
            .setOrigin(0, 0)
            .setDepth(0);

        this.fundoCena.setDisplaySize(this.scale.width, this.scale.height);

        this.criarCabelereira();
        this.criarPlayer();

        //Botão no canto superior esquerdo (30, 30)
        this.criarBotaoSair(30, 30, () => {
        this.scene.start('Cidade', { 
        personagem: this.personagemEscolhido, 
        posicaoSpawn: { x: 410, y: 555 } // Posição exata de retorno no mapa
        });
    });

        // Inicializa perguntas, barra de satisfacao e ponto de retorno.
        this.initCombate({
            satisfacaoInicial: 34,
            questoes: [

            {
                // Saudacao inicial.
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

        // Cria a interface herdada da classe base.
        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();

        // Liga a expressao da NPC ao valor atual da satisfacao.
        this.updateNPC = this.faceCabelereira;
        this.faceCabelereira();

    }

    // Cria a NPC e registra as animacoes de humor.
    criarCabelereira() {
        this.cabelereira = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'cabelereira'
        )
            .setDepth(2)
            .setScale(0.55)
            .setFlip(true, false);

        utilitariosJogo.garantirAnimacao(this, {
            key: "bravoCabelereira",
            frames: this.anims.generateFrameNumbers('cabelereira', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        utilitariosJogo.garantirAnimacao(this, {
            key: "estavelCabelereira",
            frames: this.anims.generateFrameNumbers('cabelereira', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });

        utilitariosJogo.garantirAnimacao(this, {
            key: "felizCabelereira",
            frames: this.anims.generateFrameNumbers('cabelereira', { start: 2, end: 2 }),
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

        this.add.image(posX, posY, 'personagemSalaoDeBeleza')
            .setDepth(1)
            .setScale(escala);
    }

    // Atualiza a animacao da NPC conforme a satisfacao da conversa.
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
