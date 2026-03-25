class FeedbackDerrotaPosto extends FeedbackDerrota {
    constructor() { super('FeedbackDerrotaPosto'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Posto';
    }

    definirFundo()    { return 'assets/FundoPosto.png'; }
    definirDialogos() { return ['Texto de feedback de derrota do posto...']; }
}