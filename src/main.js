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

/**
 * A revelação de emergência: oração e menu na tela, sem GSAP e sem cena.
 *
 * Existe para o caso em que nem o `hero` chega a ser criado — e o caso real é
 * WebGL indisponível, porque `criarCena()` constrói o `WebGLRenderer` na
 * primeira linha e ele **lança** quando o navegador nega o contexto. Aparelho
 * antigo, GPU na lista de bloqueio do Chrome, política corporativa: acontece.
 *
 * As peças nascem apagadas e deslocadas pelo CSS, esperando alguém trazê-las.
 * Aqui esse alguém escreve estilo inline direto, que é o único jeito que não
 * depende de nada mais ter carregado.
 */
function revelarSemCena() {
  const card = document.querySelector('.oracao');
  const menu = document.querySelector('.menu');

  if (card) {
    card.hidden = false;
    card.style.opacity = '1';
    card.style.transform = 'none';
    for (const bloco of card.children) bloco.style.opacity = '1';
  }

  if (menu) {
    menu.hidden = false;
    for (const peca of menu.querySelectorAll('.menu__gatilho, .menu__item')) {
      peca.style.opacity = '1';
      peca.style.transform = 'none';
    }
  }
}

let hero = null;
try {
  const { createHero } = await import('./components/hero/hero.js');
  hero = createHero(document.getElementById('hero'));
} catch (e) {
  console.error('Abertura: o hero não pôde ser criado — provavelmente WebGL indisponível.', e);
}

/* ── A abertura, e o que fazer quando ela não pode acontecer ──

   Tudo daqui para baixo estava sem rede de segurança. `montarCena` roda no
   topo do módulo, e `await` no topo do módulo que rejeita **mata a avaliação
   do módulo**: nada depois roda. Nem a saída da introdução, nem o rodapé, nem
   o voo, nem a oração, nem o menu, nem o aviso de cookies. O visitante ficava
   com o logo e a barra parada numa porcentagem qualquer, para sempre, sem
   mensagem nenhuma.

   Uma textura que dê 404, um pacote perdido no celular, um proxy que corte a
   conexão, uma GPU que recuse o contexto WebGL — qualquer um deles bastava.

   Agora há três camadas, da mais fina para a mais grossa:

   1. Cada textura falha sozinha (`cena.js`), e o que falta vira uma reserva
      branca de 1×1. Falta uma nuvem, não falta o site.
   2. Um prazo de 45s no conjunto, para o pedido que nunca responde não
      prender a página. Já aconteceu aqui, com o gsap na CDN.
   3. Este `try`. Se a montagem quebrar por outro motivo — WebGL indisponível,
      shader que não compila —, a introdução sai do mesmo jeito e o conteúdo
      aparece sem o voo.

   No caminho de exceção não há cena para atravessar, então `hero.reveal()`
   entra direto no lugar do `hero.voar()`. O fundo continua bom: o `.hero` tem
   o gradiente do céu no CSS, justamente para o caso de alguma camada não
   chegar, e a oração se lê sobre ele.

   O que **não** se faz aqui é esconder o problema. Sem cena o site fica
   servível, não fica certo, e quem estiver depurando precisa ver o motivo. */

let cenaPronta = Boolean(hero);

if (hero) {
  try {
    /* A barra recebe o progresso de verdade: é o `montar()` da cena que a
       move, a cada textura que termina de baixar. A introdução dura exatamente
       o que o carregamento durar — nem um instante a mais. */
    const { falhas, expirou } = await hero.montarCena(intro.progresso);
    if (expirou) console.warn('Abertura: prazo das texturas esgotado; a cena vai com o que chegou.');
    if (falhas.length) console.warn('Abertura: texturas em falta —', falhas);
  } catch (e) {
    cenaPronta = false;
    console.error('Abertura: a cena não pôde ser montada. Seguindo sem ela.', e);
  }
}

await intro.sair();

/* O rodapé só agora: ele é fixo no pé da tela e ficaria por cima do
   preloader, que cobre tudo. Aparece junto com a cena, e some da abertura. */
mostrarRodape();

if (!hero) {
  /* Nem cena, nem `reveal()` do hero: a revelação é a de emergência, escrita
     à mão logo acima. */
  revelarSemCena();
} else if (cenaPronta) {
  /* O voo, 8s, e a oração entrando 2s depois de a câmera parar — o `voar()`
     só resolve quando tudo isso terminou. */
  await hero.voar();
} else {
  /* Sem cena não há voo nem triângulo para esperar: o conteúdo entra na hora,
     sobre o gradiente de céu do CSS. */
  hero.reveal();
}

/* O aviso de cookies espera a abertura terminar. Ele é uma faixa opaca no pé
   da tela, e subindo junto com a cena apareceria por cima da travessia das
   nuvens, que é a abertura inteira do site. Nada nele é urgente: enquanto
   ninguém responde, o único efeito é o mapa do Oráculo não carregar, e o
   Oráculo está a um clique de distância daqui. */
mostrarCookies();
