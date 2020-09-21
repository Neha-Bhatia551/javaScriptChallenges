function showAgeInDays() {
    let birthyear = prompt("What is your birth year??");
    let ageInDays = (2020 - birthyear) * 365;
    let h1 = document.createElement("h1");
    let textNode = document.createTextNode("you are " + ageInDays + " days old");
    h1.setAttribute("id", "ageInDays");
    h1.appendChild(textNode);
    document.getElementById("flex-box-result").appendChild(h1);
}

function reset() {
    document.getElementById("ageInDays").remove();
}

function generateCat() {
    let image = document.createElement("img");
    image.src = "https://pro2-bar-s3-cdn-cf6.myportfolio.com/b113eecaadc1a69b43b38ec15f563c43/71d9ca62-6b8f-4fd4-8611-796da6c406bb_rw_1200.gif?h=e04b7ef76a59724f233aaa23f4ba5406";
    let element = document.getElementById("flex-box-cat");
    element.appendChild(image);
}

function generateBotChoice() {
    rpsArray = ["rock", "paper", "scissors"];
    return rpsArray[Math.floor(Math.random() * 3)];
}

function getResult(humanChoice, botChoice) {
    let tiedMsg = "Tied!";
    let winMsg = "You Won!";
    let lostMsg = "You Lost!";
    if (humanChoice === botChoice) {
        return [tiedMsg, "yellow"];
    } else if (humanChoice === "rock" && botChoice === "scissors") {
        return [winMsg, "green"];
    } else if (humanChoice === "rock" && botChoice === "paper") {
        return [lostMsg, "red"];
    } else if (humanChoice === "paper" && botChoice === "rock") {
        return [winMsg, "green"];
    } else if (humanChoice === "paper" && botChoice === "scissors") {
        return [lostMsg, "red"];
    } else if (humanChoice === "scissors" && botChoice === "rock") {
        return [lostMsg, "red"];
    } else if (humanChoice === "scissors" && botChoice === "paper") {
        return [winMsg, "green"];
    }
}

function resultDisplay(humanChoice, botChoice, resultMessage) {
    let images = {
        'rock': document.getElementById('rock').src,
        'scissors': document.getElementById('scissors').src,
        'paper': document.getElementById('paper').src,
    }
    document.getElementById("rock").remove();
    document.getElementById("scissors").remove();
    document.getElementById("paper").remove();
    let humanDiv = document.createElement("div");
    let messageDiv = document.createElement("div");
    let botDiv = document.createElement("div");
    humanDiv.innerHTML = "<img src='" + images[humanChoice] + "' height=150 width=150 style='boxShadow: 0px 10px 50px rgba(70,50,233,1);'/>";
    messageDiv.innerHTML = "<h2 style='color:" + resultMessage[1] + ";'>" + resultMessage[0] + "</h2>";
    botDiv.innerHTML = "<img src='" + images[botChoice] + "' height=150 width=150 style='boxShadow: 0px 10px 50px rgba(233,50,75,1);'/>";
    let flexRps = document.getElementById("rps");
    flexRps.appendChild(humanDiv);
    flexRps.appendChild(messageDiv);
    flexRps.appendChild(botDiv);
}

function gameResult(selectedChoice) {
    let humanChoice, botChoice;
    humanChoice = selectedChoice.id;
    botChoice = generateBotChoice();
    resultMessage = getResult(humanChoice, botChoice);
    resultDisplay(humanChoice, botChoice, resultMessage);
}

let allButtons = document.getElementsByTagName("button");

let copyAllButtons = [];
for (let i = 0; i < allButtons.length; i++) {
    copyAllButtons.push(allButtons[i].classList[1]);
}

function buttonsRed() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-danger");
    }
}

function buttonsReset() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}


function buttonsGreen() {
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add("btn-success");
    }
}

function randomColorButtons() {
    let choices = ['btn-primary', 'btn-danger', 'btn-success', 'btn-warning'];
    for (let i = 0; i < allButtons.length; i++) {
        let randomChoice = Math.floor(Math.random() * choices.length);
        allButtons[i].classList.remove(allButtons[i].classList[1]);
        allButtons[i].classList.add(choices[randomChoice]);
    }
}

function buttonColorChange(buttonThingy) {
    if (buttonThingy.value === "red") {
        buttonsRed();
    } else if (buttonThingy.value === "green") {
        buttonsGreen();
    } else if (buttonThingy.value === "reset") {
        buttonsReset();
    } else if (buttonThingy.value === "random") {
        randomColorButtons();
    }
}

