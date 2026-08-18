/**
 * Introdução — o símbolo, o nome e a barra de carregamento
 *
 * Ela existe por um motivo só: cobrir o tempo em que as texturas das nuvens
 * carregam e a cena se monta. Nada além disso.
 *
 * Houve aqui uma animação de traçado — o anel se desenhando, depois os três
 * braços, depois o nome se escrevendo letra a letra em contorno —, uns seis
 * segundos de coreografia. Ela saiu, e não foi por gosto:
 *
 *   1. Durava mais do que o carregamento, então **atrasava** a cena em vez de
 *      cobri-la. Um preloader que segura o que já está pronto é tempo perdido.
 *   2. Disputava a thread principal exatamente com quem estava carregando e
 *      compilando shaders, que é o trabalho pesado da abertura.
 *   3. Não dizia nada. Uma barra que anda diz quanto falta; um contorno que se
 *      desenha não diz.
 *
 * O que ficou é barato: o símbolo e o nome entram por opacidade, e a barra
 * acompanha o progresso de verdade — o mesmo número que o `montar()` da cena
 * reporta enquanto baixa cada textura.
 *
 * Um detalhe herdado do original que vale manter: os três braços são três
 * `<path>` diretos, não `<use href>` de um `<defs>`. O Safari do iOS não
 * propaga animação de um path em `<defs>` para os clones.
 */

import gsap from 'gsap';

/** O braço da fita e a sombra da dobra. */
const ARM_D = 'M 250 121.0 L 361.7 314.5 L 410.2 314.5 L 274.2 79.0 A 28 28 0 0 0 225.8 79.0 Z';
const SHADOW_D = 'M 225.8 79.0 L 250 121.0 L 244.0 131.4 L 219.8 89.4 Z';

const RAIO_DO_ANEL = 185;

/** Mínimo de tela para o símbolo não piscar quando tudo vem do cache. */
const TEMPO_MINIMO = 900;

const svgNS = 'http://www.w3.org/2000/svg';

/** Cria um elemento SVG com atributos, sem a verborragia do setAttribute. */
function el(nome, atributos = {}, filhos = []) {
  const n = document.createElementNS(svgNS, nome);
  for (const [k, v] of Object.entries(atributos)) n.setAttribute(k, v);
  for (const f of filhos) n.append(f);
  return n;
}

function gradiente(id, x1, y1, x2, y2, paradas) {
  return el('linearGradient', { id, x1, y1, x2, y2, gradientUnits: 'userSpaceOnUse' },
    paradas.map(([offset, cor]) => el('stop', { offset, 'stop-color': cor })));
}

/** Monta o símbolo e o nome, já no estado final — nada aqui se desenha. */
function montarSvg(container) {
  const svg = el('svg', {
    viewBox: '0 0 500 640',
    class: 'intro__svg',
    role: 'img',
    'aria-labelledby': 'ul-logo-titulo',
  });

  svg.append(el('title', { id: 'ul-logo-titulo' }));
  svg.querySelector('title').textContent = 'Universo de Luz';

  /* Os gradientes são os do img/logo.svg — claros, para o logo se destacar do
     céu escuro. Os stops mais escuros do componente foram feitos para um fundo
     branco; aqui eles sumiriam. */
  svg.append(el('defs', {}, [
    gradiente('arm-grad', 250, 37, 410.2, 314.5, [
      ['0%', '#F8F9FA'], ['20%', '#DDE0E3'], ['60%', '#9BA1A6'], ['100%', '#5B6166'],
    ]),
    gradiente('ring-grad', 100, 100, 400, 400, [
      ['0%', '#9BA1A6'], ['25%', '#F8F9FA'], ['65%', '#888E93'], ['100%', '#4A5055'],
    ]),
    gradiente('nm-grad', 0, 0, 500, 0, [
      ['0%', '#8A9299'], ['25%', '#C9CFD4'], ['50%', '#7E868C'],
      ['75%', '#C9CFD4'], ['100%', '#8A9299'],
    ]),
  ]));

  // O triângulo é ligeiramente reduzido para a ponta encostar no anel por
  // dentro, como no original.
  const encaixe = 'translate(250,250) scale(0.955) translate(-250,-250)';

  const bracos = [0, 120, 240].map((angulo) => el('path', {
    d: ARM_D,
    fill: 'url(#arm-grad)',
    ...(angulo ? { transform: `rotate(${angulo} 250 250)` } : {}),
  }));
  svg.append(el('g', { transform: encaixe }, bracos));

  const sombras = [0, 120, 240].map((angulo) => el('path', {
    d: SHADOW_D,
    fill: '#000000',
    'fill-opacity': 0.18,
    style: 'filter: blur(1px)',
    ...(angulo ? { transform: `rotate(${angulo} 250 250)` } : {}),
  }));
  svg.append(el('g', { transform: encaixe }, sombras));

  svg.append(el('circle', {
    cx: 250, cy: 250, r: RAIO_DO_ANEL,
    fill: 'none',
    stroke: 'url(#ring-grad)',
    'stroke-width': 7,
  }));

  const nome = el('text', {
    x: 250, y: 525,
    'text-anchor': 'middle',
    fill: 'url(#nm-grad)',
    'font-size': 51.25,
    'font-weight': 400,
    'letter-spacing': -3.75,
    style: "font-family: 'Optima', 'Zapf Humanist', 'Tenor Sans', sans-serif",
  });
  nome.textContent = 'Universo de Luz';
  svg.append(nome);

  container.append(svg);
  return svg;
}

