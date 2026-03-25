class FeedbackDerrotaMateriaisConstrucao extends FeedbackDerrota {
    constructor() { super('FeedbackDerrotaMateriaisConstrucao'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'LojaDeConstrução';
    }

    definirFundo()    { return 'assets/LojaDeConstrução_fundo.png'; }
    definirDialogos() 
    { return[
                'Você deixou passar a oportunidade de conectar as dores do cliente com as soluções da Cielo.',
                'O Sr. Ruan destacou preocupações com complexidade operacional, conciliação e eficiência no dia a dia, e o ideal era mostrar como soluções integradas simplificam esses processos.',
                'Quando ele perguntou sobre diferenciais para o porte do negócio, era esperado reforçar condições específicas e ganhos em segurança e estabilidade nas transações.',
                'Além disso, nas dúvidas sobre taxas, faltou destacar o valor da eficiência operacional e do controle financeiro além apenas do custo.',
                'Na questão de segurança, o caminho seria evidenciar a proteção dos dados e a confiabilidade das soluções em ambientes de alto volume.',
                'Por fim, na ativação, faltou incentivar a ação imediata para garantir o uso e demonstrar valor na prática.',
                'No geral, faltou transformar cada objeção em uma oportunidade de apresentar os produtos e serviços da Cielo de forma estratégica.'
        ];
    }
}