// CENA DA PADARIA - Minigame de vendas

// Aqui acontece toda a lógica do jogo dentro da padaria.
// O jogador precisa responder perguntas do Seu João e
// encher a barra de satisfação pra fechar a venda.
var padeiro

class Padaria extends Combate {

    constructor() {
        super('Padaria');
    }

    init(data) {
        super.init(data);
    }

    preload() {

        // 🔹 Fundo
        this.load.image('bgPadaria', 'assets/padaria_interior.png');

        // 🔹 NPC (padeiro)
        this.load.spritesheet('padeiro', 'assets/padeiroDeVerdade.png', {
            frameWidth: 459,
            frameHeight: 768
        });

        // 🔹 Personagem do jogador
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

        this.load.image('personagemPadaria', dadosSprite.file);
    }

    create() {

        // Fundo
        const bg = this.add.image(0, 0, 'bgPadaria')
            .setOrigin(0, 0)
            .setDepth(0);

        bg.setDisplaySize(this.scale.width, this.scale.height);

        // NPC
        this.criarPadeiro();

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
        this.updateNPC = this.facePadeiro;
        this.facePadeiro();

        // Voltar pra cidade
        this.input.keyboard.once('keydown-SPACE', () =>
            this.scene.start('Cidade', { character: this.characterEscolhido })
        );

        this.input.keyboard.once('keydown-ENTER', () =>
            this.scene.start('Cidade', { character: this.characterEscolhido })
        );
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

        if (this.characterEscolhido === 'JOSÉ' || this.characterEscolhido === 'JOÃO') {
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

        if (this.satisfacao === 1) {
            this.padeiro.play('bravoPadeiro', true);
            return;
        }

        if (this.satisfacao === 67) {
            this.padeiro.play('felizPadeiro', true);
            return;
        }

        if (this.satisfacao < 0 || this.satisfacao === 100) {
            this.padeiro.play('estavelPadeiro', true);
        }
    }
}