export function criarIntroducao(root) {
  const brilho = document.createElement('div');
  brilho.className = 'intro__brilho';
  brilho.setAttribute('aria-hidden', 'true');
  root.append(brilho);

  const caixa = document.createElement('div');
  caixa.className = 'intro__caixa';
  root.append(caixa);

  const svg = montarSvg(caixa);

  /* A barra. `role="progressbar"` com os valores em `aria-*`: para quem usa
     leitor de tela, é isto que anuncia que a página está carregando e quanto
     falta — a largura de um <div> não anuncia nada. */
  const barra = document.createElement('div');
  barra.className = 'intro__barra';
  barra.setAttribute('role', 'progressbar');
  barra.setAttribute('aria-label', 'Carregando');
  barra.setAttribute('aria-valuemin', '0');
  barra.setAttribute('aria-valuemax', '100');
  barra.setAttribute('aria-valuenow', '0');

  const trilho = document.createElement('div');
  trilho.className = 'intro__barra-preenche';
  barra.append(trilho);
  caixa.append(barra);

  const rotulo = document.createElement('p');
  rotulo.className = 'intro__pct';
  rotulo.textContent = '0%';
  caixa.append(rotulo);

  let abertoEm = 0;
  let ultimoPct = 0;

  /** Mostra o símbolo, o nome e a barra. Barato: só opacidade. */
  function mostrar() {
    abertoEm = performance.now();
    // Marca o zero no relógio da página, para dar para medir a abertura de fora.
    window.__introT0 = abertoEm;
    gsap.to(caixa, { opacity: 1, duration: 0.7, ease: 'power2.out' });
  }

  /**
   * Move a barra. Recebe 0 a 100, e é o mesmo número que a cena reporta a cada
   * textura que termina de carregar.
   *
   * Nunca anda para trás, e vai por tween em vez de salto: as texturas chegam
   * fora de ordem e em blocos, então o valor cru daria trancos.
   */
  function progresso(pct) {
    const alvo = Math.max(ultimoPct, Math.min(100, pct));
    ultimoPct = alvo;
    barra.setAttribute('aria-valuenow', String(Math.round(alvo)));
    gsap.to(trilho, { scaleX: alvo / 100, duration: 0.4, ease: 'power2.out' });
    gsap.to(rotulo, {
      duration: 0.4,
      ease: 'power2.out',
      /* O contador acompanha a barra em vez de pular direto para o número. */
      onUpdate() {
        const v = Math.round(gsap.getProperty(trilho, 'scaleX') * 100);
        rotulo.textContent = v + '%';
      },
    });
  }

  /** Sai de cena, revelando as nuvens. */
  async function sair() {
    progresso(100);
    // Um respiro para a barra chegar ao fim antes de a tela virar.
    const restante = TEMPO_MINIMO - (performance.now() - abertoEm);
    await new Promise((r) => setTimeout(r, Math.max(400, restante)));

    return new Promise((pronto) => {
      gsap.to(root, {
        opacity: 0, duration: 0.9, ease: 'power2.inOut',
        onComplete: () => { root.remove(); pronto(); },
      });
    });
  }

  return { mostrar, progresso, sair };
}
