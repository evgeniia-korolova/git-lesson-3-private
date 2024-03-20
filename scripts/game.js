import { wordList } from './word-list.js';
// const container = document.querySelector('.container');

const container = document.createElement('div');
container.classList.add('container');

document.body.appendChild(container);

 const playAgainBtn = document.createElement('button');



let keyPanel = [113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 97, 115, 100, 102, 103, 104, 106, 107, 108, 122, 120, 99, 118, 98, 110, 109];
let VALID_LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'o', 'p', 'q', 'r', 's', 't', 'u', 'w', 'y', 'x', 'z', 'l', 'm', 'n', 'v'];

 
let secretWord;
let currentHint;


const maxGuesses = 6;
    
let lettersGuessed = [];
let gameOver = false;
let count;
// let { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
// console.log(word);
// console.log(hint);


const gameModal = document.createElement('div');
gameModal.classList.add('game__modal');
container.appendChild(gameModal);

const hangmanBox = document.createElement('div');
hangmanBox.classList.add('hangman__box');
container.appendChild(hangmanBox);

const gameBox = document.createElement('div');
gameBox.classList.add('game__box');
container.appendChild(gameBox);
    
const audioWin = document.createElement('audio');
audioWin.src = `audio/win.wav`;
container.appendChild.audioWin;
const audioLost = document.createElement('audio');
audioLost.src = `audio/lost-game.wav`;
container.appendChild.audioLost;



function drawModal() {
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

    playAgainBtn.classList.add('button');
    playAgainBtn.classList.add('play-again');
    playAgainBtn.textContent = "Play again";
    modalContent.appendChild(playAgainBtn);    
}

function drawHangmanBox() {
    hangmanBox.innerHTML = "";
    const hangmanHeader = document.createElement('h1');
    hangmanHeader.innerText = 'hangman game';
    hangmanBox.appendChild(hangmanHeader);    

    const hangmanWrapper = document.createElement('div');
    hangmanWrapper.classList.add('hangman-wrapper');
    hangmanBox.appendChild(hangmanWrapper);  
}



function drawGameBox() {
    gameBox.innerHTML = "";
      
    const wordDisplay = document.createElement('div');
    wordDisplay.classList.add('word-display');
    gameBox.appendChild(wordDisplay);

    // ================
    
    const hintBlock = document.createElement('div');
    hintBlock.classList.add('hint');
    gameBox.appendChild(hintBlock);

    const gameBoxText = document.createElement('span');
    gameBoxText.classList.add('hint-text');
    gameBoxText.innerText = `Hint: `;
    hintBlock.appendChild(gameBoxText);
    // !
    
    const gameBoxHintText = document.createElement('span');
    gameBoxHintText.classList.add('hint-accent');
    gameBoxHintText.textContent = '';
    hintBlock.appendChild(gameBoxHintText);

    // ==========================

    const guesses = document.createElement('div');
    guesses.classList.add('guesses');
    gameBox.appendChild(guesses);

    const guessesText = document.createElement('span');
    guessesText.classList.add('guesses-text');
    guessesText.innerText = `Incorrect guesses : `;
    guesses.appendChild(guessesText);

    const guessesCount = document.createElement('span');
    guessesCount.classList.add('guesses-count');
    guesses.appendChild(guessesCount);  
    
    //  drawKeyboard(); 

}

function drawKeyboard() {
    const keyboardDiv = document.createElement('div');
    keyboardDiv.classList.add('keyboard');
    gameBox.appendChild(keyboardDiv);
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




// ========== ====================



// const getRandomWord = () => {
//     // Selecting a random word and hint from the wordList
//     const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
//     secretWord = word; // Making currentWord as random word
//     console.log(word);
//     console.log(hint);
//     currentHint = hint;
//     // document.querySelector(".hint-accent").innerText = currentHint;
    
// }

window.onload = function () {
    startNewGame();
}

window.onkeydown = function (event) {
    prosessUserInput(event.key.toLowerCase());    
}

function startNewGame() {
   let { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    secretWord = word;   
   
     lettersGuessed = [];
    gameOver = false;    
    render();
    count = 0;
    document.querySelector(".hint-accent").innerText = hint;
    document.querySelector('.guesses-count').innerText = `${count} / ${maxGuesses}`;    
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
    drawHangmanBox();
    drawGameBox();
    drawKeyboard();
    // getRandomWord();     
    drawModal();
    renderSecretWord();
    renderHangmanImage();
}

function renderHangmanImage() {
    let badCount = countBadGuesses();
    const hangmanImage = document.createElement('img');   
    hangmanImage.alt = 'hangman image';
    document.querySelector('.hangman-wrapper').appendChild(hangmanImage);
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
           
            document.querySelector('.word-display').innerHTML = tempStr.toUpperCase();
        }     
}

function countBadGuesses() {
     count = 0;
    for (let i = 0; i < lettersGuessed.length; i++) {
        let thisLetter = lettersGuessed[i];
        if (!secretWord.includes(thisLetter)) {
            count++;
            
            // audio[0].play();
            
        } 
        else if (count > 6) {
            count = 6;
        } 
        document.querySelector('.guesses-count').innerText = `${count} / ${maxGuesses}`;
        
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