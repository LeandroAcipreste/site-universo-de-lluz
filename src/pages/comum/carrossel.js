/**
 * O carrossel de cards das páginas Defesas e Orações.
 *
 * No site antigo eram dois componentes — `defenses/defence.tsx` e
 * `prayers/prayer.tsx` — com a lógica duplicada linha por linha: o mesmo
 * estado, o mesmo `cooldown` de 700ms, o mesmo cálculo de progresso, as mesmas
 * transições. Aqui é um só, e cada página entra com os seus dados e o seu
 * prefixo de classe. O que muda entre as duas é só isso.
 *
 * As animações eram do Framer Motion; aqui são do GSAP, com os mesmos números:
 *
 *   título   0.4s, entra deslocado 10px no sentido do gesto
 *   cards    0.5s, `easeInOut`, o ativo em y 0 e escala 1, os outros a ±100px
 *            e escala 0.85 — os já vistos saem por cima, os próximos por baixo
 *   seta     sobe e desce 5px, 1.5s, em laço
 */

import gsap from 'gsap';
import { rolagemPorGesto } from './rolagem.js';

/** O `<ChevronDown>` do lucide-react 0.544.0, com os atributos padrão. */
const CHEVRON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
  stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;

/**
 * @param {object}   opcoes
 * @param {string}   opcoes.prefixo     "defense" ou "prayer" — o prefixo das classes
 * @param {object}   opcoes.banco       { categoria: [item, …] }
 * @param {Array}    opcoes.categorias  [{ key, label }]
 * @param {Function} opcoes.corpoDoCard recebe o item e devolve o HTML do card
 * @param {Function} [opcoes.tamanhoDoTitulo] recebe o título e devolve um font-size
 */
export function montarCarrossel({ prefixo, banco, categorias, corpoDoCard, tamanhoDoTitulo }) {
  const p = (sufixo) => `${prefixo}-${sufixo}`;
  const $ = (sufixo) => document.querySelector('.' + p(sufixo));

  const secao = document.querySelector('.' + p('section'));
  const abas = $('tabs');
  const areaTitulo = $('title-area');
  const viewport = $('cards-viewport');
  const indicador = $('scroll-indicator');

  /* O original declara categorias que o banco de dados nem sempre traz — em
     `defensesData.ts` existe a aba "Orações" mas a chave `oracoes` não está no
     objeto. Lá isso quebrava a página no clique (`undefined.length`). Aqui a
     aba de uma categoria vazia simplesmente não é desenhada. */
  const disponiveis = categorias.filter((c) => Array.isArray(banco[c.key]) && banco[c.key].length);

  let categoria = disponiveis[0]?.key;
  let indice = 0;
  let sentido = 1;
  let travado = false;

  if (!categoria) return;

  // ── abas ──
  abas.innerHTML = disponiveis
    .map(({ key, label }) => `<button type="button" class="${p('tab')}" data-cat="${key}">${label}</button>`)
    .join('');

  abas.addEventListener('click', (e) => {
    const botao = e.target.closest('[data-cat]');
    if (!botao || botao.dataset.cat === categoria) return;
    categoria = botao.dataset.cat;
    indice = 0;
    sentido = 1;
    desenharCards();
    pintar();
  });

  // ── navegação ──
  function navegar(delta) {
    if (travado) return;
    travado = true;
    setTimeout(() => { travado = false; }, 700);

    const total = banco[categoria].length;
    const novo = Math.min(Math.max(indice + delta, 0), total - 1);
    if (novo === indice) return;
    sentido = delta;
    indice = novo;
    pintar();
  }

  rolagemPorGesto(secao, () => navegar(1), () => navegar(-1));

  // ── os cards ──
  function desenharCards() {
    viewport.innerHTML = banco[categoria]
      .map((item) => `<div class="${p('card-slot')}">${corpoDoCard(item)}</div>`)
      .join('');
  }

  // ── um quadro ──
  function pintar() {
    const itens = banco[categoria];
    const total = itens.length;
    const atual = itens[indice];

    for (const botao of abas.children) {
      const ativa = botao.dataset.cat === categoria;
      botao.classList.toggle(p('tab--active'), ativa);
      botao.classList.toggle(p('tab--inactive'), !ativa);
    }

    /* O título sai e entra. No original era um `AnimatePresence mode="wait"`,
       que espera a saída terminar antes de montar a entrada; aqui é a mesma
       coisa com uma linha do tempo do GSAP e a troca do texto no meio. */
    const antigo = areaTitulo.firstElementChild;
    const trocar = () => {
      areaTitulo.innerHTML = `
        <div class="${p('motion-container')}">
          <h3 class="${p('title')}"${tamanhoDoTitulo ? ` style="font-size: ${tamanhoDoTitulo(atual.title)}"` : ''}>${atual.title}</h3>
          <p class="${p('description')}">${atual.description}</p>
          <div class="${p('progress-track')}">
            <div class="${p('progress-bar')}" style="width: ${total > 1 ? (indice / (total - 1)) * 100 : 100}%"></div>
          </div>
        </div>`;
      gsap.fromTo(areaTitulo.firstElementChild,
        { opacity: 0, x: -10 * sentido }, { opacity: 1, x: 0, duration: 0.4 });
    };

    if (antigo) gsap.to(antigo, { opacity: 0, x: 10 * sentido, duration: 0.4, onComplete: trocar });
    else trocar();

    // Os cards: o ativo no lugar, os já vistos por cima, os próximos por baixo.
    [...viewport.children].forEach((slot, i) => {
      const ativo = i === indice;
      const passado = i < indice;
      gsap.to(slot, {
        opacity: ativo ? 1 : 0,
        y: ativo ? 0 : (passado ? -100 : 100),
        scale: ativo ? 1 : 0.85,
        duration: 0.5,
        ease: 'power1.inOut',
        overwrite: true,
      });
      slot.style.pointerEvents = ativo ? 'auto' : 'none';
    });

    gsap.to(indicador, { opacity: indice < total - 1 ? 1 : 0, duration: 0.3 });
  }

  // ── a seta que pulsa ──
  indicador.innerHTML =
    `<div class="${p('scroll-bob')}">${CHEVRON}</div>` +
    `<span class="${p('scroll-text')}">Role para a próxima</span>`;
  indicador.querySelector('svg').classList.add(p('scroll-icon'));
  gsap.to('.' + p('scroll-bob'), {
    y: 5, duration: 0.75, ease: 'power1.inOut', repeat: -1, yoyo: true,
  });

  desenharCards();
  /* Sem transição no primeiro quadro: o original usa `initial={false}` nos
     cards, ou seja, eles nascem já no lugar em vez de animar da posição de
     fora. */
  [...viewport.children].forEach((slot, i) => {
    gsap.set(slot, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 100, scale: i === 0 ? 1 : 0.85 });
  });
  pintar();
}
