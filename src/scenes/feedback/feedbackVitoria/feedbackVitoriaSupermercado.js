class FeedbackVitoriaSupermercado extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaSupermercado'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';
    }

    definirFundo()    { return 'assets/mercado_interior.png'; }
    definirDialogos() { return ['Texto de feedback de vitoria do supermercado...']; }
}