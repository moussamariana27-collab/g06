class FeedbackVitoriaPadaria extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaPadaria'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';
    }

        preload (){
        super.preload()
        this.load.image('bgPadaria', 'assets/padaria_interior.png');

    }

    create (){

        this.add.image(this.scale.width / 2, this.scale.height / 2, 'bgPadaria')
            .setDisplaySize(this.scale.width, this.scale.height)
            .setDepth(-1);

            super.create();
    }

    definirDialogos() { 
        return [  
                'Parabéns! Você conduziu bem a conversa e conseguiu gerar confiança com a cliente.',
                'Agora, você avançará para um novo desafio: o salão da Dona Leila.',
                'Leila é dona de um salão de beleza com faturamento mensal em torno de 20 mil reais e também lidera um grupo de apoio à comunidade LGBTQIAPN+.',
                'Ela valoriza muito acolhimento e respeito, mas já teve experiências negativas com outros vendedores, o que a torna mais impaciente nesse tipo de abordagem.',
                'Seu desafio será apresentar as soluções da Cielo com empatia, objetividade e foco nas necessidades do negócio, evitando erros que possam encerrar a conversa rapidamente.'
        ]; 
    }
}