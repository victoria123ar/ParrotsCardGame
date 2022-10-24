let resposta = prompt("Com quantas cartas deseja jogar? (De 4 a 14 cartas)");
let alerta;
const cartas = document.querySelector(".cartas");
const personagens = [
  "bobrossparrot",
  "explodyparrot",
  "fiestaparrot",
  "metalparrot",
  "revertitparrot",
  "tripletsparrot",
  "unicornparrot",
];
let primeiraCarta = "";
let segundaCarta = "";
let tempo = 0;
let clicks = 0;
const relogio = document.querySelector(".relogio");

function verificarCarta() {
  const primeiroPersonagem = primeiraCarta.getAttribute("data-personagem");
  const segundoPersonagem = segundaCarta.getAttribute("data-personagem");

  if (primeiroPersonagem == segundoPersonagem) {
    primeiraCarta.classList.add("desabilitada");
    segundaCarta.classList.add("desabilitada");

    primeiraCarta = "";
    segundaCarta = "";
    setTimeout(() => {
      fimJogo();
    }, 1000);
  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove("virar");
      segundaCarta.classList.remove("virar");

      primeiraCarta = "";
      segundaCarta = "";
    }, 1000);
  }
}

function virarCarta({ target }) {
  clicks++;

  if (target.parentNode.className.includes("virar")) {
    return;
  }

  if (primeiraCarta === "") {
    target.parentNode.classList.add("virar");
    primeiraCarta = target.parentNode;
  } else if (segundaCarta === "") {
    target.parentNode.classList.add("virar");
    segundaCarta = target.parentNode;

    verificarCarta();
  }
}

function criarCarta(personagem) {
  item = `<div class="carta" data-personagem=${personagem}>
          <div class="face frente" style = "background-image: url('../assets/${personagem}.gif');"></div>
          <div class="face verso"></div>
          </div>`;

  cartas.innerHTML = cartas.innerHTML + item;
  cartas.addEventListener("click", virarCarta);
}

function comecarJogo() {
  while (resposta < 3 || resposta > 15 || resposta % 2) {
    alerta = alert("Número inválido");
    resposta = prompt("Com quantas cartas deseja jogar? (De 4 a 14 cartas)");
  }

  let array = personagens;

  array = array.splice(0, 7 - resposta / 2);

  duplicado = [...personagens, ...personagens];

  const sortido = duplicado.sort(baguncar);

  function baguncar() {
    return 0.5 - Math.random();
  }

  sortido.forEach((personagem) => {
    criarCarta(personagem);
  });
}

function contador() {
  setInterval(() => {
    if (clicks <= 0) {
      return;
    }
    saida = 1;
    tempo += 1;
    relogio.innerHTML = `${tempo}s`;
  }, 1000);
  clearInterval(contador);
}

contador();
comecarJogo();

function fimJogo() {
  const cartaDesabilitada = document.querySelectorAll(".desabilitada");
  if (cartaDesabilitada.length === personagens.length * 2) {
    alert(`Você ganhou em ${tempo} segundos e ${clicks / 2} jogadas!`);
    let reiniciar = prompt("Deseja jogar novamente?");
    console.log(reiniciar);
    if (reiniciar == "sim") {
      comecarJogo();
      window.location.reload(1);
    } else if (reiniciar == "não") {
      return;
    } else {
      while (reiniciar != "sim" && reiniciar != "não") {
        alert("Resposta inválida! Insira sim ou não");
        reiniciar = prompt("Deseja jogar novamente?");
      }
      if (reiniciar == "sim") {
        comecarJogo();
        window.location.reload(1);
      }
    }
  }
}
