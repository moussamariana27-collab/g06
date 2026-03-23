class SalaoDeBeleza extends Combate {

    constructor() {
        super('SalaoDeBeleza');
    }

    init(data) {
        super.init(data);
    }

     preload() {
        this.load.image('bgSalaoDeBeleza', 'assets/salaodebeleza_interior.png');
        this.load.spritesheet('cabelereira', 'assets/Leila.png', {
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

        this.load.image('personagemSalaoDeBeleza', dadosSprite.file);
    }

    create() {

        // Fundo
        const bg = this.add.image(0, 0, 'bgSalaoDeBeleza')
            .setOrigin(0, 0)
            .setDepth(0);

        bg.setDisplaySize(this.scale.width, this.scale.height);

        // NPC
        this.criarCabelereira();

        // Jogador
        this.criarPlayer();

        // Configura combate (usa classe base)
        this.initCombate({
            satisfacaoInicial: 34,
            questoes: 
 
        [

            {
                pergunta: "DONA LEILA: O que a sua maquininha tem que a minha não tem?",
                certo: "Suporte 24 horas por dia, 7 dias da semana",
                errado: "Suporte para pagamentos via criptomoeda por sistema desenvolvido pela Cielo",
                resposta: true
            },
            {
                pergunta: "DONA LEILA:E se eu me arrepender?",
                certo: "Você não vai! Experimente e verá os benefícios.",
                errado: "Infelizmente não tem jeito Seu João. Tem\nque esperar as parcelas caírem.",
                resposta: true
            },
            { pergunta: "teste teste teste 3", certo: "cielo", errado: "pix", resposta: true },
            { pergunta: "etset etset etset 4", certo: "resolverei o seu problema, seu Joao!", errado: "senhor,mas!!!...", resposta: true },
            { pergunta: "teste teste teste 5", certo: "certoo", errado: "errado", resposta: true }
        ]

        });

        // UI e lógica (HERDADO)
        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();

        // Liga o NPC ao sistema base
        this.updateNPC = this.faceCabelereira;
        this.faceCabelereira();

        // Voltar pra cidade
        this.input.keyboard.once('keydown-SPACE', () =>
            this.scene.start('Cidade', { character: this.characterEscolhido })
        );

        this.input.keyboard.once('keydown-ENTER', () =>
            this.scene.start('Cidade', { character: this.characterEscolhido })
        );
    }

    // CRIA NPC
    criarCabelereira() {

        this.cabelereira = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'cabelereira'
        )
            .setDepth(2)
            .setScale(0.55)
            .setFlip(true, false);

        // Animações
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

        this.add.image(posX, posY, 'personagemSalaoDeBeleza')
            .setDepth(1)
            .setScale(escala);
    }

    // LÓGICA DO NPC (chamada pela classe base)
    faceCabelereira() {

        if (this.satisfacao === 34) {
            this.cabelereira.play('estavelCabelereira', true);
            return;
        }

        if (this.satisfacao === 1) {
            this.cabelereira.play('bravoCabelereira', true);
            return;
        }

        if (this.satisfacao === 67) {
            this.cabelereira.play('felizCabelereira', true);
            return;
        }

        if (this.satisfacao < 0 || this.satisfacao === 100) {
            this.cabelereira.play('felizCabelereira', true);
        }
    }
}