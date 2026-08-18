/**
 * YouTube — comportamento
 *
 * Porte de `site-antigo/site-UL/src/pages/youtube/youtube.tsx`. Duas coisas: a
 * lista de playlists, que lá era um literal dentro do JSX, e a entrada, que
 * era do Framer Motion.
 *
 * Os tempos são os do original: o título em 0,8s com atraso de 0,2s, saindo de
 * 20px abaixo e de 8px de desfoque; o subtítulo em 0,7s com atraso de 0,4s,
 * saindo de 16px e 6px de desfoque; o bloco do botão em 0,5s com atraso de
 * 0,6s; e a grade em 0,8s com atraso de 0,8s.
 *
 * A curva `[0.2, 0.8, 0.2, 1]` precisa do `CustomEase`: o GSAP **não** aceita
 * `cubic-bezier()` como string, e uma curva que ele não reconhece cai
 * silenciosamente no padrão. O `CustomEase` toma a mesma curva no formato de
 * traçado — "M0,0 C x1,y1 x2,y2 1,1" — que é a conversão direta dos quatro
 * números.
 */

import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { cobras } from '../comum/cobras.js';
import '../comum/nav.js';   // a barra se monta sozinha

gsap.registerPlugin(CustomEase);
CustomEase.create('suave', 'M0,0 C0.2,0.8 0.2,1 1,1');

/** Do literal dentro do JSX, sem alteração. */
const PLAYLISTS = [
  { label: 'Hinduísmo', videoId: 'Vi9cG1wAEQ0', link: 'https://www.youtube.com/watch?v=Vi9cG1wAEQ0&list=PLlwyMNQ7JxCjfdiGYQBLuRaFw2TV0eOaT' },
  { label: 'Orixás', videoId: 'NtLhlPbP4cw', link: 'https://www.youtube.com/watch?v=NtLhlPbP4cw&list=PLlwyMNQ7JxChirJZdcldDvhXZfUJSWHoe' },
  { label: 'Entidades Auxiliares', videoId: 'Xsr42eC3EmA', link: 'https://www.youtube.com/watch?v=Xsr42eC3EmA&list=PLlwyMNQ7JxCihBLTB7SxC6AZ9Og5zEXC4' },
  { label: 'Chakras', videoId: 'HB24ISctQbw', link: 'https://www.youtube.com/watch?v=HB24ISctQbw&list=PLlwyMNQ7JxCjj_Bsn_-Cp_II0K1DlHJZ6' },
  { label: 'Arcanjos', videoId: 'DfKC6x_hVH0', link: 'https://www.youtube.com/watch?v=DfKC6x_hVH0&list=PLlwyMNQ7JxCiBy5ouT07Vy4Ev2GyVb0l1' },
  { label: 'Xamanismo', videoId: 'UGyswblXraM', link: 'https://www.youtube.com/watch?v=UGyswblXraM&list=PLlwyMNQ7JxCit-UNiczPf236wMoLokcQu' },
];

/** O `<Youtube>` do lucide-react 0.544.0, com os atributos padrão. */
const ICONE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>`;

document.querySelector('.yt-grade').innerHTML = PLAYLISTS.map((p) => `
  <a class="yt-card" href="${p.link}" target="_blank" rel="noopener noreferrer">
    <div class="yt-thumb">
      <img src="https://img.youtube.com/vi/${p.videoId}/hqdefault.jpg" alt="${p.label}" loading="lazy">
      <div class="yt-thumb-veu"></div>
      <div class="yt-selo">${ICONE}</div>
    </div>
    <div class="yt-card-corpo">
      <span class="yt-card-etiqueta">Playlist</span>
      <h3 class="yt-card-titulo">${p.label}</h3>
    </div>
  </a>`).join('');

cobras(document.querySelector('.snake-bg'));

/* A entrada. */
gsap.from('.yt-title', {
  opacity: 0, y: 20, filter: 'blur(8px)', duration: 0.8, delay: 0.2, ease: 'suave',
});
gsap.from('.yt-subtitle', {
  opacity: 0, y: 16, filter: 'blur(6px)', duration: 0.7, delay: 0.4, ease: 'suave',
});
gsap.from('.yt-bloco', {
  opacity: 0, y: 16, duration: 0.5, delay: 0.6,
});
gsap.from('.yt-playlists-bloco', {
  opacity: 0, y: 20, duration: 0.8, delay: 0.8,
});
