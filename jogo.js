const tela = document.getElementById("telaJogo");
const ctx = tela.getContext("2d");

// Carregando o cenário da fase 1
const fundoFase1 = new Image();
fundoFase1.src = "recursos/cenarios/fundo fase 01.png";

// Carregando o chão da fase 1
const chaoFase1 = new Image();
chaoFase1.src = "recursos/cenarios/chão fase 01.png";

// Carregando a imagem das plataformas
const imagemPlataforma = new Image();
imagemPlataforma.src = "recursos/cenarios/plataforma 01.png";


// Plataformas da fase
const plataformas = [
    // Primeira subida: acessível pelo chão
    { x: 350, y: 300, largura: 220, altura: 40 },

    // Segunda subida: exige estar na primeira plataforma
    { x: 600, y: 180, largura: 220, altura: 40 },

    // Retorno a uma altura mais baixa
    { x: 1050, y: 290, largura: 220, altura: 40 },

    // Nova subida: exige estar na terceira plataforma
    { x: 1300, y: 165, largura: 220, altura: 40 },

    // Plataforma intermediária
    { x: 1750, y: 280, largura: 220, altura: 40 },

    // Subida elevada
    { x: 2000, y: 155, largura: 220, altura: 40 },

    // Última plataforma intermediária
    { x: 2450, y: 290, largura: 220, altura: 40 },

    // Plataforma final elevada
    { x: 2700, y: 170, largura: 220, altura: 40 }
];

// Carregando o cone
const cone = new Image();
cone.src = "recursos/obstaculos/cone.png";

// Posição do cone no cenário
let coneX = 700;
let coneY = 340;

// Posição do personagem
let x = 100;
let y = 350;

// Câmera
let cameraX = 0;
let larguraMundo = tela.width;

// Velocidade de movimento
let velocidade = 5;
let velocidadeY = 0;
let gravidade = 0.6;
let noChao = true;

const forcaPulo = -16.5;
const alturaChao = 350;

// Limite final do mapa
const fimMapa = 3800;

// Direção do personagem
let olhandoDireita = true;

// Controles
const teclas = {
    direita: false,
    esquerda: false
};

// VIDA DO PERSONAGEM
let vidaPersonagem = 3;
let invulneravel = false;
let tempoInvulnerabilidade = 0;
const duracaoInvulnerabilidade = 1000;

let personagemMorrendo = false;
let frameMortePersonagem = 0;
let tempoAnimacaoMortePersonagem = 0;
let personagemMorto = false;

// Carregando os rostos do personagem
const rostoBem = new Image();
rostoBem.src = "recursos/personagem/rosto/rosto bem.png";

const rostoDor = new Image();
rostoDor.src = "recursos/personagem/rosto/rosto dor.png";

const rostoQuaseMorto = new Image();
rostoQuaseMorto.src = "recursos/personagem/rosto/rosto quase morto.png";

// Carregando os 3 frames de morte do personagem
const framesMortePersonagem = [];

for (let i = 1; i <= 3; i++) {
    const imagem = new Image();

    imagem.onload = function() {
        console.log("Frame de morte do personagem carregado:", i);
    };

    imagem.onerror = function() {
        console.log("ERRO ao carregar o frame de morte do personagem:", i);
    };

    imagem.src = `recursos/personagem/morrendo/morrendo ${i}.png`;

    framesMortePersonagem.push(imagem);
}

// Carregando a imagem parada
const personagem = new Image();

personagem.onload = function() {
    console.log("Imagem parada carregada!");
    console.log("Largura:", personagem.width);
    console.log("Altura:", personagem.height);

    requestAnimationFrame(atualizarJogo);
};

personagem.onerror = function() {
    console.log("ERRO: Não foi possível carregar a imagem parada.");
};

personagem.src = "recursos/personagem/parado/parado 0.png";

// Carregando os 6 frames da corrida
const framesCorrida = [];

for (let i = 0; i < 6; i++) {
    const imagem = new Image();

    imagem.onload = function() {
        console.log("Frame de corrida carregado:", i);
    };

    imagem.onerror = function() {
        console.log("ERRO ao carregar o frame de corrida:", i);
    };

    imagem.src = `recursos/personagem/correndo/personagem correndo ${i}.png`;

    framesCorrida.push(imagem);
}

// Carregando os 5 frames do pulo
const framesPulo = [];

for (let i = 0; i < 5; i++) {
    const imagem = new Image();

    imagem.onload = function() {
        console.log("Frame de pulo carregado:", i);
    };

    imagem.onerror = function() {
        console.log("ERRO ao carregar o frame de pulo:", i);
    };

    imagem.src = `recursos/personagem/pulando/pulando ${i}.png`;

    framesPulo.push(imagem);
}

// Carregando os 6 frames do ataque
const framesAtaque = [];

for (let i = 0; i < 6; i++) {
    const imagem = new Image();

    imagem.onload = function() {
        console.log("Frame de ataque carregado:", i);
    };

    imagem.onerror = function() {
        console.log("ERRO ao carregar o frame de ataque:", i);
    };

    imagem.src = `recursos/personagem/atacando/personagem-principal-atacando-${i}.png`;

    framesAtaque.push(imagem);
}

