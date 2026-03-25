class FeedbackDerrotaSalaoDeBeleza extends FeedbackDerrota {
    constructor() { super('FeedbackDerrotaSalaoDeBeleza'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'SalaoDeBeleza';
    }

    definirFundo()    { return 'assets/salaodebeleza_interior.png'; }
    definirDialogos() { return ['Texto de feedback de derrota do salao de beleza...']; }
}