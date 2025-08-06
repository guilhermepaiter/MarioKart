function persona() {
    velocidade = [4, 3, 2, 5, 3, 2]
    manobrabilidade = [3, 4, 5, 2, 4, 2]
    poder = [3, 2, 3, 5, 4, 5]
    let pontos = 0

    let personagens = {
        Mario: {
            nome: "Mario",
            velocidade: velocidade[0],
            manobrabilidade: manobrabilidade[0],
            poder: poder[0],
            pontos: pontos
        },

        Peach: {
            nome: "Peach",
            velocidade: velocidade[1],
            manobrabilidade: manobrabilidade[1],
            poder: poder[1],
            pontos: pontos
        },

        Yoshi: {
            nome: "Yoshi",
            velocidade: velocidade[2],
            manobrabilidade: manobrabilidade[2],
            poder: poder[2],
            pontos: pontos
        },

        Bowser: {
            nome: "Bowser",
            velocidade: velocidade[3],
            manobrabilidade: manobrabilidade[3],
            poder: poder[3],
            pontos: pontos
        },

        Luigi: {
            nome: "Luigi",
            velocidade: velocidade[4],
            manobrabilidade: manobrabilidade[4],
            poder: poder[4],
            pontos: pontos
        },

        Dk: {
            nome: "Dk",
            velocidade: velocidade[5],
            manobrabilidade: manobrabilidade[5],
            poder: poder[5],
            pontos: pontos
        }
    }

    return personagens;
}