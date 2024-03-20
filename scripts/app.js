import { wordList } from './word-list.js';

drawPage()


let keyPanel = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 97, 115, 100, 102, 103, 104, 106, 107, 108, 122, 120, 99, 118, 98, 110, 109];
let VALID_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'o', 'p', 'q', 'r', 's', 't', 'u', 'w', 'y', 'x', 'z', 'l', 'm', 'n', 'v'];

const container = document.querySelector('.container');
const gameBox = document.querySelector('.game__box');
const keyboardDiv = document.querySelector('.keyboard');
const wordDisplay = document.querySelector('.word-display');
const gameModal = document.querySelector('.game__modal');
const playAgainBtn = document.querySelector('.button.play-again');
const guessesCount = document.querySelector('.guesses-count');
const hangmanImage = document.querySelector('.hangman__box__img');

const maxGuesses = 6;

const audioWin = document.createElement('audio');
audioWin.src = `audio/win.wav`;
container.appendChild.audioWin;
const audioLost = document.createElement('audio');
audioLost.src = `audio/lost-game.wav`;
container.appendChild.audioLost;

let lettersGuessed = [];
let secretWord;
let count;
let gameOver = false;

window.onload = function () {
    startNewGame();
}

window.onkeydown = function (event) {
    prosessUserInput(event.key.toLowerCase());    
}


