const cards = document.querySelectorAll('.card'); // Select all cards
const resetBtn = document.getElementById('resetBtn');
let startTime = performance.now();
let selectedCards = []; // To store clicked cards for comparison
let isChecking = false; // Prevent double-clicks during animations
    // Time in seconds

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (isChecking || card.querySelector('.card-inner').classList.contains('flipped')) {
            return; // Prevent clicking during animation or re-clicking a flipped card
        }

        card.querySelector('.card-inner').classList.add('flipped');
        selectedCards.push(card);
        

        if (selectedCards.length === 2) {
            isChecking = true;
            checkMatch();
            
        }
    });
});



function checkMatch() {
    const [card1, card2] = selectedCards;
    const value1 = card1.querySelector('.card-back').textContent;
    const value2 = card2.querySelector('.card-back').textContent;

    if (value1 === value2) {
        // Match: Keep them flipped
        selectedCards = [];
        isChecking = false;
        checkCompletion();
    } else {
        // No match: Flip them back after a delay
        setTimeout(() => {
            card1.querySelector('.card-inner').classList.remove('flipped');
            card2.querySelector('.card-inner').classList.remove('flipped');
            selectedCards = [];
            isChecking = false;
        }, 1000);
    }

}

function checkCompletion() {
    const allCards = document.querySelectorAll('.card-inner');
    const msgBox = document.getElementById('msgBox'); 

    const allFlipped = Array.from(allCards).every(card => card.classList.contains('flipped'));

    if (allFlipped) {
        const elapsedTime = ((performance.now() - startTime) / 1000).toFixed(2);
        msgBox.innerHTML = `Congratulations! You completed it in ${elapsedTime} seconds.`;
    }
}


function setRandom(){
    const emoji = ['😂', '🤣', '😊', '😍', '😒', '😘', '😢', '😅'];
    const backCards = document.querySelectorAll('.card-back');

    // Shuffle the emoji array and double it to have pairs of emojis
    const shuffledEmojis = [...emoji, ...emoji]
        .sort(() => Math.random() - 0.5); // Randomize array

    // Assign each shuffled emoji to a back card
    backCards.forEach((bCard, index) => {
        bCard.innerHTML = shuffledEmojis[index];
    });
}

resetBtn.addEventListener('click', ()=>{
    location.reload();
});
setRandom();