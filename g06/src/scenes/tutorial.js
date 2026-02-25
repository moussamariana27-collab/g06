// O comando import importa o módulo gameState
import { gameState } from '../gameState.js';

import {listaDialogos} from '../dialogos.js';

// O comando export exporta o módulo Tutorial
export class Tutorial extends Phaser.Scene {
    constructor() {
        // Define a chave do arquivo, é nome pelo qual esse arquivo será referenciado quando for importado por outro
        super({ key: 'tutorial' });
    }

    // carrega os arquivos por jogo
    preload() {
        this.load.image('homem_negro', '../../assets1/homemNegro.png');
        this.load.image('educa', '../../assets1/educa.png');
    }

    // cria os recursos que serão usados e as imagens que foram carregadas no preload que serão rodados no jogo 
    create() {


        // define o fundo preto na câmera principal 
        this.cameras.main.setBackgroundColor('#000000');

        this.add.image(400, 400, 'educa').setScale(2);
        this.add.image(100, 150, 'homem_negro').setOrigin(0, 0);

        // cria os retângulos com bordas arredondadas
        this.add.graphics().setDepth(1).fillStyle(0x5078D8, 1).fillRoundedRect(10, 380, 780, 240, 32);
        this.add.graphics().setDepth(2).fillStyle(0xA0C8F0, 1).fillRoundedRect(20, 390, 760, 220, 32);
        this.add.graphics().setDepth(3).fillStyle(0xE8F0FF, 1).fillRoundedRect(30, 400, 740, 200, 32);

        // cria os retângulos arredondados que serão usados nos botões
        this.add.graphics().setDepth(8).fillStyle(0x5078D8, 1).fillRoundedRect(90, 540, 120, 50, 6);
        this.add.graphics().setDepth(8).fillStyle(0x5078D8, 1).fillRoundedRect(590, 540, 120, 50, 6);

        // Ele começa exibindo o que estiver no gameState atual
        let txt = this.add.text(100, 410, listaDialogos[gameState.indiceFala], {
            fontFamily: 'montserrat',
            fontSize: "24px",
            color: "#000000",
            wordWrap: { width: 600 }
        }).setDepth(5);

        // botões de próximo e anterior
        const botaoProximo = this.add.text(650, 570, 'Próximo', {
            fontFamily: 'montserrat', fontSize: '28px', fill: '#ffffff'
        }).setDepth(9).setOrigin(0.5).setInteractive({ useHandCursor: true });

        const botaoAnterior = this.add.text(150, 570, 'Anterior', {
            fontFamily: 'montserrat', fontSize: '28px', fill: '#ffffff'
        }).setDepth(9).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // lógica dobotão próximo
        botaoProximo.on('pointerdown', () => {
            if (gameState.indiceFala < listaDialogos.length - 8) {
                gameState.indiceFala++; // Aumenta o índice global
                txt.setText(listaDialogos[gameState.indiceFala]);
            } else {
                // Se chegar no fim, define índice igual a 6
                gameState.indiceFala = 6; 

                this.scene.start('maquininha'); 
               
            }
        });

        // lógica do botão anterior
        botaoAnterior.on('pointerdown', () => {
            if (gameState.indiceFala > 0) {
                gameState.indiceFala--; // Diminui o índice global
                txt.setText(listaDialogos[gameState.indiceFala]);
            } else {
                console.log("Início do diálogo atingido.");
            }
        });

        // Efeitos de Hover
        [botaoProximo, botaoAnterior].forEach(btn => {
            btn.on('pointerover', () => btn.setStyle({ fill: '#000' }));
            btn.on('pointerout', () => btn.setStyle({ fill: '#fff' }));
        });
    }
}