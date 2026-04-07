class Combate extends Phaser.Scene {

    constructor(key) {
        // Define a chave de identificação da cena
        super({ key });
    }

    init(data) {
        // Recupera o personagem selecionado vindo da cena anterior
        this.personagemEscolhido = utilitariosJogo.resolverChavePersonagem(data?.personagem);
    }

    preload() {
        // Carrega os arquivos de áudio necessários
        this.load.audio('musicabatalha', 'assets/musicabatalha.mp3');
        this.load.audio('mudancaNegativa', 'assets/mudançanegativa.mp3');
        this.load.audio('mudancaPositiva', 'assets/mudançapositiva.mp3');
    }

    initCombate(combateConfig) {
        const configSeguro = combateConfig || {};

        // Inicializa valores de satisfação, lista de questões e posição de retorno
        this.satisfacao = utilitariosJogo.limitarNumero(configSeguro.satisfacaoInicial, 34, -1, 100);
        this.questoes = utilitariosJogo.sanitizarQuestoes(configSeguro.questoes);
        this.questaoAtual = 0;
        this.satisfacaoAnimada = this.satisfacao; // Variável para controle da animação da barra
        this.posicaoSpawn = utilitariosJogo.normalizarPosicaoSpawn(configSeguro.posicaoSpawn, { x: 190, y: 330 });
        this.finalizacaoEmAndamento = false;

        // Inicia a música tema do combate
        this.musica = utilitariosJogo.tocarAudio(this, 'musicabatalha', { loop: true, volume: 0.15 });
    }

    createUI() {
        this.graficosUI = [];
        const largura = this.scale.width;
        const altura = this.scale.height;

        // Configuração das coordenadas e dimensões da caixa de pergunta
        const perguntaX = largura * 0.1;
        const perguntaY = altura * 0.57;
        const perguntaW = largura * 0.35;
        const perguntaH = altura * 0.47;

        // Criação das camadas visuais da caixa de diálogo (efeito de borda)
        this.graficosUI.push(this.add.graphics().setDepth(2).fillStyle(0x111111, 1).fillRoundedRect(perguntaX, perguntaY, perguntaW, perguntaH, 16));
        this.graficosUI.push(this.add.graphics().setDepth(3).fillStyle(0xb8d4f0, 1).fillRoundedRect(perguntaX + 6, perguntaY + 6, perguntaW - 12, perguntaH - 12, 12));
        this.graficosUI.push(this.add.graphics().setDepth(4).fillStyle(0xddeeff, 1).fillRoundedRect(perguntaX + 10, perguntaY + 10, perguntaW - 20, perguntaH - 20, 8));
        this.graficosUI.push(this.add.graphics().setDepth(5).fillStyle(0xf5f9ff, 1).fillRoundedRect(perguntaX + 14, perguntaY + 14, perguntaW - 28, perguntaH - 28, 6));

        // Objeto de texto para a pergunta
        this.lugarQuestao = this.add.text(perguntaX + 22, perguntaY + 24, "", {
            fontSize: "26px",
            color: "#000000",
            wordWrap: { width: perguntaW - 48 },
            fontFamily: "Pixelify Sans"
        }).setDepth(6);

        // Função auxiliar para criar botões de opção estilizados
        const criarBotaoOpcao = (x, y, larguraBtn, alturaBtn) => {
            const graficos = this.add.graphics();
            graficos.fillStyle(0x111111, 1).fillRoundedRect(0, 0, larguraBtn, alturaBtn, 12);
            graficos.fillStyle(0xb8d4f0, 1).fillRoundedRect(4, 4, larguraBtn - 8, alturaBtn - 8, 9);
            graficos.fillStyle(0xddeeff, 1).fillRoundedRect(8, 8, larguraBtn - 16, alturaBtn - 16, 6);
            graficos.fillStyle(0xf5f9ff, 1).fillRoundedRect(12, 12, larguraBtn - 24, alturaBtn - 24, 4);

            const texto = this.add.text(18, 18, "", {
                color: "#1a1a2e",
                fontSize: "20px",
                wordWrap: { width: larguraBtn - 36 },
                fontFamily: "Pixelify Sans"
            }).setDepth(1);

            const container = this.add.container(x, y, [graficos, texto]).setDepth(5);
            container.setSize(larguraBtn, alturaBtn);
            container.setInteractive(new Phaser.Geom.Rectangle(0, 0, larguraBtn, alturaBtn), Phaser.Geom.Rectangle.Contains);

            return { container, texto };
        };

        // Cria os botões A e B
        const btnA = criarBotaoOpcao(largura * 0.5, altura * 0.62, 620, 110);
        this.containerOpcaoUm = btnA.container;
        this.opcaoUm = btnA.texto;

        const btnB = criarBotaoOpcao(largura * 0.5, altura * 0.82, 620, 110);
        this.containerOpcaoDois = btnB.container;
        this.opcaoDois = btnB.texto;

        // Define as funções de clique para as opções
        this.containerOpcaoUm.on("pointerdown", () => this.resposta(this.opcaoUm.valor));
        this.containerOpcaoDois.on("pointerdown", () => this.resposta(this.opcaoDois.valor));

        // Adiciona efeito visual de escala ao passar o mouse
        [this.containerOpcaoUm, this.containerOpcaoDois].forEach(btn => {
            btn.on('pointerover', () => btn.setScale(1.04));
            btn.on('pointerout', () => btn.setScale(1));
        });

        // Configura os gráficos da barra de satisfação
        this.barra = this.add.graphics().setDepth(10);
        this.textoSatisfacao = this.add.text(0, 0, "BARRA DE SATISFAÇÃO", {
            fontSize: "28px",
            color: "#000000",
            fontFamily: "Pixelify Sans",
            fontStyle: "bold"
        }).setDepth(11).setOrigin(0.5);

        this.barraSatisfacao(); // Desenha a barra pela primeira vez

        // Gerencia redimensionamento da tela e limpeza ao fechar a cena
        this.scale.on('resize', this.reposicionarUI, this);
        this.events.once('shutdown', () => {
            this.scale.off('resize', this.reposicionarUI, this);
            utilitariosJogo.pararAudio(this.musica);
        });
    }

    reposicionarUI(gameSize) {
        // Reajusta a posição dos elementos quando a janela do jogo muda de tamanho
        const { width, height } = gameSize;

        (this.graficosUI || []).forEach(g => g.destroy());
        this.graficosUI = [];

        const perguntaX = width * 0.1;
        const perguntaY = height * 0.57;
        const perguntaW = width * 0.35;
        const perguntaH = height * 0.3;

        // Redesenha a moldura da pergunta
        this.graficosUI.push(this.add.graphics().setDepth(2).fillStyle(0x111111, 1).fillRoundedRect(perguntaX, perguntaY, perguntaW, perguntaH, 16));
        this.graficosUI.push(this.add.graphics().setDepth(3).fillStyle(0xb8d4f0, 1).fillRoundedRect(perguntaX + 6, perguntaY + 6, perguntaW - 12, perguntaH - 12, 12));
        this.graficosUI.push(this.add.graphics().setDepth(4).fillStyle(0xddeeff, 1).fillRoundedRect(perguntaX + 10, perguntaY + 10, perguntaW - 20, perguntaH - 20, 8));
        this.graficosUI.push(this.add.graphics().setDepth(5).fillStyle(0xf5f9ff, 1).fillRoundedRect(perguntaX + 14, perguntaY + 14, perguntaW - 28, perguntaH - 28, 6));

        this.lugarQuestao.setPosition(perguntaX + 22, perguntaY + 24);
        this.containerOpcaoUm.setPosition(width * 0.5, height * 0.62);
        this.containerOpcaoDois.setPosition(width * 0.5, height * 0.82);

        this.barraSatisfacao();
    }

    barraSatisfacao() {
        // Lógica de desenho da barra de satisfação (fundo e preenchimento colorido)
        const larguraCard = 600;
        const alturaCard = 110;
        const cardX = (this.scale.width / 2) - (larguraCard / 2);
        const cardY = 30;

        const valor = Phaser.Math.Clamp(this.satisfacaoAnimada, 0, 100);
        this.barra.clear();

        // Moldura externa da barra
        this.barra.fillStyle(0x111111, 1).fillRoundedRect(cardX, cardY, larguraCard, alturaCard, 16);
        this.barra.fillStyle(0xb8d4f0, 1).fillRoundedRect(cardX + 5, cardY + 5, larguraCard - 10, alturaCard - 10, 12);
        this.barra.fillStyle(0xddeeff, 1).fillRoundedRect(cardX + 9, cardY + 9, larguraCard - 18, alturaCard - 18, 8);
        this.barra.fillStyle(0xf5f9ff, 1).fillRoundedRect(cardX + 13, cardY + 13, larguraCard - 26, alturaCard - 26, 6);

        if (this.textoSatisfacao) {
            this.textoSatisfacao.setPosition(cardX + larguraCard / 2, cardY + 35);
        }

        const barraW = larguraCard - 60;
        const barraH = 35;
        const barraX = cardX + 30;
        const barraY = cardY + 58;

        this.barra.fillStyle(0xcccccc, 1);
        this.barra.fillRoundedRect(barraX, barraY, barraW, barraH, 8);

        // Define a cor da barra com base na satisfação: Verde, Amarelo ou Vermelho
        let cor = 0x00ff00;
        if (valor <= 33) cor = 0xff0000;
        else if (valor <= 66) cor = 0xffff00;

        if (valor > 0) {
            this.barra.fillStyle(cor, 1);
            const larguraPreenchida = (valor / 100) * barraW;
            this.barra.fillRoundedRect(barraX, barraY, larguraPreenchida, barraH, 8);
        }
    }

    animarBarra(novoValor) {
        // Cria uma transição suave para a mudança visual da barra
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
        // Efeito de vibração visual na barra quando o jogador erra
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
        // Esconde ou mostra elementos de interface dependendo se é uma pergunta ou só uma fala
        this.barra.setVisible(!ativo);
        this.textoSatisfacao.setVisible(!ativo);
        this.containerOpcaoDois.setVisible(!ativo);
    }

    mostrarQuestao() {
        // Gerencia a exibição da pergunta atual e embaralha as opções
        const perguntaAtual = this.questoes[this.questaoAtual];
        if (!perguntaAtual) {
            this.fimDasPerguntas();
            return;
        }
        this.lugarQuestao.setText(perguntaAtual.pergunta);

        // Caso seja um diálogo simples (apenas avança ao clicar)
        if (perguntaAtual.soDialogo) {
            this._setModoDialogo(true);
            this.opcaoUm.setText(perguntaAtual.certo);
            this.containerOpcaoUm.setInteractive();
            this.containerOpcaoUm.once("pointerdown", () => {
                this.containerOpcaoUm.disableInteractive();
                this._setModoDialogo(false);
                this.proximaPergunta();
            });
            return;
        }

        this._setModoDialogo(false);
        this.containerOpcaoUm.setInteractive();
        this.containerOpcaoDois.setInteractive();

        // Embaralhamento aleatório das respostas A e B
        const trocarLugar = Math.random() < 0.5;
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
        // Lógica disparada após o clique em uma resposta
        if (this.questoes[this.questaoAtual]?.soDialogo) return;
        if (typeof decisao !== 'boolean') return;
        if (this.finalizacaoEmAndamento) return;

        this.containerOpcaoUm.disableInteractive();
        this.containerOpcaoDois.disableInteractive();

        const questaoAtual = this.questoes[this.questaoAtual];
        if (!questaoAtual) {
            this.fimDasPerguntas();
            return;
        }

        // Verifica se acertou ou errou e aplica as consequências
        if (decisao === questaoAtual.resposta) {
            this.sound.play('mudancaPositiva', { loop: false, volume: 0.3 });
            this.satisfacao = Phaser.Math.Clamp(this.satisfacao + 33, -1, 100);
            this.tweens.add({
                targets: this.barra,
                scaleY: 1.05,
                duration: 80,
                yoyo: true,
            });
            if (this.updateNPC) this.updateNPC();
        } else {
            this.sound.play('mudancaNegativa', { loop: false, volume: 1 });
            this.satisfacao = Phaser.Math.Clamp(this.satisfacao - 33, -1, 100);
            this.tremerBarra();
            this.cameras.main.shake(120, 0.008);
            if (this.updateNPC) this.updateNPC();
        }

        this.animarBarra(this.satisfacao);

        // Checa condições de fim de combate
        if (this.satisfacao >= 100) return this.vitoria();
        if (this.satisfacao < 0) return this.derrota();

        this.time.delayedCall(800, () => {
            this.proximaPergunta();
        });
    }

    proximaPergunta() {
        // Incrementa o índice e carrega a nova questão
        this.questaoAtual++;
        if (this.questaoAtual >= this.questoes.length) {
            return this.fimDasPerguntas();
        }
        this.containerOpcaoUm.setInteractive();
        this.containerOpcaoDois.setInteractive();
        this.mostrarQuestao();
    }

    vitoria() {
        // Configura a tela de sucesso
        this.mostrarTelaFinal({
            texto: "VOCÊ CONVENCEU O CLIENTE",
            voltarPara: this.cenaVitoria || ("FeedbackVitoria" + this.scene.key),
        });
    }

    derrota() {
        // Configura a tela de falha por falta de satisfação
        this.mostrarTelaFinal({
            texto: "VOCÊ NÃO FOI CAPAZ DE CONQUISTAR O CLIENTE",
            voltarPara: this.cenaDerrota || ("FeedbackDerrota" + this.scene.key),
            tamanhoFonte: 58
        });
    }

    fimDasPerguntas() {
        // Configura a tela de falha por acabar as perguntas
        this.mostrarTelaFinal({
            texto: "O CLIENTE TE MANDOU EMBORA",
            voltarPara: this.cenaDerrota || ("FeedbackDerrota" + this.scene.key),
        });
    }

    mostrarTelaFinal({ texto, voltarPara = 'Cidade', tamanhoFonte = 64 }) {
        // Cria o quadro final de mensagem e transiciona para outra cena
        if (this.finalizacaoEmAndamento) return;
        this.finalizacaoEmAndamento = true;

        const textoX = (this.scale.width / 2) - 600;
        const textoY = (this.scale.height / 2) - 200;
        const textoW = 1200;
        const textoH = 300;

        // Moldura da mensagem final
        this.add.graphics().setDepth(3).fillStyle(0x5078D8, 1).fillRoundedRect(textoX, textoY, textoW, textoH, 20);
        this.add.graphics().setDepth(3).fillStyle(0xA0C8F0, 1).fillRoundedRect(textoX + 8, textoY + 8, textoW - 16, textoH - 16, 16);
        this.add.graphics().setDepth(3).fillStyle(0xE8F0FF, 1).fillRoundedRect(textoX + 16, textoY + 16, textoW - 32, textoH - 32, 12);

        this.add.text(textoX + textoW / 2, textoY + textoH / 2, texto, {
            color: '#000000',
            fontSize: tamanhoFonte,
            wordWrap: { width: textoW - 64 },
            fontFamily: "Pixelify Sans"
        }).setDepth(4).setOrigin(0.5);

        // Esconde os elementos de combate
        this.barra.setVisible(false);
        this.textoSatisfacao.setVisible(false);
        this.lugarQuestao.setVisible(false);
        this.containerOpcaoUm.setVisible(false);
        this.containerOpcaoDois.setVisible(false);
        (this.graficosUI || []).forEach(g => g.setVisible(false));

        // Aguarda 4 segundos e muda de cena
        this.time.delayedCall(4000, () => {
            utilitariosJogo.pararAudio(this.musica);
            utilitariosJogo.iniciarCenaSeDisponivel(this, voltarPara, {
                personagem: this.personagemEscolhido,
                posicaoSpawn: this.posicaoSpawn,
                cenaCombate: this.scene.key
            });
        });
    }

    criarBotaoSair(x, y, acao) {
        // Cria um botão funcional para sair da cena manualmente
        const larguraBotao = 180;
        const alturaBotao = 60;
        const grupoBotao = this.add.container(x, y).setDepth(100);

        const BotaoSair = this.add.graphics();
        BotaoSair.fillStyle(0x111111, 1).fillRoundedRect(0, 0, larguraBotao, alturaBotao, 16);
        BotaoSair.fillStyle(0xb8d4f0, 1).fillRoundedRect(5, 5, larguraBotao - 10, alturaBotao - 10, 12);
        BotaoSair.fillStyle(0xddeeff, 1).fillRoundedRect(9, 9, larguraBotao - 18, alturaBotao - 18, 8);
        BotaoSair.fillStyle(0xf5f9ff, 1).fillRoundedRect(13, 13, larguraBotao - 26, alturaBotao - 26, 6);

        const escritaSair = this.add.text(larguraBotao / 2, alturaBotao / 2, "SAIR", {
            fontSize: "22px",
            color: "#000000",
            fontFamily: "Pixelify Sans",
            fontStyle: "bold"
        }).setOrigin(0.5);

        grupoBotao.add([BotaoSair, escritaSair]);

        const zona = this.add.zone(0, 0, larguraBotao, alturaBotao)
            .setOrigin(0, 0)
            .setInteractive({ useHandCursor: true });

        grupoBotao.add(zona);

        // Efeitos de feedback no botão de sair
        zona.on('pointerover', () => BotaoSair.setAlpha(0.8));
        zona.on('pointerout', () => BotaoSair.setAlpha(1));

        zona.on('pointerdown', () => {
            grupoBotao.setScale(0.95);
            this.time.delayedCall(100, () => {
                grupoBotao.setScale(1);
                if (this.musica) this.musica.stop();
                acao();
            });
        });

        return grupoBotao;
    }
}