// =============================================================
// Tutorial.js
// Cena de tutorial exibida ao colidir com o professor no escritorio.
// Funciona como um overlay sobre o Escritorio: pausa o jogo,
// exibe dialogos com efeito de digitacao e redireciona ao fim.
// =============================================================

class Tutorial extends Phaser.Scene {
    constructor(key = 'Tutorial') { 
        super({ key });
    }

    // Recebe dados passados por quem lancou esta cena (Escritorio)
    // - cenaOrigem: nome da cena que abriu o tutorial (para retomar ao voltar)
    // - character: personagem escolhido (repassado a Cidade ao finalizar)
    init(data) {
        this.cenaOrigem = data?.cenaOrigem || 'Escritorio';
        this.character = data?.character || null;
        this.indiceFala = 0;
        this.modoFeedbackDerrota = data?.modoFeedbackDerrota || false;
        this.modoFeedbackVitoria = data?.modoFeedbackVitoria || false;
        this.dialogos = data?.dialogos || null;
        this.posicaoSpawn = data?.posicaoSpawn || null; 
        this.cenaCombate = data?.cenaCombate || null;
    }

    // Carrega as duas imagens do professor:
    // estadual1 = boca fechada | estadual2 = boca aberta
    preload() {
        this.load.image('estadual1', 'assets/estadual1.png');
        this.load.image('estadual2', 'assets/estadual2.png');
    }

