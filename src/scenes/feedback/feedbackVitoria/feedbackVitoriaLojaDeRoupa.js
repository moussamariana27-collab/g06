class FeedbackVitoriaLojaDeRoupa extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaLojaDeRoupa'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';
    }

    definirFundo()    { return 'assets/lojaderoupa_interior.png'; }
    definirDialogos() { return ['Texto de feedback de vitoria da loja de roupa...']; }
}