let contador = prompt("Com quantas cartas deseja jogar? (De 4 a 14 cartas)");
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
const clicks = 0;
const relogio = document.querySelector(".relogio");

function verificarCarta() {
  const primeiroPersonagem = primeiraCarta.getAttribute("data-personagem");
  const segundoPersonagem = segundaCarta.getAttribute("data-personagem");

  if (primeiroPersonagem === segundoPersonagem) {
    primeiraCarta.firstChild.classList.add("desabilitada");
    segundaCarta.firstChild.classList.add("desabilitada");

    primeiraCarta = "";
    segundaCarta = "";
    setTimeout(() => {
      fimJogo();
    }, 1000);
  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove("girar");
      segundaCarta.classList.remove("girar");

      primeiraCarta = "";
      segundaCarta = "";
    }, 1000);
  }
}

function virar({ target }) {
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
  item = `<div class="carta">
          <div class="face frente" style = "background-image: url('../assets/${personagem}.gif');"></div>
          <div class="face verso"></div>
          </div>`;

  cartas.innerHTML = cartas.innerHTML + item;
  cartas.addEventListener("click", virar);

  let carta = document.querySelectorAll(".carta");
  console.log(carta);
  for (var i = 0; i < carta.length; i++) {
    carta[i].setAttribute("data-personagem", personagem);
  }
}

function comecarJogo(personagem) {
  while (contador < 3 || contador > 15 || contador % 2) {
    alerta = alert("Número inválido");
    contador = prompt("Com quantas cartas deseja jogar? (De 4 a 14 cartas)");
  }

  let array = personagens;

  array = array.splice(0, 7 - contador / 2);

  duplicado = [...personagens, ...personagens];

  const sortido = duplicado.sort(baguncar);

  function baguncar() {
    return 0.5 - Math.random();
  }

  sortido.forEach((personagem) => {
    carta = criarCarta(personagem);
  });
}

comecarJogo();

function fimJogo() {
  alert("oi");
}
