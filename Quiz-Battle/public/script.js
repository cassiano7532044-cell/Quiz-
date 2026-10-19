// script.js
// Este é o JavaScript que roda DENTRO DO NAVEGADOR (front-end).
// Ele cuida da interface do quiz e conversa com o back-end (server.js)
// usando fetch() para salvar e consultar o ranking.

// ---------------------------------------------------------------
// 1. Banco de perguntas (fica só na memória do navegador)
// ---------------------------------------------------------------
const PERGUNTAS = [
  {
    pergunta: "1. O que é hardware?",
    alternativas: ["Java", "Python", "JavaScript", "C++"],
    correta: 2,
  },
  {
    pergunta: "2. O que é software?",
alternativas: ["A parte física do computador", "Os cabos e conectores", "Os programas e sistemas do computador", "O monitor"],
correta: 2,
  },
  {
    pergunta: "3. Qual é a função do sistema operacional?",
alternativas: ["Controlar os recursos do computador", "Apenas acessar a internet", "Criar energia elétrica", "Substituir o processador"],
correta: 0,
  },
  {
    pergunta: "4. Qual destes é um sistema operacional?",
alternativas: ["Google", "Windows", "Instagram", "YouTube"],
correta: 1,
  },
  {
    pergunta: "5. O que significa a sigla CPU?",
alternativas: ["Central de Programas Unidos", "Controle Principal do Usuário", "Unidade Central de Processamento", "Conexão Universal de Programas"],
correta: 2,
  },
  {
    pergunta: "6. Para que serve a memória RAM?",
alternativas: ["Armazenar arquivos para sempre", "Guardar temporariamente dados em uso", "Imprimir documentos", "Conectar o computador à tomada"],
correta: 1,
  },
  {
    pergunta: "7. O que é a internet?",
alternativas: ["Um programa de edição", "Uma rede mundial de computadores conectados", "Um tipo de teclado", "Um sistema operacional"],
correta: 1,

  },
  {
    pergunta: "8. Qual é a função de um navegador?",
alternativas: ["Acessar páginas da internet", "Aumentar a memória RAM", "Consertar o computador", "Criar uma rede elétrica"],
correta: 0,
  },
  {
    pergunta: "9. O que é phishing?",
alternativas: ["Um tipo de computador", "Uma tentativa de golpe para roubar informações", "Um programa de desenho", "Uma ferramenta de pesquisa"],
correta: 1,
  },
  {
    pergunta: "10. Qual atitude ajuda a proteger suas contas?",
alternativas: ["Usar a mesma senha em tudo", "Compartilhar senhas com amigos", "Criar senhas fortes e únicas", "Clicar em todos os links recebidos"],
correta: 2,
  },
  {
    pergunta: "11. O que é um servidor em uma rede?",
alternativas: ["Um dispositivo que oferece serviços ou recursos a outros", "Um computador usado apenas para jogos", "Um tipo de cabo", "Um aplicativo de mensagens"],
correta: 0,
  },
  {
    pergunta: "12. O que é uma rede LAN?",
alternativas: ["Uma rede mundial", "Uma rede local, como a de uma escola", "Uma rede exclusiva de celulares", "Um programa antivírus"],
correta: 1,

  },
  {
    pergunta: "13. Para que serve um roteador?",
alternativas: ["Apagar arquivos", "Editar vídeos", "Encaminhar dados entre redes e conectar dispositivos", "Aumentar o brilho da tela"],
correta: 2,
  },
  {
    pergunta: "14. O que é armazenamento em nuvem?",
alternativas: ["Guardar arquivos em servidores acessíveis pela internet", "Guardar arquivos somente em CDs", "Armazenar dados dentro do teclado", "Salvar arquivos apenas na memória RAM"],
correta: 0,
  },
  {
    pergunta: "15. Qual é a principal função de um banco de dados?",
alternativas: ["Aumentar a velocidade da internet", "Organizar e armazenar informações", "Desenhar imagens automaticamente", "Proteger o computador contra quedas"],
correta: 1,
  },
  {
    pergunta: "16. O que é inteligência artificial (IA)?",
alternativas: ["Uma peça física do computador", "Uma rede de cabos", "Tecnologia que permite sistemas realizar tarefas que envolvem capacidades como aprender e reconhecer padrões", "Um tipo de monitor"],
correta: 2,
  },
  {
    pergunta: "17. O que significa fazer backup?",
alternativas: ["Excluir arquivos antigos", "Criar uma cópia de segurança dos dados", "Desligar o computador", "Atualizar o papel de parede"],
correta: 1,
  },
  {
    pergunta: "18. Qual linguagem é usada para estruturar páginas da web?",
alternativas: ["HTML", "Excel", "Bluetooth", "Windows"],
correta: 0,
  },
  {
    pergunta: "19. O que é GitHub?",
alternativas: ["Uma rede social de vídeos", "Uma plataforma para hospedar e colaborar em projetos de código", "Um sistema operacional", "Um aplicativo de chamadas"],
correta: 1,
  },
  {
    pergunta: "20. O que significa clonar um repositório?",
alternativas: ["Apagar um projeto remoto", "Copiar um repositório para trabalhar com ele localmente", "Transformar código em imagem", "Criar uma senha para o GitHub"],
correta: 1,
  },
];

