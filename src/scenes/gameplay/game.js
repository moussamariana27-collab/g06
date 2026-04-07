class Cidade extends Phaser.Scene {
    constructor() { super({ key: 'Cidade' }); }

    // Recebe o personagem escolhido na cena anterior.
    init(data) {
        this.personagemEscolhido = utilitariosJogo.resolverChavePersonagem(data?.personagem);
        this.posicaoSpawn = utilitariosJogo.normalizarPosicaoSpawn(data?.posicaoSpawn, { x: 190, y: 330 });
    } 

    preload() {
        this.load.audio('musicacidade', 'assets/mapa.mp3')
        this.load.audio('mestredevendas', 'assets/mestredevendas.mp3')

        // Carrega o mapa exportado do Tiled no formato JSON
        this.load.tilemapTiledJSON('mapaCidade', 'assets/cidade_cielo.json');
        // Carrega as imagens de vitoria para cada personagem.
        this.load.image('vitoriaJoao', 'assets/vitoriaJoao.png');
        this.load.image('vitoriaJose', 'assets/vitoriaJose.png');
        this.load.image('vitoriaPaula', 'assets/vitoriaPaula.png');
        this.load.image('vitoriaMaria', 'assets/vitoriaMaria.png');

        // Carrega a imagem do tileset utilizado no mapa
        this.load.image('cidade', 'documents/assets/cidade_tileset1.png');

        // Objeto que define qual spritesheet usar para cada personagem
        const sprites = {
            'JOSE':  { file: 'assets/jose.png',  frameWidth: 16, frameHeight: 32 },
            'MARIA': { file: 'assets/Maria.png', frameWidth: 16, frameHeight: 32 },
            'JOAO':  { file: 'assets/joao.png',  frameWidth: 16, frameHeight: 32 },
            'PAULA': { file: 'assets/paulaPronto.png', frameWidth: 16, frameHeight: 16 },
        };

        // Seleciona o personagem escolhido pelo jogador
        const dadosSprite = utilitariosJogo.obterAssetPersonagem(this.personagemEscolhido, sprites);

        // Carrega o spritesheet correspondente ao personagem escolhido
        this.load.spritesheet('sheetPersonagem', dadosSprite.file, {
            frameWidth: dadosSprite.frameWidth, frameHeight: dadosSprite.frameHeight
        });

        // Carrega os carros
        this.load.image('carro1', 'assets/carro1.png');
        this.load.image('carro2', 'assets/carro2.png');

        // Carrega o som do carro
        this.load.audio('carrocidade', 'assets/carrocidade.mp3');
        // carrega a seta indicativa 
        this.load.image('seta', 'assets/seta.png');

    }

    create() {
        // Bloqueia sons e movimentos apos a vitoria final.
        this.jogoFinalizado = false;
        this.transicaoEmAndamento = false;
        this.carSounds = [];

        // Cria o mapa baseado no JSON carregado
        const map = this.make.tilemap({ key: 'mapaCidade' });

        // Associa o tileset carregado ao mapa
        const tiles = map.addTilesetImage('cidade', 'cidade');

        // Cria a camada visual chamada "Fundo"
        map.createLayer('Fundo', tiles, 0, 0);

        // Toca a musica da cidade.
        this.musica = utilitariosJogo.tocarAudio(this, 'musicacidade', {
            loop: true,
            volume: 0.4
        });

        // Define os limites da fisica e impede o personagem de sair do mapa.
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Impede que a camera saia dos limites do mapa.
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Busca o objeto de spawn criado no Tiled
        const spawnLayer = map.getObjectLayer('spawn');
        const spawnObj = spawnLayer?.objects?.[0];

        // Calcula a posicao central do spawn.
        const spawnX = spawnObj ? spawnObj.x + spawnObj.width / 2 : 190;
        const spawnY = spawnObj ? spawnObj.y + spawnObj.height / 2 : 330;

        // Cria o personagem com fisica na posicao de spawn.
        const posicaoInicial = utilitariosJogo.normalizarPosicaoSpawn(this.posicaoSpawn, { x: spawnX, y: spawnY });
        this.personagem = this.physics.add.sprite(posicaoInicial.x, posicaoInicial.y, 'sheetPersonagem', 0).setScale(1.0);

        // Ativa a colisao do personagem com as bordas do mundo.
        this.personagem.setCollideWorldBounds(true);

        // Cria os carros e ativa a colisao com o jogador.

        this.carro1 = this.physics.add.image(530,85, 'carro1').setFlip(false,true);

        this.carro2 = this.physics.add.image(530,85, 'carro2').setRotation(3 * Math.PI / 2).setSize(58, 26)


        this.moverCarro(
        { x: 530, y: 85  },   // posição inicial
        { x: 540, y: 1060 },  // posição final
        10,                    // duração em segundos
        this.carro1,            // elemento gráfico
        this
        );

        this.moverCarro(
        { x: 1013, y: 365  },   // posição inicial
        { x: -30, y: 385 },  // posição final
        10,                    // duração em segundos
        this.carro2,            // elemento gráfico
        this
        );

        this.physics.add.collider(this.personagem, this.carro1, () => {this.scene.restart()});
        this.physics.add.collider(this.personagem, this.carro2, () => {this.scene.restart()});

        this.events.on('shutdown', () => {
            utilitariosJogo.pararAudios(this.carSounds);
            utilitariosJogo.pararAudio(this.musica);
            this.sound.stopAll();  // Para todos os sons da cena.
        });

        // Ajusta automaticamente a hitbox para o tamanho do sprite.
        this.personagem.body.setSize(
            this.personagem.width/2,
            this.personagem.height/3
        );

        // Centraliza a hitbox no sprite
        this.personagem.body.setOffset(this.personagem.width/4, this.personagem.height/3);

        // Faz a camera seguir o personagem.
        this.cameras.main.startFollow(this.personagem);

        // Aumenta o zoom da camera.
        this.cameras.main.setZoom(2.5);

        // Captura as teclas direcionais do teclado
        this.cursor = this.input.keyboard.createCursorKeys();

        // Cria um grupo de objetos solidos usados para colisoes.
        const grupoColisoes = this.physics.add.staticGroup();

        // Percorre os objetos da layer "colisoes" definidos no Tiled
        const layerColisoes = map.getObjectLayer('colisoes');
        if (layerColisoes) {
            layerColisoes.objects.filter(objetoColisao => objetoColisao.width > 0 && objetoColisao.height > 0).forEach(objetoColisao => {

                // Cria um retangulo invisivel para a area de colisao.
                const retanguloColisao = this.add.rectangle(objetoColisao.x + objetoColisao.width/2, objetoColisao.y + objetoColisao.height/2, objetoColisao.width, objetoColisao.height);

                // Adiciona fisica estatica ao objeto.
                this.physics.add.existing(retanguloColisao, true);

                // Adiciona o objeto ao grupo de colisoes.
                grupoColisoes.add(retanguloColisao);
            });

            // Ativa a colisao entre o personagem e os objetos do grupo.
            this.physics.add.collider(this.personagem, grupoColisoes);
        }
        // Cria a zona de entrada do supermercado.
        let zonaSupermercado = this.add.zone(380, 879.5, 200, 45);
        this.physics.world.enable(zonaSupermercado);
        zonaSupermercado.body.setAllowGravity(false);
        zonaSupermercado.body.moves = false;

        this.physics.add.overlap(this.personagem, zonaSupermercado, () => {
            // Para os sons antes de trocar de cena.
            this.pararSonsDaCidade();
            // Vai para a cena do supermercado com os dados do personagem.
            this.iniciarCenaSegura('Mercado', { personagem: this.personagemEscolhido, posicaoSpawn: this.posicaoSpawn });
        });

        // Cria a zona de entrada da loja de construcao.
        let zonaConstrucao = this.add.zone(710.5, 930.5, 117, 33);
        this.physics.world.enable(zonaConstrucao);
        zonaConstrucao.body.setAllowGravity(false);
        zonaConstrucao.body.moves = false;

        this.physics.add.overlap(this.personagem, zonaConstrucao, () => {
            // Vai para a cena da loja de construcao.
            this.iniciarCenaSegura('LojaDeConstrução', {
                personagem: this.personagemEscolhido,
                posicaoSpawn: this.posicaoSpawn
            });
        });

        // Cria a zona de entrada do escritorio.
        let zonaEscritorio = this.add.zone(243, 290, 356, 32);
        this.physics.world.enable(zonaEscritorio);
        zonaEscritorio.body.setAllowGravity(false);
        zonaEscritorio.body.moves = false;

        this.physics.add.overlap(this.personagem, zonaEscritorio, () => {
            // Vai para a cena do escritorio com os dados do personagem.
            this.iniciarCenaSegura('Escritorio', { personagem: this.personagemEscolhido });
        });

        // Cria a parede invisivel da farmacia.
        let paredeInvisivel = this.add.zone(310, 489, 112, 102);
        
        // O valor true cria um corpo estatico para a parede.
        this.physics.add.existing(paredeInvisivel, true); 

        // Adiciona a colisao fisica entre o personagem e a parede.
        this.physics.add.collider(this.personagem, paredeInvisivel);

        // Lista de cenas para onde o jogador pode ir
        const cenasDisponiveis = ['Escritorio', 'LojaDeRoupa', 'Padaria', 'Posto', 'SalaoDeBeleza', 'LojaDeConstrução', 'Mercado'];

        // Percorre as zonas de interacao definidas no Tiled.
        const layerZonas = map.getObjectLayer('zonas');
        if (layerZonas) {
            layerZonas.objects.filter(zona => zona.width > 0 && zona.height > 0 && zona.type !== '' && zona.type !== 'Farmacia').forEach(zona => {

                // Cria uma zona invisivel de interacao.
                const areaInteracao = this.add.zone(zona.x + zona.width/2, zona.y + zona.height/2, zona.width, zona.height);

                // Ativa fisica na zona.
                this.physics.world.enable(areaInteracao);

                // Desativa gravidade na zona
                areaInteracao.body.setAllowGravity(false);

                // Impede a movimentacao da zona.
                areaInteracao.body.moves = false;

                // Detecta quando o personagem entra na zona
                this.physics.add.overlap(this.personagem, areaInteracao, () => {

                    // Caso a zona seja o Hotel 
                    if (zona.type === 'Hotel') {

                        // Evita criar multiplos avisos ao mesmo tempo.
                        if (!this.avisoHotel) {

                            // Exibe um aviso temporario na tela.
                            this.avisoHotel = this.add.text(
                                this.cameras.main.scrollX + 512, this.cameras.main.scrollY + 80,
                                'Hotel — Funcionalidade em desenvolvimento',
                                { 
                                    fontSize: '24px', 
                                    fill: '#ffffff', 
                                    backgroundColor: '#333333', 
                                    padding: { x: 16, y: 12 },
                                    fontFamily: 'Pixelify Sans'
                                }
                            ).setOrigin(0.5).setDepth(10);

                            // Remove o aviso apos alguns segundos.
                            this.time.delayedCall(2500, () => { 
                                if (this.avisoHotel) { 
                                    this.avisoHotel.destroy(); 
                                    this.avisoHotel = null; 
                                } 
                            });
                        }

                    // Trata a entrada em outra cena disponivel.
                    } else if (cenasDisponiveis.includes(zona.type)) {

                        // Para a musica antes de trocar de cena.
                        this.pararSonsDaCidade();

                        // Troca para a cena correspondente
                        this.iniciarCenaSegura(zona.type, { personagem: this.personagemEscolhido });
                    }
                });
            });
        }

        // Registra as animacoes dos personagens jogaveis.
        // Os sprites usam a mesma distribuicao de frames.
        // Layout do spritesheet: idle, direita, esquerda, baixo e cima.

        // Movimento para CIMA (frames 54-59)
        utilitariosJogo.garantirAnimacao(this, {
            key: "up",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 54, end: 59 }),
            repeat: -1
        });

        // Movimento para BAIXO (frames 66-71)
        utilitariosJogo.garantirAnimacao(this, {
            key: "down",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 66, end: 71 }),
            repeat: -1
        });

        // Movimento para ESQUERDA (frames 60-65)
        utilitariosJogo.garantirAnimacao(this, {
            key: "left",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 60, end: 65 }),
            repeat: -1
        });

        // Movimento para DIREITA (frames 48-53)
        utilitariosJogo.garantirAnimacao(this, {
            key: "right",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 48, end: 53 }),
            repeat: -1
        });


       // Calcula a barra de progresso com base nas vitorias.

        let estabelecimentosVencidos = this.registry.get('estabelecimentosVencidos') || [];
        let totalVitorias = estabelecimentosVencidos.length;
        let totalEstabelecimentos = 6;
        let progressoPorcentagem = (totalVitorias / totalEstabelecimentos) * 100;

        // logica para seta indicativa
        this.coordenadasEstabelecimentos = {
            'Escritorio': { x: 244, y: 285 },
            'Mercado': { x: 380, y: 880 },
            'LojaDeConstrução': { x: 711, y: 931 },
            'LojaDeRoupa': { x: 785, y: 612 },
            'Padaria': { x: 163, y: 509 },
            'Posto': { x: 883, y: 159 }, 
            'SalaoDeBeleza': { x: 431, y: 513 }
        };

        // A ordem exata do jogo
        const ordemMissoes = ['Padaria', 'SalaoDeBeleza', 'LojaDeRoupa', 'Mercado', 'LojaDeConstrução', 'Posto'];
        
        // Encontra o primeiro da lista que AINDA NÃO está nos estabelecimentosVencidos
        let proximaMissao = ordemMissoes.find(missao => !estabelecimentosVencidos.includes(missao));

        // Cria a imagem da seta
        this.seta = this.add.image(this.personagem.x, this.personagem.y, 'seta')
            .setDepth(9999)
            .setScale(0.09) // tamanho da imagem
            .setVisible(false); // Fica invisível por padrão

        this.alvoAtual = null;

        // Se o jogador ainda não venceu todos, define o alvo e mostra a seta apontando pra ele!
        if (proximaMissao && this.coordenadasEstabelecimentos[proximaMissao]) {
            this.alvoAtual = this.coordenadasEstabelecimentos[proximaMissao];
            this.seta.setVisible(true);
        }
        

        // Verifica se o jogador alcancou a vitoria final.
        if (totalVitorias >= totalEstabelecimentos) {
            const cenasVitoriaFinal = {
                'JOAO': 'vitoriaJoao',
                'JOSE': 'vitoriaJose',
                'PAULA': 'vitoriaPaula',
                'MARIA': 'vitoriaMaria'
            };
            let chaveImagemVitoria = cenasVitoriaFinal[this.personagemEscolhido];

            // Para todos os sons antes de tocar o audio de vitoria final.
            this.sound.stopAll();

            // Ativa a flag que bloqueia os sons dos carros.
            this.jogoFinalizado = true;

            // Toca o audio final ao atingir 100 por cento.
            const somVitoriaFinal = this.sound.add('mestredevendas', { loop: false, volume: 1 });
            somVitoriaFinal.play();

            let cameraPrincipal = this.cameras.main;

            // Centraliza a imagem final e fixa na tela.
            let imagemVitoriaFinal = this.add.image(cameraPrincipal.centerX, cameraPrincipal.centerY, chaveImagemVitoria)
                    .setScrollFactor(0) // Fixa na tela.
                    .setDepth(9999); 
            
            // Ajusta o tamanho da imagem final ao zoom da camera.
            imagemVitoriaFinal.setDisplaySize(
                cameraPrincipal.width / cameraPrincipal.zoom,
                cameraPrincipal.height / cameraPrincipal.zoom
            );

            // Pausa a movimentacao do personagem atras da tela final.
            this.physics.world.pause();

            return; 
        }

        // Calcula a posicao da barra acima do personagem.
        // A barra pertence ao mapa, por isso nao usa setScrollFactor(0).
        let barraX = this.personagem.x - 100; 
        let barraY = this.personagem.y - 60; // Fica 60 pixels acima do personagem.

        // Desenha o fundo da barra.
        let barraFundoGraphics = this.add.graphics().setDepth(9998);
        barraFundoGraphics.fillStyle(0x000000, 0.8); 
        barraFundoGraphics.fillRect(barraX, barraY, 204, 24); 

        if (totalVitorias > 0) {
            let barraProgressoGraphics = this.add.graphics().setDepth(9999);
            barraProgressoGraphics.fillStyle(0x00ff00, 1); 
            let larguraAtual = (200 / totalEstabelecimentos) * totalVitorias;
            barraProgressoGraphics.fillRect(barraX + 2, barraY + 2, larguraAtual, 20); 
        }

        this.add.text(barraX, barraY - 20, 'Progresso:', { 
            fontSize: '16px', 
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(9999);
        
        this.add.text(barraX + 160, barraY + 2, `${progressoPorcentagem.toFixed(0)}%`, { 
            fontSize: '16px', 
            fill: '#ffffff',
            fontWeight: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(9999);

    }

    update() {
        if (!this.personagem || !this.cursor) return;

        // Define a velocidade inicial do personagem como zero.
        this.personagem.setVelocity(0);

        // Define a velocidade de movimento do personagem.
        const velocidade = 80;

        const animsOk = this.anims.exists('left') && this.anims.exists('right') && this.anims.exists('up') && this.anims.exists('down');

        // Define os vetores de direcao.

        let vetorX = 0;
        let vetorY = 0;

        // Atualiza os vetores de direcao conforme as teclas.

        if (this.cursor.left.isDown) { vetorX = -1; }
        if (this.cursor.right.isDown) { vetorX = 1; }
        if (this.cursor.up.isDown) { vetorY = -1; }
        if (this.cursor.down.isDown) { vetorY = 1; }

        // Equaliza a velocidade na diagonal para evitar ganho de velocidade.

        const equalizar = Math.sqrt(Math.pow(vetorX,2) + Math.pow(vetorY,2)); // Usa a raiz quadrada da soma dos quadrados.

        // Quando equalizar for maior que zero, o valor sera 1 ou raiz de 2.

        if (equalizar > 0) {
            vetorX = vetorX / equalizar;    // Mantem a direcao e corrige a intensidade.
            vetorY = vetorY / equalizar;
        }

        // Aplica a velocidade final ao jogador.

        this.personagem.setVelocity(vetorX * velocidade, vetorY * velocidade);

        // Atualiza as animacoes conforme a direcao.

        if (animsOk) {
            if (vetorX < 0) this.personagem.play('left', true);
            else if (vetorX > 0) this.personagem.play('right', true);
            else if (vetorY < 0) this.personagem.play('up', true);
            else if (vetorY > 0) this.personagem.play('down', true);
            else this.personagem.stop();
        }

        
        // Move a seta indicativa para apontar para o próximo objetivo
        
        if (this.alvoAtual && this.seta && this.seta.visible) {
            
            // Descobre o ângulo entre o personagem e o alvo
            const angulo = Phaser.Math.Angle.Between(
                this.personagem.x, 
                this.personagem.y, 
                this.alvoAtual.x, 
                this.alvoAtual.y
            );

            // Gira a seta para a direção correta
            this.seta.setRotation(angulo);

            // Distância (raio) que a seta fica do corpo do personagem
            const distanciaDaSeta = 35; 

            // Mantém a seta flutuando ao redor do personagem baseada no ângulo
            this.seta.x = this.personagem.x + Math.cos(angulo) * distanciaDaSeta;
            this.seta.y = this.personagem.y + Math.sin(angulo) * distanciaDaSeta;
        }
        
    }

    iniciarCenaSegura(chaveCena, dadosCena) {
        if (this.transicaoEmAndamento) {
            return;
        }

        this.transicaoEmAndamento = true;
        this.pararSonsDaCidade();

        if (!utilitariosJogo.iniciarCenaSeDisponivel(this, chaveCena, dadosCena)) {
            this.transicaoEmAndamento = false;
        }
    }

    // Controla a logica de movimento do carro.

    moverCarro(posicaoInicial,posicaoFinal,duracao,carro,cena) {
        let somCarro = null;
        let primeiraVez = true;

        // Cria e toca o som do carro.
        const tocarSomCarro = () => {
            // Bloqueia novos sons se o jogo ja foi finalizado.
            if (cena.jogoFinalizado) return;

            const volumeSom = primeiraVez ? 0.5 : 0.2;
            somCarro = utilitariosJogo.tocarAudio(cena, 'carrocidade', {
                loop: false,
                volume: volumeSom
            });
            if (somCarro) {
                cena.carSounds.push(somCarro);
            }
            primeiraVez = false;
        };

        tocarSomCarro();

        // Calcula a distancia em cada eixo.

        const distanciaX = posicaoFinal.x - posicaoInicial.x;
        
        const distanciaY = posicaoFinal.y - posicaoInicial.y;

        // Calcula os valores usados no movimento do carro.

        const velocidadeX = distanciaX / duracao;  // Usa a relacao V = d / t.

        const aceleracaoY = (2 * distanciaY) / Math.pow(duracao, 2); // Usa a equacao do movimento uniformemente variado.

        // Define o estado inicial do carro.

        let velocidadeY = 0;

        let posicaoX = posicaoInicial.x;

        let posicaoY = posicaoInicial.y;

        let tempoDecorrido = 0;

        let ativar = true;

        // Registra as atualizacoes do carro na cena.

        const registrarAtualizacoes = (time,delta) => {
            if (!ativar) return;

            const tempoSoma = delta / 1000; // Converte o tempo para segundos.
            tempoDecorrido += tempoSoma;

            // Encerra o movimento ao chegar ao destino.

            if (tempoDecorrido >= duracao) {

                carro.setPosition(posicaoFinal.x, posicaoFinal.y);

                // Para o som do carro.
                utilitariosJogo.pararAudio(somCarro);

                ativar = false;

                cena.events.off('update', registrarAtualizacoes);

                // Aguarda 1 segundo, reposiciona o carro e reinicia o movimento.
                cena.time.delayedCall(1000, () => {
                    // Bloqueia o reinicio do carro se o jogo ja foi finalizado.
                    if (cena.jogoFinalizado) return;

                    posicaoX = posicaoInicial.x;

                    posicaoY = posicaoInicial.y;

                    velocidadeY = 0;

                    tempoDecorrido = 0;

                    ativar = true;

                    carro.setPosition(posicaoInicial.x, posicaoInicial.y);

                    // Toca o som novamente com volume reduzido.
                    tocarSomCarro();

                    cena.events.on('update', registrarAtualizacoes);
                });

                return;
            }
            

            // Calcula o movimento no eixo X.

            posicaoX = posicaoInicial.x + velocidadeX * tempoDecorrido;     // Usa a relacao Vx = d / t.

            // Calcula o movimento no eixo Y.

            velocidadeY = aceleracaoY * tempoDecorrido // Usa a relacao Vy = a * t.

            posicaoY = posicaoInicial.y + 0.5 * aceleracaoY * Math.pow(tempoDecorrido,2)  // Usa a formula da posicao no eixo Y.

            // Atualiza a posicao do carro.

            carro.setPosition(posicaoX, posicaoY);
        }
        
        cena.events.on('update', registrarAtualizacoes); // Executa a funcao a cada atualizacao da cena.
    }

    pararSonsDaCidade() {
        utilitariosJogo.pararAudio(this.musica);
        utilitariosJogo.pararAudios(this.carSounds);
        this.carSounds = [];
    }

}
