/**
 * Os cards das Limpezas.
 *
 * Porte de `site-antigo/site-UL/src/pages/energyCleasing/energyCleasingData.ts`.
 * O texto é cópia literal, com a grafia original — inclusive onde há erro de
 * digitação, porque corrigir conteúdo não é porte, é edição, e essa decisão é
 * de quem escreveu. O que saiu foram as anotações de tipo do TypeScript: a
 * `interface EnergyCleasingData` e o `type CategoryType`.
 */

/** As abas, na ordem em que aparecem. */
export const CATEGORIAS = [
  { key: 'ambientes', label: 'Ambientes' },
  { key: 'pessoal', label: 'Pessoal' },
  { key: 'cristais', label: 'Cristais' },
];

export const LIMPEZAS = {
  ambientes: [
    {
      tag: 'AMB_01',
      title: 'Limpeza com Incensos',
      description: 'Técnica de defumação para limpeza e atração circulando pelos ambientes.',
      cardLines: [
        'Acenda 3 palitos de incenso de limpeza (Arruda, sete ervas, tomba tudo...).',
        'e faça oração para o seu anjo de guarda.',
        'com as varetas ou defumador na mão fazendo círculos no sentido anti horário, percorra a casa do fundo para frente.',
        'Deixe-os terminar de queimar fora de casa.',
        'Depois disso, acenda 3 incensos de properidade (mel, sandalo, rosas...) e percorra a casa em sentido horário, da frente para o fundo',
        'Deixe-os terminar de queimar dentro de casa.',
      ],
    },
    {
      tag: 'AMB_02',
      title: 'Limpeza com Anil',
      description: 'Limpeza profunda de ambientes usando anil diluído para banimento de negatividade.',
      cardLines: [
        'Dilua uma colherinha de café em um balde com água ( Pode misturar desenfetante e água sanitária ).',
        'Aplique um pano ou mop no chão e nas caixas das portas.',
        'Mantenha o umbigo tapado e/ou use um contra-egum durante o processo.',
        'Ouça músicas de banimento durante a aplicação.',
        'Finalize com a prece "Consagração do aposento".',
      ],
    },
    {
      tag: 'AMB_03',
      title: 'Limpeza Profunda',
      description: 'Purificação física e astral de ambientes focada em ralos e pias.',
      cardLines: [
        'Coloque um pedaço de carvão e sal grosso em todos os ralos e pias.',
        "Despeje uma mistura de água com vinagre sobre o carvão dizendo: 'Vai, vai, vai!'",
        'Deixe descansar 5 minutos, recolha os carvões com as mãos protegidas "saco ou luva plástica".',
        'Jogue no lixo fora de casa.',
        'Passe pano na casa com água e vinagre de dentro para fora.',
        "Finalize com a prece 'Consagração do Aposento'.",
      ],
    },
    {
      tag: 'AMB_05',
      title: 'Limpeza com Folhas',
      description: 'Harmonização de espaços batendo folhas sagradas para dispersar miasmas.',
      cardLines: [
        'Prepare 2 maços com folhas sagradas sugestões: Espada de Ogum, Espada de Oxossi, Água de elevante, guine, arruda, folha de manga, pinhão roxo',
        'Amarre-as comum cordão, faça oração para o anjo de guarda, mantenha o humbigo tampado e/ou contregum.',
        'toque com firmeza nas paredes e cantos, do dentro para fora.',
        'Mentalize que a discórdia e as densidades saem do ambiente.',
        'Ao final, quebre os maços e descarte fora de casa.',
      ],
    },
  ],
  pessoal: [
    {
      tag: 'PERS_01',
      title: 'Limpeza dos Espelhos',
      description: 'Ritual com vela amarela e elementos naturais para purificar o reflexo e percepção de si mesmo.',
      cardLines: [
        'Acenda uma vela de sete dias amarela com seu nome escrito no corpo da vela mantendo o plástico de cima para baixo.',
        'Limpe os espelhos da casa com álcool, água mineral de rio cachoeira ou chuva .',
        'De frente a um dos espelhos, segure a vela amarela nas mãos e  .',
        'Peça que Oxum traga a plenitude de Deus para você e os moradores.',
        'Faça o ritual sob o som de águas e repita mensalmente.',
      ],
    },
    {
      tag: 'PERS_02',
      title: 'Limpeza do Ovo com Água Salgada',
      description: 'Limpeza pessoal para descarrego usando ovo cru e sal grosso.',
      cardLines: [
        'Prepare um copo com água e sal grosso.',
        'Peça aos Pretos Velhos que limpem toda a negatividade.',
        'Passe o ovo cru por todo o corpo suavemente, sem quebrar.',
        'Quebre o ovo no copo e deixe descansar por 30 minutos.',
        'Descarregue tudo e peça que o mal vá embora.',
      ],
    },
    {
      tag: 'PERS_03',
      title: 'Limpeza do Ovo Cru',
      description: 'Diagnóstico e limpeza energética pessoal através da porosidade do ovo.',
      cardLines: [
        'Segure o ovo e peça aos Pretos Velhos a limpeza de seu corpo.',
        'Passe o ovo por todo o corpo mentalizando a remoção de densidades.',
        'Quebre o ovo em um copo com água para observar reações.',
        'Teias ou bolhas indicam absorção de energia densa.',
        'Descarte tudo no vaso sanitário pedindo limpeza profunda.',
      ],
    },
    {
      tag: 'PERS_04',
      title: 'Banho de Limpeza Energética',
      description: 'Banho ritualístico com ervas sagradas para restauração da aura.',
      cardLines: [
        'Ferva 2 litros de água e adicione arruda, guiné e alecrim.',
        'Deixe em infusão por 15 minutos e coe.',
        'Tome seu banho de higiene normalmente.',
        'Jogue a mistura do pescoço para baixo mentalizando a purificação.',
        'Sinta sua aura sendo restaurada e protegida.',
      ],
    },
    {
      tag: 'AMB_05',
      title: 'Limpeza de São Miguel com sete Ponteiras',
      description: 'Proteção e selamento espiritual da casa invocando as forças milicianas.',
      cardLines: [
        'Essa limpeza é individual e anual.',
        'Coloque a foto no nome da pessoa e coloque os sete cristais deponta ao redor.',
        'Caso tenha coloque a imagem de São Miguel com uma vela azul, vermelha ou branca acesa.',
        'Sobre o nome ou a foto, coloque o cristal negro (Turmalina, ônix ou obsidiana).',
        'Deixe agir por 60 minutos.',
        'Vencido o prazo com a mão protegida (saco plástico ou luva).',
        'Recolha o cristal negro que deverá ser enterrado, na areia da praia ou qualquer terra.',
        'Os cristais de ponta devem ser limpos, reenergizados e a foto guardada.',
      ],
    },
  ],
  cristais: [
    {
      tag: 'CRIST_01',
      title: 'Energização de Cristais',
      description: 'Manutenção vibracional de pedras e cristais de uso terapêutico.',
      cardLines: [
        'Lave seus cristais em água corrente com sal grosso.',
        'Esfregue levemente para descarregar energias retidas.',
        'Para energizar, deixe-os sob a luz do sol por 2 horas.',
        'Ou deixe-os sob a luz da lua cheia durante toda a noite.',
        'Guarde-os em local limpo e consagrado.',
      ],
    },
  ],
};
