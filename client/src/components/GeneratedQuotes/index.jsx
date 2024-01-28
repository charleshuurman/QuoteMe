// NEW PLAN OF ACTION! *tears of hope*

/* 1. The affirmations need to live already in the database, they need to have an emotion associated to them.
	There could be a similar affirmations generator like for the users but for the affirmations. 
	It´s not required because we could seed the database in another way, but it´s an option.
	Ccould also seed it from a json file containing all the pertinent, organized data

  No way in heck I was about to re-write all those affirmations - however too unsure of impact on this app to try and restructure it here
  > I have a seperate local directory open that I am using to restructure this data...and it's worked!! Want to ensure graders can see what happened. 
  What happened: 
  - Manually erased all the 'uuidv4()'/id section for each affirmation (I did do manually but only took a couple mins)
  -   const transformedData = [];

  // Iterate through each emotion category in the quotesData
  for (const [emotion, quotes] of Object.entries(quotesData)) {
      quotes.forEach(quote => {
          // Push a new object for each quote into the transformedData array
          // without the _id field and with an added emotion field
          transformedData.push({
              content: quote.content,
              emotion: emotion // Use the key from quotesData as the emotion
          });
      });
  }
  
  // Output the transformed data to the console for copying
  console.log(JSON.stringify(transformedData, null, 2));

  ^ node cscript.js 

  and BOOM - new data structure  😎

Make a seed called affirmations, populate that with affirmations. 


2. The app, when logged in, needs to retrieve the affirmations from the database, just like it´s doing with the users. When it retrives the affirmations from the database, it´s going to bring an object containing each affirmation and all the pertinent info about it, including emotion and id.

3. Once the app has said affirmations, it should then display them.

4. Once you try to save the affirmations, the _id for them should be the same as the _id that´s in the database. And that way, you don´t need to send the emotion when you save them because that´s already gonna be contained in the database.
 
5. It shouldn´t be a UUID generated inside the app.

6. When trying to see the Saved Affirmations, or clicking the Show Saved Affirmations, then it should bring in the
list of affirmation _id´s that were saved by the user and there should be a function to find the affirmations using that _id to then just show the actual "content of affirmation".
*/

import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { SAVE_AFFIRMATION, UNSAVE_AFFIRMATION } from "../../utils/mutations";
import { v4 as uuidv4 } from 'uuid';


const GeneratedQuotes = ({ selectedEmotion, user }) => {
  const [quotes, setQuotes] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [savedAffirmations, setSavedAffirmations] = useState(user?.savedAffirmations || []);

  const [saveAffirmationMutation] = useMutation(SAVE_AFFIRMATION);
  const [unsaveAffirmationMutation] = useMutation(UNSAVE_AFFIRMATION);

  useEffect(() => {
    if (selectedEmotion) {
      fetchQuotes(selectedEmotion);
    }
  }, [selectedEmotion]);

  const fetchQuotes = (emotion) => {
    console.log(quotesData);
    // Simulate fetching and randomly selecting 3 quotes
    const emotionQuotes = quotesData[emotion] || [];
    const shuffledQuotes = emotionQuotes
      .map(quote => ({ ...quote, id: uuidv4() })) // Assign a unique ID to each quote
      .sort(() => 0.5 - Math.random()) // Shuffle array
      .slice(0, 3); // Select first 3 elements
    setQuotes(shuffledQuotes);
  };

  const handleSave = async (quoteId) => {
    console.log({quoteId});
    console.log({user});
    console.log(user._id);
    if (!user || !user._id) {
      console.error('User not logged in');
      return;
    }

    try {
      await saveAffirmationMutation({
        variables: { userId: user._id, affirmationId: quoteId },
      });
      setSavedAffirmations((prev) => [...prev, quoteId]);
    } catch (error) {
      console.error('Error saving affirmation:', error);
    }
  };

  const handleUnsave = async (quoteId) => {
    if (!user || !user._id) {
      console.error('User not logged in');
      return;
    }

    try {
      await unsaveAffirmationMutation({
        variables: { userId: user._id, affirmationId: quoteId },
      });
      setSavedAffirmations((prev) => prev.filter((id) => id !== quoteId));
    } catch (error) {
      console.error('Error unsaving affirmation:', error);
    }
  };

  return (
    <div>
      {quotes.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Affirmations for {selectedEmotion}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quotes.map((quote) => (
              <div key={quote._id} className="bg-white p-4 shadow-md rounded-lg h-full">
                <p className="text-lg">{quote.content}</p>
                {user && (
                  <button
                  onClick={(quote) => {
                    if (savedAffirmations.includes(quote._id)) {
                      console.log("Unsaving quote with ID:", quote._id);
                      handleUnsave(quote._id);
                    } else {
                      console.log("Saving quote with ID:", quote._id);
                      handleSave(quote._id);
                    }
                  }}                  
                    className={`mt-2 py-2 px-4 text-white rounded transition duration-300 ${savedAffirmations.includes(quote._id) ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'}`}
                  >
                    {savedAffirmations.includes(quote._id) ? 'Unsave' : 'Save'}
                  </button>
                )}
              </div>
            ))}
          </div>
          {user && (
            <button
              onClick={() => setShowSaved(!showSaved)}
              className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
            >
              {showSaved ? 'Hide Saved Affirmations' : 'Show Saved Affirmations'}
            </button>
          )}
          {showSaved && savedAffirmations.map((id) => {
            const savedQuote = quotes.find((q) => q.id === id);
            return (
              savedQuote && (
                <div key={id} className="bg-white p-4 shadow-md rounded-lg mt-4">
                  <p className="text-lg">{savedQuote.content}</p>
                  <button
                    onClick={() => handleUnsave(id)}
                    className="mt-2 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
                  >
                    Unsave
                  </button>
                </div>
              )
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GeneratedQuotes;
