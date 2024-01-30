require('dotenv').config();
const connection = require('../config/connection');
const { User, Quote } = require('../models');
const { getRandomName, getRandomNames, getRandomQuote, getRandomReaction, getRandomArrItem, generateRandomDate } = require('./quotedata');
const bcrypt = require('bcrypt');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Use cleandb on prevoius .js file to delete the collections if they exist
  // let quotesCheck = await connection.db.listCollections({ name: 'quotes' }).toArray();
  // if (quotesCheck.length) {
  //   await connection.dropCollection('quotes');
  // };

  // let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  // if (usersCheck.length) {
  //   await connection.dropCollection('users');
  // };

  // Seed users
  // ==========
  // Create empty array to hold users
  const users = [];
  // Loop 20 times -- add users to the users array
  for (let i = 1; i <= 25; i++) {
    let newname = getRandomName();
    let newpassword = await bcrypt.hash(`user${i}`, 10);
    users.push({
      firstName: newname,
      lastName: newname,
      userName: newname,
      email: `user${i}@hotmail.com`,
      password: newpassword,
      tier: Math.floor(Math.random() * 5),
      isAdmin: false,
      orders: []
    });
  };

  // Inject users into Mongodb collection which creates their objectids
  await User.collection.insertMany(users);

  // Get back the users with the objectids
  let allUsers = await User.find();

  // For each user, create up to 3 friends from the user list and add it to its friends array
  for (let i = 0; i < allUsers.length; i++) {
    let randomnum = Math.floor(Math.random() * 4);
    let somefriends = getRandomNames(randomnum, allUsers);
    allUsers[i].friends = somefriends;

    if (somefriends.length > 0) {
      let someone;
      try {
        // Inject friends by updating the user record in Mongodb
        someone = await User.findOneAndUpdate(
          { _id: allUsers[i]._id },
          { $set: { friends: allUsers[i].friends } },
          { returnOriginal: false, new: true })
          .populate('friends');
      } catch (err) {
        console.log("Error: ", err);
      };
    };
    // console.log("=========================\nUSER WITH FRIENDS:", JSON.stringify(someone));

  };

  let storedUsers = await User.find().populate('friends').exec();
  console.log("=========================\nSTORED USERS", JSON.stringify(storedUsers, null, 4));

  const moods = ['happy', 'ecstatic', 'bored', 'tired', 'sad', 'annoyed'];

  // Seed quotes & reactions
  // =========================
  // Get some random quote objects using a helper function that we imported from ./data
  let quotes = [];
  for (let i = 1; i <= 35; i++) {
    quotes.push({
      content: getRandomQuote(),
      userName: getRandomArrItem(users).userName,
      emotion: moods[Math.floor(Math.random()*moods.length)],
      isPrivate: (Math.random() < 0.5)?true:false,
      isGenerated: false,
      // isGenerated: (Math.random() < 0.5)?true:false,
      imageUrl: `http://placekitten.com/${100+(Math.floor(Math.random()*10)*10)}/${100+(Math.floor(Math.random()*10)*10)}`,
      createdAt: generateRandomDate(new Date(2021, 0, 1), new Date())
    });
  };

  // Add quotes into database

  console.log("=INSERT QUOTES ====================================================================================");
  let insertedQuotes = await Quote.collection.insertMany(quotes);
  // Result of insertMany:
  // {
  //   acknowledged: true,
  //   insertedCount: 30,
  //   insertedIds: {
  //     '0': new ObjectId('6588c3db6ae6ffcc41787840'),
  //     '1': new ObjectId('6588c3db6ae6ffcc41787841'),
  //     '2': new ObjectId('6588c3db6ae6ffcc41787842'),
  //     ...
  //   }
  // }


  // Add random reactions into quotes

  let insertedQuotesValues = Object.values(insertedQuotes.insertedIds);

  for (let i = 0; i < insertedQuotesValues.length; i++) {
    console.log(insertedQuotesValues[i]);
    // Populate random reaction strings
    for (let j = 0; j < Math.floor(Math.random() * 5); j++) {
      // console.log("INSERTING REACTION", j);
      let result = await Quote.findByIdAndUpdate(
        insertedQuotesValues[i],
        {
          $addToSet: {
            reactions: {
              reactionBody: getRandomReaction(),
              userName: getRandomArrItem(users).userName,
              createdAt: generateRandomDate(new Date(2021, 0, 1), new Date())
            }
          }
        },
        {
          new: true
        });
      // console.log(result);
    };
  };

  console.log("=/INSERT QUOTES===================================================================================");

  let storedquotes = await Quote.find().populate().exec();
  console.log("STORED QUOTES:", JSON.stringify(storedquotes, null, 4));

  // iterate through all users to inject their quotes
  for (let i = 0; i < storedUsers.length; i++) {
    console.log("--->", storedUsers[i].userName);
    let userQuotes = await Quote.find({ userName: storedUsers[i].userName });
    let userwithQuote = await User.findOneAndUpdate({ _id: storedUsers[i]._id }, { $set: { quotes: userQuotes } }, { new: true, returnOriginal: false }).populate('quotes').populate('friends').exec();
    console.log(`User ${storedUsers[i].userName}'s quotes:`, userwithQuote);
  };

  console.table(users);
  console.table(quotes);

  console.info('Seeding complete! 🌱');
  console.log("MONGO URI", process.env.MONGODB_URI);
  process.exit(0);
});
