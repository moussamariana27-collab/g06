class FeedbackVitoriaPosto extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaPosto'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';
    }

    definirFundo()    { return 'assets/FundoPosto.png'; }
    definirDialogos() 
    { return [
            'Parabéns! Você concluiu todos os desafios com excelência.',
            'Você demonstrou habilidade em identificar as necessidades de cada cliente e conectar com as soluções da Cielo.',
            'Mesmo diante de cenários mais exigentes, como o da Sra. Roberta, manteve uma abordagem estratégica, objetiva e segura.',
            'Ao longo da jornada, você aplicou corretamente conceitos como fluxo de caixa, antecipação, eficiência operacional e gestão do negócio.',
            'Você está pronto para atuar com diferentes perfis de clientes e gerar valor em cada negociação.'
        ]; 
    }
}