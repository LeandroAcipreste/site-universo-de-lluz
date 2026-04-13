export interface EnergyCleasingData {
    tag: string;
    title: string;
    description: string;
    cardLines: string[];
}

export type CategoryType = 'ambientes' | 'pessoal' | 'cristais';

export const ENERGY_CLEASING_DB: Record<CategoryType, EnergyCleasingData[]> = {
    ambientes: [
        {
            tag: "AMB_01",
            title: "Limpeza com Incensos",
            description: "Técnica de defumação para limpeza e atração circulando pelos ambientes.",
            cardLines: [
                "Acenda 3 incensos de limpeza e percorra os ambientes da casa.",
                "Faça movimentos anti-horários defumando cada canto.",
                "Deixe-os terminar de queimar fora de casa.",
                "Após, acenda 3 incensos de atração e percorra a casa em sentido horário.",
                "Deixe-os terminar de queimar dentro de casa."
            ]
        },
        {
            tag: "AMB_02",
            title: "Limpeza Energética com Anil",
            description: "Limpeza profunda de ambientes usando anil diluído para banimento de negatividade.",
            cardLines: [
                "Dilua uma pastilha de anil em um balde com água.",
                "Passe um pano no chão e nas caixas das portas.",
                "Mantenha o umbigo tapado e use um contra-egum durante o processo.",
                "Ouça músicas de banimento durante a aplicação.",
                "Finalize com a consagração do aposento."
            ]
        },
        {
            tag: "AMB_03",
            title: "Limpeza com Carvão e Vinagre",
            description: "Purificação física e astral de ambientes focada em ralos e pias.",
            cardLines: [
                "Coloque uma pedra de carvão e sal grosso em todos os ralos e pias.",
                "Despeje uma mistura de água e vinagre sobre o carvão dizendo: 'Vai, vai, vai!'",
                "Recolha os carvões com as mãos protegidas após a limpeza.",
                "Passe pano na casa com água e vinagre de dentro para fora.",
                "Finalize com o áudio de 'Consagração do Aposento'."
            ]
        },
        {
            tag: "AMB_04",
            title: "Arcanjo Miguel das Sete Porteiras",
            description: "Proteção e selamento espiritual da casa invocando as forças milicianas.",
            cardLines: [
                "Invoque a presença de Arcanjo Miguel no centro de sua casa.",
                "Peça que a força das Sete Porteiras barre toda negatividade.",
                "Acenda uma vela azul e recite a oração de proteção.",
                "Mentalize um selo de luz em cada entrada da residência."
            ]
        },
        {
            tag: "AMB_05",
            title: "Limpeza de Ambiente com Folhas",
            description: "Harmonização de espaços batendo folhas sagradas para dispersar miasmas.",
            cardLines: [
                "Utilize galhos de mangueira, pinhão roxo ou arruda.",
                "Molhe as folhas levemente em água com sal.",
                "Bata os galhos nos cantos da casa, de dentro para fora.",
                "Mentalize que a discórdia e as densidades saem do ambiente."
            ]
        }
    ],
    pessoal: [
        {
            tag: "PERS_01",
            title: "Limpeza dos Espelhos",
            description: "Ritual com vela amarela e elementos naturais para purificar o reflexo e a percepção.",
            cardLines: [
                "Acenda uma vela de sete dias amarela com seu nome no plástico.",
                "Borrife álcool em todos os espelhos da casa.",
                "Em seguida, borrife água mineral ou água de cachoeira/chuva.",
                "Peça que Oxum traga a plenitude de Deus para você e os moradores.",
                "Faça o ritual sob o som de águas e repita mensalmente."
            ]
        },
        {
            tag: "PERS_02",
            title: "Limpeza do Ovo com Água Salgada",
            description: "Limpeza pessoal para descarrego usando ovo cru e sal grosso.",
            cardLines: [
                "Prepare um copo com água e sal grosso.",
                "Peça aos Pretos Velhos que limpem toda a negatividade.",
                "Passe o ovo cru por todo o corpo suavemente, sem quebrar.",
                "Quebre o ovo no copo e deixe descansar por 30 minutos.",
                "Descarregue tudo e peça que o mal vá embora."
            ]
        },
        {
            tag: "PERS_03",
            title: "Limpeza do Ovo Cru",
            description: "Diagnóstico e limpeza energética pessoal através da porosidade do ovo.",
            cardLines: [
                "Segure o ovo e peça aos Pretos Velhos a limpeza de seu corpo.",
                "Passe o ovo por todo o corpo mentalizando a remoção de densidades.",
                "Quebre o ovo em um copo com água para observar reações.",
                "Teias ou bolhas indicam absorção de energia densa.",
                "Descarte tudo no vaso sanitário pedindo limpeza profunda."
            ]
        },
        {
            tag: "PERS_04",
            title: "Banho de Limpeza Energética",
            description: "Banho ritualístico com ervas sagradas para restauração da aura.",
            cardLines: [
                "Ferva 2 litros de água e adicione arruda, guiné e alecrim.",
                "Deixe em infusão por 15 minutos e coe.",
                "Tome seu banho de higiene normalmente.",
                "Jogue a mistura do pescoço para baixo mentalizando a purificação.",
                "Sinta sua aura sendo restaurada e protegida."
            ]
        }
    ],
    cristais: [
        {
            tag: "CRIST_01",
            title: "Energização de Cristais",
            description: "Manutenção vibracional de pedras e cristais de uso terapêutico.",
            cardLines: [
                "Lave seus cristais em água corrente com sal grosso.",
                "Esfregue levemente para descarregar energias retidas.",
                "Para energizar, deixe-os sob a luz do sol por 2 horas.",
                "Ou deixe-os sob a luz da lua cheia durante toda a noite.",
                "Guarde-os em local limpo e consagrado."
            ]
        }
    ]
};
