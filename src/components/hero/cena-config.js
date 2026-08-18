/**
 * Parâmetros da cena, extraídos do motor do quadplex80.
 *
 * Tudo aqui foi lido do bundle minificado, não estimado. É o que permite a
 * reconstrução bater com o original: mesmas coordenadas, mesmas escalas,
 * mesma lei de câmera. O shader está em nuvens.glsl.js.
 */

/* -------------------------------------------------------------------------
   Câmera — `new QA(45, 1, 0.1, 1000, {x:0, y:0, z:-700})`
   ------------------------------------------------------------------------- */

export const CAMERA = {
  fov: 45,
  near: 0.1,
  far: 1000,          // IA
  zInicio: -700,      // Fs — estado CLOUDS, scroll 0
  zFim: -20,          // Go — estado CITY, scroll 1
  /** A câmera olha sempre 40 unidades à frente: lookAt(0, 0, z + 40). */
  lookAtOffset: 40,
  /** Parallax de mouse, só depois de pousar. */
  mouseForce: { x: 0.6, y: 0.6 },
  reactiveness: 3,
};

/**
 * O céu é desenhado numa passada própria, com uma câmera de 120°, que só
 * acompanha a *rotação* da câmera principal — não a posição. Por isso ele não
 * se aproxima durante o voo.
 */
export const CAMERA_FUNDO = { fov: 120 };

/** O voo: `gsap.to(gl, {scroll: 1, duration: 8, ease: 'power2.inOut'})`. */
export const VOO = { duracao: 8000 };

/* -------------------------------------------------------------------------
   Camadas de nuvem — a config `Jh`
   `scale.x = (largura/altura) * scalarScale`, `scale.y = scalarScale`
   ------------------------------------------------------------------------- */

export const CAMADAS = [
  { url: '/public/img/cena/layer0.png', posicao: { x: 0, y: -4.93, z: 0 }, escala: 7.25, ordem: 0 },
  { url: '/public/img/cena/layer1.png', posicao: { x: 0, y: -7.11, z: 4.96 }, escala: 12, ordem: -1 },
  { url: '/public/img/cena/layer2.png', posicao: { x: 0, y: -10, z: 10.39 }, escala: 14, ordem: -3 },
  { url: '/public/img/cena/layer3.png', posicao: { x: 0, y: -10.41, z: 18.54 }, escala: 28.95, ordem: -4 },
  { url: '/public/img/cena/layer4.png', posicao: { x: 3.25, y: 1.15, z: 24.09 }, escala: 70.1, ordem: -10 },
];

/** As camadas rodam em modo 0 (com erosão de alfa), a 0.5 de velocidade. */
export const CAMADAS_SHADER = { uRenderMode: 0, cloudSpeed: 0.5 };

/* -------------------------------------------------------------------------
   As nuvens que se atravessa — classe `d5`
   240 sprites espalhados entre z -700 e 0, que andam em direção à câmera e
   dão a volta ao passar. É este sistema que faz a travessia.
   ------------------------------------------------------------------------- */

export const TRAVESSIA = {
  textura: '/public/img/cena/Cloud-tint-8.png',
  quantidade: 240,          // max
  semente: 7059401,
  cor: 0xf3f3f6,            // 15987702
  ordem: 1000,
  velocidade: 3.5,          // z -= dt * 3.5
  spawn: { escala: 80, escalaAleatoria: 15, x: 900, y: 10, deslocamentoY: 38 },
  /** `cloudPlugin.init(1, true, {...})` — modo 1, com fade por distância. */
  shader: {
    uRenderMode: 1,
    cloudSpeed: 1,
    USE_FADE: true,
    FADE_DISTANCE_MIN: 0,
    FADE_DISTANCE_MAX: 45,
    APPEAR_DISTANCE_MIN: 500,   // range - 200
    APPEAR_DISTANCE_MAX: 700,   // range
    FADE_ON_APPEAR: 700,
  },
};

/** O trecho em que as nuvens de travessia somem, ao chegar perto de z 0. */
export const FAIXA_TRAVESSIA = { de: -100, ate: 0 };

/**
 * As nuvens de preenchimento — o `mesh2` do original, com 20 posições
 * colocadas à mão (o array `wc`). São elas que fecham as bordas: os planos
 * layer0, layer1 e layer2 são um pouco mais estreitos que o campo de visão em
 * telas largas, e sem estas a emenda deles aparece.
 *
 * Os dados estão em nuvens-preenchimento.json, no formato
 * `{p:[x,y,z], e:escala, ox, oy}` — ox/oy negativos espelham a UV.
 */
export const PREENCHIMENTO = {
  dados: '/src/components/hero/nuvens-preenchimento.json',
  ordem: 999,
  /** `cloudPlugin2.init(2, true, {minFade:0, maxFade:20, ...})`. */
  shader: {
    uRenderMode: 2,
    cloudSpeed: 1,
    USE_FADE: true,
    FADE_DISTANCE_MIN: 0,
    FADE_DISTANCE_MAX: 20,
    APPEAR_DISTANCE_MIN: 500,
    APPEAR_DISTANCE_MAX: 700,
  },
};

