class FeedbackDerrotaMateriaisConstrucao extends FeedbackDerrota {
    constructor() { super('FeedbackDerrotaMateriaisConstrucao'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'LojaDeConstrução';
    }

    preload (){
        super.preload()
        this.load.image('bgLojaDeConstrução', 'assets/LojaDeConstrução_fundo.png');

    }

    create (){

        this.add.image(this.scale.width / 2, this.scale.height / 2, 'bgLojaDeConstrução')
            .setDisplaySize(this.scale.width, this.scale.height)
            .setDepth(-1);

            super.create();
    }

    definirDialogos() 
    { return[
                'Você deixou passar a oportunidade de conectar as dores da cliente com as soluções da Cielo.',
                'A Lígia trouxe preocupações com taxa no parcelado e impacto no fluxo de caixa, e o ideal era destacar conceitos como taxa customizada e Antecipação de Recebíveis integrada para manter o caixa saudável.',
                'Quando ela perguntou sobre D0 e D1, era esperado reforçar o recebimento em dias corridos e a ausência de tarifas adicionais, mostrando o ganho de liquidez.',
                'Além disso, na dúvida sobre previsibilidade, faltou evidenciar o travamento de condições em contrato, garantindo segurança e evitando reajustes inesperados.',
                'Na questão de vendas parceladas longas, o caminho seria mostrar o benefício de vender em várias vezes e receber à vista, sem descapitalizar o negócio.',
                'Por fim, ao falar da rotina, era importante destacar o uso do Cielo Gestão como ferramenta simples e centralizada para controle financeiro.',
                'No geral, faltou transformar cada objeção em uma oportunidade de apresentar os produtos e serviços da Cielo de forma estratégica.'
        ];
    }
}