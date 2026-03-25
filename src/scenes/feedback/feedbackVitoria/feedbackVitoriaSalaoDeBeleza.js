class FeedbackVitoriaSalaoDeBeleza extends FeedbackVitoria {
    constructor() { super('FeedbackVitoriaSalaoDeBeleza'); }

    init(data) {
        super.init(data);
        this.cenaOrigem = 'Cidade';
    }

    definirFundo()    { return 'assets/salaodebeleza_interior.png'; }
    definirDialogos() { return ['Texto de feedback de vitoria do Salao de beleza...']; }
}

//===================================================================================================================================================
// AQUI VOU ATUALIZAR UM METODO PARA O REPIQUE ACONTECER:
// SERÁ CRIADA OUTRA CENA SIMILAR À SalaoDeBeleza, MAS COM OUTROS DIÁLOGOS;
// DESSA CENA DE FEEDBACK DE VITÓRIA, O ESTADUAL VAI MENCIONAR ESSE CONCEITO NO FEEDBACK (AS FALAS DO ESTADUAL NÃO DEVEM SER SIMPLESMENTE JOGADAS);
// DEPOIS DISSO O JOGADOR VAI SER ENVIADO PARA A CENA SIMILAR.
//====================================================================================================================================================