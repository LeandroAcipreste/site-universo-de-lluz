/**
 * Podcast — comportamento
 *
 * O mesmo par das outras páginas novas: quebrar o título em letras e conduzir
 * a entrada, com os números do Oráculo (0,55s, `power3.out`, 0,035s entre
 * letras) para todas se moverem igual.
 *
 * O fundo é o da página do YouTube: o componente comum, que é só marcação, e
 * as cobrinhas de luz, que precisam desta chamada.
 */

import gsap from 'gsap';
import { cobras } from '../comum/cobras.js';
import '../comum/nav.js';   // a barra se monta sozinha

const TITULO = 'Entre Céus e Terra';

/* As letras de uma palavra vão dentro de um span da palavra. Sem esse
   invólucro o título quebra no meio das palavras: cada letra é um
   `inline-block`, e para o navegador uma fileira de caixas independentes pode
   ser partida entre quaisquer duas. */
const letras = (palavra) => [...palavra]
  .map((c) => `<span class="pod-letra">${c}</span>`)
  .join('');

const marcacao = (texto) => texto
  .split(' ')
  .map((p) => `<span class="pod-palavra">${letras(p)}</span>`)
  .join('<span class="pod-espaco"> </span>');

const titulo = document.querySelector('.pod-titulo');
titulo.innerHTML = marcacao(TITULO);

cobras(document.querySelector('.snake-bg'));

/* Quem pediu menos movimento recebe a página pronta. A checagem é aqui e não
   só no CSS porque o `gsap.set()` escreve estilo inline, que ganha de qualquer
   regra de folha — inclusive da que está no `@media (prefers-reduced-motion)`.
   Sair antes é o único jeito de a preferência valer de verdade. */
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const sobretitulo = document.querySelector('.pod-sobretitulo');
  const alvos = titulo.querySelectorAll('.pod-letra, .pod-espaco');
  const apresentacao = document.querySelector('.pod-apresentacao');
  const texto = document.querySelector('.pod-texto');
  const emissoras = document.querySelectorAll('.pod-emissora');

  // autoAlpha = opacity + visibility juntos.
  gsap.set([sobretitulo, apresentacao, texto, ...emissoras], { autoAlpha: 0, y: 28, force3D: true });
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
    .to(apresentacao, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', force3D: true }, '-=0.3')
    .to(texto, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', force3D: true }, '-=0.3')
    .to(emissoras, {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
      force3D: true,
    }, '-=0.45');
}