    create() {
        const larguraTela = this.scale.width;
        const alturaTela = this.scale.height;

        // Roteiro padrao do tutorial.
        this.dialogos = this.dialogos?.length > 0 ? this.dialogos : [
            "OlÃ¡! Seja bem-vindo ao time Cielo! Eu sou o seu instrutor e vou te apresentar os principais produtos que vocÃª vai oferecer aos nossos clientes.",
            "Vamos comeÃ§ar pela Cielo Flash â€” a maquininha mais veloz da linha! Ela faz atÃ© 3 vendas por minuto, aceita dÃ©bito, crÃ©dito, Pix, QR Code e mais de 80 bandeiras. Ideal para o varejo!",
            "A Flash tambÃ©m jÃ¡ vem com chip de dados incluso, entÃ£o o cliente nÃ£o precisa de Wi-Fi para vender. E a reposiÃ§Ã£o de bobina Ã© automÃ¡tica â€” sem preocupaÃ§Ã£o!",
            "Agora vamos falar da Cielo LIO On â€” nosso terminal inteligente. Ela vai alÃ©m dos pagamentos: controla estoque, emite Nota Fiscal e tem acesso Ã  Cielo Store com mais de 50 apps de gestÃ£o.",
            "E a novidade da linha inteligente Ã© a Cielo Smart! Ela evoluiu da LIO On com Android mais atual, aprovaÃ§Ã£o de pagamentos mais rÃ¡pida e compatibilidade com diferentes modelos de terminais.",
            "TambÃ©m temos o 'Vendeu, TÃ¡ na Conta', um produto que os clientes adoram! Com ele, na modalidade D0, o lojista recebe o valor das vendas no dÃ©bito, crÃ©dito Ã  vista ou parcelado no mesmo dia, atÃ© nos feriados! JÃ¡ na modalidade D1, recebe o pagamento no dia seguinte.",
            "Para funcionar, o domicÃ­lio bancÃ¡rio do cliente precisa aceitar transferÃªncia via Pix. Vendas feitas atÃ© as 20h59 caem no mesmo dia, apÃ³s esse horÃ¡rio, no dia seguinte.",
            "Cada loja que vocÃª visitar vai ter um desafio diferente. Use o que aprendeu aqui para identificar qual produto se encaixa melhor na necessidade de cada cliente.",
            "Bora comeÃ§ar, o seu primeiro cliente Ã© o TiÃ£o.",
            "Ele Ã© dono de uma padaria com faturamento mensal de cerca de 30 mil reais, Ã© aberto a mudanÃ§as, mas valoriza negociaÃ§Ãµes objetivas e seguras.",
            "Seu desafio agora serÃ¡ manter esse padrÃ£o de atendimento e se preparar para os prÃ³ximos estabelecimentos, apresentando as soluÃ§Ãµes da Cielo com clareza e foco nas necessidades de cada negÃ³cio."
        ];

        this.cameras.main.setViewport(0, 0, larguraTela, alturaTela);
        this.cameras.main.setScroll(0, 0);

        this.add.rectangle(0, 0, larguraTela * 2, alturaTela * 2, 0x000000, 0.72)
            .setOrigin(0, 0)
            .setDepth(0)
            .setScrollFactor(0);

        const caixaLargura = larguraTela * 0.75;
        const caixaAltura = 200;
        const caixaX = larguraTela / 2 - caixaLargura / 2;
        const caixaY = alturaTela * 0.62;

        this.add.graphics().setDepth(2).fillStyle(0x5078D8, 1).fillRoundedRect(caixaX, caixaY, caixaLargura, caixaAltura, 20);
        this.add.graphics().setDepth(3).fillStyle(0xA0C8F0, 1).fillRoundedRect(caixaX + 8, caixaY + 8, caixaLargura - 16, caixaAltura - 16, 16);
        this.add.graphics().setDepth(4).fillStyle(0xE8F0FF, 1).fillRoundedRect(caixaX + 16, caixaY + 16, caixaLargura - 32, caixaAltura - 32, 12);

        this.txtDialogo = this.add.text(caixaX + 28, caixaY + 24, '', {
            fontSize: '30px',
            color: '#000000',
            wordWrap: { width: caixaLargura - 56 }
        }).setDepth(5);

        const professorX = larguraTela / 2;
        const professorY = caixaY - 20;
        this.imgProfessor = this.add.image(professorX, professorY, 'estadual1')
            .setOrigin(0.5, 1.0)
            .setScale(0.5)
            .setDepth(6);

        this.professorFalando = false;
        this.timerFala = this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                this.professorFalando = !this.professorFalando;
                this.imgProfessor.setTexture(
                    this.digitando
                        ? (this.professorFalando ? 'estadual2' : 'estadual1')
                        : 'estadual1'
                );
            }
        });

        const botoesY = caixaY + caixaAltura + 18;
        const botaoLargura = 130;
        const botaoAltura = 44;

        this.add.graphics().setDepth(6).fillStyle(0x5078D8, 1).fillRoundedRect(larguraTela / 2 - 220, botoesY, botaoLargura, botaoAltura, 10);
        this.add.graphics().setDepth(6).fillStyle(0x5078D8, 1).fillRoundedRect(larguraTela / 2 + 90, botoesY, botaoLargura, botaoAltura, 10);

        const botaoAnterior = this.add.text(larguraTela / 2 - 155, botoesY + botaoAltura / 2, 'Anterior', {
            fontSize: '25px',
            fill: '#ffffff'
        }).setDepth(7).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.botaoProximo = this.add.text(larguraTela / 2 + 155, botoesY + botaoAltura / 2, 'PrÃ³ximo', {
            fontSize: '25px',
            fill: '#ffffff'
        }).setDepth(7).setOrigin(0.5).setInteractive({ useHandCursor: true });

        const botaoVoltarLargura = 200;
        const botaoVoltarAltura = 40;
        this.add.graphics()
            .setDepth(10)
            .fillStyle(0x444444, 1)
            .fillRoundedRect(larguraTela - botaoVoltarLargura - 20, 20, botaoVoltarLargura, botaoVoltarAltura, 10)
            .setVisible(false);

        const botaoVoltar = this.add.text(larguraTela - botaoVoltarLargura / 2 - 20, 40, 'â† Voltar ao EscritÃ³rio', {
            fontFamily: 'Press Start 2P',
            fontSize: '20px',
            fill: '#ffffff'
        }).setDepth(11).setOrigin(0.5).setInteractive({ useHandCursor: true }).setVisible(false);

        this._digitarTexto(this.dialogos[this.indiceFala]);

        this.botaoProximo.on('pointerdown', () => {
            if (this.digitando) {
                this._pararDigitacao();
                this.txtDialogo.setText(this.dialogos[this.indiceFala]);
                return;
            }

            if (this.indiceFala < this.dialogos.length - 1) {
                this.indiceFala++;
                this._digitarTexto(this.dialogos[this.indiceFala]);
                return;
            }

            this.timerFala.remove();
            this.sound.stopAll();

            if (this.modoFeedbackDerrota) {
                this.scene.stop(this.scene.key);
                this.scene.start(this.cenaOrigem, { character: this.character });
                return;
            }

            if (!this.modoFeedbackDerrota && !this.modoFeedbackVitoria) {
                this.scene.stop(this.cenaOrigem);
                this.scene.stop(this.scene.key);
                this.scene.start('Cidade', { character: this.character });
                return;
            }

            this.scene.stop(this.scene.key);
            if (this.cenaCombate) this.scene.stop(this.cenaCombate);
            this.scene.start(this.cenaOrigem, {
                character: this.character,
                posicaoSpawn: this.posicaoSpawn,
            });
        });

        botaoAnterior.on('pointerdown', () => {
            if (this.indiceFala > 0) {
                this._pararDigitacao();
                this.indiceFala--;
                this._digitarTexto(this.dialogos[this.indiceFala]);
            }
        });

        botaoVoltar.on('pointerdown', () => {
            this._pararDigitacao();
            this.timerFala.remove();
            const origem = this.cenaOrigem;
            this.scene.stop('tutorial');
            this.scene.resume(origem);
        });

        [this.botaoProximo, botaoAnterior].forEach(botao => {
            botao.on('pointerover', () => botao.setStyle({ fill: '#000000' }));
            botao.on('pointerout', () => botao.setStyle({ fill: '#ffffff' }));
        });

        botaoVoltar.on('pointerover', () => botaoVoltar.setStyle({ fill: '#aaaaaa' }));
        botaoVoltar.on('pointerout', () => botaoVoltar.setStyle({ fill: '#ffffff' }));
    }

    // Efeito maquina de escrever: revela o texto caractere por caractere.
    _digitarTexto(texto) {
        this.digitando = true;
        this.txtDialogo.setText('');
        let indiceCaractere = 0;

        this.timerDigitacao = this.time.addEvent({
            delay: 30,
            repeat: texto.length - 1,
            callback: () => {
                this.txtDialogo.setText(texto.substring(0, indiceCaractere + 1));
                indiceCaractere++;
                if (indiceCaractere >= texto.length) {
                    this.digitando = false;
                    this.imgProfessor.setTexture('estadual1');
                }
            }
        });
    }

    // Cancela o timer de digitacao em andamento.
    _pararDigitacao() {
        if (this.timerDigitacao) {
            this.timerDigitacao.remove();
            this.timerDigitacao = null;
        }

        this.digitando = false;
        this.imgProfessor.setTexture('estadual1');
    }
}
