import { Tutorial } from './tutorial.js';
import { Maquininha } from './maquininhas.js';
import { MainScene } from './main.js';
import { TelaInicial } from './telainicial.js';
import { Dialogos } from '../dialogos.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    parent: 'game-container',

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    pixelArt: true,

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },

    scene: [TelaInicial, Tutorial, Maquininha, MainScene, Dialogos]
};

new Phaser.Game(config);