// Carregando os 5 frames de caminhada do atendente
const framesAtendente = [];

for (let i = 0; i < 5; i++) {
    const imagem = new Image();

    imagem.onload = function() {
        console.log("Frame do atendente carregado:", i);
    };

    imagem.onerror = function() {
        console.log("ERRO ao carregar o frame do atendente:", i);
    };

    imagem.src = `recursos/inimigo/atendente/caminhando/atendente ${i}.png`;

    framesAtendente.push(imagem);
}

// Carregando os 5 frames de ataque do atendente
const framesAtaqueAtendente = [];

for (let i = 0; i < 5; i++) {
    const imagem = new Image();

    imagem.onload = function() {
        console.log("Frame de ataque do atendente carregado:", i);
    };

    imagem.onerror = function() {
        console.log("ERRO ao carregar o frame de ataque do atendente:", i);
    };

    imagem.src = `recursos/inimigo/atendente/ataque/ataque ${i}.png`;

    framesAtaqueAtendente.push(imagem);
}

// Carregando os 5 frames de morte do atendente
const framesMorteAtendente = [];

for (let i = 0; i < 5; i++) {
    const imagem = new Image();

    imagem.onload = function() {
        console.log("Frame de morte do atendente carregado:", i);
    };

    imagem.onerror = function() {
        console.log("ERRO ao carregar o frame de morte do atendente:", i);
    };

    imagem.src = `recursos/inimigo/atendente/morrendo/morrendo ${i}.png`;

    framesMorteAtendente.push(imagem);
}

// Documentos lançados pelo personagem
const documentos = [];

// DOCUMENTOS COLECIONÁVEIS DA FASE
const imagensColetaveis = [
    "recursos/coletaveis/rg.png",
    "recursos/coletaveis/cpf.png",
    "recursos/coletaveis/carteira de trabalho.png",
    "recursos/coletaveis/agua liz.png",
    "recursos/coletaveis/laudo medico.png",
    "recursos/coletaveis/ppp.png"
];

// Distribui os documentos pelas seis primeiras plataformas
const plataformasDocumentos = [0, 1, 2, 3, 4, 5];

const atendentesDocumentos = [
    null, // RG: sem proteção
    0,    // CPF: protegido pelo primeiro atendente
    null, // Carteira de trabalho: sem proteção
    2,    // Água: protegida pelo terceiro atendente
    null, // Laudo médico: sem proteção
    4     // PPP: protegido pelo quinto atendente
];

const itensColetaveis = imagensColetaveis.map((caminho, indice) => {
    const imagem = new Image();
    imagem.src = caminho;

    const plataforma = plataformas[plataformasDocumentos[indice]];

    return {
        imagem: imagem,
        x: plataforma.x + 85,
        y: plataforma.y - 45,
        largura: 45,
        altura: 45,
        coletado: false,
        atendenteIndex: atendentesDocumentos[indice]
    };
});

let quantidadeDocumentos = 0;
let chaveApareceu = false;
let chaveColetada = false;
let faseConcluida = false;

// Posição da chave
const chave = {
    x: 3680,
    y: 350,
    largura: 45,
    altura: 45
};

