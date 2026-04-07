// Feedback exibido quando o jogador vence a fase do supermercado.
class FeedbackVitoriaSupermercado extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaSupermercado'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';

        // Registra a vitoria no progresso global.
        let vitoriasGlobais = this.registry.get('estabelecimentosVencidos') || [];
        if (!vitoriasGlobais.includes('Mercado')) {
            vitoriasGlobais.push('Mercado');
            this.registry.set('estabelecimentosVencidos', vitoriasGlobais);
        }
    }

    preload (){
        super.preload()
        // Carrega o fundo especifico do supermercado.
        this.load.image('bgSupermercado', 'assets/mercado_interior.png');

    }

    create (){
        // Exibe o fundo da fase antes da interface base do feedback.
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'bgSupermercado')
            .setDisplaySize(this.scale.width, this.scale.height)
            .setDepth(-1);

            super.create();
    }

    // Define os textos de progresso para a proxima fase.
    definirDialogos() 
    { return [
            'Parabéns! Você conduziu bem a conversa e conseguiu mostrar valor para uma operacao de grande porte.',
            'Agora, voce avancara para um novo desafio: o posto da Sra. Roberta.',
            'Roberta administra um posto com alto volume diario de vendas e costuma avaliar cada proposta com muito rigor.',
            'Ela busca previsibilidade nas taxas, rapidez no recebimento e estabilidade para sustentar a operacao sem surpresas.',
            'Seu desafio sera apresentar as solucoes da Cielo com seguranca, estrategia e foco nos ganhos reais para o negocio.'
        ]; 
    }
}
