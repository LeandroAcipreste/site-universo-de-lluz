/**
 * Defesas — comportamento
 *
 * Porte de `site-antigo/site-UL/src/pages/defenses/defence.tsx` e
 * `cardDefense.tsx`. O estado do React (categoria, índice, sentido, o
 * `cooldown` de 700ms) e as transições do Framer Motion estão em
 * `../comum/carrossel.js`, que é o mesmo motor da página Orações — no original
 * as duas tinham essa lógica duplicada linha por linha.
 *
 * Aqui fica só o que é desta página: os dados, as abas e o desenho do card.
 *
 * O que **não** veio: o `defenceBackground.tsx`. Ele injetava um `<script>` do
 * unicornstudio.js apontando para um projeto hospedado (`WL20Cho3hr5Ge8Pk2QUl`)
 * e rodava aquele efeito num canvas. Não é código do site antigo, é um serviço
 * de terceiro carregado em tempo de execução — não há o que copiar, e trazê-lo
 * significaria pendurar a página numa conta que não conheço. O painel direito
 * fica com o fundo comum.
 */

import { montarCarrossel } from '../comum/carrossel.js';
import { CATEGORIAS, DEFESAS } from './dados.js';
import '../comum/nav.js';   // a barra se monta sozinha

/** Porte de `cardDefense.tsx`: mesma árvore, mesmas classes. */
const corpoDoCard = (defesa) => `
  <div class="card-defense">
    <div class="card-defense__glow-wrapper">
      <div class="card-defense__glow"></div>
    </div>

    <div class="card-defense__body">
      ${defesa.cardLines.map((linha) => `<p class="card-defense__line">${linha}</p>`).join('')}
    </div>

    <div class="card-defense__watermark">
      <div class="card-defense__watermark-line card-defense__watermark-line--left"></div>
      <span class="card-defense__watermark-text">Universo de Luz</span>
      <div class="card-defense__watermark-line card-defense__watermark-line--right"></div>
    </div>
  </div>`;

montarCarrossel({
  prefixo: 'defense',
  banco: DEFESAS,
  categorias: CATEGORIAS,
  corpoDoCard,
  /* O original fixa este tamanho no atributo `style` do <h3>. */
  tamanhoDoTitulo: () => 'clamp(1.5rem, 4vw + 0.5rem, 3.5rem)',
});
