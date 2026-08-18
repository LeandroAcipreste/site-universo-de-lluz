/**
 * Eventos — comportamento
 *
 * O mesmo par de sempre: quebrar o título em letras e conduzir a entrada, com
 * os números do Oráculo (0,55s, `power3.out`, 0,035s entre letras) para as
 * páginas se moverem igual.
 *
 * As letras vão dentro de um span por palavra. Sem isso o título quebra no
 * meio das palavras: cada letra é um `inline-block`, e para o navegador uma
 * fileira de caixas independentes pode ser partida entre quaisquer duas.
 */

import gsap from 'gsap';
import { particulas } from '../comum/particulas.js';
import '../comum/nav.js';   // a barra se monta sozinha

const TITULO = 'Os nossos encontros';

const letras = (palavra) => [...palavra]
  .map((c) => `<span class="ev-letra">${c}</span>`)
  .join('');

const marcacao = (texto) => texto
  .split(' ')
  .map((p) => `<span class="ev-palavra">${letras(p)}</span>`)
  .join('<span class="ev-espaco"> </span>');

const titulo = document.querySelector('.ev-titulo');
titulo.innerHTML = marcacao(TITULO);

particulas(document.querySelector('.ev-particles'));

/* Quem pediu menos movimento recebe a página pronta. A checagem é aqui e não
   só no CSS porque o `gsap.set()` escreve estilo inline, que ganha de qualquer
   regra de folha — inclusive da que está no `@media (prefers-reduced-motion)`.
   Sair antes é o único jeito de a preferência valer de verdade. */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const sobretitulo = document.querySelector('.ev-sobretitulo');
  const alvos = titulo.querySelectorAll('.ev-letra, .ev-espaco');
  const chamada = document.querySelector('.ev-chamada');
  const cards = document.querySelectorAll('.ev-card');

  // autoAlpha = opacity + visibility juntos.
  gsap.set([sobretitulo, chamada, ...cards], { autoAlpha: 0, y: 28, force3D: true });
  gsap.set(alvos, { autoAlpha: 0, y: 28, force3D: true });

  gsap.timeline({ delay: 0.15 })
    .to(sobretitulo, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', force3D: true })
    .to(alvos, {
      autoAlpha: 1,
      y: 0,
      duration: 0.55,
      ease: 'power3.out',
      stagger: 0.035,
      force3D: true,
    }, '-=0.25')
    .to(chamada, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', force3D: true }, '-=0.3')
    .to(cards, {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
      force3D: true,
    }, '-=0.4');
}
