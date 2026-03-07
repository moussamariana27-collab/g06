class LojaDeRoupa extends Phaser.Scene {
    constructor() {
        super({ key: 'LojaDeRoupa' });
    }

    preload() {
        this.load.image('bgLojaDeRoupa', 'assets/lojaderoupa_interior.png');
    }

    create() {
        const bg = this.add.image(0, 0, 'bgLojaDeRoupa').setOrigin(0, 0);
        bg.setDisplaySize(this.scale.width, this.scale.height);

        this.add.text(this.scale.width / 2, this.scale.height - 40, 'Pressione ESPAÇO para voltar', {
            fontSize: '16px', fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 6 }
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => this.scene.start('Cidade'));
        this.input.keyboard.once('keydown-ENTER', () => this.scene.start('Cidade'));
    }
}