function startNewGame() {
    let { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    secretWord = word;
    console.log(secretWord);
     count = 0;
    guessesCount.innerText = `${count} / ${maxGuesses}`;
    document.querySelector(".hint-accent").innerHTML = hint;
   gameOver = false;
    lettersGuessed = [];
    render();
     gameModal.classList.remove('modal__show');
}

function prosessUserInput(keyPressed) {

    if (!gameOver) {
        
        if ((VALID_LETTERS.includes(keyPressed)) && (!lettersGuessed.includes(keyPressed))) {
            lettersGuessed.push(keyPressed); 
           

            if (countBadGuesses() == 6) {
                gameOver = true;
                showModal();
            } else if (checkWin()) {
                gameOver = true;
                showModal();
            }
            render();              
        }       
    }
}

function showModal() {
   
    setTimeout(() => {
        let modalText;
        if (checkWin()) {
            
            modalText = `You guessed the word: `;
            document.querySelector('.game__modal__p').innerText = `${modalText}`;
            document.querySelector('.secret-word').innerText = `${secretWord}`;
            document.querySelector('.modal__img').src = `images/victory.gif`;
            document.querySelector('.game__modal__header').innerText = `Congrats!`;
            audioWin.play();
             
        } else {
            
            modalText = `The secret word was: `;
            document.querySelector('.game__modal__p').innerText = `${modalText}`;
            document.querySelector('.secret-word').innerText = `${secretWord}`;
            document.querySelector('.modal__img').src = `images/lost.gif`;
            document.querySelector('.game__modal__header').innerText = `Game Over!`;
            audioLost.play();
             
        }
    
        gameModal.classList.add('modal__show');
    }, 700)
}

function render() {
    drawKeyboard();
    renderSecretWord();
    renderHangmanImage();
}

function renderHangmanImage() {
    let badCount = countBadGuesses();
    
     hangmanImage.src = `images/${badCount}.jpg`;
}

function renderSecretWord() {
        let tempStr = '';
        for (let i = 0; i < secretWord.length; i++) {
            let thisLetter = secretWord[i];
                if (lettersGuessed.includes(thisLetter)) {
                    tempStr +=` ${ thisLetter} `;
            } else {
                tempStr += ` _ `;
            }
            wordDisplay.innerHTML = tempStr.toUpperCase();
        }
}

function countBadGuesses() {
     count = 0;
    for (let i = 0; i < lettersGuessed.length; i++) {
        let thisLetter = lettersGuessed[i];
        if (!secretWord.includes(thisLetter)) {
            count++;
            document.querySelector('.guesses-count').innerText = `${count} / ${maxGuesses}`;
           
        } 
        else if (count > 6) {
            count = 6;
        }        
    }
     
    return count;
}

function checkWin() {
    for (let i = 0; i < secretWord.length; i++) {
        let thisLetter = secretWord[i];
        if ((VALID_LETTERS.includes(thisLetter))&&(!lettersGuessed.includes(thisLetter))) {
            return false;
        }
    } 
    
    return true;
     
}

playAgainBtn.addEventListener('click', startNewGame);


function drawKeyboard() {
   
    keyboardDiv.innerHTML = '';
    for (let i = 0; i < keyPanel.length; i++) {
        let char = String.fromCharCode(keyPanel[i]);
        const button = document.createElement("button");   
        button.innerHTML = char;
         button.className = "button";
         // check if the user guessed the letter
        if (lettersGuessed.includes(char)) {
            button.classList.add('disabled');
        } else {

            // button.addEventListener('click', prosessUserInput(char));

            button.onclick = function () {               
                prosessUserInput(char);
            }
        }
    
        keyboardDiv.appendChild(button);

        if (char == "l") {
            keyboardDiv.appendChild(document.createElement("span"));
        }
    }
    gameBox.appendChild(keyboardDiv);
}




function drawPage() {       
    const container = document.createElement('div');
    container.classList.add('container');

    // hangmanbox
    const hangmanBox = document.createElement('div');
    hangmanBox.classList.add('hangman-box');   
    container.appendChild(hangmanBox);
    document.body.appendChild(container);

    const hangmanHeader = document.createElement('h1');
    hangmanHeader.classList.add('hangman-header');
    hangmanHeader.innerText = 'hangman game';
    hangmanBox.appendChild(hangmanHeader); 
    
     const hangmanWrapper = document.createElement('div');
    hangmanWrapper.classList.add('hangman-wrapper');
    hangmanBox.appendChild(hangmanWrapper); 
    
    const hangmanImage = document.createElement('img'); 
    hangmanImage.classList.add('hangman__box__img')
    hangmanImage.alt = 'hangman image';
    hangmanWrapper.appendChild(hangmanImage);
    hangmanImage.src = `images/0.jpg`;

    // draw game box

    const gameBox = document.createElement('div');
gameBox.classList.add('game__box');
container.appendChild(gameBox);

    const wordDisplay = document.createElement('div');
    wordDisplay.classList.add('word-display');
    gameBox.appendChild(wordDisplay);

     const hintBlock = document.createElement('div');
    hintBlock.classList.add('hint');
    gameBox.appendChild(hintBlock);

    const gameBoxText = document.createElement('span');
    gameBoxText.classList.add('hint-text');
    gameBoxText.innerText = `Hint: `;
    hintBlock.appendChild(gameBoxText);
    
    
    const gameBoxHintText = document.createElement('span');
    gameBoxHintText.classList.add('hint-accent');
    gameBoxHintText.textContent = '';
    hintBlock.appendChild(gameBoxHintText);

    const guesses = document.createElement('div');
    guesses.classList.add('guesses');
    gameBox.appendChild(guesses);

    const guessesText = document.createElement('span');
    guessesText.classList.add('guesses-text');
    guessesText.innerText = `Incorrect guesses : `;
    guesses.appendChild(guessesText);

    const guessesCount = document.createElement('span');
    guessesCount.classList.add('guesses-count');
    guessesCount.innerText = ` 0 / 6 `;
    guesses.appendChild(guessesCount); 

     const keyboardDiv = document.createElement('div');
    keyboardDiv.classList.add('keyboard');
    gameBox.appendChild(keyboardDiv);


    container.appendChild(hangmanBox);
    container.appendChild(gameBox);

     drawModal()
    
}

function drawModal() {
    const gameModal = document.createElement('div');
    gameModal.classList.add('game__modal');
    gameModal.innerHTML = '';
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');
    gameModal.appendChild(modalContent);

    const modalImage = document.createElement('img');
    modalImage.classList.add('modal__img');
    modalContent.appendChild(modalImage);

    const modalHeader = document.createElement('h3');
    modalHeader.classList.add('game__modal__header');
    modalContent.appendChild(modalHeader);
    
    const modalP = document.createElement('p');
    modalP.classList.add('game__modal__p');

    modalContent.appendChild(modalP);

    const modalWord = document.createElement('p');
     modalWord.classList.add('secret-word');
    modalContent.appendChild(modalWord);

    const playAgainBtn = document.createElement('button');
    playAgainBtn.classList.add('button');
    playAgainBtn.classList.add('play-again');
    playAgainBtn.textContent = "Play again";
    modalContent.appendChild(playAgainBtn);  

    
    
    document.body.appendChild(gameModal);
}