// Lista de atendentes
const atendentes = [
    {
        x: 650,
        y: 84,
        velocidade: 2,
        olhandoDireita: true,
        limiteEsquerda: 610,
        limiteDireita: 780,
        frame: 0,
        tempoAnimacao: 0,
        atacando: false,
        frameAtaque: 0,
        tempoAnimacaoAtaque: 0,
        tempoEsperaAtaque: 0,
        causouDano: false,
        vida: 3,
        morrendo: false,
        frameMorte: 0,
        tempoAnimacaoMorte: 0,
        vivo: true
    },

    {
        x: 1150,
        y: 194,
        velocidade: 2,
        olhandoDireita: false,
        limiteEsquerda: 1060,
        limiteDireita: 1240,
        frame: 0,
        tempoAnimacao: 0,
        atacando: false,
        frameAtaque: 0,
        tempoAnimacaoAtaque: 0,
        tempoEsperaAtaque: 0,
        causouDano: false,
        vida: 3,
        morrendo: false,
        frameMorte: 0,
        tempoAnimacaoMorte: 0,
        vivo: true
    },

    {
        x: 1800,
        y: 184,
        velocidade: 2,
        olhandoDireita: true,
        limiteEsquerda: 1760,
        limiteDireita: 1930,
        frame: 0,
        tempoAnimacao: 0,
        atacando: false,
        frameAtaque: 0,
        tempoAnimacaoAtaque: 0,
        tempoEsperaAtaque: 0,
        causouDano: false,
        vida: 3,
        morrendo: false,
        frameMorte: 0,
        tempoAnimacaoMorte: 0,
        vivo: true
    },

    {
        x: 2050,
        y: 59,
        velocidade: 2,
        olhandoDireita: false,
        limiteEsquerda: 2010,
        limiteDireita: 2180,
        frame: 0,
        tempoAnimacao: 0,
        atacando: false,
        frameAtaque: 0,
        tempoAnimacaoAtaque: 0,
        tempoEsperaAtaque: 0,
        causouDano: false,
        vida: 3,
        morrendo: false,
        frameMorte: 0,
        tempoAnimacaoMorte: 0,
        vivo: true
    },

    {
        x: 2550,
        y: 194,
        velocidade: 2,
        olhandoDireita: true,
        limiteEsquerda: 2460,
        limiteDireita: 2640,
        frame: 0,
        tempoAnimacao: 0,
        atacando: false,
        frameAtaque: 0,
        tempoAnimacaoAtaque: 0,
        tempoEsperaAtaque: 0,
        causouDano: false,
        vida: 3,
        morrendo: false,
        frameMorte: 0,
        tempoAnimacaoMorte: 0,
        vivo: true
    },

    {
        x: 3100,
        y: 350,
        velocidade: 2,
        olhandoDireita: false,
        limiteEsquerda: 3050,
        limiteDireita: 3200,
        frame: 0,
        tempoAnimacao: 0,
        atacando: false,
        frameAtaque: 0,
        tempoAnimacaoAtaque: 0,
        tempoEsperaAtaque: 0,
        causouDano: false,
        vida: 3,
        morrendo: false,
        frameMorte: 0,
        tempoAnimacaoMorte: 0,
        vivo: true
    },

    // SÉTIMO ATENDENTE: CHÃO
    {
        x: 900,
        y: 350,
        velocidade: 2,
        olhandoDireita: true,
        limiteEsquerda: 850,
        limiteDireita: 1000,
        frame: 0,
        tempoAnimacao: 0,
        atacando: false,
        frameAtaque: 0,
        tempoAnimacaoAtaque: 0,
        tempoEsperaAtaque: 0,
        causouDano: false,
        vida: 3,
        morrendo: false,
        frameMorte: 0,
        tempoAnimacaoMorte: 0,
        vivo: true
    },

    // OITAVO ATENDENTE: CHÃO
    {
        x: 1450,
        y: 350,
        velocidade: 2,
        olhandoDireita: false,
        limiteEsquerda: 1400,
        limiteDireita: 1550,
        frame: 0,
        tempoAnimacao: 0,
        atacando: false,
        frameAtaque: 0,
        tempoAnimacaoAtaque: 0,
        tempoEsperaAtaque: 0,
        causouDano: false,
        vida: 3,
        morrendo: false,
        frameMorte: 0,
        tempoAnimacaoMorte: 0,
        vivo: true
    },

    // NONO ATENDENTE: CHÃO
    {
        x: 3400,
        y: 350,
        velocidade: 2,
        olhandoDireita: true,
        limiteEsquerda: 3300,
        limiteDireita: 3500,
        frame: 0,
        tempoAnimacao: 0,
        atacando: false,
        frameAtaque: 0,
        tempoAnimacaoAtaque: 0,
        tempoEsperaAtaque: 0,
        causouDano: false,
        vida: 3,
        morrendo: false,
        frameMorte: 0,
        tempoAnimacaoMorte: 0,
        vivo: true
    }
];


// Controle das animações
let frameAtual = 0;
let tempoAnimacao = 0;
let ultimoTempo = 0;

const intervaloAnimacao = 100; // 10 FPS

// Controle do ataque
let atacando = false;

// Detecta quando uma tecla é pressionada
document.addEventListener("keydown", function(event) {

    // Reinicia o jogo ao apertar R depois do GAME OVER
    if (event.key.toLowerCase() === "r" && (personagemMorto || faseConcluida)) {
        reiniciarJogo();
        return;
    }

    if (personagemMorrendo || personagemMorto) {
        return;
    }

    if (faseConcluida) {
        return;
    }

    if (event.key === "ArrowRight" || event.key === "d") {
        teclas.direita = true;
        olhandoDireita = true;
    }

    if (event.key === "ArrowLeft" || event.key === "a") {
        teclas.esquerda = true;
        olhandoDireita = false;
    }

    if (event.code === "Space" && noChao) {
        event.preventDefault();

        velocidadeY = forcaPulo;
        noChao = false;

        // Reinicia a animação do pulo
        frameAtual = 0;
        tempoAnimacao = 0;
    }

    // Inicia a animação de ataque com X e lança o documento
    if (event.key.toLowerCase() === "x" && !atacando && !event.repeat) {
        atacando = true;
        frameAtual = 0;
        tempoAnimacao = 0;

        documentos.push({
            x: olhandoDireita ? x + 80 : x - 10,
            y: y + 35,
            velocidade: olhandoDireita ? 8 : -8,
            largura: 24,
            altura: 18,
            acertou: false,
            distanciaPercorrida: 0,
            alcance: 200
        });
    }
});

// Detecta quando uma tecla é solta
document.addEventListener("keyup", function(event) {

    if (event.key === "ArrowRight" || event.key === "d") {
        teclas.direita = false;
    }

    if (event.key === "ArrowLeft" || event.key === "a") {
        teclas.esquerda = false;
    }
});

// CONTROLES VIRTUAIS PARA CELULAR

const botaoEsquerda = document.getElementById("botaoEsquerda");
const botaoDireita = document.getElementById("botaoDireita");
const botaoPular = document.getElementById("botaoPular");
const botaoAtacar = document.getElementById("botaoAtacar");

const botaoReiniciar = document.getElementById("botaoReiniciar");