// ---------------------------------------------------------------
// 2. Estado do jogo (o que muda enquanto o jogador joga)
// ---------------------------------------------------------------
const estado = {
  nome: "",
  indiceAtual: 0,
  pontos: 0,
  respondeuAtual: false,
};

// ---------------------------------------------------------------
// 3. Referências aos elementos da tela
// ---------------------------------------------------------------
const telas = document.querySelectorAll("[data-tela]");

const inputNome = document.getElementById("input-nome");
const erroNome = document.getElementById("erro-nome");
const botaoIniciar = document.getElementById("botao-iniciar");
const botaoVerRankingInicio = document.getElementById("botao-ver-ranking-inicio");

const progressoBarra = document.getElementById("progresso-barra");
const progressoTexto = document.getElementById("progresso-texto");
const quizJogador = document.getElementById("quiz-jogador");
const quizPontos = document.getElementById("quiz-pontos");
const perguntaTexto = document.getElementById("pergunta-texto");
const alternativasContainer = document.getElementById("alternativas");

const resultadoJogador = document.getElementById("resultado-jogador");
const resultadoPontos = document.getElementById("resultado-pontos");
const resultadoLegenda = document.getElementById("resultado-legenda");
const botaoSalvar = document.getElementById("botao-salvar");
const erroSalvar = document.getElementById("erro-salvar");
const botaoJogarDeNovo = document.getElementById("botao-jogar-de-novo");

const rankingLista = document.getElementById("ranking-lista");
const rankingVazio = document.getElementById("ranking-vazio");
const botaoVoltarInicio = document.getElementById("botao-voltar-inicio");

const rankingPreviewLista = document.getElementById("ranking-preview-lista");
const rankingPreviewVazio = document.getElementById("ranking-preview-vazio");

// ---------------------------------------------------------------
// 4. Navegação entre telas
// ---------------------------------------------------------------
function mostrarTela(idTela) {
  telas.forEach((tela) => {
    tela.hidden = tela.id !== idTela;
  });
}

// ---------------------------------------------------------------
// 5. Fluxo do quiz
// ---------------------------------------------------------------
function iniciarQuiz() {
  const nomeDigitado = inputNome.value.trim();

  if (!nomeDigitado) {
    erroNome.textContent = "Digite um nome antes de começar.";
    return;
  }

  erroNome.textContent = "";
  estado.nome = nomeDigitado.slice(0, 20);
  estado.indiceAtual = 0;
  estado.pontos = 0;

  quizJogador.textContent = estado.nome;
  mostrarTela("tela-quiz");
  renderizarPergunta();
}

function renderizarPergunta() {
  const pergunta = PERGUNTAS[estado.indiceAtual];
  estado.respondeuAtual = false;

  // Atualiza barra e texto de progresso
  const percentual = ((estado.indiceAtual + 1) / PERGUNTAS.length) * 100;
  progressoBarra.style.width = percentual + "%";
  progressoTexto.textContent = `Pergunta ${estado.indiceAtual + 1} de ${PERGUNTAS.length}`;
  quizPontos.textContent = `${estado.pontos} pts`;

  perguntaTexto.textContent = pergunta.pergunta;
  alternativasContainer.innerHTML = "";

  pergunta.alternativas.forEach((texto, indice) => {
    const botao = document.createElement("button");
    botao.className = "alternativa";

    const letra = document.createElement("span");
    letra.className = "alternativa__letra";
    letra.textContent = "ABCD"[indice];

    const conteudo = document.createElement("span");
    conteudo.textContent = texto;

    botao.append(letra, conteudo);
    botao.addEventListener("click", () => responder(indice));
    alternativasContainer.appendChild(botao);
  });
}

// Tempo (em ms) que a resposta certa/errada fica destacada antes de avançar sozinha.
const TEMPO_TRANSICAO = 900;

function responder(indiceEscolhido) {
  if (estado.respondeuAtual) return; // impede clicar duas vezes
  estado.respondeuAtual = true;

  const pergunta = PERGUNTAS[estado.indiceAtual];
  const botoes = alternativasContainer.querySelectorAll(".alternativa");

  botoes.forEach((botao, indice) => {
    botao.disabled = true;
    if (indice === pergunta.correta) {
      botao.classList.add("correta");
    } else if (indice === indiceEscolhido) {
      botao.classList.add("errada");
    }
  });

  if (indiceEscolhido === pergunta.correta) {
    estado.pontos += 10;
    quizPontos.textContent = `${estado.pontos} pts`;
  }

  // Depois de mostrar qual era a resposta certa por um instante,
  // avança sozinho para a próxima pergunta (ou para o resultado, na última).
  setTimeout(avancar, TEMPO_TRANSICAO);
}

