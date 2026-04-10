export interface PrayerData {
    tag: string;
    title: string;
    description: string;
    cardTopBadge: string;
    cardTitle: string;
    cardLines: string[];
    cardFooter: string;
    cardMantras: string[];
}

export type CategoryType = 'catolicas' | 'xamanicas' | 'anjos';

export const PRAYERS_DB: Record<CategoryType, PrayerData[]> = {
    catolicas: [
        {
            tag: "PASSO_01",
            title: "Oração do Credo",
            description: "A afirmação da fé e a conexão com a linhagem cristã ancestral.",
            cardTopBadge: "PROFISSÃO DE FÉ",
            cardTitle: "Creio em Deus Pai,",
            cardLines: [
                "Creio em Deus Pai Todo Poderoso, Criador dos céus e da terra.",
                "Creio em Jesus Cristo, um só, seu filho, nosso senhor.",
                "O qual foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado.",
                "Desceu à mansão dos mortos, ressuscitou ao terceiro dia, subiu aos céus e está sentado à direita de Deus Pai, Todo Poderoso de onde há de vir a julgar os vivos e os mortos.",
                "Creio no Espírito Santo, nas santas leis cristãs, na comunhão dos santos, na remissão dos pecados, na ressureição da carne e numa vida eterna para todo sempre."
            ],
            cardFooter: "Amém.",
            cardMantras: ["Fé!", "Luz!", "Verdade!"]
        },
        {
            tag: "PASSO_02",
            title: "Oração do Pai Nosso",
            description: "A prece universal de entrega e reconhecimento da providência divina.",
            cardTopBadge: "PAI NOSSO",
            cardTitle: "Pai Nosso",
            cardLines: [
                "Pai nosso que estás nos Céus, Santificado seja o Vosso Nome",
                "Vamos nós, ao Vosso Reino",
                "Seja feita a Vossa vontade, assim na Terra como nos Céus,",
                "O pão nosso, de cada dia, nos daí hoje,",
                "Perdoai, as nossas ofensas, assim como nós perdoamos a quem nos tenha ofendido",
                "Não nos deixeis cair em tentação mas livrai-nos do mal."
            ],
            cardFooter: "Que assim seja.",
            cardMantras: ["Paz!", "Perdão!", "Luz!"]
        },
        // Localize a PASSO_03 (Ave Maria) e mude para:
        {
            tag: "PASSO_03",
            title: "Oração da Ave Maria",
            description: "Manto de luz que acolhe o mundo, colo sagrado onde a alma repousa e o coração encontra a paz.",
            cardTopBadge: "AVE MARIA",
            cardTitle: "Ave Maria,", // <-- CORRIGIR AQUI
            cardLines: [
                "Ave Maria Cheia de graça, o Senhor é convosco,", // <-- COLOCAR O TEXTO DA CASA AQUI
                "Bendita sois Vós entre as mulheres,",
                "Bendito é o fruto do vosso ventre, Jesus.",
                "Santa Maria, Mãe de Deus, rogai por nós,",
                "Agora e na hora de nossa morte."
            ],
            cardFooter: "Amém.",
            cardMantras: ["Amor!", "Graça!", "Proteção!"]
        },

        {
            tag: "PASSO_04",
            title: "Oração Salve Rainha",
            description: "Estrela da Manhã que ilumina as sombras e guia os filhos pelo caminho do amor incondicional.",
            cardTopBadge: "SALVE RAINHA",
            cardTitle: "Salve Rainha,", // <-- CORRIGIR AQUI
            cardLines: [
                "Salve Rainha mãe de misericórdia, vida, doçura e esperança nossa, salve!", // <-- COLOCAR O TEXTO DA CASA AQUI
                "A vós bradamos os degredados filhos de Eva,",
                "A vós suspiramos, gemendo e chorando neste vale de lágrimas.",
                "Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei."
            ],
            cardFooter: "Rogai por nós, Santa Mãe de Deus",
            cardMantras: ["Esperança!", "Misericórdia!", "Guia!"]
        },
        {
            tag: "PASSO_05",
            title: "Oração de São Bento",
            description: "Poderosa fórmula de proteção contra energias negativas.",
            cardTopBadge: "SÃO BENTO",
            cardTitle: "A Cruz Sagrada",
            cardLines: [
                "Cruz sagrada seja a minha luz,",
                "não seja o dragão meu guia.",
                "Retira-te satanás!",
                "Nunca me aconselhes coisas vãs. É mau o que tu me ofereces,",
                "bebe tu mesmo o teu veneno!"
            ],
            cardFooter: "Assim seja.",
            cardMantras: ["Proteção!", "Exorcismo!", "Vigilância!"]
        }
    ],
    xamanicas: [
        {
            tag: "XAMA_01",
            title: "Oração ao Grande Espírito",
            description: "Conexão com a fonte primordial e alinhamento com os elementos da natureza.",
            cardTopBadge: "CONEXÃO SAGRADA",
            cardTitle: "Grande Espírito,",
            cardLines: [
                "fonte de toda vida, presença que habita em todas as coisas, visíveis e invisíveis,",
                "Eu me conecto contigo neste momento, com respeito e humildade.",
                "Peço que limpes meu caminho, que retires as energias que não me pertencem, e que fortaleças minha essência.",
                "Que eu caminhe em equilíbrio com a Terra, em harmonia com o céu, e em verdade com o meu coração.",
                "Que meus pensamentos sejam claros, minhas palavras sejam justas, e minhas ações sejam guiadas pela luz.",
                "Honro meus ancestrais, honro a natureza, honro a vida que pulsa em mim."
            ],
            cardFooter: "Assim é, assim será.",
            cardMantras: ["Haux!", "A-ho!", "Equilíbrio!"]
        }
    ],


    anjos: [
        {
            tag: "ANJO_01",
            title: "Oração do Anjo de Guarda",
            description: "Conexão com o guia pessoal e proteção constante.",
            cardTopBadge: "ZELO DIVINO",
            cardTitle: "Santo Anjo do Senhor,",
            cardLines: [
                "Santo Anjo do Senhormeu zeloso guardador,",
                "se a ti me confiou a piedade divina,",
                "sempre me rege, me guarda, me governa, me ilumina."
            ],
            cardFooter: "Amém.",
            cardMantras: ["Luz!", "Proteção!", "Guia!"]
        },
        {
            tag: "ANJO_02",
            title: "Oração ao Arcanjo Miguel",
            description: "Círculo de proteção azul e presença do Arcanjo Miguel.",
            cardTopBadge: "ESCUDO DE MIGUEL",
            cardTitle: "São Miguel,",
            cardLines: [
                "São Miguel à minha frente, São Miguel atrás de mim.",
                "São Miguel à minha direita, São Miguel à minha esquerda.",
                "São Miguel acima de mim, São Miguel abaixo de mim.",
                "São Miguel, São Miguel, São Miguel, eu sou o seu amor que me protege aqui, agora e sempre.",
                "São Miguel, São Miguel, São Miguel, eu sou o seu amor que me protege aqui, agora e sempre.",
                "São Miguel, São Miguel, São Miguel, eu sou o seu amor que me protege aqui, agora e sempre."
            ],
            cardFooter: "Eu Sou protegido sob a luz de Miguel.",
            cardMantras: ["Poder!", "Amor!", "Proteção!"]
        },
        {
            tag: "ANJO_03",
            title: "Oração ao Arcanjo Rafael",
            description: "Súplica pela saúde do corpo, da mente e do espírito.",
            cardTopBadge: "RAIO VERDE DA CURA",
            cardTitle: "Glorioso São Rafael,",
            cardLines: [
                "Glorioso São Rafaelgrande príncipe da corte celeste, fiel guia dos que vos invocam, eu vos saúdo.",
                "Vós que sois cheio de graça e poder diante de Deus, ajudai-me em todas as minhas necessidades.",
                "Curai-me de todas as doenças do corpo e da alma, e afastai de mim todo mal.",
                "Iluminai meus caminhos, conduzi meus passos e protegei-me sempre.",
                "São Rafael, Arcanjo da cura, rogai por mim."
            ],
            cardFooter: "Amém.",
            cardMantras: ["Cura!", "Verdade!", "Equilíbrio!"]
        },
        {
            tag: "ANJO_04",
            title: "Oração ao Arcanjo Gabriel",
            description: "Clareza mental e acolhimento da vontade divina.",
            cardTopBadge: "RAIO BRANCO DA ANUNCIAÇÃO",
            cardTitle: "Glorioso São Gabriel,",
            cardLines: [
                "Glorioso São Gabriel,mensageiro fiel de Deus, eu vos saúdo e vos invoco.",
                "Vós que fostes escolhido para anunciar os mistérios divinos,",
                "ajudai-me a compreender a vontade de Deus em minha vida.",
                "Iluminai minha mente e meu coração, para que eu saiba ouvir e acolher a Palavra do Senhor.",
                "Afastai de mim toda dúvida, medo e confusão, e fortalecei minha fé.",
                "São Gabriel Arcanjo, rogai por mim."
            ],
            cardFooter: "Amém.",
            cardMantras: ["Clareza!", "Paz!", "Fé!"]
        }
    ]
};