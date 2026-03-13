// =============================================================
// Tutorial.js
// Cena de tutorial exibida ao colidir com o professor no escritório.
// Funciona como um overlay sobre o MainScene: pausa o jogo,
// exibe diálogos com efeito de digitação e redireciona ao fim.
// =============================================================

class Tutorial extends Phaser.Scene {
    constructor() {
        super({ key: 'tutorial' });
    }

    // Recebe dados passados por quem lançou esta cena (MainScene)
    // - cenaOrigem: nome da cena que abriu o tutorial (para retomar ao voltar)
    // - character: personagem escolhido (repassado à Cidade ao finalizar)
    init(data) {
        this.cenaOrigem = data?.cenaOrigem || 'MainScene';
        this.character = data?.character || null;
        this.indiceFala = 0; // índice do diálogo atual
    }

    // Carrega as duas imagens do professor:
    // estadual1 = boca fechada | estadual2 = boca aberta (animação de fala)
    preload() {
        this.load.image('estadual1', 'assets/estadual1.png');
        this.load.image('estadual2', 'assets/estadual2.png');
    }
    create() {
        const larguraTela = this.scale.width;
        const alturaTela = this.scale.height;

        // ---------------------------------------------------------
        // ROTEIRO — array com todas as falas do tutorial.
        // Cada string é um diálogo exibido na caixa de texto.
        // Para editar o conteúdo, altere apenas este array.
        // ---------------------------------------------------------
        this.dialogos = [
            "Olá! Seja bem-vindo ao time Cielo! Eu sou o seu instrutor e vou te apresentar os principais produtos que você vai oferecer aos nossos clientes.",
            "Vamos começar pela Cielo Flash — a maquininha mais veloz da linha! Ela faz até 3 vendas por minuto, aceita débito, crédito, Pix, QR Code e mais de 80 bandeiras. Ideal para o varejo!",
            "A Flash também já vem com chip de dados incluso, então o cliente não precisa de Wi-Fi para vender. E a reposição de bobina é automática — sem preocupação!",
            "Agora vamos falar da Cielo LIO On — nosso terminal inteligente. Ela vai além dos pagamentos: controla estoque, emite Nota Fiscal e tem acesso à Cielo Store com mais de 50 apps de gestão.",
            "E a novidade da linha inteligente é a Cielo Smart! Ela evoluiu da LIO On com Android mais atual, aprovação de pagamentos mais rápida e compatibilidade com diferentes modelos de terminais.",
            "Também temos o Vendeu, Tá na Conta — um produto que os clientes adoram! Com ele, o lojista recebe o valor das vendas no débito, crédito à vista ou parcelado no mesmo dia, até nos feriados!",
            "Para funcionar, o domicílio bancário do cliente precisa aceitar transferência via Pix. Vendas feitas até as 18h59 caem no mesmo dia — após esse horário, no dia seguinte.",
            "Cada loja que você visitar vai ter um desafio diferente. Use o que aprendeu aqui para identificar qual produto se encaixa melhor na necessidade de cada cliente. Bora começar!",
        ];

        // Garante que a câmera do tutorial ocupa a tela inteira
        // e não herda o scroll do mapa do MainScene
        this.cameras.main.setViewport(0, 0, larguraTela, alturaTela);
        this.cameras.main.setScroll(0, 0);

        // ---------------------------------------------------------
        // OVERLAY escuro semitransparente sobre o mapa
        // Usa larguraTela*2 e alturaTela*2 para cobrir a tela independente do scroll
        // setScrollFactor(0) fixa o overlay na câmera
        // ---------------------------------------------------------
        this.add.rectangle(0, 0, larguraTela * 2, alturaTela * 2, 0x000000, 0.72)
            .setOrigin(0, 0).setDepth(0).setScrollFactor(0);

        // ---------------------------------------------------------
        // CAIXA DE DIÁLOGO — três retângulos sobrepostos criam
        // o efeito de borda colorida + fundo claro
        // ---------------------------------------------------------
        const caixaW = larguraTela * 0.75;  // largura: 75% da tela
        const caixaH = 200;       // altura fixa — aumentar se o texto vazar
        const caixaX = larguraTela / 2 - caixaW / 2; // centralizado horizontalmente
        const caixaY = alturaTela * 0.62;  // posição vertical: 62% da tela

        // Camada 1: borda azul escura
        this.add.graphics().setDepth(2).fillStyle(0x5078D8, 1).fillRoundedRect(caixaX, caixaY, caixaW, caixaH, 20);
        // Camada 2: borda azul clara (inset de 8px)
        this.add.graphics().setDepth(3).fillStyle(0xA0C8F0, 1).fillRoundedRect(caixaX + 8, caixaY + 8, caixaW - 16, caixaH - 16, 16);
        // Camada 3: fundo quase branco (inset de 16px) — área do texto
        this.add.graphics().setDepth(4).fillStyle(0xE8F0FF, 1).fillRoundedRect(caixaX + 16, caixaY + 16, caixaW - 32, caixaH - 32, 12);

        // Texto do diálogo — começa vazio pois é preenchido pelo efeito de digitação
        this.txtDialogo = this.add.text(caixaX + 28, caixaY + 24, '', {
            
            fontSize: '30px',
            color: '#000000',
            wordWrap: { width: caixaW - 56 } // quebra de linha automática dentro da caixa
        }).setDepth(5);

        // ---------------------------------------------------------
        // PROFESSOR — imagem centralizada acima da caixa de texto
        // setOrigin(0.5, 1.0) ancora o sprite pelo centro inferior
        // ---------------------------------------------------------
        const profX = larguraTela / 2;
        const profY = caixaY - 20;
        this.imgProfessor = this.add.image(profX, profY, 'estadual1')
            .setOrigin(0.5, 1.0).setScale(0.5).setDepth(6);

        // Timer que alterna entre estadual1/estadual2 a cada 500ms
        // simulando a animação de boca do professor.
        // Só anima enquanto this.digitando === true
        this.professorFalando = false;
        this.timerFala = this.time.addEvent({
            delay: 500,
            loop: true,
            callback: () => {
                this.professorFalando = !this.professorFalando;
                this.imgProfessor.setTexture(
                    this.digitando
                        ? (this.professorFalando ? 'estadual2' : 'estadual1')
                        : 'estadual1' // boca fechada quando termina de digitar
                );
            }
        });

        // ---------------------------------------------------------
        // BOTÕES — Anterior e Próximo centralizados abaixo da caixa
        // ---------------------------------------------------------
        const btnY = caixaY + caixaH + 18; // posicionados logo abaixo da caixa
        const btnW = 130;
        const btnH = 44;

        // Fundo dos botões
        this.add.graphics().setDepth(6).fillStyle(0x5078D8, 1).fillRoundedRect(larguraTela / 2 - 220, btnY, btnW, btnH, 10);
        this.add.graphics().setDepth(6).fillStyle(0x5078D8, 1).fillRoundedRect(larguraTela / 2 + 90,  btnY, btnW, btnH, 10);

        const botaoAnterior = this.add.text(larguraTela / 2 - 155, btnY + btnH / 2, 'Anterior', {
            fontFamily: 'Press Start 2P', fontSize: '20px', fill: '#ffffff'
        }).setDepth(7).setOrigin(0.5).setInteractive({ useHandCursor: true });

        this.botaoProximo = this.add.text(larguraTela / 2 + 155, btnY + btnH / 2, 'Próximo', {
            fontFamily: 'Press Start 2P', fontSize: '20px', fill: '#ffffff'
        }).setDepth(7).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // ---------------------------------------------------------
        // BOTÃO VOLTAR — canto superior direito
        // Fecha o tutorial e retoma o MainScene sem reiniciá-lo
        // ---------------------------------------------------------
        const voltarW = 200;
        const voltarH = 40;
        this.add.graphics().setDepth(10).fillStyle(0x444444, 1).fillRoundedRect(larguraTela - voltarW - 20, 20, voltarW, voltarH, 10);
        const botaoVoltar = this.add.text(larguraTela - voltarW / 2 - 20, 40, '← Voltar ao Escritório', {
            fontFamily: 'Press Start 2P', fontSize: '20px', fill: '#ffffff'
        }).setDepth(11).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Inicia o efeito de digitação na primeira fala
        this._digitarTexto(this.dialogos[this.indiceFala]);

        // ---------------------------------------------------------
        // EVENTOS DOS BOTÕES
        // ---------------------------------------------------------

        // Próximo:
        // - Se ainda digitando → completa o texto imediatamente (clique para pular)
        // - Se já terminou e não é a última fala → avança para a próxima
        // - Se é a última fala → encerra o tutorial e vai para a Cidade
        this.botaoProximo.on('pointerdown', () => {
            if (this.digitando) {
                this._pararDigitacao();
                this.txtDialogo.setText(this.dialogos[this.indiceFala]);
                return;
            }
            if (this.indiceFala < this.dialogos.length - 1) {
                this.indiceFala++;
                this._digitarTexto(this.dialogos[this.indiceFala]);
            } else {
                // Última fala: para os timers, encerra as cenas e inicia a Cidade
                this.timerFala.remove();
                this.scene.stop(this.cenaOrigem);
                this.scene.stop('tutorial');
                this.scene.start('Cidade', { character: this.character });
            }
        });

        // Anterior: volta uma fala e reinicia o efeito de digitação
        botaoAnterior.on('pointerdown', () => {
            if (this.indiceFala > 0) {
                this._pararDigitacao();
                this.indiceFala--;
                this._digitarTexto(this.dialogos[this.indiceFala]);
            }
        });

        // Voltar ao Escritório: para o tutorial e retoma o MainScene pausado
        botaoVoltar.on('pointerdown', () => {
            this._pararDigitacao();
            this.timerFala.remove();
            const origem = this.cenaOrigem;
            this.scene.stop('tutorial');
            this.scene.resume(origem);
        });

        // Efeito hover nos botões: escurece o texto ao passar o mouse
        [this.botaoProximo, botaoAnterior].forEach(btn => {
            btn.on('pointerover', () => btn.setStyle({ fill: '#000000' }));
            btn.on('pointerout',  () => btn.setStyle({ fill: '#ffffff' }));
        });
        botaoVoltar.on('pointerover', () => botaoVoltar.setStyle({ fill: '#aaaaaa' }));
        botaoVoltar.on('pointerout',  () => botaoVoltar.setStyle({ fill: '#ffffff' }));
    }

