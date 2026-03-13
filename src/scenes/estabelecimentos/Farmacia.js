// Cria a class Farmacia
class Farmacia extends Phaser.Scene {
    constructor() {
        super({ key: 'Farmacia' });
    }

    init(data) {
        this.characterEscolhido = data?.character || null;
    }

    preload() {
        this.load.image('bgFarmacia', 'assets/farmacia_interior.png');
    }

    create() {
        // Cria a imagem de fundo da farmácia
        const bg = this.add.image(0, 0, 'bgFarmacia').setOrigin(0, 0);
        // Ajusta o tamanho da imagem de fundo
        bg.setDisplaySize(this.scale.width, this.scale.height);
        // Adiciona o texto entre aspas simples na tela e define a posição desse texto
        this.add.text(this.scale.width / 2, this.scale.height - 40, 'Pressione ESPAÇO para voltar', {
            fontSize: '16px', fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 6 }
        }).setOrigin(0.5);
        // Adiciona uma função que sempre que o jogador apertar a tecla SPACE ele retorna para a cidade
        this.input.keyboard.once('keydown-SPACE', () => this.scene.start('Cidade', { character: this.characterEscolhido }));
        // Adiciona uma função que sempre que o jogador apertar a tecla ENTER ele retorna para a cidade
        this.input.keyboard.once('keydown-ENTER', () => this.scene.start('Cidade', { character: this.characterEscolhido }));
    }
}
