class CharacterSelectScene extends Phaser.Scene {
    
    constructor() {
        super("CharacterSelectScene");
    }

    preload() {
        this.load.image('botao', 'assets/btnJogar.png');
        this.load.image('JOSÉ', 'assets/jose.png');
        this.load.image('PAULA', 'assets/paula2.png');
        this.load.image('MARIA', 'assets/maria2.png');
        this.load.image('JOÃO', 'assets/joao.png');
        this.load.image('fundo2', 'assets/fundo2.png');
    }

    create() {
        const { centerX, centerY } = this.cameras.main;

        this.add.image(this.scale.width / 2, this.scale.height / 2, "fundo2")
            .setDisplaySize(this.scale.width, this.scale.height);

        this.add.text(centerX, 80, "Conheça seu Personagem", {
            fontSize: "60px",
            fill: "#000000"
        }).setOrigin(0.5);

        this.add.text(centerX, 150, "Clique em cima do personagem desejado para saber mais informações sobre ele", {
            fontSize: "32px",
            fill: "#000000",
            align: "center",
            wordWrap: { width: 900 }
        }).setOrigin(0.5);

        this.selectedCharacter = null;

        this.confirmText = this.add.text(centerX, 500, "", {
            fontSize: "40px",
            fill: "#000000"
        }).setOrigin(0.5);

        let personagens = ['JOSÉ', 'PAULA', 'MARIA', 'JOÃO'];
        let espacamento = 200;
        let startX = centerX - (espacamento * (personagens.length - 1)) / 2;

        personagens.forEach((personagem, i) => {
            this.createCharacter(startX + (i * espacamento), centerY + 50, personagem);
        });
    }

    createCharacter(x, y, key) {
        let escala = 0.5;

        if (key === 'JOSÉ' || key === 'JOÃO') {
            escala = 0.3;
        }

        this.add.text(x, y - 120, key, {
            fontSize: "40px",
            fill: "#000000"
        }).setOrigin(0.5);

        let character = this.add.image(x, y, key).setScale(escala);
        character.setInteractive({ cursor: 'pointer' });

        character.on('pointerdown', () => {
            if (key === 'JOSÉ')  this.scene.start("CharacterInfoScene",  { character: key });
            if (key === 'MARIA') this.scene.start("CharacterInfoScene2", { character: key });
            if (key === 'JOÃO')  this.scene.start("CharacterInfoScene3", { character: key });
            if (key === 'PAULA') this.scene.start("CharacterInfoScene4", { character: key });
        });
    }
}
