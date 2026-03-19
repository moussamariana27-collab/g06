class SalaoDeBeleza extends Phaser.Scene {
    constructor() {
        super({ key: 'SalaoDeBeleza' });
    }

    init(data) {
        this.characterEscolhido = data?.character || null;
    }

    preload() {
        this.load.image('bgSalaoDeBeleza', 'assets/salaodebeleza_interior.png');
        this.load.image('player', 'assets/gn-negra-comercio.png');
        this.load.spritesheet('cabelereira', 'assets/Leila.png', {
            frameWidth: 640,
            frameHeight: 1080
        });  
    }

    create() {
        const bg = this.add.image(0, 0, 'bgSalaoDeBeleza').setOrigin(0, 0);
        bg.setDisplaySize(this.scale.width, this.scale.height);

        this.add.text(this.scale.width / 2, this.scale.height - 40, 'Pressione ESPAÇO para voltar', {
            fontSize: '16px', fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 6 }
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => this.scene.start('Cidade', { character: this.characterEscolhido }));
        this.input.keyboard.once('keydown-ENTER', () => this.scene.start('Cidade', { character: this.characterEscolhido }));

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
            frames: this.anims.generateFrameNumbers('cabelereira', {start:0, end:0}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "estavelCabelereira",
            frames: this.anims.generateFrameNumbers('cabelereira', {start:1, end:1}),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: "felizCabelereira",
            frames: this.anims.generateFrameNumbers('cabelereira', {start:2, end:2}),
            frameRate: 1,
            repeat: -1
        });

        this.add.image(
            (this.scale.width * 1 / 3) - 100,
            this.scale.height - 270,
            'player'
        )
            .setDepth(1)
            .setScale(0.9);

        this.satisfacao = 34;

        this.questoes = [
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
        ];

        this.questaoAtual = 0;

        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();
        this.faceCabelereira();
    }

     createUI() {

    this.graficosUI = [];

    // ─── CAIXA DE PERGUNTA ────────────────────────────────────────
    const perguntaX = 900;
    const perguntaY = 600;
    const perguntaW = 500;
    const perguntaH = 200;

    // Borda preta externa
    this.graficosUI.push(
        this.add.graphics().setDepth(2)
            .fillStyle(0x111111, 1)
            .fillRoundedRect(perguntaX, perguntaY, perguntaW, perguntaH, 16)
    );
    // Moldura azul claro
    this.graficosUI.push(
        this.add.graphics().setDepth(3)
            .fillStyle(0xb8d4f0, 1)
            .fillRoundedRect(perguntaX + 6, perguntaY + 6, perguntaW - 12, perguntaH - 12, 12)
    );
    // Aro azul mais claro
    this.graficosUI.push(
        this.add.graphics().setDepth(4)
            .fillStyle(0xddeeff, 1)
            .fillRoundedRect(perguntaX + 10, perguntaY + 10, perguntaW - 20, perguntaH - 20, 8)
    );
    // Fundo escuro (área do texto)
    this.graficosUI.push(
        this.add.graphics().setDepth(5)
            .fillStyle(0xf5f9ff, 1)
            .fillRoundedRect(perguntaX + 14, perguntaY + 14, perguntaW - 28, perguntaH - 28, 6)
    );

    this.lugarQuestao = this.add.text(
        perguntaX + 22,
        perguntaY + 24,
        "",
        {
            fontSize: "26px",
            color: "#000000",
            wordWrap: { width: perguntaW - 48 },
            fontFamily: "Pixelify Sans"
        }
    ).setDepth(6);

    // ─── OPÇÃO A ──────────────────────────────────────────────────
    const opcA_X = 110;
    const opcA_Y = 580;
    const opcA_W = 620;
    const opcA_H = 110;

    this.graficosUI.push(
        this.add.graphics().setDepth(2)
            .fillStyle(0x111111, 1)
            .fillRoundedRect(opcA_X, opcA_Y, opcA_W, opcA_H, 12)
    );
    this.graficosUI.push(
        this.add.graphics().setDepth(3)
            .fillStyle(0xb8d4f0, 1)
            .fillRoundedRect(opcA_X + 4, opcA_Y + 4, opcA_W - 8, opcA_H - 8, 9)
    );
    this.graficosUI.push(
        this.add.graphics().setDepth(4)
            .fillStyle(0xddeeff, 1)
            .fillRoundedRect(opcA_X + 8, opcA_Y + 8, opcA_W - 16, opcA_H - 16, 6)
    );
    this.graficosUI.push(
        this.add.graphics().setDepth(5)
            .fillStyle(0xf5f9ff, 1)
            .fillRoundedRect(opcA_X + 12, opcA_Y + 12, opcA_W - 24, opcA_H - 24, 4)
    );

    this.opcaoUm = this.add.text(
        opcA_X + 18,
        opcA_Y + 18,
        "",
        {
            color: "#1a1a2e",
            fontSize: "20px",
            wordWrap: { width: opcA_W - 36 },
            fontFamily: "Pixelify Sans"
        }
    ).setInteractive().setDepth(6);

    // ─── OPÇÃO B ──────────────────────────────────────────────────
    const opcB_X = 110;
    const opcB_Y = 720;
    const opcB_W = 620;
    const opcB_H = 110;

    this.graficosUI.push(
        this.add.graphics().setDepth(2)
            .fillStyle(0x111111, 1)
            .fillRoundedRect(opcB_X, opcB_Y, opcB_W, opcB_H, 12)
    );
    this.graficosUI.push(
        this.add.graphics().setDepth(3)
            .fillStyle(0xb8d4f0, 1)
            .fillRoundedRect(opcB_X + 4, opcB_Y + 4, opcB_W - 8, opcB_H - 8, 9)
    );
    this.graficosUI.push(
        this.add.graphics().setDepth(4)
            .fillStyle(0xddeeff, 1)
            .fillRoundedRect(opcB_X + 8, opcB_Y + 8, opcB_W - 16, opcB_H - 16, 6)
    );
    this.graficosUI.push(
        this.add.graphics().setDepth(5)
            .fillStyle(0xf5f9ff, 1)
            .fillRoundedRect(opcB_X + 12, opcB_Y + 12, opcB_W - 24, opcB_H - 24, 4)
    );

    this.opcaoDois = this.add.text(
        opcB_X + 18,
        opcB_Y + 18,
        "",
        {
            color: "#1a1a2e",
            fontSize: "20px",
            wordWrap: { width: opcB_W - 36 },
            fontFamily: "Pixelify Sans"
        }
    ).setInteractive().setDepth(6);

    this.opcaoUm.on("pointerdown",  () => this.resposta(this.opcaoUm.valor));
    this.opcaoDois.on("pointerdown", () => this.resposta(this.opcaoDois.valor));

    this.barra = this.add.graphics();
}

    mostrarQuestao() {
        let perguntaAtual = this.questoes[this.questaoAtual];

        this.lugarQuestao.setText(perguntaAtual.pergunta);

        let trocarLugar = Math.random() < 0.5;

        if (trocarLugar) {
            this.opcaoUm.setText(perguntaAtual.certo);
            this.opcaoDois.setText(perguntaAtual.errado);
            this.opcaoUm.valor = true;
            this.opcaoDois.valor = false;
        } else {
            this.opcaoDois.setText(perguntaAtual.certo);
            this.opcaoUm.setText(perguntaAtual.errado);
            this.opcaoUm.valor = false;
            this.opcaoDois.valor = true;
        }
    }

    resposta(decisaoJogador) {
        let perguntaAtual = this.questoes[this.questaoAtual];

        if (decisaoJogador === perguntaAtual.resposta) {
            this.satisfacao += 33;
        } else {
            this.satisfacao -= 33;
        }

        this.barraSatisfacao();

        if (this.satisfacao >= 100) {
            this.vitoria();
            return;
        }

        if (this.satisfacao < 0) {
            this.derrota();
            return;
        }

        this.proximaPergunta();
    }

    proximaPergunta() {
        this.questaoAtual += 1;

        if (this.questaoAtual >= this.questoes.length) {
            this.fimDasPerguntas();
            return;
        }

        this.mostrarQuestao();
        this.faceCabelereira();
    }

    barraSatisfacao() {
        this.barra.clear();

        this.barra.fillStyle(0x000000);
        this.barra.fillRect(300, 50, 1000, 20);

        this.barra.fillStyle(0x00ff00);
        this.barra.fillRect(300, 50, this.satisfacao * 10, 20);
    }

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
            this.cabelereira.play('estavelCabelereira', true);
            return;
        }
    }

    vitoria() {
        this.add.text(
            (this.scale.width / 2) - 600,
            (this.scale.height / 2) - 200,
            "VOCÊ CONVENCEU O CLIENTE",
            {
                color: '#000',
                backgroundColor: '#ffffff',
                fontSize: 64,
                padding: 128
            }
        ).setDepth(4);

        this.barra.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);

        this.time.delayedCall(4000, () => {
            this.scene.start('Cidade', { character: this.characterEscolhido }); 

        });
    }

    derrota() {
        this.add.text(
            (this.scale.width / 2) - 870,
            (this.scale.height / 2) - 200,
            "VOCÊ NÃO FOI CAPAZ DE CONQUISTAR O CLIENTE",
            {
                color: '#000',
                backgroundColor: '#ffffff',
                fontSize: 58,
                padding: 120
            }
        ).setDepth(4);

        this.barra.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);

        this.time.delayedCall(4000, () => {
            this.scene.start('MainScene');
        });
    }

    fimDasPerguntas() {
        this.add.text(
            (this.scale.width / 2) - 600,
            (this.scale.height / 2) - 200,
            "O CLIENTE TE MANDOU EMBORA",
            {
                color: '#000',
                backgroundColor: '#ffffff',
                fontSize: 64,
                padding: 128
            }
        ).setDepth(4);

        this.barra.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);

        this.time.delayedCall(4000, () => {
            this.scene.start('MainScene');
        });
    }
}