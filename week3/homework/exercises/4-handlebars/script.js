
/**
 * 4. Fun with Handlebars
 * 
 * Write a javascript function that simulates playing the game cards against humanity.
 * The code should choose a subject and a punchline at random,
 * then replace them in a sentence using handlebars.
 * 
 * Hints:
 * - Check the handlebars npm page for examples and documentation
 */
const Handlebars = require("handlebars");


const subjects = [
  'shark',
  'popcorn',
  'poison',
  'fork',
  'cherry',
  'toothbrush',
  'cannon',
];

const punchlines = [
  'watch movie with',
  'spread some love',
  'put on cake',
  'clean toilets',
  'go to the moon',
  'achieve world piece',
  'help people learn programing',
];



function drawCard() {
  // YOUR CODE GOES IN HERE
  let cardData = {
    subject : getRandomElement(subjects),
    punchline : getRandomElement(punchlines)
  };

  let card = "{{subject}} is great to {{punchline}}";
  let template = Handlebars.compile(card);
  let result = template(cardData);
  console.log(result);
}

// Given an array, return an element from it chosen at random
function getRandomElement(array) {
  // YOUR CODE GOES IN HERE
  let randomItem = array[Math.floor(Math.random() * array.length)];
  return randomItem;
}

drawCard();