/**
 * Universo de Luz — ponto de entrada
 *
 * É o único script referenciado no HTML. Ele monta as partes e conduz a
 * abertura, que corre sozinha do início ao fim:
 *
 *   1. a introdução (símbolo, nome e barra) aparece e mostra o carregamento
 *      das texturas da cena — ela dura o que o carregamento durar;
 *   2. quando termina, a introdução sai e o voo de 8s começa;
 *   3. dois segundos depois de a câmera parar, a oração e o menu entram.
 *
 * Nada neste projeto consulta `prefers-reduced-motion`. Já consultou, e foi um
 * erro grave: com a preferência ligada, as animações eram puladas, as esperas
 * viravam zero e esta ordem desmontava — a oração entrava durante o voo em vez
 * de no fim. A abertura é o conteúdo do site, não enfeite, e o projeto de
 * referência também não faz essa checagem.
 */

import { mostrarRodape } from './components/rodape/rodape.js';
import { mostrarCookies } from './components/cookies/cookies.js';
import { criarIntroducao } from './components/introducao/introducao.js';

/* A introdução começa antes de o three.js existir, e é por isso que o hero
   entra por `import()` e não no topo do arquivo.

   Com os dois no topo, o navegador precisa baixar e avaliar **todo** o grafo
   de módulos antes de rodar a primeira linha daqui — e nesse grafo está o
   three.js, quase 400 kB. Medido: a introdução só começava a desenhar 3,9s
   depois do carregamento, e nesses 3,9s a tela ficava parada no escuro. É a
   primeira coisa que se sente como travamento, mesmo não sendo.

   Assim a introdução arranca com o que ela mesma precisa (o gsap, que é
   pequeno) enquanto o three.js chega em paralelo. */
const intro = criarIntroducao(document.getElementById('introducao'));
intro.mostrar();

const { createHero } = await import('./components/hero/hero.js');
const hero = createHero(document.getElementById('hero'));

/* A barra recebe o progresso de verdade: é o `montar()` da cena que a move, a
   cada textura que termina de baixar. A introdução dura exatamente o que o
   carregamento durar — nem um instante a mais. */
await hero.montarCena(intro.progresso);
await intro.sair();

/* O rodapé e o aviso de cookies só agora: os dois são fixos no pé da tela e
   ficariam por cima do preloader, que cobre tudo. Aparecem junto com a cena, e
   somem da abertura. */
mostrarRodape();
mostrarCookies();
hero.voar();
