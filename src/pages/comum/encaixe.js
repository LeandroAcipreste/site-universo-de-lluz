/**
 * Encaixe — a fábrica que faz caber.
 *
 * As três páginas de carrossel (Orações, Defesas, Limpezas) herdaram do site
 * antigo uma divisão de tela em números fixos: painel esquerdo `height: 25%`,
 * painel direito `75%`. São números que não sabem quanto conteúdo existe.
 *
 * Num celular de 375×667 o painel esquerdo fica com 147px, e ali dentro têm de
 * caber as abas (40px de alvo de toque), o nome da oração — que chega a três
 * linhas, porque "Prece para proteção de Arcanjo Miguel ao sair de casa" tem
 * 53 caracteres — e o aviso de rolagem, que ainda por cima era `absolute` e
 * passava por cima do título. Do outro lado, a oração mais longa tem 13
 * linhas e pede uns 440px de card num espaço de 350.
 *
 * Nenhum `clamp()` resolve isso sozinho: o CSS não sabe quantas linhas o texto
 * vai ocupar depois de quebrar. Só medindo.
 *
 * ── O que esta fábrica faz ──
 *
 * 1. Carimba na marcação de cada página um contrato de classes comum
 *    (`encaixe__*`), para uma folha só governar o layout das três. As classes
 *    prefixadas de cada página continuam onde estão, cuidando da cor e da
 *    decoração, que é onde elas de fato diferem.
 *
 * 2. Mede a barra de navegação — que não tem os 80px que as três folhas
 *    supunham — e publica a altura real em `--enc-topo`.
 *
 * 3. Depois de cada troca de card, **mede e encolhe até caber**: primeiro os
 *    espaços (respiros, recuos), depois o corpo do texto. Nessa ordem porque
 *    os 64px de recuo vertical de um card valem cinco linhas de texto: dá para
 *    ganhar muita altura antes de tocar na legibilidade.
 *
 * ── Os pisos ──
 *
 * O encolhimento não é infinito. O corpo do texto do card não desce de 10px e
 * o título não passa de 62% do que o CSS pediu. Um card que nem assim couber
 * volta a rolar por dentro — que é o que ele já fazia, e o gesto de
 * `rolagem.js` sabe distinguir isso de uma troca de card.
 *
 * Preferir texto ilegível a texto rolável seria trocar um problema real por um
 * pior.
 */

/** Abaixo disto vale o layout empilhado; acima, o de duas colunas do original. */
const CELULAR = '(max-width: 767px)';

/** Quanto os espaços podem encolher. */
const PISO_ESPACO = 0.4;

/** Quanto o corpo do card pode encolher — 12px de base, 10px de piso. */
const PISO_CORPO = 10 / 12;

/** Quanto o título pode encolher em relação ao que o CSS da página pediu. */
const PISO_TITULO = 0.62;

/**
 * Busca o **maior** fator entre `piso` e 1 que ainda cabe.
 *
 * Busca binária, cinco passos: chega a 1,2% do valor exato, que é menos que
 * um pixel em qualquer um destes tamanhos. Cada passo custa uma medição
 * forçada, e é por isso que a primeira coisa que ela faz é testar 1 — no caso
 * comum, o texto curto, o custo é uma medição só e acaba aqui.
 *
 * @param {(f: number) => void} aplicar  escreve o fator
 * @param {() => boolean} cabe           mede
 * @param {number} piso
 */
function maiorQueCabe(aplicar, cabe, piso) {
  aplicar(1);
  if (cabe()) return 1;

  let baixo = piso;
  let alto = 1;
  for (let i = 0; i < 5; i++) {
    const meio = (baixo + alto) / 2;
    aplicar(meio);
    if (cabe()) baixo = meio;
    else alto = meio;
  }
  aplicar(baixo);
  return baixo;
}

/**
 * @param {object} opcoes
 * @param {HTMLElement} opcoes.secao    a `<section>` da página
 * @param {string} opcoes.prefixo       "prayer", "defense" ou "energy"
 */
