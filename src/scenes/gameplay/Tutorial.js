// Cena de tutorial exibida ao colidir com o professor.
// Funciona como uma sobreposicao ao Escritorio.
// Pausa o jogo, mostra os dialogos e redireciona ao final.

class Tutorial extends Phaser.Scene {
    constructor(key = 'Tutorial') { 
        super({ key });
    }

    // Recebe os dados enviados pela cena de origem.
    // cenaOrigem: cena que abriu o tutorial.
    // personagem: personagem escolhido pelo jogador.
    init(data) {
        this.cenaOrigem = data?.cenaOrigem || 'Escritorio';
        this.personagemSelecionado = utilitariosJogo.resolverChavePersonagem(data?.personagem);
        this.indiceFala = 0;
        this.modoFeedbackDerrota = data?.modoFeedbackDerrota || false;
        this.modoFeedbackVitoria = data?.modoFeedbackVitoria || false;
        this.dialogos = Array.isArray(data?.dialogos) ? data.dialogos : null;
        this.posicaoSpawn = utilitariosJogo.normalizarPosicaoSpawn(data?.posicaoSpawn, { x: 190, y: 330 }); 
        this.cenaCombate = data?.cenaCombate || null;
    }

    // Carrega as duas imagens do professor.
    // estadual1 representa a boca fechada e estadual2 a boca aberta.
    preload() {
        this.load.image('estadual1', 'assets/estadual1.png');
        this.load.image('estadual2', 'assets/estadual2.png');
    }

    create() {
        const larguraTela = this.scale.width;
        const alturaTela = this.scale.height;

        // Define o roteiro padrao do tutorial.
        this.dialogos = this.dialogos?.length > 0 ? this.dialogos : [
            "Olá! Seja bem-vindo ao time Cielo! Eu sou o seu instrutor e vou te apresentar os principais produtos que você vai oferecer aos nossos clientes.",
            "Vamos começar pela Cielo Flash — a maquininha mais veloz da linha! Ela faz até 3 vendas por minuto, aceita débito, crédito, Pix, QR Code e mais de 80 bandeiras. Ideal para o varejo!",
            "A Flash também já vem com chip de dados incluso, então o cliente não precisa de Wi-Fi para vender. E a reposição de bobina é automática — sem preocupação!",
            "Agora vamos falar da Cielo LIO On — nosso terminal inteligente. Ela vai além dos pagamentos: controla estoque, emite Nota Fiscal e tem acesso à Cielo Store com mais de 50 apps de gestão.",
            "E a novidade da linha inteligente é a Cielo Smart! Ela evoluiu da LIO On com Android mais atual, aprovação de pagamentos mais rápida e compatibilidade com diferentes modelos de terminais.",
            "Também temos o 'Vendeu, Tá na Conta', um produto que os clientes adoram! Com ele, na modalidade D0, o lojista recebe o valor das vendas no débito, crédito à vista ou parcelado no mesmo dia, até nos feriados! Já na modalidade D1, recebe o pagamento no dia seguinte.",
            "Para funcionar, o domicílio bancário do cliente precisa aceitar transferência via Pix. Vendas feitas até as 20h59 caem no mesmo dia, após esse horário, no dia seguinte.",
            "Cada loja que você visitar vai ter um desafio diferente. Use o que aprendeu aqui para identificar qual produto se encaixa melhor na necessidade de cada cliente.",
            "Bora começar, o seu primeiro cliente é o Tião.",
            "Ele é dono de uma padaria com faturamento mensal de cerca de 30 mil reais, é aberto a mudanças, mas valoriza negociações objetivas e seguras.",
            "Seu desafio agora será manter esse padrão de atendimento e se preparar para os próximos estabelecimentos, apresentando as soluções da Cielo com clareza e foco nas necessidades de cada negócio."
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

        this.botaoProximo = this.add.text(larguraTela / 2 + 155, botoesY + botaoAltura / 2, 'Próximo', {
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

        const botaoVoltar = this.add.text(larguraTela - botaoVoltarLargura / 2 - 20, 40, '← Voltar ao Escritório', {
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
                utilitariosJogo.iniciarCenaSeDisponivel(this, this.cenaOrigem, {
                    personagem: this.personagemSelecionado
                });
                return;
            }

            if (!this.modoFeedbackDerrota && !this.modoFeedbackVitoria) {
                this.scene.stop(this.cenaOrigem);
                this.scene.stop(this.scene.key);
                utilitariosJogo.iniciarCenaSeDisponivel(this, 'Cidade', {
                    personagem: this.personagemSelecionado
                });
                return;
            }

            this.scene.stop(this.scene.key);
            if (this.cenaCombate) this.scene.stop(this.cenaCombate);
            utilitariosJogo.iniciarCenaSeDisponivel(this, this.cenaOrigem, {
                personagem: this.personagemSelecionado,
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
            this.scene.stop(this.scene.key);
            if (this.scene.manager.keys[origem]) {
                this.scene.resume(origem);
            }
        });

        [this.botaoProximo, botaoAnterior].forEach(botao => {
            botao.on('pointerover', () => botao.setStyle({ fill: '#000000' }));
            botao.on('pointerout', () => botao.setStyle({ fill: '#ffffff' }));
        });

        botaoVoltar.on('pointerover', () => botaoVoltar.setStyle({ fill: '#aaaaaa' }));
        botaoVoltar.on('pointerout', () => botaoVoltar.setStyle({ fill: '#ffffff' }));
    }

    // Aplica o efeito de maquina de escrever no texto.
    _digitarTexto(texto) {
        const textoSeguro = typeof texto === 'string' && texto.length > 0
            ? texto
            : 'Sem dialogo configurado para esta etapa.';

        this.digitando = true;
        this.txtDialogo.setText('');
        let indiceCaractere = 0;

        this.timerDigitacao = this.time.addEvent({
            delay: 30,
            repeat: textoSeguro.length - 1,
            callback: () => {
                this.txtDialogo.setText(textoSeguro.substring(0, indiceCaractere + 1));
                indiceCaractere++;
                if (indiceCaractere >= textoSeguro.length) {
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
