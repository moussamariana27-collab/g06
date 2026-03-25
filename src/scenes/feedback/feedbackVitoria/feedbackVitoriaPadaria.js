class FeedbackVitoriaPadaria extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaPadaria'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';
    }

    definirFundo()    { return 'assets/padaria_interior.png'; }
    definirDialogos() { return ['Texto de feedback de vitoria da padaria...']; }
}