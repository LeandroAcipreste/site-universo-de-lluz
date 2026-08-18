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
   ao sair de casa" tem 53 caracteres e cairia fora da tela no corpo maior.

   Os três degraus vieram de lá; os números, não. Os de origem tinham piso de
   2rem, 1.8rem e 1.5rem, e no celular a conta do meio nunca chegava perto
   disso — o piso é que valia. Resultado: **32px de título num aparelho de
   390px**, contra os 24px que Defesas e Limpezas usam para a mesma coisa. O
   nome tomava a tela e empurrava o card para baixo do fim dela.

   A correção não é só baixar o piso: com a inclinação antiga, baixar o piso
   deixava o desktop igualmente menor. Cada degrau ganhou uma rampa mais
   íngreme com deslocamento negativo — sobe mais rápido com a largura —, de
   modo que o teto do desktop fica onde estava e só o celular encolhe:

     curto  (≤25)   390px → 24px     ≥1024px → 64px  (era 32 / 64)
     médio  (26–40) 390px → 20px     ≥1024px → 48px  (era 32 / 48)
     longo  (>40)   390px → 16,8px   ≥1024px → 38,4px (era 24 / 38,4) */
const tamanhoDoTitulo = (titulo) =>
  titulo.length > 40 ? 'clamp(1.05rem, 5vw - 0.9rem, 2.4rem)'
    : titulo.length > 25 ? 'clamp(1.25rem, 6vw - 0.9rem, 3rem)'
      : 'clamp(1.5rem, 7vw - 0.8rem, 4rem)';

cobras(document.querySelector('.snake-bg'));

montarCarrossel({
  prefixo: 'prayer',
  banco: ORACOES,
  categorias: CATEGORIAS,
  corpoDoCard,
  tamanhoDoTitulo,
});
