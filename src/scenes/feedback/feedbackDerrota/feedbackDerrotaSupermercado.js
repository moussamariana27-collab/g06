class FeedbackDerrotaSupermercado extends FeedbackDerrota {
    constructor() { super('FeedbackDerrotaSupermercado'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Mercado';
    }

    preload (){
        super.preload()
        this.load.image('bgMercado', 'assets/mercado_interior.png');

    }

    create (){

        this.add.image(this.scale.width / 2, this.scale.height / 2, 'bgMercado')
            .setDisplaySize(this.scale.width, this.scale.height)
            .setDepth(-1);

            super.create();
    }

    definirDialogos() { 
        return[
                'Você deixou passar a oportunidade de conectar as dores do cliente com as soluções da Cielo.',
                'O Sr. Ruan trouxe uma objeção focada em taxa MDR e volume, e o ideal era direcionar a conversa para eficiência operacional, mostrando o valor do TEF integrado ao PDV e da Cielo Gestão na redução de perdas.',
                'Além disso, faltou reforçar diferenciais como o “Vendeu, tá na conta”, destacando o impacto do recebimento acelerado no fluxo de caixa.',
                'Na questão de segurança, o caminho seria evidenciar o uso de TEF e Pinpad com ambiente criptografado e aderente a padrões como PCI-DSS e LGPD.',
                'Por fim, na ativação, era esperado estimular o M0, incentivando a primeira transação imediata para garantir funcionamento e gerar valor na prática.',
                'No geral, faltou transformar cada objeção em uma oportunidade de apresentar os produtos e serviços da Cielo de forma estratégica.'
        ];
    }
}