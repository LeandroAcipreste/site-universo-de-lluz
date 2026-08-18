/**
 * O aviso de cookies — e o consentimento que ele guarda.
 *
 * Este módulo não é enfeite jurídico: ele **decide** se um terceiro pode ser
 * carregado. Quem quiser embutir algo de fora chama `quandoAceitar()` e só
 * carrega dentro do retorno de chamada. Enquanto não houver "aceito", o
 * terceiro não é pedido — e é isso que a lei quer dizer com consentimento
 * prévio. Um aviso que só informa, e carrega o terceiro do mesmo jeito, não
 * consente nada.
 *
 * O que este site realmente usa, e por isso o que o aviso promete:
 *
 * - **Nada de análise, nada de anúncio, nada de rastreio.** Não há Google
 *   Analytics, pixel, tag manager nem nada do gênero. Procurar por `gtag`,
 *   `fbq` ou `document.cookie` no projeto não devolve nada.
 * - **O mapa do Google**, na página do Oráculo, é o único embutido que põe
 *   cookie. É ele que este consentimento controla.
 * - **As miniaturas do YouTube** (`img.youtube.com`) são imagens: não põem
 *   cookie, mas o pedido leva o IP de quem visita até o Google. Está dito na
 *   política.
 *
 * A escolha mora no `localStorage`, não num cookie. É o armazenamento
 * estritamente necessário para lembrar a própria recusa — guardar isso num
 * cookie para poder recusar cookies seria uma piada de mau gosto.
 */

const CHAVE = 'udl-cookies';
const ACEITO = 'aceito';
const RECUSADO = 'recusado';

/* O acesso ao `localStorage` vai embrulhado: em navegação privada de alguns
   navegadores, e com cookies de terceiros bloqueados em iframe, só de *ler* a
   propriedade já se toma uma exceção. Sem isto, o site inteiro quebraria para
   quem navega assim — e justamente para quem mais cuida da privacidade. */
const leia = () => {
  try { return localStorage.getItem(CHAVE); } catch { return null; }
};
const grave = (v) => {
  try { localStorage.setItem(CHAVE, v); } catch { /* nada a fazer, e tudo bem */ }
};

/** Já houve decisão? Qual? */
export const escolha = () => leia();
export const aceitou = () => leia() === ACEITO;

/* Quem está esperando o "sim". Se já houver "sim" guardado, roda na hora. */
const esperando = [];

/**
 * Roda `acao` quando (e se) houver consentimento — agora, se já foi dado, ou
 * no clique em "Aceitar". Nunca roda sob recusa.
 */
export function quandoAceitar(acao) {
  if (aceitou()) { acao(); return; }
  esperando.push(acao);
}

// ── O aviso ──────────────────────────────────────────────────────────────────

const aviso = document.createElement('div');
aviso.className = 'cookies';
aviso.setAttribute('role', 'dialog');
aviso.setAttribute('aria-live', 'polite');
aviso.setAttribute('aria-label', 'Aviso de cookies');
aviso.innerHTML = `
  <div class="cookies__texto">
    <p class="cookies__titulo">Cookies e conteúdo de terceiros</p>
    <p class="cookies__linha">
      Este site não usa cookies de análise nem de publicidade. Pedimos a sua
      autorização só para carregar o <strong>mapa do Google</strong> na página
      do Oráculo, que é de terceiro e põe cookies próprios.
      <a href="/privacy">Ler a política</a>.
    </p>
  </div>

  <div class="cookies__acoes">
    <button type="button" class="cookies__btn cookies__btn--recusar" data-acao="recusar">
      Só o necessário
    </button>
    <button type="button" class="cookies__btn cookies__btn--aceitar" data-acao="aceitar">
      Aceitar
    </button>
  </div>`;

function decidir(valor) {
  grave(valor);
  aviso.classList.remove('esta-visivel');
  /* Sai do fluxo depois da transição, para não continuar sendo alcançável
     pelo teclado enquanto ainda esmaece. */
  setTimeout(() => aviso.remove(), 400);
  if (valor === ACEITO) {
    while (esperando.length) esperando.shift()();
  }
}

aviso.addEventListener('click', (e) => {
  const botao = e.target.closest('[data-acao]');
  if (botao) decidir(botao.dataset.acao === 'aceitar' ? ACEITO : RECUSADO);
});

/**
 * Põe o aviso na tela, se ainda não houve decisão. Cada página escolhe quando
 * chamar — na inicial isso é depois da abertura, como o rodapé, senão o aviso
 * apareceria por cima do preloader.
 */
export function mostrarCookies() {
  if (leia()) return;                   // já decidiu, não se pergunta de novo
  if (aviso.isConnected) return;
  document.body.append(aviso);
  // Um quadro de intervalo para a transição de entrada valer.
  requestAnimationFrame(() => requestAnimationFrame(() => aviso.classList.add('esta-visivel')));
}

/**
 * Reabre a escolha — é o que o link "Rever cookies" da política chama. Sem
 * isto, quem recusou uma vez não teria como mudar de ideia, e poder mudar de
 * ideia faz parte do consentimento.
 */
export function reverCookies() {
  try { localStorage.removeItem(CHAVE); } catch { /* idem */ }
  mostrarCookies();
}
