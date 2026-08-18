/**
 * Limpezas — comportamento
 *
 * Porte de `site-antigo/site-UL/src/pages/energyCleasing/energyCleasing.tsx` e
 * `cardEnergyCleasing.tsx`. O estado do React e as transições do Framer Motion
 * estão em `../comum/carrossel.js`, que é o mesmo motor de Orações e Defesas —
 * no original as três tinham essa lógica duplicada linha por linha.
 *
 * Aqui fica só o que é desta página: os dados, as abas, o desenho do card e a
 * espiral de fundo, que é o que a distingue das outras duas.
 */

import { montarCarrossel } from '../comum/carrossel.js';
import { espiral } from '../comum/espiral.js';
import { CATEGORIAS, LIMPEZAS } from './dados.js';
import '../comum/nav.js';   // a barra se monta sozinha

/** Porte de `cardEnergyCleasing.tsx`: mesma árvore, mesmas classes. */
const corpoDoCard = (tecnica) => `
  <div class="card-energy">
    <div class="card-energy__glow-wrapper">
      <div class="card-energy__glow"></div>
    </div>

    <div class="card-energy__body">
      ${tecnica.cardLines.map((linha) => `<p class="card-energy__line">${linha}</p>`).join('')}
    </div>

    <div class="card-energy__watermark">
      <div class="card-energy__watermark-line card-energy__watermark-line--left"></div>
      <span class="card-energy__watermark-text">Universo de Luz</span>
      <div class="card-energy__watermark-line card-energy__watermark-line--right"></div>
    </div>
  </div>`;

espiral(document.querySelector('.spiral-bg__canvas'));

montarCarrossel({
  prefixo: 'energy',
  banco: LIMPEZAS,
  categorias: CATEGORIAS,
  corpoDoCard,
  /* O original fixa este tamanho no atributo `style` do <h3> — é o mesmo de
     Defesas, e não a escada de três degraus que Orações usa. */
  tamanhoDoTitulo: () => 'clamp(1.5rem, 4vw + 0.5rem, 3.5rem)',
});
