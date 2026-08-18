/**
 * O livro — comportamento
 *
 * Duas coisas, como no Oráculo: quebrar o título em letras e conduzir a
 * entrada. Os números da linha do tempo são os de lá — 0,55s com `power3.out`
 * e 0,035s entre letras —, para as duas páginas se moverem igual.
 *
 * O que não veio do Oráculo é o `pointer-events` do canvas: ali as partículas
 * respondem ao toque, aqui não. Esta página tem texto para selecionar e um
 * botão para tocar, e um canvas por cima da página inteira comeria os dois.
 * A folha já cuida disso; a nota fica aqui porque é aqui que se procura.
 */

import gsap from 'gsap';
import { particulas } from '../comum/particulas.js';
import '../comum/nav.js';   // a barra se monta sozinha

const TITULO = 'Inspirações para a Nova Era';

/* Cada caractere vira um span, para o GSAP os trazer um a um — mas as letras
   de uma palavra vão dentro de um span da palavra.

   Sem esse invólucro o título quebrava **no meio das palavras**: cada letra é
   um `inline-block`, e para o navegador uma sequência de caixas independentes
   pode ser partida entre quaisquer duas. O título saía "Inspirações para a
   Nov / a Era". Envolver a palavra devolve ao navegador a informação que os
   spans tinham apagado: isto aqui é uma palavra, quebre antes ou depois. */
const letras = (palavra) => [...palavra]
  .map((c) => `<span class="livro-letra">${c}</span>`)
  .join('');

const marcacao = (texto) => texto
  .split(' ')
  .map((p) => `<span class="livro-palavra">${letras(p)}</span>`)
  .join('<span class="livro-espaco"> </span>');

const titulo = document.querySelector('.livro-titulo');
titulo.innerHTML = marcacao(TITULO);

particulas(document.querySelector('.livro-particles'));

/* Quem pediu menos movimento recebe a página pronta. A checagem é aqui e não
   só no CSS porque o `gsap.set()` abaixo escreve estilo inline, que ganha de
   qualquer regra de folha — inclusive da que está no `@media
   (prefers-reduced-motion)`. Sair antes é o único jeito de a preferência
   valer de verdade. */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Nada a animar: a folha já entrega tudo visível.
} else {
  const capa = document.querySelector('.livro-capa');
  const sobretitulo = document.querySelector('.livro-sobretitulo');
  const alvos = titulo.querySelectorAll('.livro-letra, .livro-espaco');
  const autoria = document.querySelector('.livro-autoria');
  const sinopse = document.querySelector('.livro-sinopse');
  const botao = document.querySelector('.livro-btn');

  // autoAlpha = opacity + visibility juntos.
  gsap.set([capa, sobretitulo, autoria, sinopse, botao], { autoAlpha: 0, y: 28, force3D: true });
  gsap.set(alvos, { autoAlpha: 0, y: 28, force3D: true });

  gsap.timeline({ delay: 0.15 })
    .to(capa, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', force3D: true })
    .to(sobretitulo, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', force3D: true }, '-=0.65')
    .to(alvos, {
      autoAlpha: 1,
      y: 0,
      duration: 0.55,
      ease: 'power3.out',
      stagger: 0.035,
      force3D: true,
    }, '-=0.4')
    .to(autoria, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out', force3D: true }, '-=0.35')
    .to(sinopse, { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', force3D: true }, '-=0.3')
    .to(botao, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', force3D: true }, '-=0.5');
}
