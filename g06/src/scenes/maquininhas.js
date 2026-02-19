// importa a variável gameState para que seja usada no arquivo
import { gameState } from '../gameState.js';

// importa a 
import { listaDialogos } from '../dialogos.js';

export class Maquininha extends Phaser.Scene {
    constructor() {
        super({ key: 'maquininha' });
    }

    preload() {
        this.load.image('homem_negro', '../../assets1/homemNegro.png');
        this.load.image('educa', '../../assets1/educa.png');
        this.load.image('flash', '../../assets1/cieloFlash.png');
        this.load.image('zip', '../../assets1/cieloZip.png');
        this.load.image('lio', '../../assets1/cieloLio.png');
    
    }

    create() {
        // deifine gameState igual a 7 
        gameState.indiceFala = 7

        this.cameras.main.setBackgroundColor('#000000');
        this.add.image(300, 400, 'educa').setScale(2);
        this.add.image(400, 150, 'homem_negro').setOrigin(0, 0);

        // Imagem da Maquininha que muda
        this.cieloMaquininha = this.add.image(150, 300, 'flash').setScale(2).setDepth(6);

        //retângulos de bordas arredndadas
        this.add.graphics().setDepth(1).fillStyle(0x5078D8, 1).fillRoundedRect(10, 380, 780, 240, 32);
        this.add.graphics().setDepth(2).fillStyle(0xA0C8F0, 1).fillRoundedRect(20, 390, 760, 220, 32);
        this.add.graphics().setDepth(3).fillStyle(0xE8F0FF, 1).fillRoundedRect(30, 400, 740, 200, 32);
        
        // Fundos dos botões
        this.add.graphics().setDepth(8).fillStyle(0x5078D8, 1).fillRoundedRect(90, 540, 120, 50, 6);
        this.add.graphics().setDepth(8).fillStyle(0x5078D8, 1).fillRoundedRect(590, 540, 120, 50, 6);

        // Texto que usa o gameState
        this.txt = this.add.text(150, 430, listaDialogos[gameState.indiceFala], {
            fontFamily: 'montserrat',
            fontSize: "24px",
            color: "#000000",
            wordWrap: { width: 500 },
        }).setDepth(5);

        // botões de próximo e anterior
        const botaoProximo = this.add.text(650, 570, 'Próximo', {
            fontFamily: 'montserrat', fontSize: '28px', fill: '#fff'
        }).setDepth(9).setOrigin(0.5).setInteractive({ useHandCursor: true });

        const botaoAnterior = this.add.text(150, 570, 'Anterior', {
            fontFamily: 'montserrat', fontSize: '28px', fill: '#fff'
        }).setDepth(9).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Chama a atualização visual inicial para garantir que a imagem comece correta
        this.atualizarVisual();

        // lógica de clique
        botaoProximo.on('pointerdown', () => {
            if (gameState.indiceFala < listaDialogos.length - 1) {
                
                gameState.indiceFala++;
                this.atualizarVisual(listaDialogos);
            } else {
                // Fim desta parte, vai para a cena principal
                this.scene.start('mainScene');
            }
        });

        botaoAnterior.on('pointerdown', () => {
            if (gameState.indiceFala >= 8) {
                gameState.indiceFala--;
                this.atualizarVisual(listaDialogos);
            } else {
                // Se o jogador quiser voltar além da primeira fala desta cena, volta para o tutorial
                // 
                gameState.indiceFala = 6; 
                this.scene.start('tutorial');
            }
        });

        // Efeitos Hover
        [botaoProximo, botaoAnterior].forEach(btn => {
            btn.on('pointerover', () => btn.setStyle({ fill: '#000' }));
            btn.on('pointerout', () => btn.setStyle({ fill: '#fff' }));
        });
    }

    // Função auxiliar para atualizar o texto e a imagem da maquininha
    atualizarVisual(listaDialogos) {
        if(listaDialogos) this.txt.setText(listaDialogos[gameState.indiceFala]);

        let indice = gameState.indiceFala;

        if (indice === 7 || indice === 8 ) {
            this.cieloMaquininha.setTexture('flash').setScale(2);
        } else if (indice === 9 || indice === 10) {
            this.cieloMaquininha.setTexture('zip').setScale(0.4);
        } else if (indice >= 11) {
            this.cieloMaquininha.setTexture('lio').setScale(2);
        }
    }
}