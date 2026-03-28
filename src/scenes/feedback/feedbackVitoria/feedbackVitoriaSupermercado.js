class FeedbackVitoriaSupermercado extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaSupermercado'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';

        // REGISTRO DE VITÓRIA
        let vitoriasGlobais = this.registry.get('estabelecimentosVencidos') || [];
        if (!vitoriasGlobais.includes('Mercado')) {
            vitoriasGlobais.push('Mercado');
            this.registry.set('estabelecimentosVencidos', vitoriasGlobais);
        }
    }

        preload (){
        super.preload()
        this.load.image('bgSupermercado', 'assets/mercado_interior.png');

    }

    create (){

        this.add.image(this.scale.width / 2, this.scale.height / 2, 'bgSupermercado')
            .setDisplaySize(this.scale.width, this.scale.height)
            .setDepth(-1);

            super.create();
    }

    definirDialogos() 
    { return [
            'Parabéns! Você concluiu todos os desafios com excelência.',
            'Você demonstrou habilidade em identificar as necessidades de cada cliente e conectar com as soluções da Cielo.',
            'Mesmo diante de cenários mais exigentes, você manteve uma abordagem estratégica, objetiva e segura.',
            'Ao longo da jornada, você aplicou corretamente conceitos como fluxo de caixa, antecipação, eficiência operacional e gestão do negócio.',
            'Você está pronto para atuar com diferentes perfis de clientes e gerar valor em cada negociação.'
        ]; 
    }
}
