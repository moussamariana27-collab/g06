class FeedbackVitoriaSalaoDeBeleza extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaSalaoDeBeleza'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';
    }

    definirFundo()    { return 'assets/salaodebeleza_interior.png'; }
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

//===================================================================================================================================================
// AQUI VOU ATUALIZAR UM METODO PARA O REPIQUE ACONTECER:
// SERÁ CRIADA OUTRA CENA SIMILAR À SalaoDeBeleza, MAS COM OUTROS DIÁLOGOS;
// DESSA CENA DE FEEDBACK DE VITÓRIA, O ESTADUAL VAI MENCIONAR ESSE CONCEITO NO FEEDBACK (AS FALAS DO ESTADUAL NÃO DEVEM SER SIMPLESMENTE JOGADAS);
// DEPOIS DISSO O JOGADOR VAI SER ENVIADO PARA A CENA SIMILAR.
//====================================================================================================================================================