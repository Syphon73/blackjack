let cards = [] //arrays
let sum = 0;
let msg = " ";
let isAlive = false;
let blackjack = false;
//DOM manuplation (use ctrl+d to change variable name)
let showsum = document.getElementById("sum")
let showcard = document.getElementById("cards")
let showmsg = document.getElementById("msg")
let showplayer = document.getElementById("player-el")
//an object to store player data and chips (update it blackjack(+30), loosing(-20))
let totalchip = 124;
let player = {
    name: "player1",
    chips: totalchip,
    chipsgain: function(x){
        totalchip += x;
        return totalchip;
        //console.log(totalchip)
    },
    chipslost: function(x){
        if(totalchip-x>0){
            totalchip -= x;
            return totalchip;
        }
        else{
            isAlive = false;
            return 0;
        }
    }
}
//create a function to generate  and return random cards
//ace(1) -> 11 and king,queen(11-13) -> 10 
function randomcard(){
    let rnd = Math.floor(Math.random()*13)+1;
    if(rnd === 1){
        return 11;
    }
    else if(rnd > 10){
        return 10;
    }
    else {
        return rnd;
    }
}
//fnx to render the game
function newGame(){
    isAlive = true;
    showplayer.textContent = player.name + ": $" + totalchip
    let card1 = randomcard();
    let card2 = randomcard();
    cards = [card1,card2]
    sum = card1+card2
    if(isAlive==true && blackjack==false){
        startGame();
    }
}

function startGame(){
    showcard.textContent = "Cards: ";
    //render out all the cards of cards[]
    for(let i = 0;i<cards.length;i++){
        showcard.textContent += cards[i] + " ";
    }
    showsum.textContent = "Sum: " + sum;
    //check for blackjack
    if(sum<21){
        msg = "Do you wanna draw new card?";
    }
    else if(sum == 21){
        msg = "Congrats!! you got blackjack";
        let gain = player.chipsgain(30)
        showplayer.textContent = player.name + ": $" + gain;
        blackjack = true;
        isAlive = false;
    }
    else {
        msg  = "sorry game over";
        let lost = 0
        lost = player.chipslost(20);
        showplayer.textContent = player.name + ": $" + lost;
        isAlive = false;
    }
    showmsg.textContent = msg;
}
//fnx to push new card into array
function newcard(){
    if(isAlive == true && blackjack == false){
        let val = randomcard();
        sum = sum+val;
        //add new card to array
        cards.push(val)
        startGame()
    }
}