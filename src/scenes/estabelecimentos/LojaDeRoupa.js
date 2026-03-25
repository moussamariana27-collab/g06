class LojaDeRoupa extends Combate {
    constructor() {
        super('LojaDeRoupa'); 
    }

    init(data) {
        super.init(data); 
    }

    preload() {
        super.preload(); 

        // Carrega a música de batalha
        this.load.audio('musicabatalha', 'assets/musicabatalha.mp3');

        // Fundo
        this.load.image('bgLojaDeRoupa', 'assets/lojaderoupa_interior.png');
        
        // NPC (Usando o arquivo Nayara.png para evitar o erro 404)
        this.load.spritesheet('Vendedora', 'assets/Nayara.png', {
            frameWidth: 640,
            frameHeight: 1080
        }); 

        // Personagem do jogador
        const sprites = {
            'JOSÉ':  { file: 'assets/joseCorpo.png' },
            'MARIA': { file: 'assets/mariaCorpo.png' },
            'JOÃO':  { file: 'assets/joaoCorpo.png' },
            'PAULA': { file: 'assets/paulaCorpo.png' }
        };

        const dadosSprite = sprites[this.personagemEscolhido];
        if (dadosSprite) {
            this.load.image('personagemLoja', dadosSprite.file);
        }
    }

    create() {
        // Toca a música de batalha
        this.musica = this.sound.add('musicabatalha', { loop: true, volume: 0.5 });
        this.musica.play();

        // Fundo com redimensionamento robusto
        this.bg = this.add.image(0, 0, 'bgLojaDeRoupa')
            .setOrigin(0.5)
            .setDepth(0)
            .setPosition(this.scale.width / 2, this.scale.height / 2)
            .setDisplaySize(this.scale.width, this.scale.height);

        this.resizeBackground();

        this.criarVendedora();
        this.criarPlayer();

        // --- MECÂNICA DE DIÁLOGO (COMBATE) ---
        // Diálogo contínuo em visita única, focado em PAP, Geo e objeções de fluxo de caixa
        this.initCombate({
            satisfacaoInicial: 34,
            questoes: [
                {
                    // Fase 1: Abordagem e objeção sobre fluxo de caixa e parcelamento
                    pergunta: "DONA NAYARA: Ah, vi que você é da Cielo... Olha, eu não gosto de parcelar venda aqui. A taxa pesa, recebo pingado e não dá pra ficar sem dinheiro no caixa diariamente no meu negócio.",
                    certo: "Vim na hora certa, Dona Nayara! A Cielo tem uma oferta incrível pro seu ramo. Com a gente a senhora parcela, mas recebe todos os dias! Seja sábado, domingo ou feriado, o dinheiro cai na conta.",
                    errado: "Realmente as taxas são altas e demora pra cair, mas é o preço que se paga para vender parcelado hoje em dia, Dona Nayara. Pelo menos a senhora não perde a venda.",
                    resposta: true
                },
                {
                    // Fase 2: Objeção de Suporte e a introdução da "Geo" e "PAP"
                    pergunta: "DONA NAYARA: Entendi, o pagamento cai rápido... Mas se a máquina der problema no meio do sábado? Eu vou ter que ligar pra uma central que nunca atende? Preciso de alguém de confiança.",
                    certo: "Imagina, Nayara! Eu faço PAP (Porta a Porta) aqui na sua região, que é a minha Geo de atuação. Estarei sempre por aqui presencialmente para te atender com toda a estrutura e renome da Cielo.",
                    errado: "Olha, a central atende sim, mas se demorar, a senhora pode tentar resolver sozinha pelo aplicativo que é bem fácil e rápido de usar na correria do sábado.",
                    resposta: true
                },
                {
                    // Fase 3: O perfil do cliente (15k-20k), Ritmo e Salesforce
                    pergunta: "DONA NAYARA: Gostei de saber que você estará por perto. Mas meu comércio fatura ali na faixa de 15 a 20 mil por mês. Vou ter o mesmo suporte que as lojas gigantes que faturam milhões?",
                    certo: "Com certeza! Clientes com o seu perfil e Ritmo de vendas são prioridade pra nós. Já até mapeei sua loja no meu Salesforce. A senhora terá meu acompanhamento direto como seu Gerente de Negócios.",
                    errado: "Sendo sincero, 15 mil é um volume menor, mas a gente atende todo mundo igual. A senhora entra na mesma fila de atendimento do suporte técnico que as grandes lojas.",
                    resposta: true
                },
                {
                    // Fase 4: O senso de urgência vs. A "Armadilha da Meta"
                    pergunta: "DONA NAYARA: Confiança é tudo mesmo. Mas me diz uma coisa, por que eu deveria fechar esse contrato com você agora e não dar uma pensada até a semana que vem?",
                    certo: "Porque cada dia sem parcelar é cliente que a senhora perde para a concorrência! Começando hoje, a senhora já aproveita o movimento do próximo fim de semana com a máquina nova garantindo mais vendas.",
                    errado: "Porque eu tô precisando muito bater a minha meta da semana, Nayara. Me ajuda nessa, por favor, faltam só dois clientes para eu fechar meus números no sistema!",
                    resposta: true
                },
                {
                    // Fase 5: O Fechamento e o Diferencial competitivo
                    pergunta: "DONA NAYARA: É, você tem um bom ponto. Vi as condições e realmente estão atrativas. Mas acha mesmo que aceitar parcelamento vai mudar tanto o meu movimento aqui no shopping?",
                    certo: "Com certeza, Nayara! Imagina colocar na vitrine que você parcela em até 3x! É um diferencial enorme pras outras lojas daqui que não costumam parcelar. Vai atrair o dobro de clientes!",
                    errado: "Ah, aumentar o movimento eu não posso garantir, né? Isso depende da qualidade das roupas que a senhora vende. Mas pelo menos a senhora vai ter a maquininha verdinha.",
                    resposta: true
                }
            ],

            posicaoSpawn: { x: 800, y: 690 }, 
        });

        this.createUI();
        this.mostrarQuestao();
        this.barraSatisfacao();

        // Vincula a expressão da vendedora à satisfação
        this.updateNPC = this.faceVendedora;
        this.faceVendedora();

        // --- VOLTA PARA A CIDADE PROTEGIDA ---
        this.input.keyboard.once('keydown-SPACE', () => {
            if (this.musica) this.musica.stop();
            this.scene.start('Cidade', { character: this.personagemEscolhido });
        });
        
        this.input.keyboard.once('keydown-ENTER', () => {
            if (this.musica) this.musica.stop();
            this.scene.start('Cidade', { character: this.personagemEscolhido });
        });
    }

    resizeBackground() {
        const largura = this.scale.width;
        const altura = this.scale.height;
        this.bg.setPosition(largura / 2, altura / 2);
        this.bg.setDisplaySize(largura, altura);
    }

    criarVendedora() {
        this.Vendedora = this.add.sprite(
            (this.scale.width * 2 / 3) + 40,
            this.scale.height - 400,
            'Vendedora'
        ).setScale(0.55).setFlip(true, false).setDepth(2);

        this.anims.create({ key: "bravoVendedora", frames: this.anims.generateFrameNumbers('Vendedora', { start: 0, end: 0 }) });
        this.anims.create({ key: "estavelVendedora", frames: this.anims.generateFrameNumbers('Vendedora', { start: 1, end: 1 }) });
        this.anims.create({ key: "felizVendedora", frames: this.anims.generateFrameNumbers('Vendedora', { start: 2, end: 2 }) });
    }

    criarPlayer() {
        let escala = (this.personagemEscolhido === 'JOSÉ' || this.personagemEscolhido === 'JOÃO') ? 0.5 : 1;
        let posX = (this.scale.width * 1 / 3) - 100;
        let posY = (escala === 0.5) ? this.scale.height - 330 : this.scale.height - 270;

        this.add.image(posX, posY, 'personagemLoja').setScale(escala).setDepth(1);
    }

    faceVendedora() {
        // Lógica de expressões alinhada com os acertos/erros (34 -> 67 ou 1)
        if (this.satisfacao === 34) {
            this.Vendedora.play('estavelVendedora', true);
        } else if (this.satisfacao <= 1) {
            this.Vendedora.play('bravoVendedora', true);
        } else if (this.satisfacao >= 67) {
            this.Vendedora.play('felizVendedora', true);
        } else {
            this.Vendedora.play('estavelVendedora', true);
        }
    }
}