/**
 * Os cards das Defesas.
 *
 * Porte de `site-antigo/site-UL/src/pages/defenses/defensesData.ts`. O texto é
 * cópia literal, com a grafia original — inclusive onde há erro de digitação,
 * porque corrigir conteúdo não é porte, é edição, e essa decisão é de quem
 * escreveu. O que saiu foram as anotações de tipo do TypeScript, que não
 * existem em JavaScript: a `interface DefenseData` e o `type CategoryType`.
 */

/** As abas, na ordem em que aparecem. */
export const CATEGORIAS = [
  { key: 'simpatias', label: 'Proteção' },
  { key: 'oracoes', label: 'Orações' },
];

/**
 * Atenção: `oracoes` está nas abas mas **não** existe aqui, exatamente como no
 * arquivo original. Lá isso derrubava a página no clique da aba, porque
 * `DEFENSES_DB['oracoes']` é `undefined` e o componente pedia `.length`. O
 * carrossel deste projeto ignora categoria sem itens, então a aba "Orações"
 * não é desenhada enquanto ninguém escrever o conteúdo dela.
 */
export const DEFESAS = {
  simpatias: [
    {
      tag: 'DEF_01',
      title: 'Berço de São Bento',
      description: 'Proteção contra ataques noturnos.',
      cardLines: [
        'Baixe, imprima e recorte 5 quadradinhos da oração .',
        'Usando durex cole cada quadrado, em baixo de sua cama ou colchão ',
        'Espalhe estes papéis pela sua casa, deixando-os perto de cada porta.',
        'Com o texto virado para cima fazendo o sinal da cruz',
        'Na direção da cabeça, do ventre, dos ombros e no peito.',
        'Pode colocar também virado para cima, embaixo da cadeira, mesa de trabalho e banco de carro',
      ],
    },
    {
      tag: 'DEF_02',
      title: 'Proteção Contra Mau Olhado',
      description: 'Combate o mau olhado e inveja.',
      cardLines: [
        'Pegue um punhado de arroz branco cru e coloque numa vasilha com água.',
        'Esfregue até tornar a água esbranqueçada.',
        'Coe separando a água do arroz, que pode ser consumido normalmente.',
        'Esta água lave o seu rosto e derrame sobre todo o corpo após o banho de higiene.',
        'Deixe secar maturalmente',
        'Este banho também serve para bebês, crianãs e idosos',
      ],
    },
    {
      tag: 'DEF_03',
      title: 'Muralha para o trabalho',
      description: 'Barreira de proteção no ambiente profissional.',
      cardLines: [
        'Escolha uma pedra completamente branca e uma completamente preta.',
        'Sugestão: quartzo bramco e turmalina preta.',
        'Consagre-os com incenso ou água e os promame para atuarem como.',
        'Muralha em sua defesa.',
        'Leve as pedras para sua mesa de trabalho, colocando-asdentro dagaveta ou sobre a mesa',
        'Vizualizando que eles formam uma muralha de defesa do seuu campo psíquico energético ',
      ],
    },
    {
      tag: 'DEF_04',
      title: 'PROTEÇÃO DAS PLANTAS SAGRADAS',
      description: 'para proteger o ambiente',
      cardLines: [
        'Para proteção energética constante, utilize o poder das plantas.',
        'Coloque vasos em vários pontos estratégicos da sua casa ou comércio.',
        'Use plantas como pimenteira, espada-de-são-jorge, arruda e guiné.',
        'Posicione os vasos principalmente próximo a portas e janelas.',
        'A vitalidade das plantas filtrará qualquer carga negativa.',
      ],
    },
    {
      tag: 'DEF_05',
      title: 'Para acabar com inveja',
      description: 'Ritual contínuo de limpeza matinal às segundas-feiras.',
      cardLines: [
        'Durante um mês, sempre nas segundas-feiras, prepare um copo com água.',
        'Coloque dentro dele três pedras de sal grosso e três galhinhos de arruda.',
        'Ao sair de casa, reze um Pai Nosso e uma Ave Maria.',
        'Peça a Deus que afaste do seu convívio pessoas prejudiciais e invejosas.',
        'Ao trocar a água, lave as mãos com a água que estava no copo.',
        'Jogue o sal e a arruda no lixo, lave o copo e use-o normalmente.',
      ],
    },
    {
      tag: 'DEF_06',
      title: 'Para afastar pessoas invejosas',
      description: 'Banimento pontual de energias direcionadas através do uso do jiló.',
      cardLines: [
        'Escreva o nome da pessoa invejosa num papel de pão com caneta preta.',
        'Corte um jiló no sentido do comprimento.',
        'Coloque o papel dobrado dentro das metades do jiló.',
        'Junte as duas metades amarrando e selando com uma fita preta.',
        'Enterre isso bem longe da sua casa ou do seu local de trabalho.',
      ],
    },
  ],
};
