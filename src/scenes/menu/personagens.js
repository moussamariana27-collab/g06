class CharacterSelectScene extends Phaser.Scene {
    
    constructor() {
        super("CharacterSelectScene");
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
        // Obtém as coordenadas do centro da câmera principal
        const { centerX, centerY } = this.cameras.main;

        this.add.image(this.scale.width / 2, this.scale.height / 2, "fundo2")
            // Faz a imagem se adequar ao tamanho da tela em largura e altura
            .setDisplaySize(this.scale.width, this.scale.height);
        // Adiciona o texto entre aspas e define estilo
        this.add.text(centerX, 80, "Conheça seu Personagem", {
            fontSize: "60px",
            fill: "#000000"
        }).setOrigin(0.5);
        // Adiciona texto entre aspas e define estilo da letra
        this.add.text(centerX, 150, "Clique em cima do personagem desejado para saber mais informações sobre ele", {
            fontSize: "32px",
            fill: "#000000",
            align: "center",
            wordWrap: { width: 900 }
        }).setOrigin(0.5);

        // Cria uma variável que guarda uma lista com o nome dos personagens jogáveis 
        let personagens = ['JOSÉ', 'PAULA', 'MARIA', 'JOÃO'];
        // Define a distância horizontal entre os personagens 
        let espacamento = 200;
        // Centraliza os personagens na tela
        let startX = centerX - (espacamento * (personagens.length - 1)) / 2;
        personagens.forEach((personagem, i) => {
            this.createCharacter(startX + (i * espacamento), centerY + 50, personagem);
        });
    }
    // Define o tamanho do personagem se o personagem for JOSÉ ou JOÃO o tamanho da imagem diminui
    createCharacter(x, y, key) {
        let escala = 0.5;

        if (key === 'JOSÉ' || key === 'JOÃO') {
            escala = 0.3;
        }

        this.add.text(x, y - 120, key, {
            fontSize: "40px",
            fill: "#000000"
        }).setOrigin(0.5);
        // Permite a escolha do personagem jogável
        let character = this.add.image(x, y, key).setScale(escala);
        character.setInteractive({ cursor: 'pointer' });

        character.on('pointerdown', () => {
            // Todos os personagens vão para a mesma cena,
            // passando o nome do personagem como parâmetro
            this.scene.start('CharacterInfoScene', { character: key });
        });
    }
}