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
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_AFFIRMATIONS_BY_EMOTION, FETCH_SAVED_AFFIRMATIONS } from "../../utils/queries";
import { SAVE_AFFIRMATION, UNSAVE_AFFIRMATION } from "../../utils/mutations";

const GeneratedQuotes = ({ selectedEmotion, user }) => {
  const [showSaved, setShowSaved] = useState(false);
  const [randomQuotes, setRandomQuotes] = useState([]); // Store 3 random quotes

  // Fetch affirmations by emotion
  const { loading, error, data } = useQuery(FETCH_AFFIRMATIONS_BY_EMOTION, {
    variables: { emotion: selectedEmotion },
    skip: !selectedEmotion,
  });

  const [saveAffirmation] = useMutation(SAVE_AFFIRMATION, {
    refetchQueries: [{ query: FETCH_SAVED_AFFIRMATIONS }],
  });

  const [unsaveAffirmation] = useMutation(UNSAVE_AFFIRMATION, {
    refetchQueries: [{ query: FETCH_SAVED_AFFIRMATIONS }],
  });

  const savedAffirmations = data?.savedAffirmations.map(a => a._id) || [];

  useEffect(() => {
    // Select 3 random affirmations whenever the fetched data changes
    if (data?.affirmationsByEmotion) {
      const shuffled = [...data.affirmationsByEmotion].sort(() => 0.5 - Math.random());
      setRandomQuotes(shuffled.slice(0, 3));
      console.log({data});
    }
}, [data]);

  if (loading) return <div>Loading...</div>;
  if (!selectedEmotion) return <div>Select an emotion to see affirmations.</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Affirmations for {selectedEmotion}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {randomQuotes.map((quote) => ( 
          <div key={quote._id} className="bg-white p-4 shadow-md rounded-lg h-full">
            <p className="text-lg">{quote.content}</p>
            <button
              onClick={() => handleSaveUnsave(quote._id)}
              className={`mt-2 py-2 px-4 text-white rounded transition duration-300 ${savedAffirmations.includes(quote._id) ? 'bg-red-500 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-700'}`}
            >
              {savedAffirmations.includes(quote._id) ? 'Unsave' : 'Save'}
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowSaved(!showSaved)}
        className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
      >
        {showSaved ? 'Hide Saved Affirmations' : 'Show Saved Affirmations'}
      </button>
      {showSaved && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Your Saved Affirmations:</h3>
          {savedAffirmations.length > 0 ? (
            randomQuotes.filter(quote => savedAffirmations.includes(quote._id)).map((quote) => (
              <div key={quote._id} className="bg-white p-4 shadow-md rounded-lg mt-4">
                <p className="text-lg">{quote.content}</p>
              </div>
            ))
          ) : (
            <p>You have not saved any affirmations.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GeneratedQuotes;