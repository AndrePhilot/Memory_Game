const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let cardPair = [];
let isReady = true;

// TODO: Implement this function!
function handleCardClick(event) {
  if (!isReady) return; // Ignore clicks if not ready
  // you can use event.target to see which element was clicked
  const target = event.target;
  if (target === cardPair[0] || cardPair.length === 2) return; // To prevent double-clicking the same card or flipping more than two cards
  flipCard(target);

  if (cardPair.length === 2) {
  checkForMatch();
}
}

//Function that flips two cards at a time
function flipCard(card) {
card.style.backgroundColor = card.classList[0];
cardPair.push(card);
}

// Function that checks if there was a match between the background color of the cards
function checkForMatch() {
isReady = false; // Disable clicking while checking for a match
const [card1, card2] = cardPair;
if (card1.classList[0] === card2.classList[0]) {
  cardPair = [];
  isReady = true;
} else {
  setTimeout(() => {
    card1.style.backgroundColor = '';
    card2.style.backgroundColor = '';
    cardPair = [];
    isReady = true;
  }, 1000);
}
}

// when the DOM loads
createDivsForColors(shuffledColors);
