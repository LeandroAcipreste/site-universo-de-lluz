/**
 * Orações — comportamento
 *
 * Porte de `site-antigo/site-UL/src/pages/prayers/prayer.tsx` e
 * `cardprayer.tsx`. O estado do React e as transições do Framer Motion estão
 * em `../comum/carrossel.js`, que é o mesmo motor da página Defesas — no
 * original as duas tinham essa lógica duplicada linha por linha.
 *
 * Aqui fica só o que é desta página: os dados, as abas, o desenho do card e a
 * regra de corpo do título, que é a única coisa em que esta página realmente
 * difere daquela.
 */

import { montarCarrossel } from '../comum/carrossel.js';
import { cobras } from '../comum/cobras.js';
import { CATEGORIAS, ORACOES } from './dados.js';
import '../comum/nav.js';   // a barra se monta sozinha

/** Porte de `cardprayer.tsx`: mesma árvore, mesmas classes. */
const corpoDoCard = (oracao) => `
  <div class="card-prayer">
    <div class="card-prayer__glow-wrapper">
      <div class="card-prayer__glow"></div>
    </div>

    <div class="card-prayer__body">
      ${oracao.cardLines.map((linha) => `<p class="card-prayer__line">${linha}</p>`).join('')}
    </div>

    <div class="card-prayer__watermark">
      <div class="card-prayer__watermark-line card-prayer__watermark-line--left"></div>
      <span class="card-prayer__watermark-text">Universo de Luz</span>
      <div class="card-prayer__watermark-line card-prayer__watermark-line--right"></div>
    </div>
  </div>`;

/* Títulos longos encolhem, em três degraus. É do original, onde a conta estava
   inline no atributo `style` do <h3> — "Prece para proteção de Arcanjo Miguel
   ao sair de casa" tem 51 caracteres e cairia fora da tela no corpo maior. */
const tamanhoDoTitulo = (titulo) =>
  titulo.length > 40 ? 'clamp(1.5rem, 3.5vw + 0.3rem, 2.4rem)'
    : titulo.length > 25 ? 'clamp(1.8rem, 4.5vw + 0.4rem, 3rem)'
      : 'clamp(2rem, 5.5vw + 0.5rem, 4rem)';

cobras(document.querySelector('.snake-bg'));

montarCarrossel({
  prefixo: 'prayer',
  banco: ORACOES,
  categorias: CATEGORIAS,
  corpoDoCard,
  tamanhoDoTitulo,
});
