class FeedbackDerrotaPadaria extends FeedbackDerrota {
    constructor() { super('FeedbackDerrotaPadaria'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Padaria';
    }

    definirFundo()    { return 'assets/padaria_interior.png'; }
    definirDialogos() 
        { return[
                    'Você deixou passar a oportunidade de conectar as dores do cliente com as soluções da Cielo.',
                    'O Seu Tião destacou preocupações com recebimento rápido, dependência do dinheiro físico e organização do fluxo de caixa, e o ideal era mostrar que existem soluções específicas para cada uma dessas necessidades.', 
                    'Quando ele trouxe dificuldades com controle de estoque e fechamento de caixa, era esperado que você explorasse melhor as ferramentas de gestão que facilitam o dia a dia.',
                    'Além disso, nas dúvidas sobre taxas e previsibilidade, faltou reforçar que existem condições claras e estáveis, que aumentam a confiança do cliente.',
                    'Por fim, nas vendas parceladas, o caminho seria apresentar alternativas que dão mais flexibilidade no acesso ao dinheiro.',
                    'No geral, faltou transformar cada objeção em uma oportunidade de apresentar os produtos e serviços da Cielo de forma estratégica.'
                ];
        }
}