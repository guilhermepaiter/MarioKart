const player1 = {
    nome :  "Mario",
    velocidade : 4,
    manobrabilidade : 3,
    poder : 3,
    pontos : 0,
};

const player2 = {
    nome :  "Luigi",
    velocidade : 3,
    manobrabilidade : 4,
    poder : 4,
    pontos : 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1; 
}


async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33 :
            result = "Reta"
            break
        case random < 0.66 :
            result = "Curva"
            break
        default :
            result = "Confronto"
    }

    return result
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <=   5; round ++) {
        console.log(`🏁 Rodada ${round}`)
        
        //sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)
    }
}

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1} e ${player2} começando ...\n`
    )

    await playRaceEngine(player1, player2);
})();