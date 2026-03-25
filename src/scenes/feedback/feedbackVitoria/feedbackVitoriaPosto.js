class FeedbackVitoriaPosto extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaPosto'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';
    }

    definirFundo()    { return 'assets/FundoPosto.png'; }
    definirDialogos() { return ['Texto de feedback de vitoria do posto de gasolina...']; }
}