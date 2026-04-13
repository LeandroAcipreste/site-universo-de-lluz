export interface DefenseData {
    tag: string;
    title: string;
    description: string;
    cardLines: string[];
}

export type CategoryType = 'simpatias' | 'oracoes';

export const DEFENSES_DB: Record<CategoryType, DefenseData[]> = {
    simpatias: [
        {
            tag: "DEF_01",
            title: "Simpatia para afastar inveja e olho gordo",
            description: "Proteção familiar com a força do Arcanjo Gabriel e do Salmo 33.",
            cardLines: [
                "No domingo de manhã, pense no dia de São Gabriel Arcanjo.",
                "Escreva o primeiro versículo do Salmo 33 em vários pedaços de papel lilás.",
                "Espalhe estes papéis pela sua casa, deixando-os perto de cada porta.",
                "Acenda um incenso de arruda para o anjo Gabriel e espalhe a fumaça pelos cômodos.",
                "Jogue as sobras do incenso em água corrente.",
                "Enterre os papéis em um vaso da planta comigo-ninguém-pode."
            ]
        },
        {
            tag: "DEF_02",
            title: "Para cortar inveja",
            description: "Filtro energético natural com carvão e planta de poder.",
            cardLines: [
                "Em um copo virgem, coloque três pequenos pedaços de carvão.",
                "Adicione três pedaços pequenos de planta comigo-ninguém-pode.",
                "Encha o copo de água e coloque-o embaixo da cama na direção da cabeceira.",
                "Uma vez por semana, verifique se as pedras de carvão afundaram.",
                "Se afundaram, jogue fora o conteúdo e renove a simpatia.",
                "Se estiverem no mesmo lugar, deixe como está."
            ]
        },
        {
            tag: "DEF_03",
            title: "Para tirar mau-olhado da casa",
            description: "Escudo protetor tradicional para a entrada do seu lar.",
            cardLines: [
                "Pegue três dentes de alho e amarre-os em um saquinho.",
                "Pendure o saquinho atrás da porta principal da casa.",
                "Deixe agir e purificar o ambiente por sete dias.",
                "Após o período, tire o saquinho, amasse os dentes de alho.",
                "Jogue tudo em água corrente para levar embora as energias densas."
            ]
        },
        {
            tag: "DEF_04",
            title: "Para tirar inveja e outras “zicas”",
            description: "Proteção botânica criando uma barreira verde nos ambientes.",
            cardLines: [
                "Para proteção energética constante, utilize o poder das plantas.",
                "Coloque vasos em vários pontos estratégicos da sua casa ou comércio.",
                "Use plantas como pimenteira, espada-de-são-jorge, arruda e guiné.",
                "Posicione os vasos principalmente próximo a portas e janelas.",
                "A vitalidade das plantas filtrará qualquer carga negativa."
            ]
        },
        {
            tag: "DEF_05",
            title: "Para acabar com inveja",
            description: "Ritual contínuo de limpeza matinal às segundas-feiras.",
            cardLines: [
                "Durante um mês, sempre nas segundas-feiras, prepare um copo com água.",
                "Coloque dentro dele três pedras de sal grosso e três galhinhos de arruda.",
                "Ao sair de casa, reze um Pai Nosso e uma Ave Maria.",
                "Peça a Deus que afaste do seu convívio pessoas prejudiciais e invejosas.",
                "Ao trocar a água, lave as mãos com a água que estava no copo.",
                "Jogue o sal e a arruda no lixo, lave o copo e use-o normalmente."
            ]
        },
        {
            tag: "DEF_06",
            title: "Para afastar pessoas invejosas",
            description: "Banimento pontual de energias direcionadas através do uso do jiló.",
            cardLines: [
                "Escreva o nome da pessoa invejosa num papel de pão com caneta preta.",
                "Corte um jiló no sentido do comprimento.",
                "Coloque o papel dobrado dentro das metades do jiló.",
                "Junte as duas metades amarrando e selando com uma fita preta.",
                "Enterre isso bem longe da sua casa ou do seu local de trabalho."
            ]
        }
    ],
    oracoes: [
        {
            tag: "DEF_07",
            title: "Oração contra inveja",
            description: "Prece rápida e poderosa para selar o campo áurico na luz do Senhor.",
            cardLines: [
                "O olho da luz me envolve.",
                "Seu brilho me protege.",
                "Quebre mau-olhado!",
                "Desfaça-se toda a intriga e a perfídia.",
                "Estou com a benção do Senhor.",
                "Estou dentro do manto do Senhor, nada me destruirá.",
                "Amém."
            ]
        }
    ]
};
