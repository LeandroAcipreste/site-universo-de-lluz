/**
 * O rodapé — o mesmo em todas as páginas.
 *
 * Não veio do site antigo: lá não existia rodapé nenhum. O que veio de lá são
 * os endereços, que estavam espalhados pelos componentes — o Instagram do
 * grupo no `siteNav.tsx` e o WhatsApp no `oracle.tsx`.
 *
 * Ele se monta sozinho, como a barra de cima, e por isso nenhuma página repete
 * a marcação. Mas **não aparece sozinho**: quem chama `mostrarRodape()` é cada
 * página, e a razão é a inicial — lá o preloader cobre a tela por alguns
 * segundos, e um rodapé por cima dele estragaria a abertura. Nas páginas
 * internas a chamada é imediata.
 */

export const INSTAGRAM = 'https://www.instagram.com/grupouniversodeluz/';
export const WHATSAPP = 'https://wa.me/5571996612421';
export const DESENVOLVEDOR = 'https://www.instagram.com/leandroaciprestedesenvolvedor/';

/** O `<Instagram>` do lucide-react 0.544.0, com os atributos padrão. */
const ICONE_INSTAGRAM = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16
  11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`;

/* O do WhatsApp é desenhado aqui, e não copiado do lucide: a biblioteca não
   tem ícones de marca — ela os removeu justamente por serem propriedade de
   terceiros. Este é o contorno do balão com o fone, em preenchimento, para
   ficar da mesma família visual do de cima. */
const ICONE_WHATSAPP = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
  fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0
  1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45
  9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0
  1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23
  8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24
  8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43l-.48-.01c-.17
  0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24
  3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6
  1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z"/></svg>`;

const rodape = document.createElement('footer');
rodape.className = 'rodape';
rodape.innerHTML = `
  <div class="rodape__redes">
    <a href="${INSTAGRAM}" target="_blank" rel="noopener noreferrer">
      ${ICONE_INSTAGRAM}
      <span class="rodape__rotulo">@grupouniversodeluz</span>
    </a>
    <a href="${WHATSAPP}" target="_blank" rel="noopener noreferrer">
      ${ICONE_WHATSAPP}
      <span class="rodape__rotulo">WhatsApp</span>
    </a>
  </div>

  <p class="rodape__credito">
    desenvolvido por
    <a href="${DESENVOLVEDOR}" target="_blank" rel="noopener noreferrer">@leandroaciprestedesenvolvedor</a>
  </p>`;

document.body.append(rodape);

/** Traz o rodapé. Cada página escolhe quando — ver a nota do topo. */
export function mostrarRodape() {
  rodape.classList.add('esta-visivel');
}
