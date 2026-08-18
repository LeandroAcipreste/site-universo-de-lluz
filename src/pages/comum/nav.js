/**
 * A barra das páginas internas — porte de
 * `site-antigo/site-UL/src/components/siteNav.tsx`.
 *
 * Ela se monta sozinha: cada página só importa este módulo. É o equivalente a
 * lá renderizar `<SiteNav />` na casca do app — o HTML não repete quarenta
 * linhas de marcação cinco vezes, e acrescentar uma página é acrescentar uma
 * linha em `ENTRADAS`.
 *
 * A página em que se está é descoberta pelo endereço e marcada com
 * `aria-current="page"`, que é o que o CSS usa para destacá-la. No original
 * isso vinha do `window.location.pathname` do mesmo jeito.
 *
 * Uma coisa de lá **não** veio: a navegação por `window.location.href`. Ela
 * existia para a troca de página descartar as instâncias de GSAP e Lenis em
 * vez de acumulá-las; com âncoras de verdade isso é o comportamento nativo, e
 * de quebra o link funciona com o botão do meio e com "abrir em nova aba".
 */

import { mostrarRodape } from '/src/components/rodape/rodape.js';

export const ENTRADAS = [
  { rotulo: 'Página inicial', caminho: '/' },
  { rotulo: 'Conheça-nos', caminho: '/meet-us' },
  { rotulo: 'Orações', caminho: '/prayers' },
  { rotulo: 'Limpezas', caminho: '/cleansing' },
  { rotulo: 'Defesas', caminho: '/defense' },
  { rotulo: 'Oráculo', caminho: '/oracle' },
  { rotulo: 'YouTube', caminho: '/youtube' },
];

export const INSTAGRAM = 'https://www.instagram.com/grupouniversodeluz/';

/** O `<Instagram>` do lucide-react 0.544.0, com os atributos padrão. */
const ICONE_INSTA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16
  11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`;

const aqui = window.location.pathname.replace(/\/$/, '') || '/';
const atual = (caminho) => (caminho === aqui ? ' aria-current="page"' : '');

const barra = document.createElement('header');
barra.className = 'nav';
barra.innerHTML = `
  <a class="nav__marca" href="/" aria-label="Universo de Luz — página inicial">
    <img src="/public/img/logo.svg" alt="" aria-hidden="true">
    <img src="/src/pages/comum/img/nome.svg" alt="Universo de Luz">
  </a>

  <nav class="nav__lista" aria-label="Principal">
    ${ENTRADAS.map((e) =>
      `<a class="nav__item" href="${e.caminho}"${atual(e.caminho)}>${e.rotulo}</a>`).join('')}
  </nav>

  <button class="nav__gatilho" type="button" aria-expanded="false"
          aria-controls="nav-folha" aria-label="Abrir menu">
    <span class="nav__barras" aria-hidden="true"><span></span><span></span></span>
  </button>`;

const folha = document.createElement('div');
folha.className = 'nav-folha';
folha.id = 'nav-folha';
folha.setAttribute('aria-hidden', 'true');
folha.innerHTML = `
  <ul class="nav-folha__lista">
    ${ENTRADAS.map((e, i) => `
      <li>
        <a class="nav-folha__item" href="${e.caminho}" style="--i: ${i}"${atual(e.caminho)}>
          <span class="nav-folha__num">${String(i + 1).padStart(2, '0')}</span>
          ${e.rotulo}
        </a>
      </li>`).join('')}
  </ul>

  <div class="nav-folha__pe">
    <a class="nav-folha__insta" href="${INSTAGRAM}" target="_blank" rel="noopener noreferrer">
      ${ICONE_INSTA}
      @grupouniversodeluz
    </a>
  </div>`;

document.body.prepend(barra, folha);

// ── abrir e fechar ──
const gatilho = barra.querySelector('.nav__gatilho');

function alternar(abrir) {
  barra.classList.toggle('esta-aberto', abrir);
  folha.classList.toggle('esta-aberto', abrir);
  folha.setAttribute('aria-hidden', String(!abrir));
  gatilho.setAttribute('aria-expanded', String(abrir));
  gatilho.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
  /* Trancar o corpo enquanto a folha está aberta, como no original — senão o
     navegador do celular rola o que está atrás dela. */
  document.body.style.overflow = abrir ? 'hidden' : '';
}

gatilho.addEventListener('click', () => alternar(!barra.classList.contains('esta-aberto')));

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && barra.classList.contains('esta-aberto')) alternar(false);
});

/* Nada a esperar aqui: a página já está na tela quando este módulo roda. Na
   inicial é diferente — ver o main.js. */
mostrarRodape();
