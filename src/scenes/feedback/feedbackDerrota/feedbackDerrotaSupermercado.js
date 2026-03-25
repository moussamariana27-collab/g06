class FeedbackDerrotaSupermercado extends FeedbackDerrota {
    constructor() { super('FeedbackDerrotaSupermercado'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Mercado';
    }

    definirFundo()    { return 'assets/mercado_interior.png'; }
    definirDialogos() { return ['Texto de feedback de derrota do Supermercado...']; }
}