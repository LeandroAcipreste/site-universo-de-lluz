# Universo de Luz

Site de página única com uma abertura em WebGL: o logo se desenha, e em
seguida a câmera atravessa um mar de nuvens até parar no triângulo, onde a
oração aparece.

## Rodar

```
node server.js 8177
```

E abrir <http://localhost:8177/src/universo-de-luz.html>.

O `server.js` é um servidor estático simples, feito só com built-ins do Node.

## Dependências

Não há npm, nem `package.json`, nem build. As duas bibliotecas — three e gsap —
são declaradas no mapa de importação, dentro do próprio HTML, e os arquivos
moram em `public/lib/`, servidos pelo próprio site. É a única declaração de
dependência do projeto: para trocar de versão, baixa-se o arquivo novo em
`public/lib/` e ajusta-se o caminho ali, em lugar nenhum mais.

> Estiveram numa CDN e o preço apareceu duas vezes: o pedido do gsap saía e
> nunca voltava, o grafo de módulos não completava e a página inteira ficava
> sem JavaScript, sem nenhuma mensagem no console. O porquê completo está no
> comentário do mapa de importação, no HTML.

## Estrutura

```
src/universo-de-luz.html      a página — duas folhas de estilo, um script
src/style.css                 o global, e importa as folhas das partes
src/transicao.css             a transição entre páginas, por <link> próprio
src/main.js                   o ponto de entrada, que conduz a abertura
src/components/introducao/    a animação do logo
src/components/hero/          a cena 3D, a oração e o menu
src/components/rodape/        o rodapé
src/pages/                    as páginas internas, uma pasta cada
public/fontes/                as três fontes
public/img/                   logo e fundo; `img/cena/` são as texturas da cena
public/lib/                   three e gsap, servidos daqui e não de CDN
vercel.json                   as rotas e a configuração de implantação
```

## A implantação

Não há build: a Vercel serve os arquivos como estão. Quem diz isso são quatro
chaves no `vercel.json`, e elas não são decoração.

```
"framework": null      "Other" — nenhum framework
"buildCommand": ""     não construa nada
"installCommand": ""   não instale nada
"outputDirectory": "." sirva a raiz do repositório
```

O projeto na Vercel nasceu do site antigo em React e ficou com a predefinição
**Vite** gravada no painel. Quando o React saiu, a predefinição continuou lá: a
implantação rodava `vite build`, não achava o `vite` — que foi embora com o
`package.json` — e morria com `exited with 127`. O que está no `vercel.json`
tem precedência sobre o painel, então a correção mora no repositório e vale
para qualquer clone. Apagar essas quatro linhas devolve o painel ao comando, e
o erro volta.

## As páginas internas

Vêm do site antigo em React (`site-antigo/site-UL/src/pages/`), portadas sem
framework: do `.tsx` sai a marcação para o `.html` e o comportamento para o
`.js`, e o `.css` é cópia literal. Onde a página tem conteúdo de cards, o
`.ts` de dados virou um `dados.js` dentro da própria pasta.

```
src/pages/comum/       o que mais de uma página usa
src/pages/meet-us/     Conheça-nos
src/pages/prayers/     Orações      + dados.js
src/pages/defense/     Defesas      + dados.js
src/pages/oracle/      Oráculo
src/pages/book/        O livro      — não veio do React
src/pages/youtube/     YouTube
```

`book/` é a única que não é porte: foi escrita aqui. Ela toma emprestado do
Oráculo o fundo, a sobreposição, as partículas, o gradiente prata do título e
a pílula de vidro do botão, de propósito — as duas falam da mesma pessoa, e o
livro é oferecido no fim do card do Oráculo.

E é a única que **rola**. Isso tem uma consequência que não é óbvia: o rodapé
do site é `position: fixed`, o que só funciona em página que cabe numa tela.
Aqui ele ficava carimbado no meio da sinopse, e por isso o `book.css` o passa
para `absolute` com `position: relative` no `body`. Qualquer página futura que
role precisa fazer o mesmo.

Uma pasta por página, com o `.html`, o `.css`, o `.js` e um `img/` próprio
quando tem imagem só dela.

`comum/` não é uma página: é o que no site antigo morava em `components/` e
`layouts/`, e continua compartilhado aqui — o fundo, as partículas, as
cobrinhas de luz, a rolagem por gesto, o carrossel de cards (que Orações e
Defesas usam igual) e o `base.css`. Duplicar isso cinco vezes seria pior do que
tê-lo num lugar só.

Nenhuma página interna carrega o `src/style.css` — o porquê está em
`comum/base.css`, e é a coisa mais importante para entender antes de mexer
nelas.

**Os caminhos dentro dessas páginas têm de partir da raiz.** As rotas limpas
(`/meet-us`, `/prayers`, …) são reescritas, e em `/oracle` um
`href="oracle.css"` resolveria para `/oracle.css`. Já custou um bug.

