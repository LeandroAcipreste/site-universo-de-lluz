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

  /* Um trinco contra o clique fantasma. Num aparelho de toque, um único toque
     produz uma sequência inteira — `touchend`, `mousedown`, `mouseup`,
     `click` —, e quando alguma camada sai de baixo do dedo no meio disso o
     WebKit chega a entregar dois `click`. Num alternador, dois cliques na
     mesma ação é abrir e fechar de uma vez: o menu pisca e volta ao que
     estava.

     350ms é mais que a distância entre os dois eventos de um toque e menos
     que a de dois toques deliberados. */
  let ultimoToque = 0;

  gatilho.addEventListener('click', () => {
    const agora = Date.now();
    if (agora - ultimoToque < 350) return;
    ultimoToque = agora;

    const aberto = menu.classList.toggle('esta-aberto');
    gatilho.setAttribute('aria-expanded', String(aberto));
  });

  /* Tocar num item fecha a folha. A navegação leva um instante — a transição
     entre páginas é do navegador —, e sem isto a folha fica aberta por cima da
     página que está saindo. */
  for (const item of menu.querySelectorAll('.menu__item')) {
    item.addEventListener('click', () => {
      menu.classList.remove('esta-aberto');
      gatilho.setAttribute('aria-expanded', 'false');
    });
  }

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
