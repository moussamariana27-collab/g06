// Funcoes compartilhadas entre menu, gameplay, combate e feedbacks.
const utilitariosJogo = {
    personagemPadrao: 'MARIA',
    chavesPersonagem: ['JOSE', 'MARIA', 'JOAO', 'PAULA'],

    // Normaliza a chave do personagem para tolerar minusculas, espacos extras e acentos.
    normalizarChavePersonagem(valor) {
        if (typeof valor !== 'string') return null;

        const chaveNormalizada = valor
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase();

        const apelidos = {
            JOAO: 'JOAO',
            JOSE: 'JOSE',
            MARIA: 'MARIA',
            PAULA: 'PAULA',
        };

        return apelidos[chaveNormalizada] || null;
    },

    // Resolve um personagem valido e aplica um valor padrao quando necessario.
    resolverChavePersonagem(valor, chavesPermitidas = null, valorPadrao = 'MARIA') {
        const chaveNormalizada = utilitariosJogo.normalizarChavePersonagem(valor);
        const chavesDisponiveis = Array.isArray(chavesPermitidas) && chavesPermitidas.length > 0
            ? chavesPermitidas
            : utilitariosJogo.chavesPersonagem;

        if (chaveNormalizada && chavesDisponiveis.includes(chaveNormalizada)) {
            return chaveNormalizada;
        }

        if (valorPadrao === null) {
            return null;
        }

        return chavesDisponiveis.includes(valorPadrao) ? valorPadrao : chavesDisponiveis[0];
    },

    // Busca o asset correto do personagem dentro de um mapa de sprites.
    obterAssetPersonagem(personagemSelecionado, mapaAssets, valorPadrao = 'MARIA') {
        if (!mapaAssets || typeof mapaAssets !== 'object') return null;

        const chavesDisponiveis = Object.keys(mapaAssets);
        if (chavesDisponiveis.length === 0) return null;

        const chavePersonagem = utilitariosJogo.resolverChavePersonagem(
            personagemSelecionado,
            chavesDisponiveis,
            valorPadrao
        );

        return mapaAssets[chavePersonagem] || mapaAssets[chavesDisponiveis[0]] || null;
    },

    // Garante que a posicao de spawn tenha coordenadas numericas validas.
    normalizarPosicaoSpawn(valor, valorPadrao = { x: 0, y: 0 }) {
        const eixoX = Number(valor?.x);
        const eixoY = Number(valor?.y);

        if (Number.isFinite(eixoX) && Number.isFinite(eixoY)) {
            return { x: eixoX, y: eixoY };
        }

        return { x: valorPadrao.x, y: valorPadrao.y };
    },

    // Limita um numero a uma faixa segura.
    limitarNumero(valor, valorPadrao, minimo, maximo) {
        const numeroConvertido = Number(valor);
        const numeroSeguro = Number.isFinite(numeroConvertido) ? numeroConvertido : valorPadrao;
        return Phaser.Math.Clamp(numeroSeguro, minimo, maximo);
    },

    // Padroniza a estrutura das questoes para evitar falhas no combate.
    sanitizarQuestoes(questoes) {
        if (!Array.isArray(questoes) || questoes.length === 0) {
            return [{
                pergunta: 'O roteiro desta fase nao foi carregado corretamente.',
                certo: 'Continuar',
                soDialogo: true
            }];
        }

        const questoesSanitizadas = questoes
            .map((questao, indiceQuestao) => {
                if (!questao || typeof questao !== 'object') return null;

                const pergunta = typeof questao.pergunta === 'string' && questao.pergunta.trim()
                    ? questao.pergunta
                    : `Pergunta ${indiceQuestao + 1}`;

                const certo = typeof questao.certo === 'string' && questao.certo.trim()
                    ? questao.certo
                    : 'Continuar';

                if (questao.soDialogo) {
                    return { pergunta, certo, soDialogo: true };
                }

                const errado = typeof questao.errado === 'string' && questao.errado.trim()
                    ? questao.errado
                    : 'Revisar depois';

                return {
                    pergunta,
                    certo,
                    errado,
                    resposta: typeof questao.resposta === 'boolean' ? questao.resposta : true,
                    soDialogo: false,
                };
            })
            .filter(Boolean);

        return questoesSanitizadas.length > 0 ? questoesSanitizadas : utilitariosJogo.sanitizarQuestoes(null);
    },

    // Cria a animacao apenas quando a key ainda nao existe.
    garantirAnimacao(cena, configuracaoAnimacao) {
        if (!cena?.anims || !configuracaoAnimacao?.key) return;
        if (!cena.anims.exists(configuracaoAnimacao.key)) {
            cena.anims.create(configuracaoAnimacao);
        }
    },

    // Toca um audio com validacao de asset e tratamento de falhas.
    tocarAudio(cena, chaveAudio, configuracaoAudio = {}) {
        if (!cena?.sound || !chaveAudio) return null;
        if (cena.cache?.audio && !cena.cache.audio.exists(chaveAudio)) {
            console.warn(`Audio nao encontrado: ${chaveAudio}`);
            return null;
        }

        const som = cena.sound.add(chaveAudio, configuracaoAudio);
        if (!som) return null;

        try {
            som.play();
        } catch (erro) {
            console.warn(`Falha ao tocar audio ${chaveAudio}:`, erro);
            return null;
        }

        return som;
    },

    // Para um audio somente quando ele estiver em reproducao.
    pararAudio(som) {
        if (som?.isPlaying) {
            som.stop();
        }
    },

    // Para varios audios de uma vez.
    pararAudios(listaSons = []) {
        listaSons.forEach((som) => utilitariosJogo.pararAudio(som));
    },

    // Inicia uma cena apenas se ela estiver registrada no gerenciador.
    iniciarCenaSeDisponivel(cena, chaveCena, dadosCena = {}) {
        if (!cena?.scene?.manager?.keys?.[chaveCena]) {
            console.error('Cena nao encontrada:', chaveCena);
            return false;
        }

        cena.scene.start(chaveCena, dadosCena);
        return true;
    }
};
