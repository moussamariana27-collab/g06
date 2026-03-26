class FeedbackVitoriaLojaDeRoupa extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaLojaDeRoupa'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';
    }

    definirFundo()    { return 'assets/lojaderoupa_interior.png'; }
    definirDialogos() { 
        return [
            'Parabéns! Você conduziu bem a conversa e conseguiu gerar confiança com a cliente.',
            'Agora, você avançará para um novo desafio: a loja da Lígia.',
            'Lígia é dona de uma loja de materiais de construção com faturamento mensal em torno de 80 mil reais, construída após anos de dedicação ao negócio.',
            'Ela valoriza muito a organização e a integridade da operação, mas tem pouca paciência com abordagens que não sejam objetivas.',
            'Seu desafio será apresentar as soluções da Cielo com clareza e precisão, evitando deslizes que possam encerrar a conversa rapidamente.'
        ]; 
    }
}