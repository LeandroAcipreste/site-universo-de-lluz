/**
 * As cobrinhas de luz — porte de
 * `site-antigo/site-UL/src/pages/prayers/backgroundSnake.tsx`.
 *
 * Trinta traços prateados atravessando a tela sobre uma grade de 40px. Os
 * números são os do original: 30 cobrinhas, 50 linhas possíveis de partida,
 * duração de 25 a 50s, atraso de 0 a 20s, comprimento de 150 a 350px, 6px de
 * espessura e opacidade 0,85.
 *
 * Cada traço tem duas máscaras: o gradiente pinta prata nas bordas e preto no
 * meio (é o que dá o aspecto de tubo), e a máscara apaga as duas pontas, o que
 * faz a cabeça e a cauda entrarem e saírem sem corte.
 *
 * O movimento era do Framer Motion, em laço infinito e linear; aqui é do GSAP,
 * com os mesmos tempos.
 */

import gsap from 'gsap';

const GRADE = 40;
const QUANTAS = 30;
const MAX_LINHAS = 50;

export function cobras(raiz) {
  const grade = document.createElement('div');
  grade.className = 'snake-bg__grid';
  grade.style.backgroundSize = `${GRADE}px ${GRADE}px`;

  const caixa = document.createElement('div');
  caixa.className = 'snake-bg__snakes';

  raiz.append(grade, caixa);

  for (let i = 0; i < QUANTAS; i++) {
    const horizontal = Math.random() > 0.5;
    const invertida = Math.random() > 0.5;
    const partida = Math.floor(Math.random() * MAX_LINHAS);
    const duracao = 25 + Math.random() * 25;
    const atraso = Math.random() * 20;
    const tamanho = 150 + Math.random() * 200;

    const gradiente = horizontal
      ? 'linear-gradient(to bottom, #DDE0E3 0%, #DDE0E3 25%, #000000 25%, #000000 75%, #DDE0E3 75%, #DDE0E3 100%)'
      : 'linear-gradient(to right, #DDE0E3 0%, #DDE0E3 25%, #000000 25%, #000000 75%, #DDE0E3 75%, #DDE0E3 100%)';

    const mascara = horizontal
      ? (invertida
        ? 'linear-gradient(270deg, transparent 0%, black 20%, black 80%, transparent 100%)'
        : 'linear-gradient(90deg, transparent 0%, black 20%, black 80%, transparent 100%)')
      : (invertida
        ? 'linear-gradient(360deg, transparent 0%, black 20%, black 80%, transparent 100%)'
        : 'linear-gradient(180deg, transparent 0%, black 20%, black 80%, transparent 100%)');

    const traco = document.createElement('div');
    traco.className = 'snake-item';
    Object.assign(traco.style, {
      width: horizontal ? `${tamanho}px` : '6px',
      height: horizontal ? '6px' : `${tamanho}px`,
      background: gradiente,
      WebkitMaskImage: mascara,
      maskImage: mascara,
      boxShadow: '0 0 12px 1px rgba(255, 255, 255, 0.45)',
      opacity: '0.85',
    });
    caixa.append(traco);

    /* Percurso: a horizontal entra por um lado e sai pelo outro mantendo a
       linha da grade; a vertical faz o mesmo de cima para baixo. */
    const de = {
      x: horizontal ? (invertida ? window.innerWidth : -tamanho) : partida * GRADE,
      y: horizontal ? partida * GRADE : (invertida ? window.innerHeight : -tamanho),
    };
    const para = {
      x: horizontal ? (invertida ? -tamanho : window.innerWidth) : de.x,
      y: horizontal ? de.y : (invertida ? -tamanho : window.innerHeight),
    };

    gsap.set(traco, de);
    gsap.to(traco, {
      ...para,
      duration: duracao,
      delay: atraso,
      repeat: -1,
      ease: 'none',
    });
  }
}
