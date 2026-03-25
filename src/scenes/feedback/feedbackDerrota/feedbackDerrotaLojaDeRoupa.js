class FeedbackDerrotaLojaDeRoupa extends FeedbackDerrota {
    constructor() { super('FeedbackDerrotaLojaDeRoupa'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'LojaDeRoupa';
    }

    definirFundo()    { return 'assets/lojaderoupa_interior.png'; }
    definirDialogos() { 
        return [
            'Você deixou passar a oportunidade de conectar as dores da cliente com as soluções da Cielo.',
            'A Dona Nayara destacou preocupações com fluxo de caixa, taxas no parcelamento e recebimento demorado, e o ideal era mostrar que existem soluções que permitem vender parcelado sem comprometer o caixa diário.',
            'Quando ela trouxe dúvidas sobre suporte, era esperado reforçar o atendimento próximo, consultivo e disponível, trazendo mais confiança para o dia a dia do negócio.',
            'Além disso, ao questionar o porte do negócio, faltou destacar que clientes do perfil dela também recebem acompanhamento e atenção personalizada.',
            'Na objeção sobre fechar agora, o caminho seria mostrar o impacto direto nas vendas e na competitividade, sem focar em necessidades pessoais.',
            'No geral, faltou transformar cada objeção em uma oportunidade de apresentar os produtos e serviços da Cielo de forma estratégica.'
        ];
    }
}