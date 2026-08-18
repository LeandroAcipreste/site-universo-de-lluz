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
import '../comum/nav.js';   // a barra se monta sozinha

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
