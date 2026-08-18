/**
 * A cena de abertura do Universo de Luz, em three.js.
 *
 * Reconstrução da cena do quadplex80 a partir dos parâmetros lidos do bundle
 * deles (ver cena-config.js) e do shader das nuvens, que é o mesmo, copiado
 * tal e qual (ver nuvens.glsl.js). Três sistemas:
 *
 *   céu        uma imagem presa à câmera, então não se mexe durante o voo
 *   travessia  240 sprites entre z -700 e 0, que é o que se atravessa
 *   camadas    5 planos de nuvem em z 0..24, o mar de nuvens onde se pousa
 *
 * E a logo, no lugar em que ficava a torre deles.
 *
 * O voo é só a câmera indo de z -700 a -20 em 8s.
 */

import * as THREE from 'three';
import {
  VERTEX_PREFIX, VERTEX_SUFFIX, FRAGMENT_PREFIX,
  FRAGMENT_CLOUD, DIFFUSE_LINE, DIFFUSE_REPLACEMENT,
} from './nuvens.glsl.js';
import {
  CAMERA, CAMERA_FUNDO, VOO, CAMADAS, CAMADAS_SHADER, TRAVESSIA,
  PREENCHIMENTO, POUSO, ADICIONAIS, FAIXA_TRAVESSIA, LOGO, LOGO_ESTREITO,
  CONSULTA_ESTREITO, CEU, RITMO_DO_TEMPO,
} from './cena-config.js';

/** Guarda o trecho de fragmento em uso, para o modo de afinação poder trocá-lo. */
const FRAGMENT_ATUAL = { valor: FRAGMENT_CLOUD };

const lerp = (a, b, t) => a + (b - a) * t;
const inverseLerp = (a, b, v) => THREE.MathUtils.clamp((v - a) / (b - a), 0, 1);
/** power2.inOut do GSAP. */
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * Um gerador congruente linear com semente fixa — o mesmo do original, para
 * as 240 nuvens caírem exatamente nos mesmos lugares.
 */
class RandomComSemente {
  constructor(semente) { this.semente = semente; }
  next() {
    const m = 2 ** 32;
    this.semente = (1664525 * this.semente + 1013904223) % m;
    return this.semente / m;
  }
}

/**
 * Emenda o shader das nuvens num MeshBasicMaterial.
 *
 * No original isso era um sistema de plugins de material; aqui é o
 * `onBeforeCompile`, que é o mecanismo padrão do three.js para o mesmo fim.
 * O `map_fragment` é esvaziado porque o trecho da nuvem já amostra o mapa por
 * conta própria — deixá-lo multiplicaria a textura duas vezes.
 */
