class FeedbackVitoria extends Tutorial {

    constructor(key) {
        super(key);
    }

    init(data) {
        super.init(data);
        this.modoFeedbackVitoria = true;
        this.dialogos = this.definirDialogos();
        this.spawnPos = data?.spawnPos || null;
    }

    // Sobrescrito em cada subclasse
    definirDialogos() { return []; }

    // Sobrescrito em cada subclasse
    definirFundo() { return null; }

    preload() {
        super.preload();
        const fundo = this.definirFundo();
        if (fundo) this.load.image('fundoFeedback', fundo);
        // Carrega o som de vitória
        this.load.audio('vitoria', 'assets/vitoria.mp3');
    }

    create() {
        // Toca o som de vitória
        this.somVitoria = this.sound.add('vitoria', {
            loop: true,
            volume: 0.5
        });
        this.somVitoria.play();

        // Adiciona fundo antes de criar os elementos do estadual
        const fundo = this.definirFundo();
        if (fundo) {
            this.add.image(this.scale.width / 2, this.scale.height / 2, 'fundoFeedback')
                .setDisplaySize(this.scale.width, this.scale.height)
                .setDepth(-1);
        }

        super.create();
    }
}