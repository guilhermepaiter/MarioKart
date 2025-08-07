// A base de dados com todos os personagens e seus atributos
// A base de dados com todos os personagens e seus atributos
const personagens = {
    Mario: {
        nome: "Mario",
        velocidade: 4,
        manobrabilidade: 3,
        poder: 3,
        pontos: 0
    },
    Peach: {
        nome: "Peach",
        velocidade: 3,
        manobrabilidade: 4,
        poder: 2,
        pontos: 0
    },
    Yoshi: {
        nome: "Yoshi",
        velocidade: 2,
        manobrabilidade: 5,
        poder: 3,
        pontos: 0
    },
    Bowser: {
        nome: "Bowser",
        velocidade: 5,
        manobrabilidade: 2,
        poder: 5,
        pontos: 0
    },
    Luigi: {
        nome: "Luigi",
        velocidade: 3,
        manobrabilidade: 4,
        poder: 4,
        pontos: 0
    },
    Dk: {
        nome: "Dk",
        velocidade: 2,
        manobrabilidade: 2,
        poder: 5,
        pontos: 0
    }
};

// Importa o módulo 'readline' para ler a entrada do usuário
const readline = require('readline');

// Configura a interface para leitura de entrada e saída
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Esta função agora "seleciona" um personagem da nossa base de dados
// Ela cria uma cópia do objeto para que os pontos de cada jogador sejam independentes
function selecionarPersonagem(nomeDoPersonagem) {
    if (personagens[nomeDoPersonagem]) {
        return { ...personagens[nomeDoPersonagem]
        };
    } else {
        console.log(`Personagem "${nomeDoPersonagem}" não encontrado. O jogo será iniciado com Mario.`);
        return { ...personagens["Mario"]
        };
    }
}

// Nova função para escolher um personagem via prompt do terminal
async function escolherPersonagem(playerNumber) {
    console.log(`\nEscolha o personagem para o Jogador ${playerNumber}:`);
    console.log("Personagens disponíveis: Mario, Peach, Yoshi, Bowser, Luigi, Dk");

    return new Promise(resolve => {
        rl.question(`Digite o nome do personagem para o Jogador ${playerNumber}: `, (answer) => {
            // Converte a primeira letra para maiúscula para corresponder à base de dados
            const characterName = answer.charAt(0).toUpperCase() + answer.slice(1).toLowerCase();
            const character = selecionarPersonagem(characterName);
            resolve(character);
        });
    });
}

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "Reta"
            break
        case random < 0.66:
            result = "Curva"
            break
        default:
            result = "Confronto"
    }

    return result
}

async function logRollResult(characterName, block, diceResult, atribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${atribute} = ${diceResult + atribute}`)
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`)

        // sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        // rolar os dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        // teste de habilidade
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

            if (testSkill1 === testSkill2) {
                console.log("🏎 Disputa acirrada! Nenhum jogador marcou ponto.")
            }

        }
        if (block == "Curva") {
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

            if (testSkill1 === testSkill2) {
                console.log("🏎 Disputa acirrada! Nenhum jogador marcou ponto.")
            }

        }
        if (block == "Confronto") {
            let powerResult1 = diceResult1 + character1.poder
            let powerResult2 = diceResult2 + character2.poder

            console.log(`${character1.nome} confrontou com ${character2.nome}!🥊\n`)

            await logRollResult(
                character1.nome,
                "poder",
                diceResult1,
                character1.poder
            )

            await logRollResult(
                character2.nome,
                "poder",
                diceResult2,
                character2.poder
            )

            if (powerResult1 > powerResult2 && character2.pontos > 0) {
                console.log(
                    `${character1.nome} venceu o confronto! ${character2.nome} perdeu um ponto 🐢`)
                character2.pontos--
            }

            if (powerResult2 > powerResult1 && character1.pontos > 0) {
                console.log(
                    `${character2.nome} venceu o confronto! ${character1.nome} perdeu um ponto 🐢`)
                character1.pontos--
            }

            console.log(powerResult2 === powerResult1 ?
                "Confronto empatado! Nenhum ponto foi perdido." : "")
        }

        if (testSkill1 > testSkill2) {
            console.log(`${character1.nome} marcou um ponto!`)
            character1.pontos++
        } else if (testSkill2 > testSkill1) {
            console.log(`${character2.nome} marcou um ponto!`)
            character2.pontos++
        }

        console.log("_____________________________________\n")

    }
}

async function winner(character1, character2) {
    console.log("Resultado final:")
    console.log(`${character1.nome}: ${character1.pontos} ponto(s)`)
    console.log(`${character2.nome}: ${character2.pontos} ponto(s)`)

    if (character1.pontos > character2.pontos) {
        console.log(`\n${character1.nome} venceu a corrida! parabéns 🏆🎉`)
    } else if (character2.pontos > character1.pontos) {
        console.log(`\n${character2.nome} venceu a corrida! parabéns 🏆🎉`)
    } else {
        console.log("A corrida terminou em empate! 🤝")
    }
}

