class SalaoDeBeleza extends Combate {

    constructor() {
        super('SalaoDeBeleza');
    }

    init(data) {
        super.init(data);
    }

    preload() {
        super.preload(); // Carrega a música de batalha do Combate

        // Carrega a imagem de fundo do salão
        this.load.image('bgSalaoDeBeleza', 'assets/salaodebeleza_interior.png');
        
        // Carrega a spritesheet da cabelereira (NPC) Leila
        this.load.spritesheet('cabelereira', 'assets/Leila.png', {
            frameWidth: 640,
            frameHeight: 1080
        });  

        // Carrega os sprites dos personagens do jogador
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

        // Carrega o sprite do personagem escolhido
        this.load.image('personagemSalaoDeBeleza', dadosSprite.file);
    }

    create() {
        // Fundo do salão — imagem responsiva que se adapta ao tamanho da tela
        this.fundoCena = this.add.image(0, 0, 'bgSalaoDeBeleza')
            .setOrigin(0, 0)
            .setDepth(0);

        this.fundoCena.setDisplaySize(this.scale.width, this.scale.height);

        // Cria o sprite da cabelereira (NPC Leila)
        this.criarCabelereira();

        // Cria o sprite do jogador na cena
        this.criarPlayer();

        // Inicializa o sistema de combate (satisfação, questões e lógica de vitória/derrota)
        // A satisfação começa em 34 — já dá uma largada pra não começar zerado
        // 50% de chance de trocar as opções de lugar pra evitar que o jogador decore a posição
        this.initCombate({
            satisfacaoInicial: 34,
            questoes: [

            {
                pergunta: "DONA LEILA: O que a sua maquininha tem que a minha não tem?",
                certo: "Suporte 24 horas por dia, 7 dias da semana",
                errado: "Suporte para pagamentos via criptomoeda por sistema desenvolvido pela Cielo",
                resposta: true
            },
            {
                pergunta: "DONA LEILA: E se eu me arrepender?",
                certo: "Você não vai! Experimente e verá os benefícios com suas clientes.",
                errado: "Infelizmente não tem jeito. Tem que esperar os prazos.",
                resposta: true
            },
            { 
                pergunta: "DONA LEILA: Meu salão é pequeno. A CieloHub vai funcionar bem em um lugar assim?", 
                certo: "Perfeito para negócios de qualquer tamanho! Desde salões pequenos até grandes redes.", 
                errado: "Infelizmente a solução é só para grandes estabelecimentos.", 
                resposta: true 
            },
            { 
                pergunta: "DONA LEILA: Minhas clientes pagam muitas vezes com crédito parcelado. Como fica isso com a Cielo?", 
                certo: "Você recebe o dinheiro integral no dia seguinte, sem esperar pelas parcelas.", 
                errado: "Você precisa esperar cada parcela cair para começar a usar o dinheiro.", 
                resposta: true 
            },
            { 
                pergunta: "DONA LEILA: Eu me sinto mais segura trabalhando com o que conheço. Como funciona essa integração?", 
                certo: "A máquina é intuitiva e o suporte técnico ajuda em todas as dúvidas!", 
                errado: "Você vai ter que aprender sozinha, o sistema é complexo.", 
                resposta: true 
            }

        ]
        });

        // Cria a interface de usuário (UI) herdada da classe Combate
        this.createUI();
        
        // Exibe a primeira questão na tela
        this.mostrarQuestao();
        
        // Mostra a barra visual de satisfação do NPC
        this.barraSatisfacao();

        // Conecta o método de expressão do NPC ao sistema de atualização da base
        // Qualquer mudança em this.satisfacao acionará faceCabelereira()
        this.updateNPC = this.faceCabelereira;
        this.faceCabelereira();

        // Input: retorna para a cidade ao pressionar ESPAÇO ou ENTER
        this.input.keyboard.once('keydown-SPACE', () => {
            // Para a música de batalha antes de voltar
            this.musica.stop();
            this.scene.start('Cidade', { character: this.characterEscolhido });
        });

        this.input.keyboard.once('keydown-ENTER', () => {
            // Para a música de batalha antes de voltar
            this.musica.stop();
            this.scene.start('Cidade', { character: this.characterEscolhido });
        });
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

        // Define as keys e os Frames em que o NPC está estável, feliz e bravo 
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

    // Cria player
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

    // Lógica do NPC, responsável por alterar expressão da cabeleleira de acordo com a barra de satistação 
    faceCabelereira() {

        if (this.satisfacao === 34) {
            this.cabelereira.play('estavelCabelereira', true);
            return;
        }

        else if (this.satisfacao === 1) {
            this.cabelereira.play('bravoCabelereira', true);
            return;
        }

        else if (this.satisfacao === 67) {
            this.cabelereira.play('felizCabelereira', true);
            return;
        }

        else if (this.satisfacao < 0 || this.satisfacao === 100) {
            this.cabelereira.play('felizCabelereira', true);
        }
    }
}