export function criarEncaixe({ secao, prefixo }) {
  const achar = (sufixo) => secao.querySelector(`.${prefixo}-${sufixo}`);

  const sticky = achar('sticky');
  const esquerda = achar('panel-left');
  const direita = achar('panel-right');
  const abas = achar('tabs');
  const areaTitulo = achar('title-area');
  const indicador = achar('scroll-indicator');
  const cards = achar('cards-viewport');

  /* O contrato de classes. É aqui, e não na marcação das três páginas, porque
     boa parte destes elementos nem existe no HTML: as abas, o título e os
     cards são desenhados pelo `carrossel.js`. Carimbar em tempo de execução é
     o que permite uma folha só governar as três sem tocar em três marcações. */
  secao.classList.add('encaixe');
  sticky?.classList.add('encaixe__palco');
  esquerda?.classList.add('encaixe__esq');
  direita?.classList.add('encaixe__dir');
  abas?.classList.add('encaixe__abas');
  areaTitulo?.classList.add('encaixe__titulo-area');
  indicador?.classList.add('encaixe__seta');
  cards?.classList.add('encaixe__cards');

  const noCelular = window.matchMedia(CELULAR);

  /** Mede a barra de navegação. As três folhas supunham 80px fixos. */
  function medirTopo() {
    const barra = document.querySelector('.nav');
    const altura = barra ? Math.round(barra.getBoundingClientRect().height) : 0;
    secao.style.setProperty('--enc-topo', `${altura || 64}px`);
  }

  /** O título: encolhe até o painel esquerdo não estourar o teto que o CSS deu. */
  function encaixarTitulo() {
    const titulo = areaTitulo?.querySelector(`.${prefixo}-title`);
    if (!titulo) return;

    const aplicar = (f) => esquerda.style.setProperty('--enc-titulo', String(f));
    const cabe = () => esquerda.scrollHeight <= esquerda.clientHeight + 1;

    maiorQueCabe(aplicar, cabe, PISO_TITULO);
  }

  /** O card ativo: primeiro os espaços, depois o corpo. */
  function encaixarCard(indice) {
    const cartao = cards?.children[indice]?.firstElementChild;
    if (!cartao) return;

    cartao.classList.add('encaixe__cartao');

    const cabe = () => cartao.scrollHeight <= cartao.clientHeight + 1;

    /* Os espaços primeiro: os 64px de recuo vertical do card valem cinco
       linhas de texto, e encolhê-los não custa legibilidade nenhuma. */
    maiorQueCabe(
      (f) => cartao.style.setProperty('--enc-espaco', String(f)),
      cabe, PISO_ESPACO);

    /* Só o que sobrar vai para o corpo. */
    maiorQueCabe(
      (f) => cartao.style.setProperty('--enc-corpo', String(f)),
      cabe, PISO_CORPO);
  }

  /** Devolve tudo ao natural — é o que o monitor usa. */
  function soltar() {
    esquerda?.style.removeProperty('--enc-titulo');
    for (const s of cards?.children ?? []) {
      s.firstElementChild?.style.removeProperty('--enc-espaco');
      s.firstElementChild?.style.removeProperty('--enc-corpo');
    }
  }

  let pedido = 0;
  let ultimoIndice = 0;

  /**
   * Mede e encaixa o card de índice `indice` — o que está na tela. Sem
   * argumento repete o último, que é o caso de quem chama por causa de um
   * `resize`. Pode ser chamada à vontade: o trabalho real acontece uma vez
   * por quadro, e só no celular.
   */
  function ajustar(indice = ultimoIndice) {
    ultimoIndice = indice;
    cancelAnimationFrame(pedido);
    pedido = requestAnimationFrame(() => {
      medirTopo();
      if (!noCelular.matches) return soltar();
      encaixarTitulo();
      encaixarCard(ultimoIndice);
    });
  }

  /* Girar o aparelho, abrir o teclado, a barra do navegador sumir: tudo muda a
     altura útil, e tudo passa por aqui. `visualViewport` é quem enxerga a
     barra do navegador; `resize` da janela, o resto. */
  window.addEventListener('resize', ajustar);
  window.visualViewport?.addEventListener('resize', ajustar);
  noCelular.addEventListener('change', ajustar);

  return { ajustar };
}
