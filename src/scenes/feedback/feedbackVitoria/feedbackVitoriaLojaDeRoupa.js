// Feedback exibido quando o jogador vence a fase da loja de roupa.
class FeedbackVitoriaLojaDeRoupa extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaLojaDeRoupa'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';
        // Registra a vitoria no progresso global.
        let vitoriasGlobais = this.registry.get('estabelecimentosVencidos') || [];
        if (!vitoriasGlobais.includes('LojaDeRoupa')) {
            vitoriasGlobais.push('LojaDeRoupa');
            this.registry.set('estabelecimentosVencidos', vitoriasGlobais);
        }
    }

    preload (){
        super.preload()
        // Carrega o fundo especifico da loja.
        this.load.image('bgLojaDeRoupa', 'assets/lojaderoupa_interior.png');

    }

    create (){
        // Exibe o fundo da fase antes da interface base do feedback.
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'bgLojaDeRoupa')
            .setDisplaySize(this.scale.width, this.scale.height)
            .setDepth(-1);

            super.create();
    }

    // Define os textos de progresso para a proxima fase.
    definirDialogos() { 
        return [
            'Parabéns! Você conduziu bem a conversa e conseguiu gerar confiança com a cliente.',
            'Agora, você avançará para um novo desafio: a loja da Lígia.',
            'Lígia é dona de uma loja de materiais de construção com faturamento mensal em torno de 80 mil reais, construída após anos de dedicação ao negócio.',
            'Ela valoriza muito a organização e a integridade da operação, mas tem pouca paciência com abordagens que não sejam objetivas.',
            'Seu desafio será apresentar as soluções da Cielo com clareza e precisão, evitando deslizes que possam encerrar a conversa rapidamente.'
        ]; 
    }
}
