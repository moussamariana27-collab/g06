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
                    'Agora, você avançará para um novo desafio: a loja de roupas da Nayara.',
                    'Nayara é dona de um vestuário com faturamento mensal em torno de 15 mil reais e carrega uma forte descendência indígena, refletida em sua história e identidade.',
                    'Ela já teve experiência com diferentes provedores de maquininhas, o que a torna mais criteriosa na comparação de benefícios e taxas.',
                    'Seu desafio será apresentar as soluções da Cielo de forma clara e vantajosa, mostrando diferenciais que realmente façam sentido para o negócio dela.'
        ]; 
    }
}