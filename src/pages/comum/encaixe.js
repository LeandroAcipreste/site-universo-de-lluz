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

    /* Não se mede contra um espaço que ainda não existe.

       No primeiro quadro o painel de baixo chega a ter **zero** de altura:
       ele é `flex: 1 1 auto`, e enquanto o palco não sabe quanto mede não há
       sobra para distribuir. Medido: 0px de painel e 20px de card contra 147
       de conteúdo. A fábrica então encolhia até os dois pisos para caber num
       espaço imaginário, e como nada tornava a medir aquele card, ele ficava
       em 10px o resto da visita. Era o primeiro card das Defesas nascendo
       ilegível com 382 caracteres, enquanto outro de 390 cabia em 12px.

       Aqui a medição é descartada, e quem chama de volta é o observador lá
       embaixo, no instante em que o painel ganhar altura de verdade. */
    if (direita.clientHeight < 80) return;
    alturaVista = direita.clientHeight;

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
  let fonteJaPedida = false;
  /** A altura do painel de baixo na última medição válida. */
  let alturaVista = 0;
  let jaAssentou = false;

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
      esperarAFonte();
      assentar();
    });
  }

  /**
   * Mede outra vez quando a fonte do site chegar.
   *
   * As fontes do projeto são `font-display: swap`: o primeiro desenho sai na
   * reserva do sistema e a NHaas entra depois. As duas não medem igual, e a
   * reserva é a mais larga — medir antes da troca encolhe o card para caber um
   * texto que, com a fonte certa, já cabia. Medido num telefone de 375px: o
   * primeiro card das Defesas nascia nos dois pisos (10px, espaços em 0,40)
   * com 382 caracteres, enquanto outro de 390 cabia inteiro em 12px. Voltando
   * a ele depois, cabia em 12px também: a diferença era só o instante.
   *
   * E é preciso pedir `fonts.ready` **daqui**, depois da primeira medição, e
   * não lá embaixo junto dos outros ouvintes. A promessa resolve quando o
   * carregamento em curso termina, e antes de existir texto na tela não há
   * carregamento nenhum: pedida cedo demais, ela resolve de imediato e a nova
   * medição acontece antes da troca de fonte, que é o que já se tentou.
   *
   * Uma vez por página, e só sobre o card que está na tela.
   */
  function esperarAFonte() {
    if (fonteJaPedida || !document.fonts) return;
    fonteJaPedida = true;
    document.fonts.ready.then(() => ajustar());
  }

  /**
   * Uma medição a mais, meio segundo depois da primeira.
   *
   * `fonts.ready` promete menos do que parece: ela resolve quando os
   * carregamentos **em curso** terminam, e as duas fontes do projeto não
   * começam juntas — o peso 500 só é pedido quando aparece o primeiro texto
   * que o usa. Dá para a promessa resolver no meio do caminho.
   *
   * Medido em Limpezas, num aparelho de 360px: o primeiro card cabia na
   * medição, transbordava 12px um segundo depois e voltava a caber quando
   * tudo assentava. Doze pixels são uma barra de rolagem aparecendo sozinha
   * num card que estava certo.
   *
   * Meio segundo é depois de qualquer troca de fonte e antes de alguém ter
   * lido o card inteiro. Uma vez por página.
   */
  function assentar() {
    if (jaAssentou) return;
    jaAssentou = true;
    setTimeout(() => ajustar(), 500);
  }

  /* Girar o aparelho, abrir o teclado, a barra do navegador sumir: tudo muda a
     altura útil, e tudo passa por aqui. `visualViewport` é quem enxerga a
     barra do navegador; `resize` da janela, o resto. */
  window.addEventListener('resize', ajustar);
  window.visualViewport?.addEventListener('resize', ajustar);
  noCelular.addEventListener('change', ajustar);

  /* E, sobretudo, sempre que o espaço do card mudar de tamanho.

     É o que fecha o buraco do primeiro quadro, e sem precisar saber por que
     ele acontece: o painel nasce com zero, o observador vê a altura chegar e
     manda medir de novo. Serve igual para a barra do navegador que some ao
     rolar, para o aparelho que gira e para o título que muda de duas linhas
     para três, que é o que muda a sobra de baixo.

     A guarda de altura é contra laço: `ajustar()` mexe no que está **dentro**
     do card, não na altura do painel, então o observador não deveria se
     acordar sozinho. "Não deveria" não é garantia nenhuma num observador de
     tamanho, e por isso só uma mudança real de altura passa daqui. */
  if (direita && window.ResizeObserver) {
    new ResizeObserver(() => {
      if (Math.abs(direita.clientHeight - alturaVista) < 2) return;
      ajustar();
    }).observe(direita);
  }


  return { ajustar };
}
