// Classe base dos feedbacks de derrota.
// Reaproveita a estrutura do tutorial e troca apenas fundo, audio e textos.
class FeedbackDerrota extends Tutorial {

    constructor(key) {
        super(key);
    }

    init(data) {
        super.init(data);
        // Marca a cena como feedback e recebe os dialogos da subclasse.
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
        // Carrega o som de derrota.
        this.load.audio('derrota', 'assets/derrota.mp3');
    }

    create() {
        // Toca o audio e monta o fundo especifico do feedback.
        // Toca o som de derrota sem interromper o fluxo se o audio falhar.
        this.somDerrota = utilitariosJogo.tocarAudio(this, 'derrota', {
            loop: false,
            volume: 0.5
        });

        // Adiciona o fundo antes de criar os elementos do estadual.
        const fundo = this.definirFundo();
        if (fundo) {
            this.add.image(this.scale.width / 2, this.scale.height / 2, 'fundoFeedback')
                .setDisplaySize(this.scale.width, this.scale.height)
                .setDepth(-1);
        }

        super.create();

        // Libera o audio quando a cena for encerrada.
        this.events.once('shutdown', () => utilitariosJogo.pararAudio(this.somDerrota));

    }
}
