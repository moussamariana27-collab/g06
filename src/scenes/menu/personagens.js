class SelecaoPersonagem extends Phaser.Scene {
    
    constructor() {
        super("SelecaoPersonagem");
    }

    preload() {
        this.load.image('botao', 'assets/btnJogar.png');
        this.load.image('JOSE', 'assets/jose1.png');
        this.load.image('PAULA', 'assets/paula2.png');
        this.load.image('MARIA', 'assets/maria2.png');
        this.load.image('JOAO', 'assets/joao1.png');
        this.load.image('fundo2', 'assets/fundo2.png');
    }

    create() {
        // Calcula o centro da camera para montar a tela.
        const { centerX, centerY } = this.cameras.main;

        // Carrega o fundo ajustado ao tamanho da tela.
        this.add.image(this.scale.width / 2, this.scale.height / 2, "fundo2")
            .setDisplaySize(this.scale.width, this.scale.height);
        
        // Exibe o titulo da cena.
        this.add.text(centerX, 80, "Conheça seu Personagem", {
            fontSize: "60px",
            fill: "#000000"
        }).setOrigin(0.5);
        
        // Exibe a instrucao para o jogador.
        this.add.text(centerX, 150, "Clique em cima do personagem desejado para saber mais informações sobre ele", {
            fontSize: "32px",
            fill: "#000000",
            align: "center",
            wordWrap: { width: 900 }
        }).setOrigin(0.5);

        // Define os personagens disponiveis no jogo.
        const personagens = ['JOSE', 'PAULA', 'MARIA', 'JOAO'];
        
        // Define o espaco horizontal entre os personagens.
        const espacamento = 200;
        
        // Calcula a posicao inicial para centralizar os personagens.
        const posicaoInicialX = centerX - (espacamento * (personagens.length - 1)) / 2;
        
        // Cria cada personagem com nome e interacao.
        personagens.forEach((personagem, indice) => {
            this.criarPersonagem(posicaoInicialX + (indice * espacamento), centerY + 50, personagem);
        });
    }
    
    // Cria um personagem clicavel com nome e escala adequada.
    criarPersonagem(x, y, chave) {
        const nomesExibicao = {
            JOSE: 'JOSÉ',
            JOAO: 'JOÃO',
            MARIA: 'MARIA',
            PAULA: 'PAULA'
        };

        // Define a escala padrao para personagens de corpo inteiro.
        let escala = 0.5;

        // Reduz a escala de JOSE e JOAO, que sao personagens mais altos.
        if (chave === 'JOSE' || chave === 'JOAO') {
            escala = 0.3;
        }

        // Exibe o nome do personagem acima da imagem.
        this.add.text(x, y - 120, nomesExibicao[chave] || chave, {
            fontSize: "40px",
            fill: "#000000"
        }).setOrigin(0.5);
        
        // Cria a imagem do personagem e ativa a interacao.
        const imagemPersonagem = this.add.image(x, y, chave).setScale(escala);
        imagemPersonagem.setInteractive({ cursor: 'pointer' });

        // Ao clicar no personagem, abre a cena de informacoes.
        imagemPersonagem.on('pointerdown', () => {
            this.scene.start('InfoPersonagem', { personagem: chave });
        });
    }
}