function materialDeNuvem({ map, cor = 0xffffff, opcoes, extras = {} }) {
  const material = new THREE.MeshBasicMaterial({
    map,
    color: cor,
    transparent: true,
    side: THREE.DoubleSide,
    ...extras,
  });

  const uniforms = {
    uNoiseTxt: { value: null },
    gTime: { value: 0 },
    cloudSpeed: { value: opcoes.cloudSpeed ?? 1 },
    maxCloudBrowsing: { value: 1 },
    uRenderMode: { value: opcoes.uRenderMode ?? 0 },
    /* Acréscimo meu sobre o shader original: um multiplicador de alfa que o JS
       controla. O modo 0 (o que corrói o alfa, e é o que dá volume) não tem
       nenhum controle de distância, e o campo de pouso precisa sumir quando a
       câmera está longe — senão apareceria na intro. */
    uFade: { value: 1 },
  };
  material.userData.uniforms = uniforms;

  if (opcoes.USE_FADE) {
    material.defines = {
      USE_FADE: '1.0',
      FADE_DISTANCE_MIN: opcoes.FADE_DISTANCE_MIN.toFixed(1),
      FADE_DISTANCE_MAX: opcoes.FADE_DISTANCE_MAX.toFixed(1),
      APPEAR_DISTANCE_MIN: opcoes.APPEAR_DISTANCE_MIN.toFixed(1),
      APPEAR_DISTANCE_MAX: opcoes.APPEAR_DISTANCE_MAX.toFixed(1),
      ...(opcoes.FADE_ON_APPEAR ? { FADE_ON_APPEAR: opcoes.FADE_ON_APPEAR.toFixed(1) } : {}),
    };
  }

  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);

    /* Afinação: `?fade=off` desliga os três fatores de esmaecimento das
       nuvens (distância, aparição, travessia) para se ver quais instâncias
       estariam ali. `?fade=dist|appear|apparition` isola um de cada vez. */
    const modo = new URLSearchParams(location.search).get('fade');
    if (modo) {
      const linha = 'final.a *= distToCamera * appear * maxCloudBrowsing;';
      const trocas = {
        off: 'final.a *= 1.0;',
        dist: 'final.a *= distToCamera;',
        appear: 'final.a *= appear;',
        apparition: 'final.a *= 1.0;',
      };
      FRAGMENT_ATUAL.valor = FRAGMENT_CLOUD.replace(linha, trocas[modo] ?? linha);
      if (modo !== 'apparition') {
        FRAGMENT_ATUAL.valor = FRAGMENT_ATUAL.valor
          .replace('final.a *= distToApparition;', '');
      }
    } else {
      FRAGMENT_ATUAL.valor = FRAGMENT_CLOUD;
    }

    shader.vertexShader = VERTEX_PREFIX + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <fog_vertex>', '#include <fog_vertex>\n' + VERTEX_SUFFIX);

    // O `uFade` entra por fora do trecho copiado, para nuvens.glsl.js seguir
    // sendo cópia fiel: declara-se aqui e multiplica-se logo antes do discard.
    const blocoNuvem = FRAGMENT_ATUAL.valor.replace(
      'if( final.a < 0.001 ) discard;',
      'final.a *= uFade;\nif( final.a < 0.001 ) discard;');

    shader.fragmentShader = 'uniform float uFade;\n' + FRAGMENT_PREFIX + shader.fragmentShader;
    shader.fragmentShader = shader.fragmentShader.replace('#include <map_fragment>', '');
    shader.fragmentShader = shader.fragmentShader.replace(
      DIFFUSE_LINE, blocoNuvem + '\n' + DIFFUSE_REPLACEMENT);
  };

  return material;
}

/** O atributo cloudScale que o shader espera, para um plano comum. */
function comCloudScale(geometria, x = 1, y = 1) {
  const n = geometria.attributes.position.count;
  const dados = new Float32Array(n * 2);
  for (let i = 0; i < n; i++) { dados[i * 2] = x; dados[i * 2 + 1] = y; }
  geometria.setAttribute('cloudScale', new THREE.BufferAttribute(dados, 2));
  return geometria;
}

