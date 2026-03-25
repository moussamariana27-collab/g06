class FeedbackDerrotaPosto extends FeedbackDerrota {
    constructor() { super('FeedbackDerrotaPosto'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Posto';
    }

    definirFundo()    { return 'assets/FundoPosto.png'; }
    definirDialogos() { 
        return [
            'Você deixou passar a oportunidade de conectar as dores da cliente com as soluções da Cielo.',
            'A Sra. Roberta destacou a necessidade de previsibilidade de taxas, e o ideal era reforçar o acordo comercial com taxas travadas em contrato, garantindo estabilidade por período definido.',
            'Quando ela trouxe a necessidade de liquidez imediata, era esperado destacar o “Vendeu, Tá na Conta” com recebimento no mesmo dia (D0), inclusive em finais de semana e feriados.',
            'Além disso, na preocupação com o ambiente severo, faltou evidenciar a robustez de soluções como Cielo Smart e LIO On, preparadas para operação em pista.',
            'Na questão de exclusividade, o caminho seria mostrar o risco de limitar bandeiras e destacar a aceitação de múltiplas opções, incluindo cartões frota e vouchers.',
            'Por fim, na gestão do negócio, era importante reforçar a conciliação em tempo real com o Cielo Gestão, facilitando o fechamento por turno.',
            'No geral, faltou transformar cada objeção em uma oportunidade de apresentar os produtos e serviços da Cielo de forma estratégica.'
        ]; 
    }
}