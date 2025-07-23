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

async function playRaceEngine(player1, player2) {

}

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1} e ${player2} começando ...\n`
    )

    await playRaceEngine(player1, player2);
})();