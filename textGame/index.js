const playersArray = [
    {
        name: 'Robin',
        maxHealth: 30,
        health: 30,
        power: 6,
        heal: 10,
        activeSlot: "",
        inventory: []
    },
    {
        name: 'Scarlet',
        maxHealth: 20,
        health: 20,
        power: 4,
        heal: 12,
        activeSlot: "",
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
        health: 20,
        power: 12,
        loot: 'fang of Werewolf'
    },
    {
        type: 'Ogr',
        health: 50,
        power: 3,
        loot: 'rotten tomatoes'
    }
]


const itemsArray = [
    {
        name: "the vampire's mantle",
        type: 'regeneration',
        regeneration : 4,
    }, 
    {
        name : 'fang of Werewolf',
        type: 'attack',
        attack: 6
    },
    {
        name : 'rotten tomatoes',
        type: 'attack',
        attack: 3
    },
]

const currentCharacters = []
console.log(monsetrsArray[0])

chooseFighter()
console.log(`${currentCharacters[0].name} meet ${monsetrsArray[0].type}`)
chooseAction(currentCharacters[0], monsetrsArray[0])
console.log(`${currentCharacters[0].name} meet ${monsetrsArray[1].type}`)
chooseAction(currentCharacters[0], monsetrsArray[1])
console.log(`${currentCharacters[0].name} meet ${monsetrsArray[2].type}`)
chooseAction(currentCharacters[0], monsetrsArray[2])

function chooseFighter (){
    let userChoice =  prompt(`Choose your fighter: \n 1 - ${introduce(playersArray[0])} \n 2 - ${introduce(playersArray[1])}`)
    currentCharacters.push(playersArray[userChoice - 1])
}

function introduce (player){
    const {name, health, power, heal} = player
    return `Name: ${name}, health: ${health}, power: ${power}, regeneration: ${heal}`
}

function chooseAction (player, monster) {
    let userInput = prompt("if you want to attack press 1 if heal press 2")
    if (userInput == 1 || userInput == 2){
        fight(player, monster, userInput)
    }else(
        console.log('wrong input')
    )
}


function fight (player, monster, userInput) {
    const activeItem = player.activeSlot ? itemsArray.filter(item => item.name === player.activeSlot)[0] : ''
    const healItemEffect =  activeItem.regeneration ? activeItem.regeneration : 0
    const damageItemEffect = activeItem.attack ? activeItem.attack : 0

    player.health = player.health - monster.power

    if (userInput == 1) {
        monster.health = monster.health - player.power - damageItemEffect
    }else{
        player.health = player.health + player.heal + healItemEffect > player.maxHealth ? player.maxHealth : player.health + player.heal + healItemEffect
    }
    console.log(`Your health is: ${player.health}, ${monster.type}'s health is: ${monster.health}`)
    checkStateOfOpponents(player, monster)
}

function checkStateOfOpponents(player, monster){
    if ( player.health <= 0){
        console.log('You lose')
    } else if( monster.health <= 0){
        const loot = itemsArray.filter(item => item.name === monster.loot)[0]
        player.inventory.push(monster.loot)

        console.log('monster is killed')
        console.log(`You have got new item: "${monster.loot}". It increases your ${loot.type} by  ${loot.type === 'attack' ? loot.attack : loot.regeneration}`)
        console.log(player.inventory)

        useLoot(currentCharacters[0])
    }else{
        chooseAction(player, monster)
    }
}

function useLoot (player) {
    let userChoice = prompt(`Select item from your inventory to activate: \n ${player.inventory.map((item, index) => {
        return `if you want to select ${item} press ${index + 1} \n`
    })}`)
    player.activeSlot = player.inventory[userChoice - 1]
    console.log(player.activeSlot)
}