function avancar() {
  const ultimaPergunta = estado.indiceAtual === PERGUNTAS.length - 1;

  if (ultimaPergunta) {
    mostrarResultado();
    return;
  }

  estado.indiceAtual += 1;
  renderizarPergunta();
}

function mostrarResultado() {
  resultadoJogador.textContent = estado.nome;
  resultadoPontos.textContent = estado.pontos;

  const acertos = estado.pontos / 10;
  resultadoLegenda.textContent = `${acertos} de ${PERGUNTAS.length} perguntas corretas.`;

  botaoSalvar.disabled = false;
  botaoSalvar.textContent = "Salvar pontuação";
  erroSalvar.textContent = "";

  mostrarTela("tela-resultado");
}

// ---------------------------------------------------------------
// 6. Comunicação com o BACK-END (fetch)
// ---------------------------------------------------------------

// Envia a pontuação final para o servidor salvar em ranking.json.
async function salvarPontuacao() {
  botaoSalvar.disabled = true;
  botaoSalvar.textContent = "Salvando...";
  erroSalvar.textContent = "";

  try {
    const resposta = await fetch("/ranking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: estado.nome,
        pontos: estado.pontos,
      }),
    });

    if (!resposta.ok) {
      throw new Error("O servidor recusou os dados.");
    }

    botaoSalvar.textContent = "Pontuação salva!";
    await abrirRanking();
  } catch (erro) {
    erroSalvar.textContent = "Não foi possível salvar. O servidor está rodando?";
    botaoSalvar.disabled = false;
    botaoSalvar.textContent = "Salvar pontuação";
  }
}

// Busca o ranking salvo no servidor (usado tanto pelo preview quanto pela tela cheia).
async function buscarRanking() {
  const resposta = await fetch("/ranking");
  if (!resposta.ok) {
    throw new Error("O servidor recusou a consulta.");
  }
  return resposta.json();
}

// Desenha uma lista de ranking dentro de um <ol> e controla a mensagem de "vazio".
// Recebe os elementos como parâmetro para poder ser reaproveitada em telas diferentes.
function desenharRanking(ranking, listaElemento, vazioElemento, mensagemVazio) {
  listaElemento.innerHTML = "";

  if (ranking.length === 0) {
    vazioElemento.hidden = false;
    vazioElemento.textContent = mensagemVazio;
    return;
  }

  vazioElemento.hidden = true;

  ranking.forEach((jogador, indice) => {
    const item = document.createElement("li");
    item.className = "ranking-item" + (indice < 3 ? ` ranking-item--top${indice + 1}` : "");
    item.innerHTML = `
      <span class="ranking-item__posicao">${indice + 1}º</span>
      <span class="ranking-item__nome">${escaparTexto(jogador.nome)}</span>
      <span class="ranking-item__pontos">${jogador.pontos} pts</span>
    `;
    listaElemento.appendChild(item);
  });
}

// Carrega o preview de ranking (top 5) na tela inicial.
// É chamada assim que a página termina de carregar, sem precisar de clique.
async function carregarRankingPreview() {
  try {
    const ranking = await buscarRanking();
    desenharRanking(
      ranking.slice(0, 5),
      rankingPreviewLista,
      rankingPreviewVazio,
      "Ninguém pontuou ainda. Seja o primeiro!"
    );
  } catch (erro) {
    desenharRanking([], rankingPreviewLista, rankingPreviewVazio,
      "Não foi possível carregar o ranking agora."
    );
  }
}

// Abre a tela de ranking completo, sempre buscando os dados mais recentes.
async function abrirRanking() {
  mostrarTela("tela-ranking");

  try {
    const ranking = await buscarRanking();
    desenharRanking(
      ranking.slice(0, 10),
      rankingLista,
      rankingVazio,
      "Ninguém pontuou ainda. Seja o primeiro!"
    );
  } catch (erro) {
    desenharRanking([], rankingLista, rankingVazio,
      "Não foi possível carregar o ranking. O servidor está rodando?"
    );
  }
}

// Evita que um nome de jogador com HTML dentro quebre a página.
function escaparTexto(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

// ---------------------------------------------------------------
// 7. Ligações dos botões (event listeners)
// ---------------------------------------------------------------
botaoIniciar.addEventListener("click", iniciarQuiz);
inputNome.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") iniciarQuiz();
});

botaoSalvar.addEventListener("click", salvarPontuacao);

botaoVerRankingInicio.addEventListener("click", abrirRanking);
botaoVoltarInicio.addEventListener("click", () => {
  mostrarTela("tela-nome");
  carregarRankingPreview();
});

botaoJogarDeNovo.addEventListener("click", () => {
  inputNome.value = "";
  mostrarTela("tela-nome");
  carregarRankingPreview();
});

// ---------------------------------------------------------------
// 8. Carrega o ranking automaticamente assim que a página abre
// ---------------------------------------------------------------
carregarRankingPreview();
