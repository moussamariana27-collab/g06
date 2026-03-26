class Cidade extends Phaser.Scene {
    constructor() { super({ key: 'Cidade' }); }

    // Recebe o personagem escolhido na cena anterior
    init(data) { this.personagemEscolhido = data?.character || null;
                 this.posicaoSpawn = data?.posicaoSpawn || {  x: 190, y: 330 };
     } 

    preload() {
        this.load.audio('musicacidade', 'assets/mapa.mp3')

        // Carrega o mapa exportado do Tiled no formato JSON
        this.load.tilemapTiledJSON('mapaCidade', 'assets/cidade_cielo.json');

        // Carrega a imagem do tileset utilizado no mapa
        this.load.image('cidade', 'assets/cidade_tileset.png');

        // Objeto que define qual spritesheet usar para cada personagem
        const sprites = {
            'JOSÉ':  { file: 'assets/jose.png',  frameWidth: 16, frameHeight: 32 },
            'MARIA': { file: 'assets/Maria.png', frameWidth: 16, frameHeight: 32 },
            'JOÃO':  { file: 'assets/joao.png',  frameWidth: 16, frameHeight: 32 },
            'PAULA': { file: 'assets/paulaPronto.png', frameWidth: 16, frameHeight: 16 },
        };

        // Seleciona o personagem escolhido pelo jogador
        const dadosSprite = sprites[this.personagemEscolhido];

        // Verifica se o personagem é válido antes de carregar
        if (!dadosSprite) { console.error('Personagem inválido:', this.personagemEscolhido); return; }

        // Carrega o spritesheet correspondente ao personagem escolhido
        this.load.spritesheet('sheetPersonagem', dadosSprite.file, {
            frameWidth: dadosSprite.frameWidth, frameHeight: dadosSprite.frameHeight
        });

        // Carrega o carro
        this.load.image('carro', 'assets/carroAzul.png');

        // Carrega o som do carro
        this.load.audio('carrocidade', 'assets/carrocidade.mp3');

    }

    create() {
        // Cria o mapa baseado no JSON carregado
        const map = this.make.tilemap({ key: 'mapaCidade' });

        // Associa o tileset carregado ao mapa
        const tiles = map.addTilesetImage('cidade', 'cidade');

        // Cria a camada visual chamada "Fundo"
        map.createLayer('Fundo', tiles, 0, 0);

        // add música
        this.musica = this.sound.add('musicacidade', {
            loop: true,
            volume: 0.4
        });
        this.musica.play();

        // Define limites da física do jogo e impede o personagem de sair do mapa
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Impede que a câmera saia dos limites do mapa
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Busca o objeto de spawn criado no Tiled
        const spawnObj = map.getObjectLayer('spawn').objects[0];

        // Calcula a posição central do spawn
        const spawnX = spawnObj.x + spawnObj.width / 2;
        const spawnY = spawnObj.y + spawnObj.height / 2;

        // Cria o personagem com física na posição de spawn
        this.personagem = this.physics.add.sprite(this.posicaoSpawn.x, this.posicaoSpawn.y, 'sheetPersonagem', 0).setScale(1.0);

        // Ativa colisão do personagem com as bordas do mundo
        this.personagem.setCollideWorldBounds(true);

        // =========================================================================================
        // Cria o carro e coloca-o para andar

        this.carro = this.physics.add.image(530,85, 'carro').setFlip(false,true);

        this.moverCarro(
        { x: 530, y: 85  },   // posição inicial
        { x: 540, y: 1000 },  // posição final
        10,                    // duração em segundos
        this.carro,            // elemento gráfico
        this
        );


        

        //==========================================================================================

        // Ajusta automaticamente a hitbox para o tamanho do sprite
        this.personagem.body.setSize(
            this.personagem.width,
            this.personagem.height
        );

        // Centraliza a hitbox no sprite
        this.personagem.body.setOffset(0, 0);

        // Faz a câmera seguir o personagem
        this.cameras.main.startFollow(this.personagem);

        // Aumenta o zoom da câmera
        this.cameras.main.setZoom(2.5);

        // Captura as teclas direcionais do teclado
        this.cursor = this.input.keyboard.createCursorKeys();

        // Cria um grupo de objetos sólidos usados para colisões
        const grupoColisoes = this.physics.add.staticGroup();

        // Percorre os objetos da layer "colisoes" definidos no Tiled
        const layerColisoes = map.getObjectLayer('colisoes');
        if (layerColisoes) {
            layerColisoes.objects.filter(objetoColisao => objetoColisao.width > 0 && objetoColisao.height > 0).forEach(objetoColisao => {

                // Cria um retângulo invisível representando a área de colisão
                const retanguloColisao = this.add.rectangle(objetoColisao.x + objetoColisao.width/2, objetoColisao.y + objetoColisao.height/2, objetoColisao.width, objetoColisao.height);

                // Adiciona física estática ao objeto
                this.physics.add.existing(retanguloColisao, true);

                // Adiciona o objeto ao grupo de colisões
                grupoColisoes.add(retanguloColisao);
            });

            // Ativa colisão entre o personagem e os objetos do grupo
            this.physics.add.collider(this.personagem, grupoColisoes);
        }
        // --- REDIRECIONAMENTO: SUPERMERCADO ---
        // Posição: Centro X (380), Centro Y (879.5), Largura (200), Altura (45)
        let zonaSupermercado = this.add.zone(380, 879.5, 200, 45);
        this.physics.world.enable(zonaSupermercado);
        zonaSupermercado.body.setAllowGravity(false);
        zonaSupermercado.body.moves = false;

        this.physics.add.overlap(this.personagem, zonaSupermercado, () => {
            // Para a música e som do carro antes de trocar de cena
            if (this.musica && this.musica.isPlaying) {
                this.musica.stop();
            }
            if (this.somCarro && this.somCarro.isPlaying) {
                this.somCarro.stop();
            }
            // Vai para a cena do Supermercado passando os dados do personagem
            this.scene.start('Mercado', { character: this.personagemEscolhido, posicaoSpawn: this.posicaoSpawn });
        });

        // --- REDIRECIONAMENTO: LOJA DE CONSTRUÇÃO ---
        // Posição: Centro X (710.5), Centro Y (930.5), Largura (117), Altura (33)
        let zonaConstrucao = this.add.zone(710.5, 930.5, 117, 33);
        this.physics.world.enable(zonaConstrucao);
        zonaConstrucao.body.setAllowGravity(false);
        zonaConstrucao.body.moves = false;

        this.physics.add.overlap(this.personagem, zonaConstrucao, () => {
            // Para a música e som do carro antes de trocar de cena
            if (this.musica && this.musica.isPlaying) {
                this.musica.stop();
            }
            if (this.somCarro && this.somCarro.isPlaying) {
                this.somCarro.stop();
            }
            // Vai para a cena da Loja de Construção
            this.scene.start('LojaDeConstrução', { character: this.personagemEscolhido, posicaoSpawn: this.posicaoSpawn });
        });
        // Lista de cenas para onde o jogador pode ir
        const cenasDisponiveis = ['Escritorio', 'LojaDeRoupa', 'Padaria', 'Posto', 'SalaoDeBeleza', 'LojaDeConstrução', 'Mercado'];

        // Percorre as zonas de interação definidas no Tiled
        const layerZonas = map.getObjectLayer('zonas');
        if (layerZonas) {
            layerZonas.objects.filter(zona => zona.width > 0 && zona.height > 0 && zona.type !== '' && zona.type !== 'Farmacia').forEach(zona => {

                // Cria uma zona invisível de interação
                const areaInteracao = this.add.zone(zona.x + zona.width/2, zona.y + zona.height/2, zona.width, zona.height);

                // Ativa física na zona
                this.physics.world.enable(areaInteracao);

                // Desativa gravidade na zona
                areaInteracao.body.setAllowGravity(false);

                // Impede movimentação da zona
                areaInteracao.body.moves = false;

                // Detecta quando o personagem entra na zona
                this.physics.add.overlap(this.personagem, areaInteracao, () => {

                    // Caso a zona seja o Hotel (ainda não implementado)
                    if (zona.type === 'Hotel') {

                        // Evita criar múltiplos avisos ao mesmo tempo
                        if (!this.avisoHotel) {

                            // Exibe um aviso temporário na tela com estilo consistente
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

                            // Remove o aviso após alguns segundos
                            this.time.delayedCall(2500, () => { 
                                if (this.avisoHotel) { 
                                    this.avisoHotel.destroy(); 
                                    this.avisoHotel = null; 
                                } 
                            });
                        }

                    // Caso a zona leve para outra cena disponível
                    } else if (cenasDisponiveis.includes(zona.type)) {

                        // ✅ Para a música antes de trocar de cena
                        this.musica.stop();

                        // Para o som do carro antes de trocar de cena
                        if (this.somCarro && this.somCarro.isPlaying) {
                            this.somCarro.stop();
                        }

                        // Troca para a cena correspondente
                        this.scene.start(zona.type, { character: this.personagemEscolhido });
                    }
                });
            });
        }

        // AQUI TEMOS AS ANIMAÇÕES DAS SPRITESHEETS DOS PERSONAGENS JOGÁVEIS
        // TODOS OS ARQUIVOS ESTÃO PADRONIZADOS, POR ISSO OS VALORES PARA OS FRAMES SÃO IGUAIS PARA QUALQUER QUE SEJA O PERSONAGEM
        // Spritesheet layout: frames 0-47 (idle), 48-59 (direita), 60-65 (esquerda), 66-71 (baixo), 54-59 (cima) em diversos padrões

        // Movimento para CIMA (frames 54-59)
        this.anims.create({
            key: "up",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 54, end: 59 }),
            repeat: -1
        });

        // Movimento para BAIXO (frames 66-71)
        this.anims.create({
            key: "down",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 66, end: 71 }),
            repeat: -1
        });

        // Movimento para ESQUERDA (frames 60-65)
        this.anims.create({
            key: "left",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 60, end: 65 }),
            repeat: -1
        });

        // Movimento para DIREITA (frames 48-53)
        this.anims.create({
            key: "right",
            frameRate: 12,
            frames: this.anims.generateFrameNumbers('sheetPersonagem',{start: 48, end: 53 }),
            repeat: -1
        });


        this.input.keyboard.once('keydown-SPACE', () => {
            console.log(`${this.personagem.x} e ${this.personagem.y}` )
        });
        

    }

    update() {
        // Define a velocidade inicial do personagem como zero
        this.personagem.setVelocity(0);

        // Constante de velocidade de movimento do personagem em pixels/segundo
        const velocidade = 80;

        const animsOk = this.anims.exists('left') && this.anims.exists('right') && this.anims.exists('up') && this.anims.exists('down');

        // Definindo os vetores de direção

        let vetorX = 0
        let vetorY = 0

        // Adicionando os valores para direção dos vetores

        if (this.cursor.left.isDown) { vetorX = -1};
        if (this.cursor.right.isDown) { vetorX = 1};
        if (this.cursor.up.isDown) {vetorY = -1};
        if (this.cursor.down.isDown) {vetorY = 1};

        // Nesse caso, se o jogador pressiona duas teclas de forma a andar na diagonal, sua velocidade nessa direção será de sqrt(2)*150
        // Isso ocorre pela soma dos vetores (que são perpendiculares entre si), já que |vetorX|=1 e |vetorY|=1 e vetorX ⟂ vetorY  => |vetorX + vetorY| = sqrt(2).
        // Portanto, para que o jogador não fique mais rápido quando andar na perpendicular, temos que equalizar esse valor

        let equalizar = Math.sqrt(Math.pow(vetorX,2) + Math.pow(vetorY,2)); // Math.sqrt(x) = raiz quadrada de x ; Math.pow(x,y) = x^y

        // Perceba que se equalizar > 0 , então equalizar = 1 ou equalizar = sqrt(2)

        if (equalizar > 0) {
            vetorX = vetorX / equalizar;    // Se um vetor é 0 e o outro não, então a função retorna os valores normais dos vetores (seria 0 e 1 ou 0 e -1 - tanto para x quanto para y)
            vetorY = vetorY / equalizar;
        }

        // Feito isso, agora pode-se definir a velocidade do jogador

        this.personagem.setVelocity( vetorX * velocidade, vetorY * velocidade )

        // Configurando animações

        if (animsOk) {
        if (vetorX < 0)      this.personagem.play('left', true);
        else if (vetorX > 0) this.personagem.play('right', true);
        else if (vetorY < 0) this.personagem.play('up', true);
        else if (vetorY > 0) this.personagem.play('down', true);
        else             this.personagem.stop();
        }
    }

    // Aqui temos a logica de movimento do carro

    moverCarro(posicaoInicial,posicaoFinal,duracao,carro,cena) {

        this.somCarro = null;
        let primeiraVez = true;

        // Função para criar e tocar o som do carro
        const tocarSomCarro = () => {
            const volumeSom = primeiraVez ? 0.5 : 0.2;
            this.somCarro = cena.sound.add('carrocidade', {
                loop: false,
                volume: volumeSom
            });
            this.somCarro.play();
            primeiraVez = false;
        };

        tocarSomCarro();

        // Equações da distância em cada eixo

        const distanciaX = posicaoFinal.x - posicaoInicial.x;;
        
        const distanciaY = posicaoFinal.y - posicaoInicial.y;

        // Equacões base para a formação do vetor velocidade do carro

        const velocidadeX = distanciaX / duracao;  // Vem da equacao V = d/t

        const aceleracaoY = (2 * distanciaY) / Math.pow(duracao, 2); // Vem da equacao S = S' + V'*t + (a*t*t)/2

        // Estado inicial do carro

        let velocidadeY = 0;

        let posicaoX = posicaoInicial.x;

        let posicaoY = posicaoInicial.y;

        let tempoDecorrido = 0;

        let ativar = true;

        // Aqui temos o modo de registrar as atualizacoes na cena

        const registrarAtualizacoes = (time,delta) => {
            if (!ativar) return;

            const tempoSoma = delta / 1000; // Converte o tempo em 'segundos', para padronizar com as unidades de movimento anteriores
            tempoDecorrido += tempoSoma;

            // Aqui encerra-se o movimento

            if (tempoDecorrido >= duracao) {

                carro.setPosition(posicaoFinal.x, posicaoFinal.y);

                // Para o som do carro
                if (this.somCarro && this.somCarro.isPlaying) {
                    this.somCarro.stop();
                }

                ativar = false;

                cena.events.off('update', registrarAtualizacoes);

                console.log(`Movimento ${carro} concluído`);

                // Aguarda 1 segundo, reposiciona o carro e reinicia o movimento
                cena.time.delayedCall(1000, () => {

                    posicaoX = posicaoInicial.x;

                    posicaoY = posicaoInicial.y;

                    velocidadeY = 0;

                    tempoDecorrido = 0;

                    ativar = true;

                    carro.setPosition(posicaoInicial.x, posicaoInicial.y);

                    // Toca o som novamente (com volume reduzido nas próximas voltas)
                    tocarSomCarro();

                    cena.events.on('update', registrarAtualizacoes);
                });

                return;
            }
            

            // Movimento no eixo X  (MU)

            posicaoX += velocidadeX * tempoSoma;     // Vx = d*t

            console.log( `velocidade no eixo x: ${velocidadeX.toFixed(2)} pixels por segundo`);
            console.log(` posição no eixo x: ${posicaoX.toFixed(2)}`);

            // Movimento no eixo Y (MUV)

            velocidadeY += aceleracaoY * tempoSoma  // Vy = Vy' a*t

            posicaoY += velocidadeY * tempoSoma   // Sy = Sy' + Vy'*t + (a*t*t/2)

            console.log(  `aceleração no eixo y: ${aceleracaoY.toFixed(2)} pixels por segundo ao quadrado`);
            console.log( `velocidade no eixo Y: ${velocidadeY.toFixed(2)} pixels por segundo` ) ;
            console.log(` posição no eixo y: ${posicaoY.toFixed(2)}`);

            // Aplica posicao no carro

            carro.setPosition(posicaoX, posicaoY);
        }
        
        cena.events.on('update', registrarAtualizacoes); // Toda vez que o evento 'update' (Phaser emite esse evento junto de cada frame) ocorre, a funcao registrarAtualizacoes é executada
        }

}
