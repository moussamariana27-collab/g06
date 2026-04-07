// Feedback exibido quando o jogador perde no salao de beleza.
class FeedbackDerrotaSalaoDeBeleza extends FeedbackDerrota {
    constructor() { super('FeedbackDerrotaSalaoDeBeleza'); }

    init(data) {
        super.init(data);
        // Define para qual cena o jogador pode retornar depois do feedback.
        this.cenaOrigem = 'SalaoDeBeleza';
    }

    preload (){
        super.preload()
        // Carrega o fundo especifico do salao.
        this.load.image('bgSalaoDeBeleza', 'assets/salaodebeleza_interior.png');

    }

    create (){
        // Exibe o fundo da fase antes da interface base do feedback.
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'bgSalaoDeBeleza')
            .setDisplaySize(this.scale.width, this.scale.height)
            .setDepth(-1);

            super.create();
    }

    // Define os textos explicativos mostrados ao jogador.
    definirDialogos() 
    { return [
                'Você deixou passar a oportunidade de conectar as dores da cliente com as soluções da Cielo.',
                'A Dona Leila destacou preocupações com taxas no crédito, controle do parcelamento e impacto no faturamento, e o ideal era mostrar que existem soluções para equilibrar custos e aumentar as vendas com segurança.',
                'Quando ela trouxe dúvidas sobre o recebimento dos valores, era esperado apresentar alternativas que ajudam a manter o fluxo de caixa saudável.',
                'Além disso, ao falar do tamanho do negócio, faltou reforçar que as soluções se adaptam a diferentes perfis, inclusive pequenos empreendimentos.',
                'Na preocupação com a rotina, o caminho seria destacar a simplicidade da operação e o suporte disponível no dia a dia.',
                'No geral, faltou transformar cada dúvida em uma oportunidade de apresentar os produtos e serviços da Cielo de forma estratégica.'
            ]; 
    }
}
