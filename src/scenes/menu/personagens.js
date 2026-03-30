class SelecaoPersonagem extends Phaser.Scene {
    
    constructor() {
        super("SelecaoPersonagem");
    }

    preload() {
        this.load.image('botao', 'assets/btnJogar.png');
        this.load.image('JOSÉ', 'assets/jose1.png');
        this.load.image('PAULA', 'assets/paula2.png');
        this.load.image('MARIA', 'assets/maria2.png');
        this.load.image('JOÃO', 'assets/joao1.png');
        this.load.image('fundo2', 'assets/fundo2.png');
    }

    create() {
        // Calcula os pontos centrais da câmera para centralizações
        const { centerX, centerY } = this.cameras.main;

        // Carrega a imagem de fundo responsiva da tela de seleção
        this.add.image(this.scale.width / 2, this.scale.height / 2, "fundo2")
            .setDisplaySize(this.scale.width, this.scale.height);
        
        // Exibe o título da cena
        this.add.text(centerX, 80, "Conheça seu Personagem", {
            fontSize: "60px",
            fill: "#000000"
        }).setOrigin(0.5);
        
        // Exibe a instrução para o jogador
        this.add.text(centerX, 150, "Clique em cima do personagem desejado para saber mais informações sobre ele", {
            fontSize: "32px",
            fill: "#000000",
            align: "center",
            wordWrap: { width: 900 }
        }).setOrigin(0.5);

        // Define os personagens disponíveis no jogo
        const personagens = ['JOSÉ', 'PAULA', 'MARIA', 'JOÃO'];
        
        // Espaçamento horizontal entre os sprites dos personagens
        const espacamento = 200;
        
        // Calcula a posição X inicial para centralizar os personagens na tela
        const posicaoInicialX = centerX - (espacamento * (personagens.length - 1)) / 2;
        
        // Cria cada personagem com seu nome e interatividade
        personagens.forEach((personagem, indice) => {
            this.criarPersonagem(posicaoInicialX + (indice * espacamento), centerY + 50, personagem);
        });
    }
    
    // Cria um personagem clickável com nome e escala apropriados
    criarPersonagem(x, y, chave) {
        // Define a escala padrão para personagens de corpo inteiro
        let escala = 0.5;

        // Reduz a escala para JOSÉ e JOÃO (personagens mais altos)
        if (chave === 'JOSÉ' || chave === 'JOÃO') {
            escala = 0.3;
        }

        // Exibe o nome do personagem acima de sua imagem
        this.add.text(x, y - 120, chave, {
            fontSize: "40px",
            fill: "#000000"
        }).setOrigin(0.5);
        
        // Cria a imagem do personagem e a torna interativa
        const imagemPersonagem = this.add.image(x, y, chave).setScale(escala);
        imagemPersonagem.setInteractive({ cursor: 'pointer' });

        // Ao clicar no personagem, passa para a cena de informações
        imagemPersonagem.on('pointerdown', () => {
            this.scene.start('InfoPersonagem', { character: chave });
        });
    }
}