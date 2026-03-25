// Cria a class LojaDeRoupa
class LojaDeRoupa extends Phaser.Scene {
    constructor() {
        super({ key: 'LojaDeRoupa' });
    }

    init(data) {
        this.personagemEscolhido = data?.character || null;
    }

    preload() {
        this.load.audio('musicabatalha', 'assets/musicabatalha.mp3');
        this.load.image('bgLojaDeRoupa', 'assets/lojaderoupa_interior.png');

        // Personagem do jogador
        const sprites = {
            'JOSÉ':  { file: 'assets/joseCorpo.png' },
            'MARIA': { file: 'assets/mariaCorpo.png' },
            'JOÃO':  { file: 'assets/joaoCorpo.png' },
            'PAULA': { file: 'assets/paulaCorpo.png' }
        };

        const dadosSprite = sprites[this.personagemEscolhido];

        if (!dadosSprite) {
            console.error('Personagem inválido:', this.personagemEscolhido);
            return;
        }

        this.load.image('personagemLojaDeRoupa', dadosSprite.file);
    }

    create() {
       
        this.musica = this.sound.add('musicabatalha', { loop: true, volume: 0.5 });
        this.musica.play();

        // Cria a imagem de fundo da loja de roupa
        const fundoCena = this.add.image(0, 0, 'bgLojaDeRoupa').setOrigin(0, 0);
        // Ajusta o tamanho da imagem de fundo
        fundoCena.setDisplaySize(this.scale.width, this.scale.height);

        // Adiciona o personagem
        this.criarPersonagem();

        // Exibe a instrução para retornar à cidade
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

        // Exibe uma mensagem de boas-vindas
        this.add.text(
            this.scale.width / 2,
            80,
            'Bem-vindo à Loja de Roupas!',
            {
                fontSize: '32px',
                fill: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 16, y: 10 }
            }
        ).setOrigin(0.5);

        // Voltar pra cidade
        this.input.keyboard.once('keydown-SPACE', () => {
            this.musica.stop();
            this.scene.start('Cidade', { character: this.personagemEscolhido });
        });
        this.input.keyboard.once('keydown-ENTER', () => {
            this.musica.stop();
            this.scene.start('Cidade', { character: this.personagemEscolhido });
        });
    }

    criarPersonagem() {
        let escala = 1;
        let posicaoX = (this.scale.width * 1 / 3) - 100;
        let posicaoY = this.scale.height - 270;

        if (this.personagemEscolhido === 'JOSÉ' || this.personagemEscolhido === 'JOÃO') {
            escala = 0.5;
            posicaoX = (this.scale.width * 1 / 3) - 80;
            posicaoY = this.scale.height - 330;
        } else {
            escala = 1;
            posicaoX = (this.scale.width * 1 / 3) - 100;
            posicaoY = this.scale.height - 270;
        }

        this.personagem = this.physics.add.sprite(posicaoX, posicaoY, 'personagemLojaDeRoupa', 0).setDepth(1).setScale(escala);
    }
}