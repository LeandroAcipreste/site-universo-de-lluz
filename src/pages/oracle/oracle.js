/**
 * Oráculo — comportamento
 *
 * Porte de `site-antigo/site-UL/src/pages/oracle/oracle.tsx`. Duas coisas:
 * quebrar o título em letras e animá-las.
 *
 * O `renderLetters` do original era JSX; aqui é a mesma função devolvendo
 * marcação. E o `useGSAP` vira a linha do tempo do fim, com os mesmos números:
 * `autoAlpha` de 0 a 1, y de 28 a 0, 0,55s com `power3.out` e 0,035s de
 * intervalo entre letras; o card entra em 0,9s começando 0,4s antes de as
 * letras terminarem.
 *
 * O `oracleBackground.tsx` existe na pasta de origem mas o `oracle.tsx` não o
 * importa — quem entra é o `ParticlesBackground`. Ficou de fora, como lá.
 */

import gsap from 'gsap';
import { particulas } from '../comum/particulas.js';
import { quandoAceitar } from '/src/components/cookies/cookies.js';
import '../comum/nav.js';   // a barra se monta sozinha

/* ── O mapa, e o consentimento ──
   Esta é a única página do site com um embutido de terceiro que põe cookie.
   O endereço fica em `data-src` no HTML, e só vira `src` aqui — antes disso
   o Google não é sequer contactado.

   Enquanto não houver "sim", no lugar dele fica um bloco com um botão. Não é
   aviso de erro: é o mapa esperando, e quem clicar carrega só este mapa. */
const mapa = document.querySelector('.oracle-mapa');
const molduraDoMapa = document.querySelector('.oracle-mapa-moldura');

const espera = document.createElement('div');
espera.className = 'espera-terceiro';
espera.innerHTML = `
  <p class="espera-terceiro__linha">
    O mapa vem do Google, que põe cookies próprios. Ele carrega quando você
    permitir.
  </p>
  <button type="button" class="espera-terceiro__btn">Carregar o mapa</button>`;

function carregarMapa() {
  if (!mapa || mapa.src) return;   // `src` vazio até aqui: nada foi pedido
  mapa.src = mapa.dataset.src;
  /* Quem estava escondido é a moldura, não o iframe: o iframe sozinho deixaria
     uma caixa vazia com borda na tela enquanto o mapa não viesse. */
  molduraDoMapa.hidden = false;
  espera.remove();
}

espera.querySelector('button').addEventListener('click', carregarMapa);

if (mapa) {
  /* Antes da **moldura**, e não do iframe: o iframe mora dentro dela, e ela
     nasce escondida — o bloco de espera ficaria invisível junto. */
  molduraDoMapa.insertAdjacentElement('beforebegin', espera);
  quandoAceitar(carregarMapa);
}

/* As linhas do título, como no original. As constantes LINE3B_PREFIX,
   LINE3B_CYAN e LINE3B_SUFFIX existem lá para pintar o "y" de Olyvia de ciano,
   mas o componente as concatena e desenha tudo com a variante gradiente — a
   classe ciano nunca chega a ser usada. Mantive o comportamento real. */
const LINHA1 = 'Conheça o';
const LINHA2 = 'Oráculo';
const LINHA3 = 'com Olyvia';

/** Cada caractere vira um span. Espaço vira `oracle-space`, com largura garantida. */
const letras = (texto) => [...texto]
  .map((c) => c === ' '
    ? '<span class="oracle-space"> </span>'
    : `<span class="oracle-letter oracle-letter--gradient">${c}</span>`)
  .join('');

const titulo = document.querySelector('.oracle-title');
titulo.innerHTML = [LINHA1, LINHA2, LINHA3].map(letras).join('<br>');

particulas(document.querySelector('.oracle-particles'));

const alvos = titulo.querySelectorAll('.oracle-letter, .oracle-space');
const card = document.querySelector('.oracle-card');

// autoAlpha = opacity + visibility juntos.
gsap.set(alvos, { autoAlpha: 0, y: 28, force3D: true });
gsap.set(card, { autoAlpha: 0, y: 40, force3D: true });

gsap.timeline({ delay: 0.15 })
  .to(alvos, {
    autoAlpha: 1,
    y: 0,
    duration: 0.55,
    ease: 'power3.out',
    stagger: 0.035,
    force3D: true,
  })
  .to(card, {
    autoAlpha: 1,
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    force3D: true,
  }, '-=0.4');