    // ---------------------------------------------------------
    // _digitarTexto(texto)
    // Efeito máquina de escrever: revela o texto caractere por caractere.
    // - delay: velocidade em ms entre cada caractere (menor = mais rápido)
    // - Enquanto digita, this.digitando = true (usado pelo timerFala e pelo botão Próximo)
    // ---------------------------------------------------------
    _digitarTexto(texto) {
        this.digitando = true;
        this.txtDialogo.setText('');
        let i = 0;

        this.timerDigitacao = this.time.addEvent({
            delay: 30,
            repeat: texto.length - 1,
            callback: () => {
                this.txtDialogo.setText(texto.substring(0, i + 1));
                i++;
                if (i >= texto.length) {
                    this.digitando = false;
                    this.imgProfessor.setTexture('estadual1'); // fecha a boca ao terminar
                }
            }
        });
    }

    // ---------------------------------------------------------
    // _pararDigitacao()
    // Cancela o timer de digitação em andamento.
    // Chamado ao clicar Próximo antes de terminar, ao voltar uma fala
    // ou ao fechar o tutorial.
    // ---------------------------------------------------------
    _pararDigitacao() {
        if (this.timerDigitacao) {
            this.timerDigitacao.remove();
            this.timerDigitacao = null;
        }
        this.digitando = false;
        this.imgProfessor.setTexture('estadual1');
    }
}