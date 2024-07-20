const playersArray = [
    {
        name: 'Robin',
        maxHealth: 30,
        health: 30,
        power: 6,
        heal: 10,
        activeSlot: '',
        inventory: []
    },
    {
        name: 'Scarlet',
        maxHealth: 20,
        health: 20,
        power: 4,
        heal: 12,
        activeSlot: '',
        inventory: []
    }
] 


const monsetrsArray = [
    {
        type: 'vampire',
        health: 30,
        power: 7,
        loot: "the vampire's mantle"
    },
    {
        type: 'Werewolf',
        health: 50,
        power: 12,
        loot: 'fang of Werewolf'
    }
]


const itemsArray = [
    {
        name: "the vampire's mantle",
        type: 'regeneration',
        heal : 4,
    }, 
    {
        name : 'fang of Werewolf',
        type: 'attack',
        power: 6
    }
]

const currentCharacters = []
console.log(monsetrsArray[0])

chooseFighter()
chooseAction(currentCharacters[0], monsetrsArray[0])

function chooseFighter (){
    let userChoice =  prompt(`Choose your fighter: \n 1 - ${introduce(playersArray[0])} \n 2 - ${introduce(playersArray[1])}`)
    currentCharacters.push(playersArray[userChoice - 1])
}

function introduce (player){
    return `Name: ${player.name}, health: ${player.health}, power: ${player.power}, regeneration: ${player.heal}`
}

function chooseAction (player, monster) {
    console.log(`${player.name} meet ${monster.type}`)
    let userInput = prompt("if you want to attack press 1 if heal press 2")
    if (userInput == 1){
        fight(player, monster, userInput)
    } else if (userInput == 2){
        fight(player, monster, userInput)
    }else(
        console.log('wrong input')
    )
}


function fight (player, monster, userInput) {
    if (userInput == 1) {
        player.health = player.health - monster.power
        monster.health = monster.health - player.power
        console.log(player.health, monster.health)
        checkStateOfOpponents(player, monster)
    }else{
        player.health = player.health - monster.power
        player.health = player.health + player.heal > player.maxHealth ? player.maxHealth : player.health + player.heal
        console.log(player.health, monster.health)
        checkStateOfOpponents(player, monster)
    }
}

function checkStateOfOpponents(player, monster){
    if ( player.health <= 0){
        console.log('You lose')
    } else if( monster.health <= 0){
        console.log('monster is killed')
        const loot = itemsArray.filter(item => item.name === monster.loot)[0]
        console.log(`You have got new item: "${monster.loot}". It increases your ${loot.type} by  ${loot.type === 'atack' ? loot.atack : loot.heal}`)
        player.inventory.push(monster.loot)
        console.log(player.inventory)
    }else{
        chooseAction(player, monster)
    }
}

// create next stage 
// make separate function from if else if else block       DONE
// store characters in temporary object 
// think how to add them here and update every time something happens