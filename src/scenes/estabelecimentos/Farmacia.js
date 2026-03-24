// Cria a class Farmacia
class Farmacia extends Phaser.Scene {
    constructor() {
        super({ key: 'Farmacia' });
    }

    init(data) {
        this.personagemEscolhido = data?.character || null;
    }

    preload() {
        // Carrega a música de batalha compartilhada
        this.load.audio('musicabatalha', 'assets/musicabatalha.mp3');

        // Carrega a imagem de fundo da farmácia
        this.load.image('bgFarmacia', 'assets/farmacia_interior.png');

        // Define os sprites dos personagens jogáveis
        const sprites = {
            'JOSÉ':  { file: 'assets/joseCorpo.png' },
            'MARIA': { file: 'assets/mariaCorpo.png' },
            'JOÃO':  { file: 'assets/joaoCorpo.png' },
            'PAULA': { file: 'assets/paulaCorpo.png' }
        };

        // Obtém os dados do personagem escolhido
        const dadosSprite = sprites[this.personagemEscolhido];
        // Verifica se o personagem é válido antes de carregar
        if (!dadosSprite) { 
            console.error('Personagem inválido:', this.personagemEscolhido);
            return; 
        }
        // Carrega a spritesheet do personagem escolhido
        this.load.image('personagemFarmacia', dadosSprite.file);
    }

    create() {
        // Toca a música de batalha
        this.musica = this.sound.add('musicabatalha', { loop: true, volume: 0.5 });
        this.musica.play();

        // Cria a imagem de fundo da farmácia
        const fundoCena = this.add.image(0, 0, 'bgFarmacia').setOrigin(0, 0);
        // Ajusta o tamanho da imagem de fundo para preencher a tela
        fundoCena.setDisplaySize(this.scale.width, this.scale.height);
        
        // Exibe a instrução para voltar à cidade
        this.add.text(this.scale.width / 2, this.scale.height - 40, 'Pressione ESPAÇO para voltar', {
            fontSize: '16px', 
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 6 }
        }).setOrigin(0.5);

        // Input: retorna para a cidade
        this.input.keyboard.once('keydown-SPACE', () => {
            this.musica.stop();
            this.scene.start('Cidade', { character: this.personagemEscolhido });
        });
        this.input.keyboard.once('keydown-ENTER', () => {
            this.musica.stop();
            this.scene.start('Cidade', { character: this.personagemEscolhido });
        });

        // Cria o sprite do personagem
        this.criarPersonagem();
    }

    criarPersonagem() {
        // Define a escala padrão para personagens de corpo inteiro
        let escala = 1;
        let posicaoX = (this.scale.width * 1 / 3) - 100;
        let posicaoY = this.scale.height - 270;

        // Reduz a escala para JOSÉ e JOÃO (personagens mais altos)
        if (this.personagemEscolhido === 'JOSÉ' || this.personagemEscolhido === 'JOÃO') {
            escala = 0.5;
            posicaoX = (this.scale.width * 1 / 3) - 80;
            posicaoY = this.scale.height - 330;
        }

        // Cria o sprite do personagem com física
        this.personagem = this.physics.add.sprite(posicaoX, posicaoY, 'personagemFarmacia', 0)
            .setDepth(1)
            .setScale(escala);
    }
}