/**
 * Privacidade e Termos — comportamento
 *
 * Quase nada: a página é documento, e documento não precisa de JavaScript
 * para ser lido. As duas únicas coisas são a barra (que se monta sozinha) e os
 * botões "rever a minha escolha de cookies", que reabrem o aviso.
 *
 * Não há animação de entrada aqui, de propósito. Nas outras páginas o GSAP faz
 * o conteúdo chegar; num texto que alguém pode estar procurando com pressa —
 * ou lendo com um leitor de tela —, conteúdo que começa invisível é conteúdo
 * que pode não chegar. Esta página nasce pronta.
 */

import { reverCookies } from '/src/components/cookies/cookies.js';
import '../comum/nav.js';   // a barra se monta sozinha

for (const botao of document.querySelectorAll('[data-acao="rever-cookies"]')) {
  botao.addEventListener('click', reverCookies);
}
