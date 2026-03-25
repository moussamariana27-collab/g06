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

            // Pergunta 1
            {
                pergunta: "SEU TIÃO: Bom dia...",
                certo: "Entendo sua preocupação...",
                errado: "Infelizmente não temos...",
                resposta: true
            },

            // Pergunta 2
            {
                pergunta: "SEU TIÃO: Outra coisa...",
                certo: "Pode ficar tranquilo...",
                errado: "Seu Tião, a documentação...",
                resposta: true
            },

            // Pergunta 3
            {
                pergunta: "SEU TIÃO: Pra falar a verdade...",
                certo: "Essa é uma preocupação...",
                errado: "As taxas mudam...",
                resposta: true 
            },

            // Pergunta 4
            { 
                pergunta: "SEU TIÃO: E quando eu vendo parcelado?",
                certo: "Resolve sim...",
                errado: "Infelizmente não tem solução...",
                resposta: true 
            },

            // Pergunta 5
            {
                pergunta: "SEU TIÃO: Olha, você explicou bem...",
                certo: "Com certeza...",
                errado: "Bom, aí já é decisão...",
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