// Perguntas de Ciências - 6º Ano (BNCC alinhadas)
const perguntas = [
    {
        pergunta: "Qual é a menor unidade estrutural e funcional dos seres vivos?",
        opcoes: ["Órgão", "Célula", "Tecido", "Sistema"],
        correta: 1,
        explicacao: "A célula é a unidade básica da vida!"
    },
    {
        pergunta: "O que acontece no processo de evaporação do ciclo da água?",
        opcoes: [
            "A água vira gelo",
            "A água líquida vira vapor e sobe para a atmosfera",
            "A água cai do céu em forma de chuva",
            "As nuvens se formam no solo"
        ],
        correta: 1,
        explicacao: "Evaporação: a água vira vapor e sobe!"
    },
    {
        pergunta: "Qual mistura é considerada homogênea?",
        opcoes: [
            "Água e areia",
            "Água e óleo",
            "Água e sal (depois de dissolvido)",
            "Água e pedrinhas"
        ],
        correta: 2,
        explicacao: "Misturas homogêneas têm aspecto uniforme, como água com sal."
    },
    {
        pergunta: "Quais são as principais camadas internas da Terra, da mais externa para a mais interna?",
        opcoes: [
            "Núcleo, manto, crosta",
            "Crosta, manto, núcleo",
            "Atmosfera, crosta, manto",
            "Solo, rocha, magma"
        ],
        correta: 1,
        explicacao: "Crosta → Manto → Núcleo (externo e interno)."
    },
    {
        pergunta: "O que as plantas produzem durante a fotossíntese?",
        opcoes: [
            "Apenas água",
            "Glicose (açúcar) e oxigênio",
            "Somente dióxido de carbono",
            "Apenas energia solar"
        ],
        correta: 1,
        explicacao: "Com luz, água e CO₂, as plantas fazem glicose + O₂."
    },
    {
        pergunta: "Qual movimento da Terra dura aproximadamente 24 horas e causa o dia e a noite?",
        opcoes: [
            "Translação",
            "Rotação",
            "Revolução",
            "Órbita"
        ],
        correta: 1,
        explicacao: "A rotação da Terra em torno do próprio eixo causa o dia e a noite."
    },
    {
        pergunta: "Qual sistema do corpo humano coordena as ações motoras e sensoriais?",
        opcoes: [
            "Sistema digestório",
            "Sistema respiratório",
            "Sistema nervoso",
            "Sistema circulatório"
        ],
        correta: 2,
        explicacao: "O sistema nervoso controla movimentos e sensações."
    },
    {
        pergunta: "As rochas sedimentares são importantes porque...",
        opcoes: [
            "São as mais duras da Terra",
            "Podem conter fósseis de seres vivos antigos",
            "Formam o núcleo da Terra",
            "Não existem no Brasil"
        ],
        correta: 1,
        explicacao: "Fósseis geralmente se formam em rochas sedimentares."
    },
    {
        pergunta: "Qual é um exemplo de transformação química?",
        opcoes: [
            "Derreter gelo",
            "Misturar água e óleo",
            "Misturar vinagre com bicarbonato de sódio (faz efervescência)",
            "Cortar uma folha de papel"
        ],
        correta: 2,
        explicacao: "Transformações químicas formam novas substâncias."
    },
    {
        pergunta: "Por que a Terra é considerada um planeta esférico (quase redondo)?",
        opcoes: [
            "Porque as fotos do espaço mostram isso e evidências como a sombra da Terra na Lua",
            "Porque os mapas são redondos",
            "Porque as pessoas acham que é",
            "Porque a Lua é redonda"
        ],
        correta: 0,
        explicacao: "Evidências científicas (fotos, eclipses, horizontes) confirmam a esfericidade."
    }
];

// Variáveis do jogo
let indicePergunta = 0;
let pontuacao = 0;
let respondendo = false;

