/**
 * Conheça-nos — comportamento
 *
 * Porte de dois arquivos do site antigo, sem React:
 *
 *   site-antigo/site-UL/src/components/particlesBackground.tsx  → `comum/particulas.js`
 *   site-antigo/site-UL/src/pages/meetUs/meetUs.tsx (o useGSAP) → a chamada final
 *
 * A lógica é a mesma linha por linha: os mesmos números, a mesma paleta, as
 * mesmas distâncias de ligação. O que mudou foi só a casca — o `useEffect`
 * vira uma função, o `useRef` vira um `querySelector`, e a limpeza que o React
 * fazia ao desmontar deixa de existir porque a página não desmonta.
 */

import gsap from 'gsap';
import { particulas } from '../comum/particulas.js';
import '../comum/nav.js';   // a barra se monta sozinha

particulas(document.querySelector('.meetus-particles'));

/* A entrada. O estado de partida — `opacity: 0` e `translateY(40px)` — está no
   `.meetus-anim` da folha, como no original; aqui só se anima até o natural. */
gsap.to('.meetus-anim', {
  y: 0,
  opacity: 1,
  duration: 1.2,
  stagger: 0.15,
  ease: 'power3.out',
  delay: 0.2,
});