Cada uma é uma página **solta**: não carrega o `src/style.css`. Lá o `html` tem
`font-size: clamp(1px, 10 * 100vw / var(--size), 12px)` — 1rem ≈ 10px — para a
hero escalar junto com a viewport, e as folhas copiadas foram escritas para o
padrão de 16px. Com a escala da hero, `max-width: 80rem` viraria 800px em vez
de 1280px e a página encolheria pela metade.

As rotas limpas (`/meet-us`) vivem no `vercel.json`, e o `server.js` lê esse
mesmo arquivo — não há duas listas para envelhecer em desacordo. Por causa da
reescrita, **os caminhos dentro dessas páginas têm de partir da raiz**: em
`/meet-us` um `href="meet-us.css"` resolveria para `/meet-us.css`.

A DOM tem **uma** referência de estilo e **um** script, ambos no fim do body.
O `style.css` importa as três folhas de `components/` — `rodape`,
`introducao` e `hero`; o `main.js` importa os módulos das partes.

> `@import` no CSS serializa o download — o navegador só descobre as folhas
> importadas depois de baixar e parsear a primeira. São arquivos pequenos,
> então o custo é desprezível aqui; em folhas grandes valeria medir.

## A abertura

Corre sozinha, sem clique:

1. **A introdução** (`src/components/introducao/`) — o logo se desenha: anel
   e três braços em contorno (0 → 2,0s), preenchimento metálico e sombras
   (1,7 → 3,3s), e o nome se escrevendo (3,1 → 5,4s). Roda **ao mesmo tempo**
   que as texturas da cena carregam, cobrindo a espera em vez de somar a ela.
2. **O voo**, 8 segundos, de z −700 a −20.
3. **A oração e o menu**, exatamente 2s depois de a câmera parar
   (`DEPOIS_DO_TRIANGULO` em `components/hero/hero.js`), numa linha do tempo
   só do GSAP. A posição de partida de cada peça está no CSS; o GSAP só a
   traz até o natural.

Os dois nascem com o atributo **`hidden`** no HTML. É o modo à prova de falha:
o `[hidden] { display: none }` vem da folha do próprio navegador, então vale
antes de qualquer CSS do projeto carregar. O `hero.js` é o único lugar que o
tira, e só depois do voo.

> Cuidado: qualquer `display` declarado para um desses elementos **ganha** do
> `[hidden]` da folha do navegador e anula o atributo. Foi o que aconteceu com
> o menu, que é `display: flex` — daí o `.menu[hidden] { display: none }` em
> `components/hero/hero.css`.

## A cena

O shader das nuvens é **o mesmo** do quadplex80.com, copiado tal e qual em
`components/hero/nuvens.glsl.js` — o GLSL estava no bundle deles como strings
comuns. Ele entra pelo `onBeforeCompile` do three.js, que é o mecanismo padrão
para emendar GLSL nos materiais embutidos.

As coordenadas em `components/hero/cena-config.js` foram lidas do bundle, não
estimadas: câmera fov 45, as 5 camadas de nuvem, as 240 nuvens da travessia
com a mesma semente (`7059401`), as 20 de preenchimento e as 3 adicionais.

### Quatro armadilhas que custaram caro

Cada uma fazia a cena parecer "quase certa", e nenhuma dava erro:

1. **Ordem de desenho.** O material tem `depthTest: false`, então quem manda é
   a ordem. Desenhando de perto para longe, as nuvens distantes pintam por cima
   das próximas e comem a cobertura do primeiro plano. É preciso ordenar de
   trás para frente a cada quadro.
2. **`vWorldP`.** No original era `transformed.xyz`, porque o sistema de
   materiais deles já entregava a posição transformada pela instância. Nos
   chunks do three.js, `transformed` é a posição **local** — num plano, z ≈ 0 —
   e o fade de aparição zerava o alfa de todas as 240 nuvens.
3. **O céu não é um plano.** É `scene.background` com a textura
   equiretangular, girada em `-3.04`, desenhada numa passada própria com uma
   câmera de 120°.
4. **`maxCloudBrowsing` é só da travessia.** Desbotando também as nuvens de
   preenchimento, as bordas dos planos das camadas aparecem no pouso — que é
   exatamente o que elas existem para cobrir.

E duas que só aparecem quando o campo de pouso entra: o triângulo precisa de
`alphaTest`, senão as áreas vazias do PNG escrevem profundidade e abrem um
buraco retangular nas nuvens; e os planos das camadas precisam de
`depthWrite: false`, senão recortam as nuvens com borda dura.

### Para afinar

- `?fade=off|dist|appear|apparition` isola cada fator de esmaecimento
- `window.__cena._interno` expõe cena, câmera e instâncias

## Pendências

- **Fontes e imagens de nuvem** vieram do quadplex80.com. Servem para montar e
  testar, mas precisam ser licenciadas ou substituídas antes de publicar.
- **`assets/` e `index.snapshot.html`** são a captura original daquele site, e
  agora a única cópia — o zip não está mais aqui. Nada do projeto os usa; ficam
  só como referência. Podem ser apagados se você não for mais precisar deles.
