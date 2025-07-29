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

async function logRollResult(characterName, block, diceResult, atribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${atribute} = ${diceResult + atribute}`)
}

async function playRaceEngine(character1, character2) {
    for(let round = 1; round <=   5; round ++) {
        console.log(`🏁 Rodada ${round}`)
        
        //sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)
    }

        //rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        //teste de habilidade
        let testSkill1 = 0
        let testSkill2 = 0
    
        if (block == "Reta") {
            testSkill1 = diceResult1 + character1.velocidade 
            testSkill2 = diceResult2 + character2.velocidade

            await logRollResult(
                character1.nome,
                "velocidade",
                diceResult1,
                character1.velocidade
            )

            await logRollResult(
                character2.nome,
                "velocidade",
                diceResult2,
                character2.velocidade
            )
                
        } if (block == "Curva") {
            testSkill1 = diceResult1 + character1.manobrabilidade 
            testSkill2 = diceResult2 + character2.manobrabilidade

            await logRollResult(
                character1.nome,
                "manobrabilidade",
                diceResult1,
                character1.manobrabilidade
            )

            await logRollResult(
                character2.nome,
                "manobrabilidade",
                diceResult2,
                character2.manobrabilidade
            )

        } if (block == "Confronto") {
            let powerResult1 = diceResult1 + character1.poder
            let powerResult2 = diceResult2 + character2.poder
        }

        if (testSkill1 > testSkill2) {
            console.log(`${character1.nome} marcou um ponto!`)
            character1.pontos++
        } else if (testSkill2 > testSkill1) {
            console.log(`${character2.nome} marcou um ponto!`)
            characcter2.pontos++
        }

        consollle.log("_____________________________________")
}

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1} e ${player2} começando ...\n`
    )

    await playRaceEngine(player1, player2);
})();