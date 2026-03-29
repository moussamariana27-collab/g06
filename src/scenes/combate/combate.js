class Combate extends Phaser.Scene {

    constructor(key) {
        super({ key });
    }

    init(data) {
        this.personagemEscolhido = data?.character || null;
    }

    preload() {
        this.load.audio('musicabatalha', 'assets/musicabatalha.mp3');
        // Carrega o som de mudança negativa
        this.load.audio('mudancaNegativa', 'assets/mudançanegativa.mp3');
        // Carrega o som de mudança positiva
        this.load.audio('mudancaPositiva', 'assets/mudançapositiva.mp3');
    }

    initCombate(config) {
        this.satisfacao = config.satisfacaoInicial || 34;
        this.questoes = config.questoes || [];
        this.questaoAtual = 0;
        this.satisfacaoAnimada = this.satisfacao;
        this.posicaoSpawn = config.posicaoSpawn || null;

        // Toca a música de batalha
        this.musica = this.sound.add('musicabatalha', { loop: true, volume: 0.15 });
        this.musica.play();
    }

    createUI() {
        this.graficosUI = [];
        const largura = this.scale.width;
        const altura = this.scale.height;

        // ─── CAIXA DE PERGUNTA ────────────────────────────────────────
        const perguntaX = largura * 0.6;
        const perguntaY = altura * 0.7;
        const perguntaW = largura * 0.35;
        const perguntaH = altura * 0.3;

        this.graficosUI.push(this.add.graphics().setDepth(2).fillStyle(0x111111, 1).fillRoundedRect(perguntaX, perguntaY, perguntaW, perguntaH, 16));
        this.graficosUI.push(this.add.graphics().setDepth(3).fillStyle(0xb8d4f0, 1).fillRoundedRect(perguntaX + 6, perguntaY + 6, perguntaW - 12, perguntaH - 12, 12));
        this.graficosUI.push(this.add.graphics().setDepth(4).fillStyle(0xddeeff, 1).fillRoundedRect(perguntaX + 10, perguntaY + 10, perguntaW - 20, perguntaH - 20, 8));
        this.graficosUI.push(this.add.graphics().setDepth(5).fillStyle(0xf5f9ff, 1).fillRoundedRect(perguntaX + 14, perguntaY + 14, perguntaW - 28, perguntaH - 28, 6));

        this.lugarQuestao = this.add.text(perguntaX + 22, perguntaY + 24, "", {
            fontSize: "26px",
            color: "#000000",
            wordWrap: { width: perguntaW - 48 },
            fontFamily: "Pixelify Sans"
        }).setDepth(6);

        // ─── OPÇÃO A ──────────────────────────────────────────────────
        const opcA_X = largura * 0.1;
        const opcA_Y = altura * 0.68;
        const opcA_W = 620;
        const opcA_H = 110;

        this.graficosUI.push(this.add.graphics().setDepth(2).fillStyle(0x111111, 1).fillRoundedRect(opcA_X, opcA_Y, opcA_W, opcA_H, 12));
        this.graficosUI.push(this.add.graphics().setDepth(3).fillStyle(0xb8d4f0, 1).fillRoundedRect(opcA_X + 4, opcA_Y + 4, opcA_W - 8, opcA_H - 8, 9));
        this.graficosUI.push(this.add.graphics().setDepth(4).fillStyle(0xddeeff, 1).fillRoundedRect(opcA_X + 8, opcA_Y + 8, opcA_W - 16, opcA_H - 16, 6));
        this.graficosUI.push(this.add.graphics().setDepth(5).fillStyle(0xf5f9ff, 1).fillRoundedRect(opcA_X + 12, opcA_Y + 12, opcA_W - 24, opcA_H - 24, 4));

        this.opcaoUm = this.add.text(opcA_X + 18, opcA_Y + 18, "", {
            color: "#1a1a2e",
            fontSize: "20px",
            wordWrap: { width: opcA_W - 36 },
            fontFamily: "Pixelify Sans"
        }).setInteractive().setDepth(6);

        // ─── OPÇÃO B ──────────────────────────────────────────────────
        const opcB_X = largura * 0.1;
        const opcB_Y = altura * 0.85;
        const opcB_W = 620;
        const opcB_H = 110;

        this.graficosOpcaoDois = [];
        this.graficosOpcaoDois.push(this.add.graphics().setDepth(2).fillStyle(0x111111, 1).fillRoundedRect(opcB_X, opcB_Y, opcB_W, opcB_H, 12));
        this.graficosOpcaoDois.push(this.add.graphics().setDepth(3).fillStyle(0xb8d4f0, 1).fillRoundedRect(opcB_X + 4, opcB_Y + 4, opcB_W - 8, opcB_H - 8, 9));
        this.graficosOpcaoDois.push(this.add.graphics().setDepth(4).fillStyle(0xddeeff, 1).fillRoundedRect(opcB_X + 8, opcB_Y + 8, opcB_W - 16, opcB_H - 16, 6));
        this.graficosOpcaoDois.push(this.add.graphics().setDepth(5).fillStyle(0xf5f9ff, 1).fillRoundedRect(opcB_X + 12, opcB_Y + 12, opcB_W - 24, opcB_H - 24, 4));

        this.opcaoDois = this.add.text(opcB_X + 18, opcB_Y + 18, "", {
            color: "#1a1a2e",
            fontSize: "20px",
            wordWrap: { width: opcB_W - 36 },
            fontFamily: "Pixelify Sans"
        }).setInteractive().setDepth(6);

        this.opcaoUm.on("pointerdown", () => this.resposta(this.opcaoUm.valor));
        this.opcaoDois.on("pointerdown", () => this.resposta(this.opcaoDois.valor));

        // ─── BARRA DE SATISFAÇÃO UNIFICADA ─────────────────────────────
        this.barra = this.add.graphics().setDepth(10);
        
        this.textoSatisfacao = this.add.text(0, 0, "BARRA DE SATISFAÇÃO", {
            fontSize: "28px",
            color: "#000000",
            fontFamily: "Pixelify Sans",
            fontStyle: "bold"
        }).setDepth(11).setOrigin(0.5);

        this.barraSatisfacao(); // Chama o desenho inicial

        this.scale.on('resize', this.reposicionarUI, this);
    }

    reposicionarUI(gameSize) {
        const { width, height } = gameSize;

        this.graficosUI.forEach(g => g.destroy());
        this.graficosUI = [];

        const perguntaX = width * 0.6, perguntaY = height * 0.7, perguntaW = width * 0.35, perguntaH = height * 0.3;
        this.graficosUI.push(this.add.graphics().setDepth(2).fillStyle(0x111111).fillRoundedRect(perguntaX, perguntaY, perguntaW, perguntaH, 16));
        this.graficosUI.push(this.add.graphics().setDepth(3).fillStyle(0xb8d4f0).fillRoundedRect(perguntaX + 6, perguntaY + 6, perguntaW - 12, perguntaH - 12, 12));
        this.graficosUI.push(this.add.graphics().setDepth(4).fillStyle(0xddeeff).fillRoundedRect(perguntaX + 10, perguntaY + 10, perguntaW - 20, perguntaH - 20, 8));
        this.graficosUI.push(this.add.graphics().setDepth(5).fillStyle(0xf5f9ff).fillRoundedRect(perguntaX + 14, perguntaY + 14, perguntaW - 28, perguntaH - 28, 6));

        const opcA_X = width * 0.1, opcA_Y = height * 0.68, opcA_W = 620, opcA_H = 110;
        this.graficosUI.push(this.add.graphics().setDepth(2).fillStyle(0x111111).fillRoundedRect(opcA_X, opcA_Y, opcA_W, opcA_H, 12));
        this.graficosUI.push(this.add.graphics().setDepth(3).fillStyle(0xb8d4f0).fillRoundedRect(opcA_X + 4, opcA_Y + 4, opcA_W - 8, opcA_H - 8, 9));
        this.graficosUI.push(this.add.graphics().setDepth(4).fillStyle(0xddeeff).fillRoundedRect(opcA_X + 8, opcA_Y + 8, opcA_W - 16, opcA_H - 16, 6));
        this.graficosUI.push(this.add.graphics().setDepth(5).fillStyle(0xf5f9ff).fillRoundedRect(opcA_X + 12, opcA_Y + 12, opcA_W - 24, opcA_H - 24, 4));

        const opcB_X = width * 0.1, opcB_Y = height * 0.85, opcB_W = 620, opcB_H = 110;
        this.graficosUI.push(this.add.graphics().setDepth(2).fillStyle(0x111111).fillRoundedRect(opcB_X, opcB_Y, opcB_W, opcB_H, 12));
        this.graficosUI.push(this.add.graphics().setDepth(3).fillStyle(0xb8d4f0).fillRoundedRect(opcB_X + 4, opcB_Y + 4, opcB_W - 8, opcB_H - 8, 9));
        this.graficosUI.push(this.add.graphics().setDepth(4).fillStyle(0xddeeff).fillRoundedRect(opcB_X + 8, opcB_Y + 8, opcB_W - 16, opcB_H - 16, 6));
        this.graficosUI.push(this.add.graphics().setDepth(5).fillStyle(0xf5f9ff).fillRoundedRect(opcB_X + 12, opcB_Y + 12, opcB_W - 24, opcB_H - 24, 4));

        this.lugarQuestao.setPosition(perguntaX + 22, perguntaY + 24);
        this.opcaoUm.setPosition(opcA_X + 18, opcA_Y + 18);
        this.opcaoDois.setPosition(opcB_X + 18, opcB_Y + 18);

        this.barraSatisfacao();
    }

    barraSatisfacao() {
        const larguraCard = 600;
        const alturaCard = 110;
        const x = (this.scale.width / 2) - (larguraCard / 2);
        const y = 30;

        const valor = Phaser.Math.Clamp(this.satisfacaoAnimada, 0, 100);
        this.barra.clear();

        // ─── CARD DA BARRA (Estilo Pergunta) ───
        this.barra.fillStyle(0x111111, 1).fillRoundedRect(x, y, larguraCard, alturaCard, 16);
        this.barra.fillStyle(0xb8d4f0, 1).fillRoundedRect(x + 5, y + 5, larguraCard - 10, alturaCard - 10, 12);
        this.barra.fillStyle(0xddeeff, 1).fillRoundedRect(x + 9, y + 9, larguraCard - 18, alturaCard - 18, 8);
        this.barra.fillStyle(0xf5f9ff, 1).fillRoundedRect(x + 13, y + 13, larguraCard - 26, alturaCard - 26, 6);

        // Posiciona texto dentro do card
        if (this.textoSatisfacao) {
            this.textoSatisfacao.setPosition(x + larguraCard / 2, y + 35);
        }

        // ─── DESENHO DA BARRA "GORDA" ───
        const barraW = larguraCard - 60;
        const barraH = 35; // Altura aumentada para ser "gorda"
        const barraX = x + 30;
        const barraY = y + 58;

        // Fundo cinza da barra
        this.barra.fillStyle(0xcccccc, 1);
        this.barra.fillRoundedRect(barraX, barraY, barraW, barraH, 8);

        // Cor dinâmica baseada no valor
        let cor = 0x00ff00;
        if (valor <= 33) cor = 0xff0000;
        else if (valor <= 66) cor = 0xffff00;

        // Preenchimento
        if (valor > 0) {
            this.barra.fillStyle(cor, 1);
            const larguraPreenchida = (valor / 100) * barraW;
            this.barra.fillRoundedRect(barraX, barraY, larguraPreenchida, barraH, 8);
        }
    }

    animarBarra(novoValor) {
        this.tweens.add({
            targets: this,
            satisfacaoAnimada: Phaser.Math.Clamp(novoValor, 0, 100),
            duration: 500,
            ease: 'Power2',
            onUpdate: () => {
                this.barraSatisfacao();
            }
        });
    }

    tremerBarra() {
        this.tweens.add({
            targets: [this.barra, this.textoSatisfacao],
            x: '+=6',
            duration: 40,
            yoyo: true,
            repeat: 5,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.barra.x = 0;
                this.textoSatisfacao.x = (this.scale.width / 2);
            }
        });
    }

    _setModoDialogo(ativo) {
        this.barra.setVisible(!ativo);
        this.textoSatisfacao.setVisible(!ativo);
        this.opcaoDois.setVisible(!ativo);
        this.graficosOpcaoDois.forEach(g => g.setVisible(!ativo));
    }

    mostrarQuestao() {
        let perguntaAtual = this.questoes[this.questaoAtual];
        this.lugarQuestao.setText(perguntaAtual.pergunta);

        if (perguntaAtual.soDialogo) {
            this._setModoDialogo(true);
            this.opcaoUm.setText(perguntaAtual.certo);
            this.opcaoUm.setInteractive();
            this.opcaoUm.once("pointerdown", () => {
                this.opcaoUm.disableInteractive();
                this._setModoDialogo(false);
                this.proximaPergunta();
            });
            return;
        }

        this._setModoDialogo(false);
        this.opcaoUm.setInteractive();
        this.opcaoDois.setInteractive();

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

    resposta(decisao) {
        // Ignora clique se a questão atual for só diálogo
        if (this.questoes[this.questaoAtual]?.soDialogo) return;
        this.opcaoUm.disableInteractive();
        this.opcaoDois.disableInteractive();

        let q = this.questoes[this.questaoAtual];

        if (decisao === q.resposta) {
            // Toca o som de acerto ao responder corretamente
            this.sound.play('mudancaPositiva', { loop: false, volume: 0.3 });
            this.satisfacao += 33;
            this.tweens.add({
                targets: this.barra,
                scaleY: 1.05,
                duration: 80,
                yoyo: true,
            });
            if (this.updateNPC) this.updateNPC();
        } else {
            // Toca o som de alerta ao responder errado
            this.sound.play('mudancaNegativa', { loop: false, volume: 1 });
            this.satisfacao -= 33;
            this.tremerBarra();
            this.cameras.main.shake(120, 0.008);
            if (this.updateNPC) this.updateNPC();
        }

        this.animarBarra(this.satisfacao);

        if (this.satisfacao >= 100) return this.vitoria();
        if (this.satisfacao < 0) return this.derrota();

        this.time.delayedCall(800, () => {
            this.proximaPergunta();
        });
    }

    proximaPergunta() {
        this.questaoAtual++;
        if (this.questaoAtual >= this.questoes.length) {
            return this.fimDasPerguntas();
        }
        this.opcaoUm.setInteractive();
        this.opcaoDois.setInteractive();
        this.mostrarQuestao();
    }

    vitoria() {
        this.mostrarTelaFinal({
            texto: "VOCÊ CONVENCEU O CLIENTE",
            voltarPara: this.cenaVitoria || ("FeedbackVitoria" + this.scene.key),
        });
    }

    derrota() {
        this.mostrarTelaFinal({
            texto: "VOCÊ NÃO FOI CAPAZ DE CONQUISTAR O CLIENTE",
            voltarPara: this.cenaDerrota || ("FeedbackDerrota" + this.scene.key),
            tamanhoFonte: 58
        });
    }

    fimDasPerguntas() {
        this.mostrarTelaFinal({
            texto: "O CLIENTE TE MANDOU EMBORA",
            voltarPara: this.cenaDerrota || ("FeedbackDerrota" + this.scene.key),
        });
    }

    mostrarTelaFinal({ texto, voltarPara = 'Cidade', tamanhoFonte = 64 }) {
        const textoX = (this.scale.width / 2) - 600;
        const textoY = (this.scale.height / 2) - 200;
        const textoW = 1200;
        const textoH = 300;

        this.add.graphics().setDepth(3).fillStyle(0x5078D8, 1).fillRoundedRect(textoX, textoY, textoW, textoH, 20);
        this.add.graphics().setDepth(3).fillStyle(0xA0C8F0, 1).fillRoundedRect(textoX + 8, textoY + 8, textoW - 16, textoH - 16, 16);
        this.add.graphics().setDepth(3).fillStyle(0xE8F0FF, 1).fillRoundedRect(textoX + 16, textoY + 16, textoW - 32, textoH - 32, 12);

        this.add.text(textoX + textoW / 2, textoY + textoH / 2, texto, {
            color: '#000000',
            fontSize: tamanhoFonte,
            wordWrap: { width: textoW - 64 },
            fontFamily: "Pixelify Sans"
        }).setDepth(4).setOrigin(0.5);

        this.barra.setVisible(false);
        this.textoSatisfacao.setVisible(false);
        this.opcaoUm.setVisible(false);
        this.opcaoDois.setVisible(false);
        this.lugarQuestao.setVisible(false);
        this.graficosUI.forEach(g => g.setVisible(false));

        this.time.delayedCall(4000, () => {
            // Para a música de combate antes de trocar de cena
            if (this.musica && this.musica.isPlaying) {
                this.musica.stop();
            }
            this.scene.start(voltarPara, { character: this.personagemEscolhido,
                                            posicaoSpawn: this.posicaoSpawn ,
                                            cenaCombate: this.scene.key
             });
        });
    }
}
