/**
 * Rolagem por gesto — porte de
 * `site-antigo/site-UL/src/layouts/MobileScrollFactory.tsx`.
 *
 * A roda do mouse e o arrasto do dedo não rolam a página: eles avançam ou
 * voltam um card. A lógica é a mesma do original, inclusive o detalhe que a
 * faz funcionar — `isScrollableTarget`, que sobe a árvore a partir do alvo do
 * gesto procurando um elemento que role de verdade. Se achar um que ainda não
 * chegou ao fim (ou ao topo, descendo), o gesto é dele: é o que deixa o texto
 * comprido de um card rolar por dentro sem trocar de card.
 *
 * O trancamento do `body` também veio de lá: sem ele o navegador do celular
 * faz o repique elástico por cima de tudo.
 *
 * @param {HTMLElement} el       o container que recebe os gestos
 * @param {() => void} aoSubir   gesto para a frente (roda para baixo, dedo para cima)
 * @param {() => void} aoDescer  gesto para trás
 * @param {number} limiar        distância mínima do arrasto, em px
 */
export function rolagemPorGesto(el, aoSubir, aoDescer, limiar = 30) {
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
  document.body.style.height = '100%';

  let inicioY = 0;

  const alvoRolavel = (alvo, deltaY) => {
    let atual = alvo;
    while (atual && atual !== el) {
      const estilo = window.getComputedStyle(atual);
      if (estilo.overflowY === 'auto' || estilo.overflowY === 'scroll') {
        const noTopo = atual.scrollTop <= 0;
        const noFim = atual.scrollTop + atual.clientHeight >= atual.scrollHeight - 1;
        if (deltaY > 0 && !noFim) return true;    // descendo dentro do card
        if (deltaY < 0 && !noTopo) return true;   // subindo dentro do card
      }
      atual = atual.parentElement;
    }
    return false;
  };

  el.addEventListener('wheel', (e) => {
    if (alvoRolavel(e.target, e.deltaY)) return;
    e.preventDefault();
    if (e.deltaY > 0) aoSubir();
    else if (e.deltaY < 0) aoDescer();
  }, { passive: false });

  el.addEventListener('touchstart', (e) => {
    inicioY = e.touches[0].clientY;
  }, { passive: true });

  el.addEventListener('touchmove', (e) => {
    const deltaY = inicioY - e.touches[0].clientY;
    if (!alvoRolavel(e.target, deltaY)) e.preventDefault();
  }, { passive: false });

  el.addEventListener('touchend', (e) => {
    const deltaY = inicioY - e.changedTouches[0].clientY;
    if (alvoRolavel(e.target, deltaY)) return;
    if (Math.abs(deltaY) < limiar) return;
    if (deltaY > 0) aoSubir();
    else aoDescer();
  }, { passive: true });
}
