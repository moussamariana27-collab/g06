class FeedbackVitoriaSupermercado extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaSupermercado'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';
    }

    definirFundo()    { return 'assets/mercado_interior.png'; }
    definirDialogos() 
        { return [
                'Parabéns! Você conduziu bem a conversa e conseguiu gerar confiança com o cliente.',
                'Agora, você avançará para um novo desafio: o posto da Sra. Roberta.',
                'Roberta assumiu a gestão muito jovem após um imprevisto familiar e, com muita responsabilidade, manteve o negócio funcionando.',
                'Hoje, o posto tem faturamento mensal em torno de 750 mil reais e uma operação de alta exigência.',
                'Ela já recebeu diversas propostas, é bastante impaciente e difícil de convencer.',
                'Seu desafio será apresentar as soluções da Cielo com objetividade e segurança, demonstrando valor rapidamente.'
            ]; 
        }
}