if (botaoReiniciar) {
    botaoReiniciar.addEventListener("pointerdown", function(event) {
        event.preventDefault();

        if (personagemMorto || faseConcluida) {
            reiniciarJogo();
        }
    });
}

// Movimento para a esquerda
botaoEsquerda.addEventListener("pointerdown", function(event) {
    event.preventDefault();

    if (personagemMorrendo || personagemMorto || faseConcluida) {
        return;
    }

    teclas.esquerda = true;
    olhandoDireita = false;

    botaoEsquerda.setPointerCapture(event.pointerId);
});

botaoEsquerda.addEventListener("pointerup", function(event) {
    teclas.esquerda = false;
});

botaoEsquerda.addEventListener("pointercancel", function() {
    teclas.esquerda = false;
});

// Movimento para a direita
botaoDireita.addEventListener("pointerdown", function(event) {
    event.preventDefault();

    if (personagemMorrendo || personagemMorto || faseConcluida) {
        return;
    }

    teclas.direita = true;
    olhandoDireita = true;

    botaoDireita.setPointerCapture(event.pointerId);
});

botaoDireita.addEventListener("pointerup", function(event) {
    teclas.direita = false;
});

botaoDireita.addEventListener("pointercancel", function() {
    teclas.direita = false;
});

// Pulo
botaoPular.addEventListener("pointerdown", function(event) {
    event.preventDefault();

    if (
        personagemMorrendo ||
        personagemMorto ||
        faseConcluida ||
        !noChao
    ) {
        return;
    }

    velocidadeY = forcaPulo;
    noChao = false;

    frameAtual = 0;
    tempoAnimacao = 0;
});

// Ataque
botaoAtacar.addEventListener("pointerdown", function(event) {
    event.preventDefault();

    if (
        personagemMorrendo ||
        personagemMorto ||
        faseConcluida ||
        atacando
    ) {
        return;
    }

    atacando = true;
    frameAtual = 0;
    tempoAnimacao = 0;

    documentos.push({
        x: olhandoDireita ? x + 80 : x - 10,
        y: y + 35,
        velocidade: olhandoDireita ? 8 : -8,
        largura: 24,
        altura: 18,
        acertou: false,
        distanciaPercorrida: 0,
        alcance: 200
    });
});

// Reinicia todos os elementos da fase
function reiniciarJogo() {

    // Posição e estado do personagem
    x = 100;
    y = 350;
    velocidadeY = 0;
    noChao = true;
    olhandoDireita = true;

    // Câmera
    cameraX = 0;

    // Vidas e invulnerabilidade
    vidaPersonagem = 3;
    invulneravel = false;
    tempoInvulnerabilidade = 0;

    // Estado de morte
    personagemMorrendo = false;
    frameMortePersonagem = 0;
    tempoAnimacaoMortePersonagem = 0;
    personagemMorto = false;

    // Animações do personagem
    frameAtual = 0;
    tempoAnimacao = 0;
    atacando = false;

    // Controles
    teclas.direita = false;
    teclas.esquerda = false;

    // Remove todos os documentos da tela
    documentos.length = 0;

    // Restaura as posições dos nove atendentes
    const posicoesAtendentes = [
        { x: 650, y: 84 },
        { x: 1150, y: 194 },
        { x: 1800, y: 184 },
        { x: 2050, y: 59 },
        { x: 2550, y: 194 },
        { x: 3100, y: 350 },
        { x: 900, y: 350 },
        { x: 1450, y: 350 },
        { x: 3400, y: 350 }
    ];

    atendentes.forEach((atendente, indice) => {
        atendente.x = posicoesAtendentes[indice].x;
        atendente.y = posicoesAtendentes[indice].y;
        atendente.olhandoDireita = indice % 2 === 0;
    });

    atendentes.forEach(atendente => {

        atendente.frame = 0;
        atendente.tempoAnimacao = 0;

        atendente.atacando = false;
        atendente.frameAtaque = 0;
        atendente.tempoAnimacaoAtaque = 0;
        atendente.tempoEsperaAtaque = 0;
        atendente.causouDano = false;

        atendente.vida = 3;
        atendente.morrendo = false;
        atendente.frameMorte = 0;
        atendente.tempoAnimacaoMorte = 0;
        atendente.vivo = true;
    });

    // Reinicia os documentos colecionáveis
    quantidadeDocumentos = 0;

    itensColetaveis.forEach(item => {
        item.coletado = false;
    });

    // Reinicia a chave e a fase
    chaveApareceu = false;
    chaveColetada = false;
    faseConcluida = false;

    // Reinicia o controle de tempo
    ultimoTempo = 0;

    console.log("Jogo reiniciado!");
}

