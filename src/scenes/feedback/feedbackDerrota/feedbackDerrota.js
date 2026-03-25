class FeedbackDerrota extends Tutorial {

    constructor(key) {
        super(key);
    }

    init(data) {
        super.init(data);
        this.modoFeedbackDerrota = true;
        this.dialogos = this.definirDialogos();
    }

    // Sobrescrito em cada subclasse
    definirDialogos() { return []; }

    // Sobrescrito em cada subclasse
    definirFundo() { return null; }

    preload() {
        super.preload();
        const fundo = this.definirFundo();
        if (fundo) this.load.image('fundoFeedback', fundo);
    }

    create() {
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