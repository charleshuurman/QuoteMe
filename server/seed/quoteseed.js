/**
 * This script is designed to populate the QuoteMe application's MongoDB database with initial data, setting up a 
 * development or testing environment with a predefined set of data. It connects to the database, optionally clears 
 * existing collections, and inserts a variety of data including users, quotes, and their relationships.
 */
require('dotenv').config();
const connection = require('../config/connection');
const { User, Quote } = require('../models');
const { getRandomName, getRandomNames, getRandomQuote, getRandomReaction, getRandomArrItem, generateRandomDate } = require('./quotedata');
const bcrypt = require('bcrypt');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Use cleandb on prevoius .js file to delete the collections if they exist

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

  const happyImages = [
    "https://cdn.pixabay.com/photo/2017/07/08/09/45/joy-2483926_1280.jpg",
    "https://pixabay.com/illustrations/elephants-balloons-love-heart-2757831/",
    "https://cdn.pixabay.com/photo/2017/11/23/03/17/christmas-2971961_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/10/16/19/18/balloon-991680_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/11/13/02/53/girl-529013_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/08/05/08/adult-1807500_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/11/45/children-1869265_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/03/05/13/05/family-1237701_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/18/14/40/balcony-1834990_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/06/22/08/37/children-817365_1280.jpg",
  ]

  const sadImages = [
    "https://cdn.pixabay.com/photo/2016/11/14/05/29/girl-1822702_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/10/03/47/guy-2617866_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/11/02/09/15/man-513529_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/07/23/25/woman-2609115_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/07/29/00/10/girl-865304_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/08/31/10/07/man-915230_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/02/08/13/43/woman-2048905_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/04/07/04/17/desperate-5011953_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/11/13/06/12/boy-529067_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/03/27/19/20/indian-1283789_1280.jpg",
  ]

  const anxiousImages = [
    "https://cdn.pixabay.com/photo/2018/09/06/15/00/fantasy-3658488_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/03/01/05/56/face-3189819_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/03/25/12/58/girl-4967210_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/05/22/14/15/child-5205539_1280.png",
    "https://cdn.pixabay.com/photo/2022/10/31/05/14/self-love-7558939_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/04/24/20/33/small-child-331663_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/05/04/07/49/face-1370956_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/01/01/21/52/cat-4734564_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/06/18/14/03/woman-6346248_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/12/12/04/43/sad-3870115_1280.jpg",
  ]

  const angryImages = [
    "https://cdn.pixabay.com/photo/2017/10/24/18/27/lion-2885618_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/06/23/18/55/apple-1475977_1280.png",
    "https://cdn.pixabay.com/photo/2017/07/07/03/38/silhouette-2480321_1280.png",
    "https://cdn.pixabay.com/photo/2019/11/28/02/28/boy-4658244_1280.jpg",
    "https://cdn.pixabay.com/photo/2012/04/13/17/50/angry-33059_1280.png",
    "https://cdn.pixabay.com/photo/2012/05/07/04/05/cat-47896_1280.png",
    "https://cdn.pixabay.com/photo/2015/09/03/17/28/man-921004_1280.jpg",
    "https://cdn.pixabay.com/photo/2012/02/29/11/51/anger-18615_1280.jpg",
    "https://cdn.pixabay.com/photo/2013/07/12/16/39/angry-151332_1280.png",
    "https://cdn.pixabay.com/photo/2017/05/04/14/19/warning-2284170_1280.jpg",
  ]

  const stressedImages = [
    "https://cdn.pixabay.com/photo/2015/04/27/22/53/man-742766_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/22/19/39/adult-1850268_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/03/01/14/40/girl-6059889_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/02/22/05/26/employee-6038877_1280.png",
    "https://cdn.pixabay.com/photo/2017/10/30/13/36/stress-2902537_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/07/26/09/33/mental-illness-4364348_1280.png",
    "https://cdn.pixabay.com/photo/2016/10/13/15/39/hustle-and-bustle-1738072_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/05/15/00/37/mental-health-2313430_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/05/31/16/24/cat-2360863_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/03/30/13/10/woman-3275328_1280.jpg",
  ]

  const moods = [
    'happy',
    'sad',
    'anxious',
    'angry',
    'stressed',
    'lonely',
    'overwhelmed',
    'frustrated',
    'disappointed',
    'grateful',
    'exhausted',
    'inseucure',
    'nervous',
    'hopeless',
    'jealous',
    'lost',
  ];

  const Chartmoods = [
    'happy',
    'sad',
    'anxious',
    'angry',
    'stressed',
  ];


  // Seed quotes & reactions
  // =========================

  // Make most posts from last week to show something in the chart
  const currentDate = new Date();
  const lastWeekDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Get some random quote objects using a helper function that we imported from ./data
  let quotes = [];
  for (let i = 1; i <= 185; i++) {
    const emotion = Chartmoods[Math.floor(Math.random() * Chartmoods.length)];
    let image, selectedImage;

    switch (emotion) {
      case 'happy':
        image = happyImages.sort(() => 0.5 - Math.random());
        break;
      case 'sad':
        image = sadImages.sort(() => 0.5 - Math.random());
        break;
      case 'anxious':
        image = anxiousImages.sort(() => 0.5 - Math.random());
        break;
      case 'angry':
        image = angryImages.sort(() => 0.5 - Math.random());
        break;
      case 'stressed':
        image = stressedImages.sort(() => 0.5 - Math.random());
        break;
    }

    selectedImage = image[0];


    quotes.push({
      content: getRandomQuote(),
      userName: getRandomArrItem(users).userName,
      emotion: emotion,
      isPrivate: (Math.random() < 0.5) ? true : false,
      isGenerated: false,
      // isGenerated: (Math.random() < 0.5)?true:false,
      //      imageUrl: `http://placekitten.com/${100+(Math.floor(Math.random()*10)*10)}/${100+(Math.floor(Math.random()*10)*10)}`,
      imageUrl: selectedImage,
      createdAt: generateRandomDate(lastWeekDate, currentDate)
    });
  };

  // add additional quotes for on user[1] only for EmotionChart

  for (let i = 1; i <= 18; i++) {
    const emotion = Chartmoods[Math.floor(Math.random() * Chartmoods.length)];
    let image, selectedImage;

    switch (emotion) {
      case 'happy':
        image = happyImages.sort(() => 0.5 - Math.random());
        break;
      case 'sad':
        image = sadImages.sort(() => 0.5 - Math.random());
        break;
      case 'anxious':
        image = anxiousImages.sort(() => 0.5 - Math.random());
        break;
      case 'angry':
        image = angryImages.sort(() => 0.5 - Math.random());
        break;
      case 'stressed':
        image = stressedImages.sort(() => 0.5 - Math.random());
        break;
    }

    selectedImage = image[0];

    quotes.push({
      content: getRandomQuote(),
      userName: users[1].userName,      // push to user[1]
      emotion: emotion,
      isPrivate: (Math.random() < 0.5) ? true : false,
      isGenerated: false,
      // isGenerated: (Math.random() < 0.5)?true:false,
      imageUrl: selectedImage,
      createdAt: generateRandomDate(lastWeekDate, currentDate)
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
