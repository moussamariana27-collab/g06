// Cria a class LojaDeRoupa
class LojaDeRoupa extends Phaser.Scene {
    constructor() {
        super({ key: 'LojaDeRoupa' });
    }

    init(data) {
        this.characterEscolhido = data?.character || null;
    }

    preload() {
        this.load.audio('musicabatalha', 'assets/musicabatalha.mp3');
        this.load.image('bgLojaDeRoupa', 'assets/lojaderoupa_interior.png');
    }

    create() {
       
        this.musica = this.sound.add('musicabatalha', { loop: true, volume: 0.5 });
        this.musica.play();

        // Cria a imagem de fundo da loja de roupa
        const bg = this.add.image(0, 0, 'bgLojaDeRoupa').setOrigin(0, 0);
        // Ajusta o tamanho da imagem de fundo
        bg.setDisplaySize(this.scale.width, this.scale.height);

        this.add.text(
            this.scale.width / 2,
            this.scale.height - 40,
            'Pressione ESPAÇO para voltar',
            {
                fontSize: '16px',
                fill: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 10, y: 6 }
            }
        ).setOrigin(0.5);

        // Voltar pra cidade
        this.input.keyboard.once('keydown-SPACE', () => {
            this.musica.stop(); // ✅ para a música
            this.scene.start('Cidade', { character: this.characterEscolhido });
        });
        this.input.keyboard.once('keydown-ENTER', () => {
            this.musica.stop(); // ✅ para a música
            this.scene.start('Cidade', { character: this.characterEscolhido });
        });
    }
}