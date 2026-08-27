/**
 * Hero — Universo de Luz
 *
 * Duas camadas:
 *
 * 1. A cena 3D, em `cena.js` — céu, as nuvens que se atravessa, o mar de
 *    nuvens e a logo. O shader das nuvens é o mesmo do quadplex80, copiado
 *    tal e qual (ver nuvens.glsl.js).
 *
 * 2. O texto por cima, que entra depois que a intro sai. A coreografia é a do
 *    componente Vue `data-v-c1cb5361` do original:
 *
 *      gsap.timeline({defaults: {duration: 1.5, stagger: .1, ease: "unmask"}})
 *        .fromTo(eyebrow,    {yPercent:100, alpha:0}, {yPercent:0, alpha:.7}, .35)
 *        .from(title.lines,  {y:"3rem", alpha:0},                             .5)
 *        .fromTo(text.lines, {yPercent:100, alpha:0}, {yPercent:0, alpha:.7}, .7)
 *        .from(price,        {yPercent:100, alpha:0},                         .9)
 */

import gsap from 'gsap';
import { criarCena } from './cena.js';

/** Espera, em milissegundos. */
const espera = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * A `unmask` do original era um CustomEase, "M0,0 C0.16,1 0.3,1 1,1", que é
 * cubic-bezier(.16, 1, .3, 1) — a mesma curva do `expo.out` do GSAP. Sem
 * plugin, portanto.
 */
const UNMASK = 'expo.out';

/**
 * A pausa entre a câmera parar e o card entrar: **2 segundos exatos** depois
 * de a cena do voo terminar.
 */
const DEPOIS_DO_TRIANGULO = 2000;

