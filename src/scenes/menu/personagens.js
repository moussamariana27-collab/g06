class SelecaoPersonagem extends Phaser.Scene {
    
    constructor() {
        super("SelecaoPersonagem");
    }

    preload() {
        this.load.image('botao', 'assets/btnJogar.png');
        this.load.image('JOSÃ‰', 'assets/jose1.png');
        this.load.image('PAULA', 'assets/paula2.png');
        this.load.image('MARIA', 'assets/maria2.png');
        this.load.image('JOÃƒO', 'assets/joao1.png');
        this.load.image('fundo2', 'assets/fundo2.png');
    }

    create() {
        // Calcula os pontos centrais da cÃ¢mera para centralizaÃ§Ãµes
        const { centerX, centerY } = this.cameras.main;

        // Carrega a imagem de fundo responsiva da tela de seleÃ§Ã£o
        this.add.image(this.scale.width / 2, this.scale.height / 2, "fundo2")
            .setDisplaySize(this.scale.width, this.scale.height);
        
        // Exibe o tÃ­tulo da cena
        this.add.text(centerX, 80, "ConheÃ§a seu Personagem", {
            fontSize: "60px",
            fill: "#000000"
        }).setOrigin(0.5);
        
        // Exibe a instruÃ§Ã£o para o jogador
        this.add.text(centerX, 150, "Clique em cima do personagem desejado para saber mais informaÃ§Ãµes sobre ele", {
            fontSize: "32px",
            fill: "#000000",
            align: "center",
            wordWrap: { width: 900 }
        }).setOrigin(0.5);

        // Define os personagens disponÃ­veis no jogo
        const personagens = ['JOSÃ‰', 'PAULA', 'MARIA', 'JOÃƒO'];
        
        // EspaÃ§amento horizontal entre os sprites dos personagens
        const espacamento = 200;
        
        // Calcula a posiÃ§Ã£o X inicial para centralizar os personagens na tela
        const posicaoInicialX = centerX - (espacamento * (personagens.length - 1)) / 2;
        
        // Cria cada personagem com seu nome e interatividade
        personagens.forEach((personagem, indice) => {
            this.criarPersonagem(posicaoInicialX + (indice * espacamento), centerY + 50, personagem);
        });
    }
    
    // Cria um personagem clickÃ¡vel com nome e escala apropriados
    criarPersonagem(x, y, chave) {
        // Define a escala padrÃ£o para personagens de corpo inteiro
        let escala = 0.5;

        // Reduz a escala para JOSÃ‰ e JOÃƒO (personagens mais altos)
        if (chave === 'JOSÃ‰' || chave === 'JOÃƒO') {
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

        // Ao clicar no personagem, passa para a cena de informaÃ§Ãµes
        imagemPersonagem.on('pointerdown', () => {
            this.scene.start('InfoPersonagem', { character: chave });
        });
    }
}
