// Feedback exibido quando o jogador vence a fase do salao de beleza.
class FeedbackVitoriaSalaoDeBeleza extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaSalaoDeBeleza'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';

        // Registra a vitoria no progresso global.
        let vitoriasGlobais = this.registry.get('estabelecimentosVencidos') || [];
        if (!vitoriasGlobais.includes('SalaoDeBeleza')) {
            vitoriasGlobais.push('SalaoDeBeleza');
            this.registry.set('estabelecimentosVencidos', vitoriasGlobais);
        }
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

    // Define os textos de progresso para a proxima fase.
    definirDialogos() 
        { return [
                    'Parabéns! Você conduziu bem a conversa e conseguiu gerar confiança com a cliente.',
                    'Agora, você avançará para um novo desafio: a loja de roupas da Nayara.',
                    'Nayara é dona de um vestuário com faturamento mensal em torno de 15 mil reais e carrega uma forte descendência indígena, refletida em sua história e identidade.',
                    'Ela já teve experiência com diferentes provedores de maquininhas, o que a torna mais criteriosa na comparação de benefícios e taxas.',
                    'Seu desafio será apresentar as soluções da Cielo de forma clara e vantajosa, mostrando diferenciais que realmente façam sentido para o negócio dela.'
        ]; 
    }
}
