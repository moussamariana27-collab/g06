class FeedbackDerrotaLojaDeRoupa extends FeedbackDerrota {
    constructor() { super('FeedbackDerrotaLojaDeRoupa'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'LojaDeRoupa';
    }

    definirFundo()    { return 'assets/lojaderoupa_interior.png'; }
    definirDialogos() { return ['Texto de feedback de derrota da loja de roupa...']; }
}