export function criarCena(container) {
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });

  /* ------------------------------------------------------------------
     Resolução: reduzida em movimento, cheia parado.

     A cena é limitada por preenchimento — 240 nuvens grandes, transparentes e
     sobrepostas, com um shader de ruído caro em cada pixel — e o custo por
     quadro é quase todo proporcional ao número de pixels.

     Houve aqui uma resolução adaptativa que baixava a escala e **não** a
     devolvia. Foi removida por um motivo certo: a cena termina parada no
     triângulo, grande e em primeiro plano, e vê-lo borrado é inaceitável.

     Mas o erro não era reduzir — era não voltar. Durante o voo a câmera
     percorre 680 unidades em 8 segundos e nada na tela fica parado tempo
     suficiente para se ler detalhe; ali a resolução menor é invisível e vale
     o dobro de quadros. Ao pousar ela volta ao normal, e a imagem que fica
     é a cheia.
     ------------------------------------------------------------------ */
  const ESCALA_CHEIA = Math.min(2, devicePixelRatio);
  const ESCALA_EM_VOO = ESCALA_CHEIA * 0.7;
  renderer.setPixelRatio(ESCALA_EM_VOO);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(CAMERA.fov, 1, CAMERA.near, CAMERA.far);
  camera.position.set(0, 0, CAMERA.zInicio);
  scene.add(camera);

  // O céu, na sua própria cena e com a sua própria câmera.
  const cenaFundo = new THREE.Scene();
  const cameraFundo = new THREE.PerspectiveCamera(CAMERA_FUNDO.fov, 1, 0.1, 10);

  // Duas passadas: primeiro o céu, depois a cena por cima.
  renderer.autoClear = false;

  /* ImageBitmapLoader, não TextureLoader: ele decodifica a imagem **fora da
     thread principal**. Com o TextureLoader, as camadas de nuvem e o céu — uns
     5 MB de PNG e JPEG — eram decodificados na thread da interface e travavam
     a animação da introdução por quase 6 segundos num único quadro.

     A exceção é o SVG: o `createImageBitmap` não decodifica SVG, e a logo é um.
     Ela é minúscula, então vai pelo caminho comum sem custo perceptível. */
  /* `premultiplyAlpha: 'none'` é obrigatório: por padrão o `createImageBitmap`
     multiplica o RGB pelo alfa, e o three.js espera o contrário. Sem isso as
     nuvens ficam com o miolo escuro e só as bordas claras. E o `flipY` tem de
     ser feito aqui, porque com ImageBitmap o `texture.flipY` é ignorado. */
  const loaderBitmap = new THREE.ImageBitmapLoader()
    .setOptions({ imageOrientation: 'flipY', premultiplyAlpha: 'none' });
  const loaderComum = new THREE.TextureLoader();

  const carregar = (url) => new Promise((ok, erro) => {
    if (url.endsWith('.svg')) {
      loaderComum.load(url, ok, undefined, erro);
      return;
    }
    loaderBitmap.load(url, (bitmap) => {
      const textura = new THREE.Texture(bitmap);
      textura.needsUpdate = true;
      ok(textura);
    }, undefined, erro);
  });

  const materiaisDeNuvem = [];
  let pouso = null;

  /* Só o material da travessia acompanha o `maxCloudBrowsing`. No original é
     o `update()` da classe das nuvens de travessia que mexe nele, e só no
     plugin dela — o das nuvens de preenchimento fica fixo em 1. Fazer as duas
     desbotarem juntas deixa as bordas dos planos das camadas à mostra no
     pouso, que é justamente o que as de preenchimento existem para cobrir. */
  let materialTravessia = null;
  let travessia = null;
  let ceu = null;

  /* ------------------------------------------------------------------
     Montagem
     ------------------------------------------------------------------ */

  async function montar(aoProgredir = () => {}) {
    const urls = [
      TRAVESSIA.textura, ADICIONAIS.textura, '/public/img/cena/cnoise.png',
      ...CAMADAS.map((c) => c.url), LOGO.url,
    ];
    let prontos = 0;
    const total = urls.length + 1;   // +1 pelo céu
    const texturas = {};

    /* O céu vai pelo mesmo caminho das outras texturas, de propósito.
       O arquivo é um JPEG UltraHDR e existe um `UltraHDRLoader` que decodifica
       o mapa de ganho — mas ele faz isso em JavaScript, na thread principal, e
       custava 2,2s num único quadro. Medi o resultado com e sem: o perfil de
       brilho da cena saiu **idêntico**, faixa por faixa. Pagar um travamento
       de 2,2s por nenhuma diferença visível não se justifica. */
    const ceuPromessa = carregar(CEU.url).then((t) => {
      aoProgredir(++prontos / total * 100);
      return t;
    });

    await Promise.all([
      ...urls.map(async (url) => {
        texturas[url] = await carregar(url);
        aoProgredir(++prontos / total * 100);
      }),
      ceuPromessa.then((t) => { texturas[CEU.url] = t; }),
    ]);

    const ruido = texturas['/public/img/cena/cnoise.png'];
    ruido.wrapS = ruido.wrapT = THREE.RepeatWrapping;

    /* Céu — background equiretangular numa cena própria, como no original.
       Não é um plano: mapeado assim, o horizonte curva certo e o sol cai no
       lugar. Fica numa passada separada, com uma câmera de 120° que só copia
       a rotação da principal, então o céu não se aproxima durante o voo. */
    const texCeu = texturas[CEU.url];
    texCeu.mapping = THREE.EquirectangularReflectionMapping;
    texCeu.colorSpace = THREE.SRGBColorSpace;
    cenaFundo.background = texCeu;
    cenaFundo.backgroundRotation.y = CEU.rotacaoY;

    /* As 5 camadas do mar de nuvens. */
    CAMADAS.forEach((def) => {
      const tex = texturas[def.url];
      tex.colorSpace = THREE.SRGBColorSpace;
      const proporcao = tex.image.width / tex.image.height;
      /* `depthWrite: false` é obrigatório: sem ele o plano escreve
         profundidade na área inteira, inclusive onde é transparente, e recorta
         com borda dura as nuvens do campo de pouso que passam atrás. Só o
         triângulo deve escrever profundidade. */
      const material = materialDeNuvem({
        map: tex, opcoes: CAMADAS_SHADER, extras: { depthWrite: false },
      });
      material.userData.uniforms.uNoiseTxt.value = ruido;
      materiaisDeNuvem.push(material);

      const malha = new THREE.Mesh(comCloudScale(new THREE.PlaneGeometry(1, 1)), material);
      malha.scale.set(proporcao * def.escala, def.escala, def.escala);
      malha.position.set(def.posicao.x, def.posicao.y, def.posicao.z);
      malha.rotation.y = Math.PI;   // viradas para a câmera, que vem do -z
      malha.renderOrder = def.ordem;
      scene.add(malha);
    });

    /* As nuvens da travessia. */
    travessia = criarTravessia(texturas[TRAVESSIA.textura], ruido);
    scene.add(travessia.malha);

    /* E as de preenchimento, que fecham as bordas. */
    scene.add(await criarPreenchimento(texturas[TRAVESSIA.textura], ruido));

    /* O campo de pouso, que dá volume à chegada. */
    pouso = criarCampoDePouso(texturas[TRAVESSIA.textura], ruido);
    scene.add(pouso.malha);

    /* As três adicionais, ao fundo. Planos comuns, não instanciados — são
       poucas e não se movem. */
    const texAdd = texturas[ADICIONAIS.textura];
    texAdd.colorSpace = THREE.SRGBColorSpace;
    const propAdd = texAdd.image.width / texAdd.image.height;
    const matAdd = materialDeNuvem({
      map: texAdd, opcoes: ADICIONAIS.shader, extras: { depthWrite: false },
    });
    matAdd.userData.uniforms.uNoiseTxt.value = ruido;
    materiaisDeNuvem.push(matAdd);
    for (const def of ADICIONAIS.itens) {
      const malha = new THREE.Mesh(comCloudScale(new THREE.PlaneGeometry(1, 1)), matAdd);
      malha.scale.set(propAdd * def.escala, def.escala, def.escala);
      malha.position.set(def.posicao.x, def.posicao.y, def.posicao.z);
      malha.rotation.z = def.rotacao;
      malha.rotation.y = Math.PI;
      malha.renderOrder = def.ordem;
      scene.add(malha);
    }

    /* A logo, onde ficava a torre. */
    const texLogo = texturas[LOGO.url];
    texLogo.colorSpace = THREE.SRGBColorSpace;
    const { largura, base, topo } = LOGO.tamanho;
    const logo = new THREE.Mesh(
      new THREE.PlaneGeometry(largura, topo - base),
      new THREE.MeshBasicMaterial({
        map: texLogo, transparent: true, side: THREE.DoubleSide,
        /* O `alphaTest` importa aqui: o campo de pouso testa profundidade
           contra o triângulo, e sem isto as partes vazias do PNG também
           escreveriam profundidade — abrindo um buraco retangular nas nuvens
           em volta dele. */
        alphaTest: 0.08,
      }));
    /* Posição e tamanho mudam com a largura da tela — ver `LOGO_ESTREITO`. O
       ouvinte existe porque girar o aparelho troca de faixa sem recarregar a
       página, e sem ele o triângulo ficaria com os números da outra. */
    const consulta = window.matchMedia(CONSULTA_ESTREITO);
    const assentarLogo = () => {
      const { posicao, escala } = consulta.matches ? LOGO_ESTREITO : LOGO;
      logo.position.set(posicao.x, posicao.y + (base + topo) / 2 * escala, posicao.z);
      logo.scale.setScalar(escala);
    };
    assentarLogo();
    consulta.addEventListener('change', assentarLogo);
    /* De frente para a câmera. O `LOGO.rotacaoY` do original é a rotação que o
       motor aplicava à cena do .glb, e lá dentro do arquivo ela já era
       cancelada — o resultado era a logo de frente. Repeti-la aqui giraria a
       logo 28° para o lado e a encolheria. O `Math.PI` é só para a face com a
       textura ficar voltada para a câmera, que vem do lado -z. */
    logo.rotation.y = Math.PI;
    scene.add(logo);

    redimensionar();

    /* Compilar e subir tudo para a GPU **antes** de o laço começar.

       Sem isto o primeiro quadro fazia o trabalho inteiro de uma vez: compilar
       os shaders das cinco camadas, o da travessia, o do campo de pouso e o do
       céu, e subir as nove texturas. Medido, esse quadro custava 4,5 segundos —
       a introdução congelava no meio do desenho, que é exatamente a travada que
       se via.

       O `compileAsync` faz o mesmo trabalho, mas devolve uma promessa e usa a
       extensão `KHR_parallel_shader_compile` quando existe, então o navegador
       compila em paralelo em vez de segurar a thread. Como isto acontece
       enquanto a introdução ainda está desenhando, o custo fica escondido onde
       já havia espera — e a introdução continua animando por cima.

       As duas cenas precisam ser compiladas: o céu vive numa passada própria,
       com câmera própria. */
    await renderer.compileAsync(cenaFundo, cameraFundo);
    await renderer.compileAsync(scene, camera);

    /* O loop só arranca agora. Antes ele começava junto com a página e ficava
       desenhando uma cena vazia — e, pior, compilando shaders — enquanto a
       introdução animava, disputando a thread com ela. */
    ultimo = performance.now();
    requestAnimationFrame(quadro);
  }

  /** 240 sprites entre z -700 e 0, com a mesma semente do original. */
  function criarTravessia(textura, ruido) {
    textura.colorSpace = THREE.SRGBColorSpace;
    const rnd = new RandomComSemente(TRAVESSIA.semente);
    const { spawn, quantidade } = TRAVESSIA;
    const alcance = 0 - CAMERA.zInicio;   // 700

    const instancias = [];
    for (let i = 0; i < quantidade; i++) {
      const x = rnd.next() * spawn.x - rnd.next() * spawn.x;
      const r = (i / quantidade) * alcance;
      const y = rnd.next() * spawn.y - rnd.next() * spawn.y - spawn.deslocamentoY;
      const escala = spawn.escala + rnd.next() * spawn.escalaAleatoria;
      const z = r + CAMERA.zInicio;
      const cs = [rnd.next() > 0.5 ? 1 : -1, rnd.next() > 0.1 ? 1 : -1];
      if (z < 0) instancias.push({ x, y, z, escala, cs });
    }

    const proporcao = textura.image.width / textura.image.height;
    const material = materialDeNuvem({
      map: textura, cor: TRAVESSIA.cor, opcoes: TRAVESSIA.shader,
      extras: { depthWrite: false, depthTest: false },
    });
    material.userData.uniforms.uNoiseTxt.value = ruido;
    materiaisDeNuvem.push(material);
    materialTravessia = material;

    const geometria = new THREE.PlaneGeometry(1, 1);
    const escalas = new Float32Array(instancias.length * 2);
    instancias.forEach((inst, i) => { escalas[i * 2] = inst.cs[0]; escalas[i * 2 + 1] = inst.cs[1]; });
    geometria.setAttribute('cloudScale', new THREE.InstancedBufferAttribute(escalas, 2));

    const malha = new THREE.InstancedMesh(geometria, material, instancias.length);
    malha.renderOrder = TRAVESSIA.ordem;
    malha.frustumCulled = false;

    const m = new THREE.Matrix4();
    const ordem = instancias.map((_, i) => i);
    const attrCloudScale = geometria.getAttribute('cloudScale');

    /**
     * Reescreve as matrizes, **da nuvem mais distante para a mais próxima**.
     *
     * Isto não é detalhe: o material tem `depthTest: false`, então quem manda
     * no resultado é a ordem de desenho. Desenhando de perto para longe, as
     * nuvens distantes pintam por cima das próximas e comem a cobertura do
     * primeiro plano. O original faz o mesmo — é o `transparencySorting: true`
     * da geometria instanciada dele.
     *
     * A câmera olha sempre para +z, então "mais distante" é simplesmente
     * "maior z".
     */
    /**
     * Reordena e reescreve o `cloudScale`. Caro, e por isso raro — ver
     * `avancar()`, que é quem decide quando isto precisa acontecer.
     */
    const reordenar = () => {
      ordem.sort((a, b) => instancias[b].z - instancias[a].z);
      ordem.forEach((idx, i) => {
        // O cloudScale é por instância e vai pelo índice do buffer, então
        // precisa acompanhar a reordenação — senão o espelhamento da UV
        // descasa da nuvem a que pertence.
        attrCloudScale.setXY(i, instancias[idx].cs[0], instancias[idx].cs[1]);
      });
      attrCloudScale.needsUpdate = true;
    };

    /**
     * Um quadro das nuvens da travessia.
     *
     * O deslocamento é o do original, linha por linha:
     *
     *     s.position.z -= e * 3.5;
     *     s.position.z = Fs + ((s.position.z - Fs) % t + t) % t;
     *
     * O que **não** é do original é a ordenação de trás para frente, e ela é
     * necessária aqui: o material tem `depthTest: false`, então quem manda é a
     * ordem de desenho, e no motor deles isso vinha de `transparencySorting`.
     *
     * A questão é a frequência. Ordenar a cada quadro era refazer uma conta
     * cujo resultado não muda: as 240 nuvens andam **todas no mesmo eixo e na
     * mesma velocidade**, então a ordem relativa entre elas é invariante. A
     * única coisa que a altera é uma nuvem dar a volta — o instante em que ela
     * salta do fim para o começo do trecho. É só aí que se reordena.
     *
     * E o `cloudScale` só muda quando a ordem muda, então ele também só é
     * reenviado à GPU nesses quadros. Reenviá-lo em todos era mandar 2 KB de
     * dados idênticos por quadro e forçar o driver a sincronizar com um buffer
     * que a GPU ainda estava lendo — que é de onde vinham os engasgos.
     */
    const avancar = (dt) => {
      let deuVolta = false;
      for (const inst of instancias) {
        const antes = inst.z;
        inst.z -= dt * TRAVESSIA.velocidade;
        inst.z = CAMERA.zInicio + (((inst.z - CAMERA.zInicio) % alcance) + alcance) % alcance;
        // Andando para trás, o z só cresce quando houve a volta.
        if (inst.z > antes) deuVolta = true;
      }
      if (deuVolta) reordenar();

      for (let i = 0; i < ordem.length; i++) {
        const inst = instancias[ordem[i]];
        m.makeScale(proporcao * inst.escala, inst.escala, 1);
        m.setPosition(inst.x, inst.y, inst.z);
        malha.setMatrixAt(i, m);
      }
      malha.instanceMatrix.needsUpdate = true;
    };

    reordenar();
    avancar(0);

    return { malha, instancias, avancar, alcance };
  }

  /**
   * O campo de pouso: sprites volumétricos em volta do triângulo, com o mesmo
   * shader em modo 0 (o que corrói o alfa). É o que devolve, na chegada, o
   * volume que as nuvens da travessia dão na intro.
   *
   * Usa `depthTest`, ao contrário dos outros campos: assim o triângulo, que
   * escreve profundidade, oculta as nuvens que estão atrás dele. Sem isso elas
   * pintariam por cima e o enterrariam.
   */
  function criarCampoDePouso(textura, ruido) {
    const rnd = new RandomComSemente(POUSO.semente);
    const { spawn } = POUSO;
    const instancias = [];
    for (let i = 0; i < POUSO.quantidade; i++) {
      instancias.push({
        x: (rnd.next() * 2 - 1) * spawn.x,
        y: spawn.yCentro + (rnd.next() * 2 - 1) * spawn.yVariacao,
        z: spawn.zMin + rnd.next() * (spawn.zMax - spawn.zMin),
        escala: spawn.escalaMin + rnd.next() * (spawn.escalaMax - spawn.escalaMin),
        cs: [rnd.next() > 0.5 ? 1 : -1, rnd.next() > 0.5 ? 1 : -1],
      });
    }

    const proporcao = textura.image.width / textura.image.height;
    const material = materialDeNuvem({
      map: textura, cor: POUSO.cor, opcoes: POUSO.shader,
      extras: { depthWrite: false },
    });
    material.userData.uniforms.uNoiseTxt.value = ruido;
    material.userData.uniforms.uFade.value = 0;   // invisível na intro
    materiaisDeNuvem.push(material);

    const geometria = new THREE.PlaneGeometry(1, 1);
    const escalas = new Float32Array(instancias.length * 2);
    instancias.forEach((inst, i) => { escalas[i * 2] = inst.cs[0]; escalas[i * 2 + 1] = inst.cs[1]; });
    geometria.setAttribute('cloudScale', new THREE.InstancedBufferAttribute(escalas, 2));

    const malha = new THREE.InstancedMesh(geometria, material, instancias.length);
    malha.renderOrder = POUSO.ordem;
    malha.frustumCulled = false;

    const m = new THREE.Matrix4();
    const ordem = instancias.map((_, i) => i);
    const attrCloudScale = geometria.getAttribute('cloudScale');

    /**
     * Com `semOrdenar`, reaproveita a ordem já calculada e não toca no atributo
     * de escala — que é fixo por instância e, uma vez ordenado, não muda mais.
     * Sobra só reescrever as matrizes, que é o que de fato se move.
     */
    const aplicar = ({ semOrdenar = false } = {}) => {
      if (!semOrdenar) ordem.sort((a, b) => instancias[b].z - instancias[a].z);
      ordem.forEach((idx, i) => {
        const inst = instancias[idx];
        m.makeScale(proporcao * inst.escala, inst.escala, 1);
        m.setPosition(inst.x, inst.y, inst.z);
        malha.setMatrixAt(i, m);
        if (!semOrdenar) attrCloudScale.setXY(i, inst.cs[0], inst.cs[1]);
      });
      malha.instanceMatrix.needsUpdate = true;
      if (!semOrdenar) attrCloudScale.needsUpdate = true;
    };
    aplicar();

    return { malha, instancias, aplicar, material };
  }

  /**
   * As 20 nuvens colocadas à mão. Ficam paradas — só o shader as anima — e
   * existem para fechar as bordas, onde os planos das camadas terminam antes
   * do fim da tela.
   */
  async function criarPreenchimento(textura, ruido) {
    // Da mais distante para a mais próxima, pelo mesmo motivo da travessia.
    // Estas não se movem, então basta ordenar uma vez.
    const dados = (await (await fetch(PREENCHIMENTO.dados)).json())
      .sort((a, b) => b.p[2] - a.p[2]);
    const proporcao = textura.image.width / textura.image.height;

    const material = materialDeNuvem({
      map: textura, cor: TRAVESSIA.cor, opcoes: PREENCHIMENTO.shader,
      extras: { depthWrite: false, depthTest: false },
    });
    material.userData.uniforms.uNoiseTxt.value = ruido;
    materiaisDeNuvem.push(material);

    const geometria = new THREE.PlaneGeometry(1, 1);
    const escalas = new Float32Array(dados.length * 2);
    dados.forEach((d, i) => { escalas[i * 2] = d.ox; escalas[i * 2 + 1] = d.oy; });
    geometria.setAttribute('cloudScale', new THREE.InstancedBufferAttribute(escalas, 2));

    const malha = new THREE.InstancedMesh(geometria, material, dados.length);
    malha.renderOrder = PREENCHIMENTO.ordem;
    malha.frustumCulled = false;

    const m = new THREE.Matrix4();
    dados.forEach((d, i) => {
      m.makeScale(proporcao * d.e, d.e, 1);
      m.setPosition(d.p[0], d.p[1], d.p[2]);
      malha.setMatrixAt(i, m);
    });
    malha.instanceMatrix.needsUpdate = true;
    return malha;
  }

  /* ------------------------------------------------------------------
     Voo e loop
     ------------------------------------------------------------------ */

  let scroll = 0;
  let inicioDoVoo = null;
  let avisarChegada = null;   // resolve a promessa de `voar()`
  let tempoDoShader = 0;
  let ultimo = performance.now();
  const mouse = { x: 0, y: 0 };
  let efeitoMouse = 0;

  addEventListener('pointermove', (e) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = -((e.clientY / innerHeight) * 2 - 1);
  }, { passive: true });

  function redimensionar() {
    const w = container.clientWidth || innerWidth;
    const h = container.clientHeight || innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    cameraFundo.aspect = w / h;
    cameraFundo.updateProjectionMatrix();
  }
  addEventListener('resize', redimensionar);

  function quadro(agora) {
    const dt = Math.min((agora - ultimo) / 1000, 0.2);
    ultimo = agora;

    if (inicioDoVoo !== null) {
      /* O `agora` vem do requestAnimationFrame, e o carimbo do quadro pode ser
         alguns milissegundos anterior ao instante em que `voar()` foi chamado.
         Sem o piso em 0 o progresso fica negativo no primeiro quadro. */
      scroll = THREE.MathUtils.clamp((agora - inicioDoVoo) / VOO.duracao, 0, 1);
      if (scroll >= 1 && avisarChegada) {
        /* Chegou: a câmera para e a resolução volta ao normal. O quadro da
           troca custa caro — o alvo de renderização é recriado —, e por isso
           ele acontece exatamente aqui: no instante em que a imagem congela,
           dois segundos antes de a oração entrar. Ninguém vê. */
        renderer.setPixelRatio(ESCALA_CHEIA);
        redimensionar();
        avisarChegada();
        avisarChegada = null;
      }
    }
    const z = lerp(CAMERA.zInicio, CAMERA.zFim, easeInOutCubic(scroll));

    // Só depois de pousar o mouse passa a mexer na câmera.
    efeitoMouse = THREE.MathUtils.clamp(efeitoMouse + (scroll >= 1 ? dt * 3 : -dt * 3), 0, 1);
    const s = Math.min(dt * CAMERA.reactiveness, 0.5);
    camera.position.x = ((1 - s) * camera.position.x + s * mouse.x * CAMERA.mouseForce.x) * efeitoMouse;
    camera.position.y = ((1 - s) * camera.position.y + s * mouse.y * CAMERA.mouseForce.y) * efeitoMouse;
    camera.position.z = z;
    camera.lookAt(0, 0, z + CAMERA.lookAtOffset);

    // O relógio do shader anda para trás, como no original.
    tempoDoShader += dt * RITMO_DO_TEMPO;
    for (const m of materiaisDeNuvem) m.userData.uniforms.gTime.value = tempoDoShader;
    if (materialTravessia) {
      materialTravessia.userData.uniforms.maxCloudBrowsing.value =
        1 - inverseLerp(FAIXA_TRAVESSIA.de, FAIXA_TRAVESSIA.ate, z);
    }

    /* O campo de pouso aparece conforme a câmera se aproxima, e deriva devagar
       para o mar de nuvens não ficar congelado. */
    if (pouso) {
      pouso.material.userData.uniforms.uFade.value =
        inverseLerp(POUSO.faixa.longe, POUSO.faixa.perto, z);
      for (const inst of pouso.instancias) inst.x += dt * POUSO.velocidade;
      /* `semOrdenar`: estas 120 nuvens derivam em **x**, nunca em z, então a
         ordem de trás para frente delas é a mesma do primeiro quadro até o
         último. Reordenar a cada quadro era refazer uma conta cujo resultado
         não muda — e, pior, reescrever o atributo de escala inteiro junto,
         mandando o buffer para a GPU de novo sem necessidade. */
      pouso.aplicar({ semOrdenar: true });
    }

    // As nuvens da travessia vêm em direção à câmera e dão a volta.
    if (travessia) travessia.avancar(dt);

    // O céu primeiro, com a câmera larga que só herda a rotação; depois a
    // cena por cima, com o buffer de profundidade limpo entre as duas.
    renderer.clear();
    cameraFundo.quaternion.copy(camera.quaternion);
    renderer.render(cenaFundo, cameraFundo);
    renderer.clearDepth();
    renderer.render(scene, camera);

    requestAnimationFrame(quadro);
  }

  const api = {
    montar,
    /**
     * Dispara o voo de 8s. A promessa resolve quando a câmera chega —
     * é ela que segura o texto da hero até o fim da viagem, como no original,
     * que só marcava a flag `entered` no fim da timeline.
     */
    voar() {
      inicioDoVoo = performance.now();
      return new Promise((ok) => { avisarChegada = ok; });
    },
    get progresso() { return scroll; },
    /** Exposto para depuração e para afinar a cena pelo console. */
    _interno: { get scene() { return scene; }, camera, get travessia() { return travessia; }, materiaisDeNuvem },
  };
  window.__cena = api;
  return api;
}
