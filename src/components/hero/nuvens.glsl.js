/**
 * O shader das nuvens.
 *
 * Extraído tal e qual do `CloudNoisePlugin` do motor do quadplex80 — é GLSL,
 * texto puro, então é o mesmo shader, não uma imitação. É ele que faz um PNG
 * chapado de nuvem parecer volume: distorce a UV da textura com uma textura de
 * ruído animada e **corrói o alfa** com mais três amostras de ruído, o que dá
 * as bordas esgarçadas que se mexem.
 *
 * No original, o plugin injetava estes trechos num sistema de materiais
 * próprio. Aqui eles entram pelo `onBeforeCompile` do three.js, que é o
 * mecanismo padrão para o mesmo fim: emendar GLSL nos materiais embutidos.
 *
 * Uniforms:
 *   uNoiseTxt         /public/img/cena/cnoise.png, com wrap repetido
 *   gTime             relógio que anda para trás: `t -= dt * 1.5`
 *   cloudSpeed        0.5 nas camadas de nuvem
 *   uRenderMode       0 = nuvem normal, 1 = variante mais rala
 *   maxCloudBrowsing  só usado com USE_FADE
 *
 * Atributo:
 *   cloudScale  vec2, [1,1]. Negativo espelha a UV naquele eixo.
 */

/** Vai antes do main() do vertex shader. */
export const VERTEX_PREFIX = /* glsl */ `
#ifdef USE_FADE
    varying vec3 vEye;
    varying vec3 vWorldP;
#endif

attribute vec2 cloudScale;
varying vec2 vCloudScale;
`;

/**
 * Vai no fim do main() do vertex shader.
 *
 * Aqui há a **única** diferença em relação ao original, e ela é obrigatória.
 * Lá o trecho era `vWorldP = transformed.xyz`, porque no sistema de materiais
 * deles o `transformed` já chegava transformado pela instância. Nos chunks do
 * three.js, `transformed` é a posição **local** do vértice — num plano, z ≈ 0.
 *
 * Deixar como estava fazia o `smoothstep(0.0, -50.0, vWorldP.z)` do
 * FADE_ON_APPEAR dar zero para todo mundo, e as 240 nuvens da travessia
 * sumiam por completo. A posição de mundo precisa ser calculada.
 *
 * O `vEye` não precisa de ajuste: quando este trecho entra, o `mvPosition` já
 * passou pelo `<project_vertex>`, que aplica a matriz da instância.
 */
export const VERTEX_SUFFIX = /* glsl */ `
#ifdef USE_FADE
    vEye = mvPosition.xyz;
    #ifdef USE_INSTANCING
        vWorldP = ( modelMatrix * instanceMatrix * vec4( transformed, 1.0 ) ).xyz;
    #else
        vWorldP = ( modelMatrix * vec4( transformed, 1.0 ) ).xyz;
    #endif
#endif

vCloudScale = cloudScale;
`;

/** Vai antes do main() do fragment shader. */
export const FRAGMENT_PREFIX = /* glsl */ `
uniform sampler2D uNoiseTxt;
#define cloud_plugin 1.0
uniform float gTime;
uniform int uRenderMode;

#ifdef USE_FADE
    varying vec3 vEye;
    uniform float maxCloudBrowsing;
    varying vec3 vWorldP;
#endif

varying vec2 vCloudScale;
uniform float cloudSpeed;
`;

/**
 * Entra no lugar da linha
 *   vec4 diffuseColor = vec4( diffuse, opacity );
 * do MeshBasicMaterial, e é seguido por
 *   vec4 diffuseColor = vec4( final.rgb * diffuse.rgb, final.a );
 *
 * Os ramos `uRenderMode == 2` e `USE_FADE` vieram junto por fidelidade, mas
 * não são usados pelas camadas da abertura (que rodam em modo 0, sem fade).
 */
export const FRAGMENT_CLOUD = /* glsl */ `
vec2 baseUv = vec2( vMapUv.x, vMapUv.y);
if(vCloudScale.x < 0.0){
    baseUv.x = 1.0 - baseUv.x;
}
if( vCloudScale.y < 0.0){
    baseUv.y = 1.0 - baseUv.y;
}

#ifdef USE_FADE

    float time = gTime * 0.03 * cloudSpeed;
    float timeA = gTime * 0.022 * cloudSpeed;
    vec2 uvShift1 = (texture2D(uNoiseTxt, vMapUv * vec2(3.0, 3.0) + vec2(time, 0.0)).rg - .5) * .006;
    vec2 uvShift2 = (texture2D(uNoiseTxt, vMapUv * vec2(2.8, 3.5) + vec2(time, 0.0)).rg - .5) * .012;

    vec2 nUv = vec2( baseUv ) + uvShift1 + uvShift2;

    vec4 final = texture2D(map, nUv);
    float alpha = final.a;

    alpha = clamp(alpha, 0.0, 1.0);
    final.a = alpha;

    float distToCamera = smoothstep(FADE_DISTANCE_MIN ,FADE_DISTANCE_MAX, -vEye.z);
    float appear       = smoothstep(APPEAR_DISTANCE_MAX, APPEAR_DISTANCE_MIN, -vEye.z);

    final.a *= distToCamera * appear * maxCloudBrowsing;

    #ifdef FADE_ON_APPEAR
        float distToApparition = smoothstep( 0.0, -50.0, vWorldP.z);
        final.a *= distToApparition;
    #endif

#else

    float time = gTime * 0.03 * cloudSpeed;
    float timeA = gTime * 0.022 * cloudSpeed;
    vec2 uvShift1 = (texture2D(uNoiseTxt, vMapUv * vec2(3.0, 3.0) + vec2(time, 0.0)).rg - .5) * .006;
    vec2 uvShift2 = (texture2D(uNoiseTxt, vMapUv * vec2(2.8, 3.5) + vec2(time, 0.0)).rg - .5) * .012;
    vec2 nUv = baseUv + uvShift1 + uvShift2;

    vec4 final = texture2D(map, nUv);
    float alpha = final.a;

    if(uRenderMode == 0) {
        alpha *= 1. - (texture2D(uNoiseTxt, vMapUv * vec2(5., 2.) + timeA).g - .5) * smoothstep(1.0, 0.45, alpha) * 7.0;
        float af1 = 1. - (texture2D(uNoiseTxt, vMapUv * vec2(2., 1.8) + vec2(timeA * 0.8, timeA * 0.2)).g - .5) * 2.0;
        float af2 = 1. - (texture2D(uNoiseTxt, vMapUv * vec2(3., 1.4) + vec2(timeA * 0.5, timeA * 0.2)).g - .5) * 2.0;
        alpha *= af1;
        alpha *= af2;
    }
    else if(uRenderMode == 1) {
        alpha *= 1. - (texture2D(uNoiseTxt, vMapUv * vec2(5., 2.) + timeA * 2.0).g - .5) * smoothstep(0.7, 0.15, alpha) * 7.0;
        alpha = smoothstep(0.1, 0.9, alpha) * 0.45;
    }

    alpha = clamp(alpha, 0.0, 1.0);
    alpha *= 1.0;
    final.a = alpha;

#endif

if( final.a < 0.001 ) discard;
`;

/** A linha do MeshBasicMaterial que o trecho acima substitui. */
export const DIFFUSE_LINE = 'vec4 diffuseColor = vec4( diffuse, opacity );';

/** O que vai no lugar dela, depois do bloco da nuvem. */
export const DIFFUSE_REPLACEMENT =
  'vec4 diffuseColor = vec4( final.rgb * diffuse.rgb, final.a );';