export function createHero(root) {
  const palco = root.querySelector('.hero__scene');
  const card = root.querySelector('.oracao');
  const menu = root.querySelector('.menu');

  const cena = criarCena(palco);

  /* O gatilho do celular. No desktop ele está fora de tela (`display: none`),
     então nada disto chega a rodar — mas o ouvinte fica de pé de qualquer
     forma, porque a largura pode mudar ao girar o aparelho. */
  const gatilho = menu.querySelector('.menu__gatilho');

  /* ── Abrir e fechar ──

     Tudo aqui passa por **um** ouvinte, de `pointerdown`, na **fase de
     captura do documento**. Não é elegância: é o que fez o X finalmente
     fechar.

     A tentativa anterior pendurava `click` no botão e outro na folha, e
     confiava em `z-index: 80` contra 70 para o toque no X chegar ao botão.
     Não chegava. Com a folha aberta ela é uma camada de tela cheia com
     `backdrop-filter`, e quando duas camadas assim se sobrepõem no celular o
     teste de toque não segue a ordem de pintura que o CSS promete — o clique
     ia parar em qualquer lugar, ou em lugar nenhum.

     Na captura do documento não há a quem perguntar: todo toque na página
     passa por aqui **antes** de chegar a qualquer elemento, seja qual for a
     camada que o receba, e ninguém no caminho pode engoli-lo. Quem decide o
     que fazer é `evento.target` — se caiu no gatilho, alterna; se caiu na
     folha aberta fora de um link, fecha. As duas rotas dão o mesmo resultado
     quando o alvo é ambíguo, que é o caso do X.

     E `pointerdown` em vez de `click` porque ele dispara **uma vez** por
     toque. O clique fantasma — os dois `click` que o WebKit entrega quando
     uma camada sai de baixo do dedo — simplesmente não existe neste evento,
     e o trinco de 350ms que havia aqui deixa de ser necessário. */

  /** Até quando ignorar o `click` sintético que vem depois do toque. */
  let travaAte = 0;

  function alternar(abrir) {
    menu.classList.toggle('esta-aberto', abrir);
    gatilho.setAttribute('aria-expanded', String(abrir));
    gatilho.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
  }

  document.addEventListener('pointerdown', (evento) => {
    const alvo = evento.target;
    if (!(alvo instanceof Element)) return;

    const aberto = menu.classList.contains('esta-aberto');

    if (alvo.closest('.menu__gatilho')) {
      alternar(!aberto);
      travaAte = Date.now() + 400;
      return;
    }

    /* Com a folha fechada não há mais nada a fazer — e é isto que deixa o
       desktop intocado, onde ela nunca está aberta. */
    if (!aberto) return;

    /* Um link fecha e navega sozinho, no `click` lá embaixo. Fechar já aqui
       tiraria a folha de baixo do dedo antes do clique, e a navegação se
       perderia. */
    if (alvo.closest('.menu__item')) return;

    /* Sobrou o fundo da folha: fecha. */
    alternar(false);
    travaAte = Date.now() + 400;
  }, true);

  /* O `click` que o navegador sintetiza depois do toque cai sobre a camada
     que acabou de mudar — e, com a folha abrindo, isso é um link no meio da
     tela. Sem esta trava, abrir o menu navegava para a página que por acaso
     estivesse sob o dedo. */
  document.addEventListener('click', (evento) => {
    if (Date.now() >= travaAte) return;
    evento.preventDefault();
    evento.stopPropagation();
  }, true);

  /* O teclado não passa por `pointerdown`: Enter e Espaço no botão chegam
     como `click`, e a trava acima já terá vencido. */
  gatilho.addEventListener('click', () => {
    alternar(!menu.classList.contains('esta-aberto'));
  });

  /* Tocar num item fecha a folha. A navegação leva um instante — a transição
     entre páginas é do navegador —, e sem isto a folha fica aberta por cima da
     página que está saindo. */
  for (const item of menu.querySelectorAll('.menu__item')) {
    item.addEventListener('click', () => alternar(false));
  }

  /* No teclado, Escape — como na barra das páginas internas. */
  window.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && menu.classList.contains('esta-aberto')) {
      alternar(false);
    }
  });

  /* A troca de página não é daqui: é da transição em `src/transicao.css`,
     que o navegador conduz sozinho — a página que sai sobe, a que entra vem de
     baixo, as duas ao mesmo tempo.

     Houve aqui uma decolagem: ao clicar, o triângulo subia como nave, as
     nuvens ficavam para trás e o céu virava estrelado, e só então a página
     trocava. Funcionava, e foi removida a pedido — ela somava mais uma cena
     de 2,6s de shader pesado a uma abertura que já custava caro na placa, e o
     preço aparecia como engasgo. */

  /**
   * A oração e o menu entram em cena — uma linha do tempo só, do GSAP.
   *
   * Os dois nascem com o atributo `hidden` no HTML. É o modo à prova de falha:
   * o `[hidden] { display: none }` vem da folha do próprio navegador, então
   * vale antes de qualquer CSS do projeto carregar. Aqui é o único lugar que o
   * tira, e só depois de a câmera parar.
   *
   * A posição de partida de cada peça está no CSS — apagada, um pouco abaixo —
   * e o GSAP só a traz até o natural. É a mesma divisão de trabalho da
   * introdução, e é o que evita o travamento: nada é calculado em JS a cada
   * quadro, e não há duas animações disputando a mesma propriedade.
   */
  function reveal() {
    card.hidden = false;
    menu.hidden = false;

    /* Só opacidade nos blocos da oração, sem deslocamento: o texto é pintado
       por um gradiente recortado nas letras (`background-clip: text` em
       `.oracao`), e um `transform` num filho dessincroniza o recorte da
       pintura — o texto sai fantasmado, repetido fora do lugar. O movimento
       fica no card inteiro, que é uma camada só. */
    const blocos = card.querySelectorAll(
      '.oracao__selo, .oracao__titulo, .oracao__linha, .oracao__fecho, ' +
      '.oracao__aclamacoes');
    const botoes = menu.querySelectorAll('.menu__item');

    const tl = gsap.timeline({ defaults: { ease: UNMASK } });

    /* O card sobe pouco e demora — nada de entrada abrupta depois de uma cena
       de oito segundos. */
    tl.to(card, { y: 0, opacity: 1, duration: 1.9 }, 0);

    /* O conteúdo em cascata por dentro dele, o que dá o ritmo de leitura da
       oração em vez de despejá-la de uma vez. */
    tl.to(blocos, { opacity: 1, duration: 1.3, stagger: 0.095 }, 0.45);

    /* E a navegação na mesma leva. No desktop são os seis botões, um de cada
       vez; no celular o que se vê é o gatilho, e os botões entram já prontos
       dentro da lista fechada. Animar os dois cobre os dois casos sem
       consultar a largura da tela aqui. */
    tl.to([gatilho, ...botoes], { y: 0, opacity: 1, duration: 1.3, stagger: 0.07 }, 0.7);
  }

  return {
    /** Carrega as texturas e monta a cena. `aoProgredir` recebe 0 a 100. */
    montarCena: (aoProgredir) => cena.montar(aoProgredir),
    /**
     * O voo de câmera de 8s, de z -700 a -20. O texto só entra quando a
     * câmera chega — e ainda espera um instante, para o triângulo aparecer
     * primeiro e o texto vir depois dele, não junto.
     */
    async voar() {
      await cena.voar();
      await espera(DEPOIS_DO_TRIANGULO);
      reveal();
    },
    reveal,
  };
}
