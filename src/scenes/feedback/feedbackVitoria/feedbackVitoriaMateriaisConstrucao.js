class FeedbackVitoriaMateriaisConstrucao extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaLojaDeConstrução'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';
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
                    'Parabéns! Você conduziu bem a conversa e conseguiu gerar confiança com o cliente.',
                    'Agora, você avançará para um novo desafio: o supermercado do Sr. Ruan.',
                    'Ruan é dono de um supermercado de origem mexicana, com faturamento mensal em torno de 300 mil reais e uma operação intensa no dia a dia.',
                    'Ele valoriza eficiência e controle, e costuma ser exigente com soluções que impactam diretamente seu negócio.',
                    'Seu desafio será apresentar as soluções da Cielo de forma estratégica, acompanhando o ritmo e as necessidades da operação dele.'
            ];
    }
}