/* -------------------------------------------------------------------------
   O campo de pouso — acréscimo meu, não existe no original

   Na intro o que dá volume são as 240 nuvens da travessia, com o shader em
   modo 0 (o que corrói o alfa e dá as bordas vivas). No pouso elas já sumiram
   — o `maxCloudBrowsing` as apaga ao chegar perto de z 0 — e sobram os 5
   planos das camadas, que são chapados. É essa a diferença que se vê.

   Este campo devolve o volume onde a câmera para: sprites com o mesmo shader
   em modo 0, espalhados em volta do triângulo. Some quando a câmera está longe
   (`uFade`), então a intro fica exatamente como está.
   ------------------------------------------------------------------------- */

export const POUSO = {
  textura: '/public/img/cena/Cloud-tint-8.png',
  quantidade: 120,
  semente: 20260814,
  cor: 0xf6f7f9,
  ordem: 500,
  /** Modo 0: com a erosão de alfa. É ele que faz a nuvem parecer nuvem. */
  shader: { uRenderMode: 0, cloudSpeed: 0.5 },
  spawn: {
    escalaMin: 26, escalaMax: 62,
    x: 150,                     // espalhamento lateral, para os dois lados
    yCentro: -24, yVariacao: 7, // o mar de nuvens fica abaixo da câmera
    zMin: -12, zMax: 80,        // da frente da câmera até atrás do triângulo
  },
  /** Deriva lenta, só para o mar respirar. */
  velocidade: 0.35,
  /** Faixa em que o campo aparece, conforme a câmera se aproxima. */
  faixa: { longe: -260, perto: -90 },
};

/* -------------------------------------------------------------------------
   Nuvens adicionais — a classe `AdditionalClouds`, três posições feitas à mão
   (o array `Tc`). Ficam bem ao fundo e usam outra arte: uma nuvem só, em vez
   da faixa. `cloudPlugin.init(1, false, {speed: .25})` — sem fade, e o dobro
   de lentidão das demais.
   ------------------------------------------------------------------------- */

export const ADICIONAIS = {
  textura: '/public/img/cena/intro-cloud.png',
  shader: { uRenderMode: 1, cloudSpeed: 0.25 },
  itens: [
    { posicao: { x: -32.45, y: -8.9, z: 42.41 }, rotacao: -0.1, escala: 31.02, ordem: -11 },
    { posicao: { x: -50, y: -12.82, z: 26.71 }, rotacao: -0.1, escala: 50, ordem: -17 },
    { posicao: { x: 26.44, y: -6.6, z: 21.47 }, rotacao: 0.03, escala: 27.1, ordem: -6 },
  ],
};

/* -------------------------------------------------------------------------
   A logo, no lugar da torre — a config `it` de MainBuilding
   ------------------------------------------------------------------------- */

export const LOGO = {
  url: '/public/img/logo.svg',
  posicao: { x: -0.21, y: -9.5, z: 8.21 },
  rotacaoY: -0.491592653589793,
  escala: 7.66,
  /** Tamanho do plano em espaço local, antes da escala. */
  tamanho: { largura: 1.4, base: 0.3, topo: 1.7 },
};

/**
 * O triângulo no celular.
 *
 * Lá a composição é empilhada — gatilho, triângulo, oração — e com os números
 * de cima o triângulo ficava no meio da tela, exatamente onde a oração começa.
 * Aqui ele sobe e encolhe para caber no vão entre os dois.
 *
 * A conta que dá os números: a câmera para em z −20, o plano está em z 8,21,
 * logo a distância é 28,21; com fov 45 vertical a altura visível ali é
 * 2 · 28,21 · tan(22,5°) ≈ 23,4 unidades de mundo. Numa tela de 844 px isso dá
 * ~36 px por unidade. E o centro do plano não é `posicao.y`: o código soma
 * `(base + topo) / 2 · escala`, então mexer na escala **também** move o
 * triângulo, e por isso os dois números andam juntos.
 */
export const LOGO_ESTREITO = {
  posicao: { x: -0.21, y: -3.45, z: 8.21 },
  escala: 6,
};

/** Abaixo desta largura vale o `LOGO_ESTREITO`. É o mesmo corte do CSS. */
export const CONSULTA_ESTREITO = '(max-width: 649px)';

/* -------------------------------------------------------------------------
   Céu
   Não é um plano: é `scene.background` com a textura equiretangular, girada,
   desenhada numa passada própria com a câmera de 120° (ver CAMERA_FUNDO).
   Mapeado assim, o horizonte curva certo e o sol cai no lugar.
   ------------------------------------------------------------------------- */

export const CEU = {
  url: '/public/img/cena/HDR_AboveTheClouds.test.jpg',
  rotacaoY: -3.04,
};

/**
 * A velocidade do relógio do shader das nuvens.
 *
 * Negativa porque no original o relógio anda **para trás**: no bundle deles é
 * `this.cloudTimer.value -= e * 1.5`, com `e` sendo o delta do quadro. Aqui a
 * conta é `tempoDoShader += dt * RITMO_DO_TEMPO`, que dá o mesmo resultado.
 * Trocar o sinal inverte o sentido em que as nuvens se deformam.
 */
export const RITMO_DO_TEMPO = -1.5;
