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
  "A moment of deep breath brings peace to any chaotic day.",
  "Noticing the simple beauty in a leaf's intricate patterns can transform our perspective.",
  "Mindfulness is embracing the silence between thoughts.",
  "Let the rhythm of your breath guide you to inner calm.",
  "Every step taken with awareness is a journey towards inner peace.",
  "Find solace in the gentle glow of dawn; it's a new beginning.",
  "The art of mindfulness is finding joy in the taste of your morning tea.",
  "Observing the dance of raindrops on the windowpane brings a sense of serenity.",
  "The whisper of the wind is nature's way of speaking to our soul.",
  "Embrace the warmth of sunlight on your skin as a touch of the present moment.",
  "I am capable of navigating any challenge that comes my way.",
  "Today, I choose joy over worry.",
  "I am a beacon of love and compassion.",
  "I possess the strength to create positive changes in my life.",
  "With every breath, I release anxiety and welcome peace.",
  "I am worthy of love and kindness.",
  "My potential is limitless.",
  "I embrace my journey with grace and courage.",
  "I am surrounded by abundance.",
  "I trust the process of life.",
  "Happiness is found in the laughter shared with a friend.",
  "Gratitude turns what we have into enough.",
  "Joy blooms from appreciating the small moments.",
  "A heart filled with love sees no impossibilities.",
  "Hope is the dawn that promises a new day.",
  "It's okay to feel lost sometimes; paths are found in the journey.",
  "In the heart of every end, there is a new beginning.",
  "Tears water the roots of our growth.",
  "Embrace your feelings; they are the compass to your soul.",
  "Letting go is the first step to moving forward."
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
  'satisfaction',
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
  return `${getRandomArrItem(seed_reactions)}`;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomNames, getRandomQuote, getRandomReaction, getRandomArrItem, generateRandomDate };
