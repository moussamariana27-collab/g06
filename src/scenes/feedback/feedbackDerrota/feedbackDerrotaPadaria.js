class FeedbackDerrotaPadaria extends FeedbackDerrota {
    constructor() { super('FeedbackDerrotaPadaria'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Padaria';
    }

    definirFundo()    { return 'assets/padaria_interior.png'; }
    definirDialogos() { return ['Texto de feedback de derrota da padaria...']; }
}