(async function main() {
    // AQUI VOCÊ PODE MUDAR OS PERSONAGENS!
    // Para testar, basta passar o nome do personagem como string
    const player1 = await escolherPersonagem(1);
    const player2 = await escolherPersonagem(2);

    if (player1 && player2) {
        console.log(
            `🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando ...\n`
        )

        await playRaceEngine(player1, player2);

        await winner(player1, player2);
    }
     // Fecha a interface do readline para que o programa termine
    rl.close();
})();

// Código original sem a base de dados de personagens
// Você pode comparar com a versão atualizada acima
// const player1 = {
//     nome :  "Mario",
//     velocidade : 4,
//     manobrabilidade : 3,
//     poder : 3,
//     pontos : 0,
// };

// const player2 = {
//     nome :  "Luigi",
//     velocidade : 3,
//     manobrabilidade : 4,
//     poder : 4,
//     pontos : 0,
// };

// async function rollDice() {
//     return Math.floor(Math.random() * 6) + 1; 
// }


// async function getRandomBlock() {
//     let random = Math.random()
//     let result

//     switch (true) {
//         case random < 0.33 :
//             result = "Reta"
//             break
//         case random < 0.66 :
//             result = "Curva"
//             break
//         default :
//             result = "Confronto"
//     }

//     return result
// }

// async function logRollResult(characterName, block, diceResult, atribute) {
//     console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${atribute} = ${diceResult + atribute}`)
// }

// async function playRaceEngine(character1, character2) {
//     for(let round = 1; round <=   5; round ++) {
//         console.log(`🏁 Rodada ${round}`)

//         //sortear bloco
//         let block = await getRandomBlock()
//         console.log(`Bloco: ${block}`)

//         //rolar os dados
//         let diceResult1 = await rollDice()
//         let diceResult2 = await rollDice()

//         //teste de habilidade
//         let testSkill1 = 0
//         let testSkill2 = 0
    
//         if (block == "Reta") {
//             testSkill1 = diceResult1 + character1.velocidade 
//             testSkill2 = diceResult2 + character2.velocidade

//             await logRollResult(
//                 character1.nome,
//                 "velocidade",
//                 diceResult1,
//                 character1.velocidade
//             )

//             await logRollResult(
//                 character2.nome,
//                 "velocidade",
//                 diceResult2,
//                 character2.velocidade
//             )

//             if (testSkill1 === testSkill2) {
//                 console.log("🏎 Disputa acirrada! Nenum jogador marcou ponto.")
//             }
                
//         } if (block == "Curva") {
//             testSkill1 = diceResult1 + character1.manobrabilidade 
//             testSkill2 = diceResult2 + character2.manobrabilidade

//             await logRollResult(
//                 character1.nome,
//                 "manobrabilidade",
//                 diceResult1,
//                 character1.manobrabilidade
//             )

//             await logRollResult(
//                 character2.nome,
//                 "manobrabilidade",
//                 diceResult2,
//                 character2.manobrabilidade
//             )

//             if (testSkill1 === testSkill2) {
//                 console.log("🏎 Disputa acirrada! Nenum jogador marcou ponto.")
//             }

//         } if (block == "Confronto") {
//             let powerResult1 = diceResult1 + character1.poder
//             let powerResult2 = diceResult2 + character2.poder

//             console.log(`${character1.nome} confrontou com ${character2.nome}!
//             🥊`)

//             await logRollResult(
//                 character1.nome,
//                 "poder",
//                 diceResult1,
//                 character1.poder
//             )

//             await logRollResult(
//                 character2.nome,
//                 "poder",
//                 diceResult2,
//                 character2.poder
//             )

//             if (powerResult1 > powerResult2 && character2.pontos > 0) {
//                 console.log(
//                     `${character1.nome} venceu o confronto! ${character2.nome} perdeu um ponto 🐢`)
//                 character2.pontos--
//             }

//             if (powerResult2 > powerResult1 && character1.pontos > 0) {
//                 console.log(
//                     `${character2.nome} venceu o confronto! ${character1.nome} perdeu um ponto 🐢`)
//                 character1.pontos--
//             }

//             console.log(powerResult2 === powerResult1 
//                 ? "Confronto empatado! Nenhum ponto foi perdido."
//                 : "")
//         }

//         if (testSkill1 > testSkill2) {
//             console.log(`${character1.nome} marcou um ponto!`)
//             character1.pontos++
//         } else if (testSkill2 > testSkill1) {
//             console.log(`${character2.nome} marcou um ponto!`)
//             character2.pontos++
//         }

//         console.log("_____________________________________\n")
        
//     }
// }

// async function winner(character1, character2) {
//     console.log("Resultado final:")
//     console.log(`${character1.nome}: ${character1.pontos} ponto(s)`)
//     console.log(`${character2.nome}: ${character2.pontos} ponto(s)`)

//     if (character1.pontos > character2.pontos) {
//         console.log(`\n${character1.nome} venceu a corrida! parabéns 🏆🎉`)
//     } else if (character2.pontos > character1.pontos) {
//         console.log(`\n${character2.nome} venceu a corrida! parabéns 🏆🎉`)
//     } else {
//         console.log("A corrida terminou em empate! 🤝")
//     }
// }

// (async function main() {
//     console.log(
//         `🏁🚨 Corrida entre ${player1.nome} e ${player2.nome} começando ...\n`
//     )

//     await playRaceEngine(player1, player2);

//     await winner(player1, player2);
// })();
