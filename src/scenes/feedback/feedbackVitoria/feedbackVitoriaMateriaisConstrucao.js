class FeedbackVitoriaMateriaisConstrucao extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaMateriaisConstrucao'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'LojaDeConstrução';
    }

    definirDialogos() 
    { return[
                    'Parabéns! Você conduziu bem a conversa e conseguiu gerar confiança com o cliente.',
                    'Agora, você avançará para um novo desafio: o supermercado do Sr. Ruan.',
                    'Ruan é dono de um supermercado de origem mexicana, com faturamento mensal em torno de 300 mil reais e uma operação intensa no dia a dia.',
                    'Ele valoriza eficiência e controle, e costuma ser exigente com soluções que impactam diretamente seu negócio.',
                    'Seu desafio será apresentar as soluções da Cielo de forma estratégica, acompanhando o ritmo e as necessidades da operação dele.'
            ];
    }
}