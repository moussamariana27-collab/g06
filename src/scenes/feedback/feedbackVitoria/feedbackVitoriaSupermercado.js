class FeedbackVitoriaSupermercado extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaMercado'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';
        console.log('cenaOrigem:', this.cenaOrigem);
        // =========================================================
        // === REGISTRAR A VITÓRIA DESTE ESTABELECIMENTO ===========
        // =========================================================
        let vitoriasGlobais = this.registry.get('estabelecimentosVencidos') || [];
        
        // Verifica se o 'Supermercado' já não está na lista
        if (!vitoriasGlobais.includes('Supermercado')) {
            vitoriasGlobais.push('Supermercado'); // Adiciona à lista
            this.registry.set('estabelecimentosVencidos', vitoriasGlobais); // Salva globalmente
        }
        // =========================================================

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


    definirDialogos() 
        { return [
                'Parabéns! Você conduziu bem a conversa e conseguiu gerar confiança com o cliente.',
                'Agora, você avançará para um novo desafio: o posto da Sra. Roberta.',
                'Roberta assumiu a gestão muito jovem após um imprevisto familiar e, com muita responsabilidade, manteve o negócio funcionando.',
                'Hoje, o posto tem faturamento mensal em torno de 750 mil reais e uma operação de alta exigência.',
                'Ela já recebeu diversas propostas, é bastante impaciente e difícil de convencer.',
                'Seu desafio será apresentar as soluções da Cielo com objetividade e segurança, demonstrando valor rapidamente.'
            ]; 
        }
}