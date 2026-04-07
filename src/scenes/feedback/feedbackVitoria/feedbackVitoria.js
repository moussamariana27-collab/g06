// Classe base dos feedbacks de vitoria.
// Reaproveita a estrutura do tutorial e troca apenas fundo, audio e textos.
class FeedbackVitoria extends Tutorial {

    constructor(key) {
        super(key);
    }

    init(data) {
        super.init(data);
        // Marca a cena como feedback e recebe os dialogos da subclasse.
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
        // Carrega o som de vitoria.
        this.load.audio('vitoria', 'assets/vitoria.mp3');
    }

    create() {
        // Toca o audio e monta o fundo especifico do feedback.
        // Toca o som de vitoria sem quebrar a cena caso o navegador bloqueie autoplay.
        this.somVitoria = utilitariosJogo.tocarAudio(this, 'vitoria', {
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
        this.events.once('shutdown', () => utilitariosJogo.pararAudio(this.somVitoria));
    }
}
