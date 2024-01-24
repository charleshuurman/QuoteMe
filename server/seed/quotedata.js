// Seed data and its exported functions

let seed_usernames = [
  'Alexander',
  'Alfredo',
  'Amparo',
  'Anderson',
  'Andreas',
  'Antione',
  'Baldwin',
  'Barbara',
  'Barber',
  'Barker',
  'Bettye',
  'Bobbie',
  'Bobby',
  'Boone',
  'Briana',
  'Brock',
  'Byrd',
  'Cabrera',
  'Cat',
  'Cannon',
  'Carey',
  'Carlton',
  'Christie',
  'Cliff',
  'Cowan',
  'Curtis',
  'Deanna',
  'Deleon',
  'Dewayne',
  'Emanuel',
  'Erma',
  'Escobar',
  'Esther',
  'Eugenia',
  'Evangelina',
  'Farrell',
  'Fischer',
  'Floyd',
  'Frieren',
  'Gallegos',
  'Garrett',
  'Gene',
  'Georgia',
  'German',
  'Gilmore',
  'Giuseppe',
  'Gordon',
  'Graham',
  'Hank',
  'Hernandez',
  'Hester',
  'Ho',
  'Holmes',
  'Judson',
  'Juliet',
  'Kendrick',
  'Kidd',
  'Kline',
  'Knox',
  'Lane',
  'Le',
  'Marianne',
  'Marina',
  'Martin',
  'Melva',
  'Millie',
  'Montes',
  'Moon',
  'Morrow',
  'Moyer',
  'Murphy',
  'Nicholas',
  'Numbers',
  'Orval',
  'Oscar',
  'Penny',
  'Percy',
  'Preston',
  'Rachel',
  'Richardson',
  'Rivera',
  'Robby',
  'Rocco',
  'Rosalyn',
  'Ross',
  'Roxie',
  'Rudy',
  'Russell',
  'Singh',
  'Snow',
  'Stephens',
  'Swanson',
  'Sweeney',
  'Vargas',
  'Vera',
  'Victoria',
  'Villanueva',
  'Walter',
  'Wilcox',
  'Wilfredo'
];

const seed_thoughts = [
  "I could eat avocados for thee rest of my life.",
  "You are bringing unresolved emotion into everything.",
  "He ordered a latte.",
  "I have a birthday coupon to use.",
  "It's very cool to watch a bubble as it freezes over.",
  "The girl was wearing a denim jacket over a denim shirt and denim jeans.",
  "I could help you make a list of things we need to buy.",
  "My favorite snack is pretzels.",
  "There were seven balloons at the store.",
  "The jar of candles was ready on the table.",
  "It makes me forget all my problems.",
  "I need to stir the soup.",
  "Big men are not always strong.",
  "She found the necklace in a safe at the bottom of her parents' closet.",
  "He got on the teacher’s bad side.",
  "It does nothing for me.",
  "She had nothing else to say to him.",
  "How beautiful she is!",
  "How big you are!",
  "I don't know why he bought instant coffee when there was a free espresso machine around the corner which was constantly stocked.",
  "It is just what I need.",
  "California is not in the United Kingdom.",
  "I was hung over.",
  "She went to Oktoberfest and got drunk on half a stein of beer.",
  "We have a big oak tree in our backyard.",
  "You’ll get a chance to come closer to nature, meet lots of different animals, birds, and plants.",
  "I'm going to take a break.",
  "When I was young, I played the guitar.",
  "I pick you up in front of the hotel.",
  "He wanted to wear lipstick but the lipstick was expired."
];

const seed_reactions = [
  'happy',
  'glad',
  'awesome',
  'surprised',
  'funny',
  'running away',
  'ROTFL',
  'lol',
  'LOLOLOL',
  'cheese',
  'pizza',
  'soup',
  'bored',
  'hopping',
  'skipping',
  'drunk',
  'deep',
  'natural',
  'comfort',
  'peace',
  'joy',
  'delicious',
  'exceptional',
  'satisfaction guaranteed',
  'easy',
  'unparalleled',
  'blissful',
  'delightful',
  'jubilant',
  'rave',
  'thrilled',
  'agony',
  'floundering',
  'helpless',
  'paralyzed',
  'surrender'
];

// Generate a random date
// From https://bobbyhadz.com/blog/javascript-generate-random-date
function generateRandomDate(from, to) {
  return new Date(
    from.getTime() +
      Math.random() * (to.getTime() - from.getTime()),
  );
}

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomName = () => seed_usernames.splice(Math.floor(Math.random() * seed_usernames.length), 1)[0].toLowerCase();

const getRandomNames = (num, arr) => {
  let somenames = [...arr];
  let pickednames = [];
  for (i = 0; i < num; i++) {
    let [aname] = somenames.splice(Math.floor(Math.random() * (somenames.length)), 1);
    // console.log("a name:", aname);
    pickednames.push(aname);
  };
  return pickednames;
};

// Function to generate random thoughts
const getRandomQuote = () => {
  return `${getRandomArrItem(seed_thoughts)} ${getRandomArrItem(seed_thoughts)}`;
};

// Generate random reaction strings
const getRandomReaction = () => {
  return `${getRandomArrItem(seed_reactions)} ${getRandomArrItem(seed_reactions)}`;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomNames, getRandomQuote, getRandomReaction, getRandomArrItem, generateRandomDate };