let blackJackGame = {
    'you': {
        'scoreSpan': "#your-result",
        'div': "#your-box",
        'score': 0,
    },
    'dealer': {
        'scoreSpan': "#dealer-result",
        'div': "#dealer-box",
        'score': 0,
    },
    'cards' : ['2','3','4','5','6','7','8','9','10','A','J','K','Q'],
    'cardsMap': {'2': 2, '3': 3, '4': 4,'5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1,11]},
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnOver': false,
};

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];
const hitSound = new Audio('static/sounds/swish.m4a');
const winSound = new Audio('static/sounds/cash.mp3');
const lossSound = new Audio('static/sounds/aww.mp3');
document.querySelector('#hit').addEventListener('click', blackJackHit);
document.querySelector("#deal").addEventListener('click', blackJackDeal)
document.querySelector('#stand').addEventListener('click',dealerLogic);

function blackJackHit() {
    if(!blackJackGame.isStand) {
        let randomCard = getRandomCard();
        showCard(YOU,randomCard);
        updateSpanScore(YOU, randomCard);
        showScore(YOU);
    }
}

function showCard(activePlayer,randomCard) {
    if(activePlayer['score'] <=21) {
        let cardImage = document.createElement('img');
        hitSound.play();
        cardImage.src = `static/images/${randomCard}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage); 
    }
}

function blackJackDeal() {
    if(blackJackGame.turnOver) {
        blackJackGame.isStand = false;
        let yourImages = document.querySelector(YOU['div']).querySelectorAll("img");
        let dealerImages = document.querySelector(DEALER['div']).querySelectorAll("img");
        for (i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector(YOU['scoreSpan']).textContent = 0;
        document.querySelector(DEALER['scoreSpan']).textContent = 0;
        document.querySelector(YOU['scoreSpan']).style.color='white';
        document.querySelector(DEALER['scoreSpan']).style.color='white';
        document.querySelector("#blackJack-result").textContent = "Let's Play";
        document.querySelector("#blackJack-result").style.color = 'black';
        blackJackGame.turnOver = false;
    }
}

function getRandomCard(){
    let randomIndex = Math.floor(Math.random() * blackJackGame.cards.length);
    return blackJackGame.cards[randomIndex];
}

function updateSpanScore(activePlayer, randomCard) {
    if(randomCard === 'A'){
        if(activePlayer['score'] + blackJackGame.cardsMap[randomCard][1] <= 21) {
            activePlayer['score'] += blackJackGame.cardsMap[randomCard][1];
        } else {
            activePlayer['score'] += blackJackGame.cardsMap[randomCard][0];
        }
    } else {
        activePlayer['score'] += blackJackGame.cardsMap[randomCard];
    }
}

function showScore(activePlayer) {
    if(activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic() {
    let winner;
    while(DEALER['score'] < 16 && !blackJackGame.isStand) {
        let randomCard = getRandomCard();
        showCard(DEALER,randomCard);    
        updateSpanScore(DEALER, randomCard);
        showScore(DEALER);
        await sleep(1000);
    }  
    blackJackGame.isStand = true;
    blackJackGame.turnOver = true;
    winner = computeWinner();
    showWinner(winner);
}


function computeWinner() {
    let winner;

    if(YOU['score'] <=21) {
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            winner = YOU;
            console.log("You win!!");
        } else if (YOU['score'] < DEALER['score']) {
            winner = DEALER;
            console.log("You lost!!");
        } else if(YOU['score'] === DEALER['score']) {
            console.log('You drew!');
        }
    } else if(YOU['score'] > 21 && DEALER['score'] <= 21) {
        console.log("You lost!!");
        winner = DEALER;
    } else if(YOU['score'] > 21 && DEALER['score'] >21 ) {
        console.log('You drew!');
    }
    console.log("winner is ",winner);
    setScore(winner);
    return winner;
}

function showWinner(winner) {
    let message, messageColor;
    if(blackJackGame.turnOver) {
        if(winner === YOU) {
            message = 'You Won!';
            messageColor = 'green';
            winSound.play();
        } else if(winner === DEALER) {
            message = 'You Lost!';
            messageColor = 'red';
            lossSound.play();
        } else {
            message = 'You Tied!';
            messageColor = 'black';
        }
        document.querySelector("#blackJack-result").textContent = message;
        document.querySelector("#blackJack-result").style.color = messageColor;
    }
}

function setScore(winner) {
    if(winner === YOU) {
        blackJackGame['wins']++; 
        document.querySelector("#wins").textContent = blackJackGame['wins'];
    } else if(winner === DEALER) {
        blackJackGame['losses']++;
        document.querySelector("#losses").textContent = blackJackGame['losses'];
    } else  {
        blackJackGame['draws']++;
        document.querySelector("#draws").textContent = blackJackGame['draws'];
    }
}