// Elementos do DOM
const telaInicial = document.getElementById('tela-inicial');
const telaJogo = document.getElementById('tela-jogo');
const telaFinal = document.getElementById('tela-final');
const btnComecar = document.getElementById('btn-comecar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const textoPergunta = document.getElementById('texto-pergunta');
const opcoesContainer = document.getElementById('opcoes');
const feedback = document.getElementById('feedback');
const pontuacaoEl = document.getElementById('pontuacao');
const perguntaAtualEl = document.getElementById('pergunta-atual');
const barraProgresso = document.getElementById('barra-progresso');
const pontuacaoFinalEl = document.getElementById('pontuacao-final');
const tituloFinal = document.getElementById('titulo-final');
const mensagemFinal = document.getElementById('mensagem-final');
const estrelasEl = document.getElementById('estrelas');

// Eventos
btnComecar.addEventListener('click', iniciarJogo);
btnReiniciar.addEventListener('click', reiniciarJogo);

function mostrarTela(tela) {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    tela.classList.add('ativa');
}

function iniciarJogo() {
    indicePergunta = 0;
    pontuacao = 0;
    atualizarStatus();
    mostrarTela(telaJogo);
    carregarPergunta();
}

function atualizarStatus() {
    pontuacaoEl.textContent = `Pontos: ${pontuacao}`;
    perguntaAtualEl.textContent = `Pergunta ${indicePergunta + 1}/${perguntas.length}`;
    const progresso = ((indicePergunta) / perguntas.length) * 100;
    barraProgresso.style.width = `${Math.max(progresso, 5)}%`;
}

function carregarPergunta() {
    respondendo = false;
    feedback.textContent = '';
    feedback.className = 'feedback';

    const p = perguntas[indicePergunta];
    textoPergunta.textContent = p.pergunta;
    opcoesContainer.innerHTML = '';

    p.opcoes.forEach((opcao, i) => {
        const btn = document.createElement('button');
        btn.className = 'btn-opcao';
        btn.textContent = `${String.fromCharCode(65 + i)}) ${opcao}`;
        btn.addEventListener('click', () => verificarResposta(i));
        opcoesContainer.appendChild(btn);
    });

    atualizarStatus();
}

function verificarResposta(indiceEscolhido) {
    if (respondendo) return;
    respondendo = true;

    const p = perguntas[indicePergunta];
    const botoes = opcoesContainer.querySelectorAll('.btn-opcao');

    botoes.forEach(b => b.disabled = true);

    if (indiceEscolhido === p.correta) {
        pontuacao += 10;
        botoes[indiceEscolhido].classList.add('correta');
        feedback.textContent = `✅ Correto! ${p.explicacao}`;
        feedback.classList.add('acerto');
    } else {
        botoes[indiceEscolhido].classList.add('errada');
        botoes[p.correta].classList.add('correta');
        feedback.textContent = `❌ Ops! ${p.explicacao}`;
        feedback.classList.add('erro');
    }

    atualizarStatus();

    setTimeout(() => {
        indicePergunta++;
        if (indicePergunta < perguntas.length) {
            carregarPergunta();
        } else {
            finalizarJogo();
        }
    }, 2200);
}

function finalizarJogo() {
    mostrarTela(telaFinal);
    pontuacaoFinalEl.textContent = pontuacao;

    // Estrelas e mensagem conforme pontuação
    let estrelas = '';
    let titulo = '';
    let msg = '';

    if (pontuacao >= 90) {
        estrelas = '⭐⭐⭐⭐⭐';
        titulo = 'Incrível, Cientista Master! 🏆';
        msg = 'Você arrasou! Domina os conceitos de Ciências do 6º ano!';
    } else if (pontuacao >= 70) {
        estrelas = '⭐⭐⭐⭐';
        titulo = 'Muito bem, Explorador! 🌟';
        msg = 'Ótimo desempenho! Continue estudando e explorando!';
    } else if (pontuacao >= 50) {
        estrelas = '⭐⭐⭐';
        titulo = 'Bom trabalho! 👍';
        msg = 'Você está no caminho certo. Que tal jogar de novo para melhorar?';
    } else {
        estrelas = '⭐⭐';
        titulo = 'Continue tentando! 💪';
        msg = 'A ciência é feita de tentativas. Jogue novamente e aprenda mais!';
    }

    tituloFinal.textContent = titulo;
    mensagemFinal.textContent = msg;
    estrelasEl.textContent = estrelas;

    // Atualiza barra para 100%
    barraProgresso.style.width = '100%';
}

function reiniciarJogo() {
    iniciarJogo();
}
