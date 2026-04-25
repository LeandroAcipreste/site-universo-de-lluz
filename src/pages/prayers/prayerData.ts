export interface PrayerData {
    tag: string;
    title: string;
    description: string;
    cardLines: string[];
}

export type CategoryType = 'catolicas' | 'xamanicas' | 'anjos';

export const PRAYERS_DB: Record<CategoryType, PrayerData[]> = {
    catolicas: [
        {
            tag: "PASSO_01",
            title: "Oração do Credo",
            description: "A afirmação da fé e a conexão com a linhagem cristã ancestral.",
            cardLines: [
                "Creio em Deus Pai Todo Poderoso, Criador dos céus e da terra.",
                "Creio em Jesus Cristo, um só, seu filho, nosso Senhor.",
                "O qual foi concebido pelo poder do Espírito Santo, nasceu da Virgem Maria, padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado.",
                "Desceu à mansão dos mortos, ressuscitou ao terceiro dia, subiu aos céus e está sentado à direita de Deus Pai, Todo Poderoso de onde há de vir a julgar os vivos e os mortos.",
                "Creio no Espírito Santo, nas santas leis cristãs, na comunhão dos santos, na remissão dos pecados, na ressureição da carne e numa vida eterna para todo sempre. Amém!"
            ]
        },
        {
            tag: "PASSO_02",
            title: "Oração do Pai Nosso",
            description: "A prece universal de entrega e reconhecimento da providência divina.",
            cardLines: [
                "Pai nosso que estás nos Céus, Santificado seja o Vosso Nome",
                "Vamos nós, ao Vosso Reino",
                "Seja feita a Vossa vontade, assim na Terra como nos Céus,",
                "O pão nosso, de cada dia, nos daí hoje,",
                "Perdoai, as nossas ofensas, assim como nós perdoamos a quem nos tenha ofendido",
                "Não nos deixeis cair em tentação mas livrai-nos do mal. Amém!"
            ]
        },
        {
            tag: "PASSO_03",
            title: "Oração da Ave Maria",
            description: "Manto de luz que acolhe o mundo, colo sagrado onde a alma repousa e o coração encontra a paz.",
            cardLines: [
                "Ave Maria Cheia de graça, o Senhor é convosco,",
                "Bendita sois Vós entre as mulheres,",
                "Bendito é o fruto do vosso ventre, Jesus.",
                "Santa Maria, Mãe de Jesus, rogai por nós seus filhos,",
                "Agora e na hora de nossa passagem e por toda a eternindade Amém!."
            ]
        },
        {
            tag: "PASSO_04",
            title: "Oração Salve Rainha",
            description: "Estrela da Manhã que ilumina as sombras e guia os filhos pelo caminho do amor incondicional.",
            cardLines: [
                "Salve a Rainha, Mãe de Misericórdia! Vida, Doçura, Esperança nossa, Salve!",
                "A vós, chamamos, confiando e orando, neste planeta em ascensão,",
                "Eia, pois ó advogada nossa, Esses vossos olhos misericordiosos, a nós volvei.",
                "E depois deste desterro, mostrai-nos, Jesus, bendito é o fruto do vosso ventre,",
                "Ó clemente, ó piedosa, Ó doce, sempre Virgem Maria,",
                "Rogai por nós, Santíssima Mãe de Jesus,",
                "Para que sejamos dignos de alcançar as promessas de Cristo para sempre! Amém!"
            ]
        },
        {
            tag: "PASSO_05",
            title: "Oração de São Bento",
            description: "Poderosa fórmula de proteção contra energias negativas.",
            cardLines: [
                "Cruz sagrada seja a minha luz,",
                "não seja o dragão meu guia.",
                "Retira-te satanás!",
                "Nunca me aconselhes coisas vãs. É mau o que tu me ofereces,",
                "bebe tu mesmo o teu veneno!"
            ]
        },
        {
            tag: "PASSO_06",
            title: "Oração de São Francisco",
            description: "Um hino de humildade, fraternidade e entrega ao serviço da paz.",
            cardLines: [
                "Senhor, fazei de mim um instrumento de vossa Paz.",
                "Onde houver Ódio, que eu leve o Amor, onde houver Ofensa, que eu leve o Perdão.",
                "Onde houver Discórdia, que eu leve a União, onde houver Dúvida, que eu leve a Fé.",
                "Onde houver Erro, que eu leve a Verdade, onde houver Desespero, que eu leve a Esperança.",
                "Onde houver Tristeza, que eu leve a Alegria, onde houver Trevas, que eu leve a Luz!",
                "Ó Mestre, fazei que eu procure mais: consolar, que ser consolado; compreender, que ser compreendido; amar, que ser amado.",
                "Pois é dando, que se recebe. Perdoando, que se é perdoado e é morrendo, que se vive para a vida eterna! Amém"
            ]
        }
    ],
    xamanicas: [
        {
            tag: "XAMA_01",
            title: "Prece Sioux",
            description: "Prece de conexão e reverência aos espíritos das direções e da natureza.",
            cardLines: [
                "Nosso pai, o Céu nos ouça",
                "E nos faça fortes",
                "Nossa Mãe Terra, nos ouça",
                "E nos dê sustentação",
                "Ó espírito do Leste",
                "Que você envie sua sabedoria",
                "Ó espírito do Sul",
                "Que possamos sempre trilhar nosso caminho do coração",
                "Ó espírito do Oeste",
                "Que possamos sempre estar prontos para a longa viagem",
                "Ó espírito do Norte",
                "Que seus ventos possam limpar nossa alma",
                "Aho!"
            ]
        }
    ],
    anjos: [
        {
            tag: "ANJO_01",
            title: "Oração do Anjo de Guarda",
            description: "Conexão com o guia pessoal e proteção constante.",
            cardLines: [
                "Santo Anjo do Senhor, meu zeloso guardador,",
                "se a ti me confiou a piedade divina,",
                "sempre me rege, me guarda, me governa, me ilumina."
            ]
        },
        {
            tag: "ANJO_02",
            title: "Prece para proteção de Arcanjo Miguel ao sair de casa",
            description: "Círculo de proteção azul e presença do Arcanjo Miguel.",
            cardLines: [
                "São Miguel à minha frente, São Miguel atrás de mim.",
                "São Miguel à minha direita, São Miguel à minha esquerda.",
                "São Miguel acima de mim, São Miguel abaixo de mim.",
                "São Miguel, São Miguel, São Miguel, eu sou o seu amor que me protege aqui, agora e sempre.",
                "São Miguel, São Miguel, São Miguel, eu sou o seu amor que me protege aqui, agora e sempre.",
                "São Miguel, São Miguel, São Miguel, eu sou o seu amor que me protege aqui, agora e sempre."
            ]
        },
        {
            tag: "ANJO_03",
            title: "Oração a Rafael",
            description: "Prece de cura e ação corretora da inteligência suprema.",
            cardLines: [
                "Amado Arcanjo Rafael,",
                "Eu (fale seu nome de batismo completo), apresento-me diante de sua dadivosa luz verde para conclamar a força da verdade de Deus para curar a mim e as feridas de toda humanidade.",
                "Que a ação corretora da inteligência suprema aja com amorosa firmeza, educando o ego dos homens até que sejamos revelados legítimos herdeiros de Deus!",
                "Amém, amém e amém!"
            ]
        },
        {
            tag: "ANJO_04",
            title: "Oração a Gabriel",
            description: "Prece por criatividade, bom ânimo e verdadeira alegria.",
            cardLines: [
                "Amado Arcanjo Gabriel,",
                "Eu (nome de batismo completo), repouso minha presença em seu magnânimo olhar para rogar por sua intervenção despertando em mim a criatividade, o bom ânimo e a verdadeira alegria.",
                "Que meu corpo seja um jarro puro e perfumado para receber do Criador as bênçãos de amor e vida que estão a se precipitar em meu ser.",
                "E então, que sua luz de alvíssima pureza clarifique em mim o caminho da correção rumo à ascensão!",
                "Amém, amém e amém!"
            ]
        },
        {
            tag: "ANJO_05",
            title: "Oração a Jophiel",
            description: "Pedido de iluminação, clareza e Sabedoria Divina.",
            cardLines: [
                "Amado Arcanjo Jophiel,",
                "Eu (fala seu nome de batismo completo), venho até o altar de seu coração para pedir-lhe iluminação, clareza, entendimento e a verdadeira compreensão do que que preciso saber.",
                "Que a luz dourada da Sabedoria Divina seja o farol guiando minhas escolhas, caminhos e projetos!",
                "E que então, a chama amarela de seu corpo celestial expanda sobre mim, a Divina Luz do Saber!",
                "Amém, amém e amém!"
            ]
        },
        {
            tag: "ANJO_06",
            title: "Oração a Raziel",
            description: "Invocação para despertar a intuição, vidência e purificação dos pensamentos.",
            cardLines: [
                "Amado Arcanjo Raziel,",
                "Eu (fale seu nome de batismo completo), invoco seu santo nome para que o som de sua voz desperte minha intuição e vidência e assim munido desses preciosos dons, dedique-os em favor do Bem, da Paz e do Amor Universal.",
                "Oh, guardião dos mistérios de Deus, rogo-lhe que as verdades do meu Eu interior sejam desveladas sob sua luz azul índigo purificando pensamentos e elevando vibrações!",
                "Amém, amém e amém!"
            ]
        }
    ]
};