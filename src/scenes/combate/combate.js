class Combate extends Phaser.Scene {

    constructor(key) {
        super({ key });
    }

    init(data) {
        this.characterEscolhido = data?.character || null;
    }

    initCombate(config) {
        this.satisfacao = config.satisfacaoInicial || 34;
        this.questoes = config.questoes || [];
        this.questaoAtual = 0;
        this.satisfacaoAnimada = this.satisfacao;
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
    
    mostrarQuestao() {

        let perguntaAtual = this.questoes[this.questaoAtual];

        this.lugarQuestao.setText(perguntaAtual.pergunta);

        // 50% de chance de trocar as opções de lugar
        let trocarLugar = Math.random() < 0.5;

        if (trocarLugar) {
            // Certo em cima, errado embaixo
            this.opcaoUm.setText(perguntaAtual.certo);
            this.opcaoDois.setText(perguntaAtual.errado);

            this.opcaoUm.valor = true;   // true = essa é a resposta certa
            this.opcaoDois.valor = false;

        } else {
            // Errado em cima, certo embaixo
            this.opcaoDois.setText(perguntaAtual.certo);
            this.opcaoUm.setText(perguntaAtual.errado);

            this.opcaoUm.valor = false;
            this.opcaoDois.valor = true;

        }

    }

    mostrarTextoGradual(texto) {
    this.lugarQuestao.setText("");
    let i = 0;

    this.time.addEvent({
        delay: 20,
        repeat: texto.length - 1,
        callback: () => {
            this.lugarQuestao.text += texto[i];
            i++;
        }
    });
}


    resposta(decisao) {
        let q = this.questoes[this.questaoAtual];

        if (decisao === q.resposta) {
            this.satisfacao += 33;
        } else {
            this.satisfacao -= 33;
        }

        this.animarBarra(this.satisfacao);;

        if (this.satisfacao >= 100) return this.vitoria();
        if (this.satisfacao < 0) return this.derrota();

        this.proximaPergunta();
    }

    proximaPergunta() {
        this.questaoAtual++;

        if (this.questaoAtual >= this.questoes.length) {
            return this.fimDasPerguntas();
        }

        this.mostrarQuestao();

        if (this.updateNPC) this.updateNPC();
    }

    barraSatisfacao() {

        const valor = Phaser.Math.Clamp(this.satisfacaoAnimada, 0, 100);
        
        this.barra.clear();

        this.barra.fillStyle(0x000000, 0.2);
        this.barra.fillRect(300, 50, 1000, 20);

        // Cores dinamicas 

        let cor;

        if (valor <= 33) {
        cor = 0xff0000; // vermelho
        } else if (valor <= 66) {
        cor = 0xffff00; // amarelo
        } else {
        cor = 0x00ff00; // verde
        }

        this.barra.fillStyle(cor);
        this.barra.fillRect(300, 50, valor * 10, 20);
    }

    vitoria() {

    this.mostrarTelaFinal({
        texto: "VOCÊ CONVENCEU O CLIENTE",
        voltarPara: "Cidade"
    });
};

    derrota() {

    this.mostrarTelaFinal({
        texto: "VOCÊ NÃO FOI CAPAZ DE CONQUISTAR O CLIENTE",
        voltarPara: "MainScene",
        tamanhoFonte: 58
    });
};

    fimDasPerguntas() {
    this.mostrarTelaFinal({
        texto: "O CLIENTE TE MANDOU EMBORA",
        voltarPara: "MainScene"
    });
};

    mostrarTelaFinal({ texto, voltarPara = 'Cidade', tamanhoFonte = 64 }) {

    const textoX = (this.scale.width / 2) - 600;
    const textoY = (this.scale.height / 2) - 200;
    const textoW = 1200;
    const textoH = 300;

    // Caixa estilo Pokémon
    this.add.graphics().setDepth(3).fillStyle(0x5078D8, 1).fillRoundedRect(textoX, textoY, textoW, textoH, 20);
    this.add.graphics().setDepth(3).fillStyle(0xA0C8F0, 1).fillRoundedRect(textoX + 8, textoY + 8, textoW - 16, textoH - 16, 16);
    this.add.graphics().setDepth(3).fillStyle(0xE8F0FF, 1).fillRoundedRect(textoX + 16, textoY + 16, textoW - 32, textoH - 32, 12);

    // Texto
    this.add.text(
        textoX + textoW / 2,
        textoY + textoH / 2,
        texto,
        {
            color: '#000000',
            fontSize: tamanhoFonte,
            wordWrap: { width: textoW - 64 },
            fontFamily: "Pixelify Sans"
        }
    ).setDepth(4).setOrigin(0.5);

    // Esconde UI
    this.barra.setVisible(false);
    this.opcaoUm.setVisible(false);
    this.opcaoDois.setVisible(false);
    this.lugarQuestao.setVisible(false);
    this.graficosUI.forEach(g => g.setVisible(false));

    // Delay antes de sair
    this.time.delayedCall(4000, () => {
        this.scene.start(voltarPara, { character: this.characterEscolhido });
    });
}
}