// Atualiza o jogo
function atualizarJogo(tempoAtual) {

    // Calcula o tempo entre os quadros
    const deltaTime = ultimoTempo === 0 ? 0 : tempoAtual - ultimoTempo;
    ultimoTempo = tempoAtual;

    // Mostra o botão de reiniciar quando o jogo termina
    if (botaoReiniciar) {
        botaoReiniciar.style.display =
            (personagemMorto || faseConcluida) ? "block" : "none";
    }

    // Atualiza a invulnerabilidade do personagem
    if (invulneravel && !personagemMorrendo) {

        tempoInvulnerabilidade += deltaTime;

        if (tempoInvulnerabilidade >= duracaoInvulnerabilidade) {
            invulneravel = false;
            tempoInvulnerabilidade = 0;
        }
    }

    // Atualiza a animação de morte do personagem
    if (personagemMorrendo) {

        tempoAnimacaoMortePersonagem += deltaTime;

        while (tempoAnimacaoMortePersonagem >= intervaloAnimacao) {

            frameMortePersonagem++;
            tempoAnimacaoMortePersonagem -= intervaloAnimacao;
        }

        if (frameMortePersonagem >= framesMortePersonagem.length) {
            frameMortePersonagem = framesMortePersonagem.length - 1;
            personagemMorrendo = false;
            personagemMorto = true;

            console.log("Personagem morreu! GAME OVER.");
        }
    }

    // Movimento para a direita
    if (!personagemMorrendo && !personagemMorto && !faseConcluida && teclas.direita) {
        x += velocidade;
    }

    // Movimento para a esquerda
    if (!personagemMorrendo && !personagemMorto && !faseConcluida && teclas.esquerda) {
        x -= velocidade;
    }

    // Física do pulo e colisão com plataformas
    if (!personagemMorrendo && !personagemMorto && !faseConcluida) {

        const yAnterior = y;
        const parteInferiorAnterior = yAnterior + 96;

        y += velocidadeY;
        velocidadeY += gravidade;

        noChao = false;

        // Verifica colisão com as plataformas ao cair
        if (velocidadeY >= 0) {

            plataformas.forEach(plataforma => {

                const parteInferiorAtual = y + 96;

                const estavaAcima = parteInferiorAnterior <= plataforma.y;
                const atravessouPlataforma = parteInferiorAtual >= plataforma.y;

                const colisaoHorizontal =
                    x + 96 > plataforma.x &&
                    x < plataforma.x + plataforma.largura;

                if (
                    estavaAcima &&
                    atravessouPlataforma &&
                    colisaoHorizontal
                ) {
                    y = plataforma.y - 96;
                    velocidadeY = 0;
                    noChao = true;
                }
            });
        }

        // Verifica se chegou ao chão
        if (y >= alturaChao) {
            y = alturaChao;
            velocidadeY = 0;
            noChao = true;
        }
    }

    // Impede o personagem de sair dos limites do mapa
    if (x < 0) {
        x = 0;
    }

    if (x > fimMapa - 96) {
        x = fimMapa - 96;
    }

    if (fundoFase1.complete && fundoFase1.naturalWidth > 0) {
        const escalaFundo = 450 / fundoFase1.naturalHeight;
        larguraMundo = Math.max(tela.width, fundoFase1.naturalWidth * escalaFundo);
    }

    // Atualiza os documentos e verifica colisões
    documentos.forEach(documento => {

        documento.x += documento.velocidade;

        // Calcula a distância percorrida pelo documento
        documento.distanciaPercorrida += Math.abs(documento.velocidade);

        atendentes.forEach(atendente => {

            if (!atendente.vivo || atendente.morrendo || documento.acertou) {
                return;
            }

            // Verifica se o documento acertou o atendente
            if (
                documento.x < atendente.x + 96 &&
                documento.x + documento.largura > atendente.x &&
                documento.y < atendente.y + 96 &&
                documento.y + documento.altura > atendente.y
            ) {

                atendente.vida--;

                documento.acertou = true;

                console.log("Atendente atingido! Vida restante:", atendente.vida);

                // Inicia a animação de morte
                if (atendente.vida <= 0) {

                    atendente.morrendo = true;
                    atendente.atacando = false;
                    atendente.frameMorte = 0;
                    atendente.tempoAnimacaoMorte = 0;

                    console.log("Atendente começou a animação de morte!");
                }
            }
        });

        // Verifica se o documento atingiu o alcance máximo
        if (documento.distanciaPercorrida >= documento.alcance) {
            documento.acertou = true;
        }
    });

    // Remove documentos que acertaram ou atingiram o limite
    for (let i = documentos.length - 1; i >= 0; i--) {

        if (
            documentos[i].acertou ||
            documentos[i].x < -50
        ) {
            documentos.splice(i, 1);
        }
    }

    // COLETA DOS DOCUMENTOS
    if (!personagemMorrendo && !personagemMorto && !faseConcluida) {

        itensColetaveis.forEach(item => {

            if (item.coletado) {
                return;
            }

            // Verifica se existe um atendente protegendo o documento
            if (item.atendenteIndex !== null) {

                const atendenteProtegendo = atendentes[item.atendenteIndex];

                if (
                    atendenteProtegendo &&
                    atendenteProtegendo.vivo &&
                    !atendenteProtegendo.morrendo
                ) {
                    return;
                }
            }

            const colidiu =
                x < item.x + item.largura &&
                x + 96 > item.x &&
                y < item.y + item.altura &&
                y + 96 > item.y;

            if (colidiu) {
                item.coletado = true;
                quantidadeDocumentos++;

                console.log(
                    "Documento coletado:",
                    quantidadeDocumentos,
                    "/6"
                );

                if (quantidadeDocumentos === 6) {
                    chaveApareceu = true;
                    console.log("Todos os documentos coletados! A chave apareceu.");
                }
            }
        });

        // COLETA DA CHAVE
        if (chaveApareceu && !chaveColetada) {

            const colidiuComChave =
                x < chave.x + chave.largura &&
                x + 96 > chave.x &&
                y < chave.y + chave.altura &&
                y + 96 > chave.y;

            if (colidiuComChave) {
                chaveColetada = true;
                faseConcluida = true;

                teclas.direita = false;
                teclas.esquerda = false;
                atacando = false;

                console.log("FASE 1 CONCLUÍDA!");
            }
        }
    }

    // Atualiza o movimento e as animações dos atendentes
    atendentes.forEach(atendente => {

        // Para os atendentes quando a fase termina
        if (faseConcluida) {
            return;
        }

        if (!atendente.vivo) {
            return;
        }

        // Atualiza a animação de morte
        if (atendente.morrendo) {

            atendente.tempoAnimacaoMorte += deltaTime;

            while (atendente.tempoAnimacaoMorte >= intervaloAnimacao) {

                atendente.frameMorte++;
                atendente.tempoAnimacaoMorte -= intervaloAnimacao;
            }

            // Verifica se a animação de morte terminou
            if (atendente.frameMorte >= framesMorteAtendente.length) {

                atendente.vivo = false;
                console.log("Atendente removido do jogo!");
            }

            return;
        }

        // Calcula a distância entre o personagem e o atendente
        const distancia = Math.abs(x - atendente.x);

        // Atualiza o intervalo entre os ataques
        if (atendente.tempoEsperaAtaque > 0) {
            atendente.tempoEsperaAtaque -= deltaTime;
        }

        // Verifica se o personagem está próximo
        if (
            !personagemMorrendo &&
            !personagemMorto &&
            !atendente.atacando &&
            distancia <= 150 &&
            atendente.tempoEsperaAtaque <= 0
        ) {

            atendente.atacando = true;
            atendente.frameAtaque = 0;
            atendente.tempoAnimacaoAtaque = 0;
            atendente.causouDano = false;

            // Vira na direção do personagem
            atendente.olhandoDireita = x > atendente.x;
        }

        // Atualiza a animação de ataque
        if (atendente.atacando) {

            // Continua olhando para o personagem
            atendente.olhandoDireita = x > atendente.x;

            atendente.tempoAnimacaoAtaque += deltaTime;

            while (atendente.tempoAnimacaoAtaque >= intervaloAnimacao) {

                atendente.frameAtaque++;

                atendente.tempoAnimacaoAtaque -= intervaloAnimacao;
            }

            // Aplica dano quando o golpe chega ao frame 2
            if (atendente.frameAtaque >= 2 && !atendente.causouDano) {

                atendente.causouDano = true;

                const colidiuComPersonagem =
                    x < atendente.x + 96 &&
                    x + 96 > atendente.x &&
                    y < atendente.y + 96 &&
                    y + 96 > atendente.y;

                if (
                    colidiuComPersonagem &&
                    !invulneravel &&
                    !personagemMorrendo &&
                    !personagemMorto
                ) {

                    vidaPersonagem--;

                    invulneravel = true;
                    tempoInvulnerabilidade = 0;

                    console.log("Personagem atingido! Vida restante:", vidaPersonagem);

                    if (vidaPersonagem <= 0) {

                        personagemMorrendo = true;
                        frameMortePersonagem = 0;
                        tempoAnimacaoMortePersonagem = 0;

                        atacando = false;
                        teclas.direita = false;
                        teclas.esquerda = false;

                        console.log("Personagem começou a animação de morte!");
                    }
                }
            }

            // Verifica se a animação terminou
            if (atendente.frameAtaque >= framesAtaqueAtendente.length) {

                atendente.atacando = false;
                atendente.frameAtaque = 0;
                atendente.tempoAnimacaoAtaque = 0;

                // Aguarda antes de atacar novamente
                atendente.tempoEsperaAtaque = 900;
            }

        } else if (!personagemMorrendo && !personagemMorto) {

            // Movimento do atendente
            if (atendente.olhandoDireita) {
                atendente.x += atendente.velocidade;
            } else {
                atendente.x -= atendente.velocidade;
            }

            // Verifica os limites da caminhada
            if (atendente.x >= atendente.limiteDireita) {
                atendente.olhandoDireita = false;
            }

            if (atendente.x <= atendente.limiteEsquerda) {
                atendente.olhandoDireita = true;
            }

            // Atualiza a animação de caminhada
            atendente.tempoAnimacao += deltaTime;

            while (atendente.tempoAnimacao >= intervaloAnimacao) {
                atendente.frame = (atendente.frame + 1) % framesAtendente.length;
                atendente.tempoAnimacao -= intervaloAnimacao;
            }
        }
    });

    // Atualiza a câmera
    cameraX = x - tela.width / 2;

    if (cameraX < 0) {
        cameraX = 0;
    }

    if (cameraX > fimMapa - tela.width) {
        cameraX = fimMapa - tela.width;
    }

    // Limpando a tela
    ctx.clearRect(0, 0, tela.width, tela.height);

    // Desenhando o fundo em loop
    if (fundoFase1.complete && fundoFase1.naturalWidth > 0) {

        const escalaFundo = 450 / fundoFase1.naturalHeight;
        const larguraFundo = fundoFase1.naturalWidth * escalaFundo;

        // Calcula o deslocamento do fundo
        const deslocamentoFundo = -(cameraX % larguraFundo);

        // Desenha o fundo repetidamente
        for (
            let posicao = deslocamentoFundo;
            posicao < tela.width;
            posicao += larguraFundo
        ) {
            ctx.drawImage(
                fundoFase1,
                posicao,
                0,
                larguraFundo,
                450
            );
        }
    }

    // Desenhando o piso
    if (chaoFase1.complete && chaoFase1.naturalWidth > 0) {

        const larguraPiso = 2000;
        const alturaPiso = 193;

        const deslocamentoPiso = -150 - (cameraX % larguraPiso);

        for (
            let posicao = deslocamentoPiso - larguraPiso;
            posicao < tela.width;
            posicao += larguraPiso
        ) {
            ctx.drawImage(chaoFase1, posicao, 400, larguraPiso, alturaPiso);
        }
    }

    // DESENHA O FINAL DO MAPA
    const finalNaTela = fimMapa - cameraX;

    ctx.fillStyle = "#333333";
    ctx.fillRect(finalNaTela, 0, 12, 400);

    ctx.fillStyle = "#FFD700";
    ctx.fillRect(finalNaTela - 8, 0, 5, 400);

    // DESENHA AS PLATAFORMAS
    if (imagemPlataforma.complete && imagemPlataforma.naturalWidth > 0) {

        plataformas.forEach(plataforma => {

            ctx.drawImage(
                imagemPlataforma,
                plataforma.x - cameraX,
                plataforma.y,
                plataforma.largura,
                plataforma.altura
            );
        });
    }

    // DESENHA OS DOCUMENTOS COLECIONÁVEIS
    itensColetaveis.forEach(item => {

        if (item.coletado) {
            return;
        }

        if (item.imagem.complete && item.imagem.naturalWidth > 0) {

            ctx.drawImage(
                item.imagem,
                item.x - cameraX,
                item.y,
                item.largura,
                item.altura
            );
        }
    });

    // DESENHA A CHAVE QUANDO OS SEIS DOCUMENTOS FOREM COLETADOS
    if (chaveApareceu && !chaveColetada) {

        const chaveNaTela = chave.x - cameraX;

        ctx.save();

        ctx.fillStyle = "#FFD700";
        ctx.strokeStyle = "#9C6900";
        ctx.lineWidth = 3;

        // Cabeça da chave
        ctx.beginPath();
        ctx.arc(chaveNaTela + 12, chave.y + 15, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Buraco da chave
        ctx.fillStyle = "#5B4210";
        ctx.beginPath();
        ctx.arc(chaveNaTela + 12, chave.y + 15, 4, 0, Math.PI * 2);
        ctx.fill();

        // Haste
        ctx.fillStyle = "#FFD700";
        ctx.fillRect(chaveNaTela + 20, chave.y + 12, 23, 6);

        // Dentes da chave
        ctx.fillRect(chaveNaTela + 35, chave.y + 18, 5, 8);
        ctx.fillRect(chaveNaTela + 42, chave.y + 18, 5, 6);

        ctx.restore();
    }

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("", 350, 350);

    // Desenha todos os atendentes
    atendentes.forEach(atendente => {

        if (!atendente.vivo) {
            return;
        }

        // Escolhe a animação de acordo com o estado do atendente
        let imagemAtendente;

        if (atendente.morrendo) {
            imagemAtendente = framesMorteAtendente[atendente.frameMorte];
        } else if (atendente.atacando) {
            imagemAtendente = framesAtaqueAtendente[atendente.frameAtaque];
        } else {
            imagemAtendente = framesAtendente[atendente.frame];
        }

        if (imagemAtendente && imagemAtendente.complete && imagemAtendente.naturalWidth > 0) {

            ctx.save();

            const atendenteNaTela = atendente.x - cameraX;

            if (atendente.olhandoDireita) {
                ctx.drawImage(imagemAtendente, atendenteNaTela, atendente.y, 96, 96);
            } else {
                ctx.translate(atendenteNaTela + 96, atendente.y);
                ctx.scale(-1, 1);
                ctx.drawImage(imagemAtendente, 0, 0, 96, 96);
            }

            ctx.restore();

            // Mostra a vida do atendente enquanto estiver vivo e não estiver morrendo
            if (!atendente.morrendo) {

                ctx.fillStyle = "red";
                ctx.fillRect(atendenteNaTela, atendente.y - 12, 96, 6);

                ctx.fillStyle = "lime";
                ctx.fillRect(atendenteNaTela, atendente.y - 12, 96 * (atendente.vida / 3), 6);
            }
        }
    });

    // Desenha os documentos lançados
    documentos.forEach(documento => {

        ctx.fillStyle = "#f5e6b8";
        ctx.fillRect(
            documento.x - cameraX,
            documento.y,
            documento.largura,
            documento.altura
        );

        ctx.strokeStyle = "#333333";
        ctx.lineWidth = 1;
        ctx.strokeRect(
            documento.x - cameraX,
            documento.y,
            documento.largura,
            documento.altura
        );

        ctx.fillStyle = "#333333";
        ctx.font = "10px Arial";
        ctx.fillText("DOC", documento.x - cameraX + 2, documento.y + 12);
    });

    // Escolhe a imagem do personagem
    const estaAndando = teclas.direita || teclas.esquerda;

    let imagemAtual = personagem;

    // PRIORIDADE 1: ANIMAÇÃO DE MORTE
    if (personagemMorrendo || personagemMorto) {

        imagemAtual = framesMortePersonagem[frameMortePersonagem];

    // PRIORIDADE 2: ANIMAÇÃO DE ATAQUE
    } else if (atacando) {

        tempoAnimacao += deltaTime;

        if (tempoAnimacao >= intervaloAnimacao) {
            frameAtual++;
            tempoAnimacao -= intervaloAnimacao;
        }

        if (frameAtual >= framesAtaque.length) {
            atacando = false;
            frameAtual = 0;
            tempoAnimacao = 0;
        } else {
            imagemAtual = framesAtaque[frameAtual];
        }

    // PRIORIDADE 3: ANIMAÇÃO DE PULO
    } else if (!noChao) {

        tempoAnimacao += deltaTime;

        if (tempoAnimacao >= intervaloAnimacao) {
            frameAtual = (frameAtual + 1) % framesPulo.length;
            tempoAnimacao -= intervaloAnimacao;
        }

        imagemAtual = framesPulo[frameAtual];

    // PRIORIDADE 4: ANIMAÇÃO DE CORRIDA
    } else if (estaAndando) {

        tempoAnimacao += deltaTime;

        if (tempoAnimacao >= intervaloAnimacao) {
            frameAtual = (frameAtual + 1) % framesCorrida.length;
            tempoAnimacao -= intervaloAnimacao;
        }

        imagemAtual = framesCorrida[frameAtual];

    // PRIORIDADE 5: PERSONAGEM PARADO
    } else {

        frameAtual = 0;
        tempoAnimacao = 0;
    }

    // Desenha o personagem na direção correta
    if (imagemAtual && imagemAtual.complete && imagemAtual.naturalWidth > 0) {

        ctx.save();

        const personagemNaTela = x - cameraX;

        // Pisca enquanto estiver invulnerável
        if (invulneravel && !personagemMorrendo && !personagemMorto) {
            if (Math.floor(tempoInvulnerabilidade / 100) % 2 === 0) {
                ctx.globalAlpha = 0.35;
            }
        }

        if (olhandoDireita) {
            ctx.drawImage(imagemAtual, personagemNaTela, y, 96, 96);
        } else {
            ctx.translate(personagemNaTela + 96, y);
            ctx.scale(-1, 1);
            ctx.drawImage(imagemAtual, 0, 0, 96, 96);
        }

        ctx.restore();
    }

    // Mostra o rosto de acordo com a vida do personagem
    let imagemRosto;

    if (vidaPersonagem === 3) {
        imagemRosto = rostoBem;
    } else if (vidaPersonagem === 2) {
        imagemRosto = rostoDor;
    } else if (vidaPersonagem === 1) {
        imagemRosto = rostoQuaseMorto;
    }

    if (imagemRosto && imagemRosto.complete && imagemRosto.naturalWidth > 0) {
        ctx.drawImage(imagemRosto, 20, 20, 64, 64);
    }

    // CONTADOR DE DOCUMENTOS
    ctx.fillStyle = "white";
    ctx.font = "bold 22px Arial";
    ctx.textAlign = "right";

    ctx.fillText(
        `Documentos: ${quantidadeDocumentos}/6`,
        tela.width - 20,
        35
    );

    ctx.textAlign = "left";

    // Mensagem de GAME OVER
    if (personagemMorto) {

        ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
        ctx.fillRect(0, 0, tela.width, tela.height);

        ctx.fillStyle = "red";
        ctx.font = "bold 64px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", tela.width / 2, tela.height / 2);

        ctx.fillStyle = "white";
        ctx.font = "22px Arial";
        ctx.fillText("A aposentadoria ficou para depois...", tela.width / 2, tela.height / 2 + 45);

        ctx.font = "20px Arial";
        ctx.fillText("Pressione R para tentar novamente", tela.width / 2, tela.height / 2 + 90);

        ctx.textAlign = "left";
    }

    // TELA DE FASE CONCLUÍDA
    if (faseConcluida) {

        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(0, 0, tela.width, tela.height);

        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 54px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            "APOSENTADORIA CONQUISTADA!",
            tela.width / 2,
            tela.height / 2
        );

        ctx.fillStyle = "white";
        ctx.font = "24px Arial";

        ctx.fillText(
            "Você reuniu todos os documentos e conseguiu a chave!",
            tela.width / 2,
            tela.height / 2 + 50
        );

        ctx.textAlign = "left";

        ctx.font = "20px Arial";
        ctx.fillText(
            "Pressione R para jogar novamente",
            tela.width / 2,
            tela.height / 2 + 100
        );
    }

    // Repete o ciclo
    requestAnimationFrame(atualizarJogo);
}