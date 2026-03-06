// ============================================================
//  infopersonagens.js — CharacterInfoScene 1, 2, 3 e 4
//  CORREÇÃO: scene.start usa 'mainScene' (chave correta da MainScene)
// ============================================================

class CharacterInfoScene extends Phaser.Scene {
    constructor() { super("CharacterInfoScene"); }

    preload() {
        this.load.image('fundoInfo', 'assets/fundo2.png');
        this.load.image('botaoVoltar', 'assets/btnVoltar.png');
        this.load.image('botaoJogar', 'assets/btnJogar.png');
    }

    create(data) {
        const { centerX } = this.cameras.main;

        this.add.image(this.scale.width / 2, this.scale.height / 2, "fundoInfo")
            .setDisplaySize(this.scale.width, this.scale.height);

        _criarBotoes(this, centerX, data);
    }
}

class CharacterInfoScene2 extends Phaser.Scene {
    constructor() { super("CharacterInfoScene2"); }

    preload() {
        this.load.image('fundoInfo', 'assets/fundo2.png');
        this.load.image('botaoVoltar', 'assets/btnVoltar.png');
        this.load.image('botaoJogar', 'assets/btnJogar.png');
    }

    create(data) {
        const { centerX } = this.cameras.main;

        this.add.image(this.scale.width / 2, this.scale.height / 2, "fundoInfo")
            .setDisplaySize(this.scale.width, this.scale.height);

        _criarBotoes(this, centerX, data);
    }
}

class CharacterInfoScene3 extends Phaser.Scene {
    constructor() { super("CharacterInfoScene3"); }

    preload() {
        this.load.image('fundoInfo', 'assets/fundo2.png');
        this.load.image('botaoVoltar', 'assets/btnVoltar.png');
        this.load.image('botaoJogar', 'assets/btnJogar.png');
    }

    create(data) {
        const { centerX } = this.cameras.main;

        this.add.image(this.scale.width / 2, this.scale.height / 2, "fundoInfo")
            .setDisplaySize(this.scale.width, this.scale.height);

        _criarBotoes(this, centerX, data);
    }
}

class CharacterInfoScene4 extends Phaser.Scene {
    constructor() { super("CharacterInfoScene4"); }

    preload() {
        this.load.image('fundoInfo', 'assets/fundo2.png');
        this.load.image('botaoVoltar', 'assets/btnVoltar.png');
        this.load.image('botaoJogar', 'assets/btnJogar.png');
    }

    create(data) {
        const { centerX } = this.cameras.main;

        this.add.image(this.scale.width / 2, this.scale.height / 2, "fundoInfo")
            .setDisplaySize(this.scale.width, this.scale.height);

        _criarBotoes(this, centerX, data);
    }
}

// ---- helper compartilhado entre as 4 cenas ----
function _criarBotoes(scene, centerX, data) {
    // BOTÃO VOLTAR
    let btnVoltar = scene.add.image(centerX - 400, 200, 'botaoVoltar').setScale(1.3);
    btnVoltar.setInteractive({ cursor: 'pointer' });
    btnVoltar.on('pointerover',  () => btnVoltar.setScale(1.5));
    btnVoltar.on('pointerout',   () => btnVoltar.setScale(1.3));
    btnVoltar.on('pointerdown',  () => btnVoltar.setScale(1.2));
    btnVoltar.on('pointerup',    () => {
        btnVoltar.setScale(1.3);
        scene.scene.start("CharacterSelectScene");
    });

    // BOTÃO JOGAR — destino depende da cena atual
    let btnJogar = scene.add.image(centerX + 400, 200, 'botaoJogar').setScale(1.3);
    btnJogar.setInteractive({ cursor: 'pointer' });
    btnJogar.on('pointerover',  () => btnJogar.setScale(1.5));
    btnJogar.on('pointerout',   () => btnJogar.setScale(1.3));
    btnJogar.on('pointerdown',  () => btnJogar.setScale(1.2));
    btnJogar.on('pointerup',    () => {
        btnJogar.setScale(1.3);
        
        // Se está na cena CharacterInfoScene3 (JOÃO), vai para Escritorio
        if (scene.scene.key === "CharacterInfoScene3") {
            scene.scene.start("MainScene", { character: data.character });
        } else {
            // Outras cenas vão para MainScene
            scene.scene.start("MainScene", { character: data.character });
        }
    });
}
