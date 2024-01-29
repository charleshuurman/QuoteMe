import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_AFFIRMATIONS_BY_EMOTION } from "../../utils/queries";
// import { SAVE_AFFIRMATION, UNSAVE_AFFIRMATION } from "../../utils/mutations";

const GeneratedQuotes = ({ selectedEmotion, onBack }) => {
  const [randomQuotes, setRandomQuotes] = useState([]);

  const { loading, data } = useQuery(FETCH_AFFIRMATIONS_BY_EMOTION, {
    variables: { emotion: selectedEmotion },
    skip: !selectedEmotion,
  });

  useEffect(() => {
    if (data?.affirmationsByEmotion) {
      const shuffled = [...data.affirmationsByEmotion].sort(() => 0.5 - Math.random());
      setRandomQuotes(shuffled.slice(0, 3));
    }
  }, [data]);
  

  // const [saveAffirmation] = useMutation(SAVE_AFFIRMATION, {
  //   onCompleted: () => refetchSavedAffirmations(),
  // });

  // const [unsaveAffirmation] = useMutation(UNSAVE_AFFIRMATION, {
  //   onCompleted: () => refetchSavedAffirmations(),
  // });

  // const handleSaveUnsave = async (affirmationId) => {
  //   // Determine if the affirmation is currently saved
  //   const isSaved = savedAffirmationIds.includes(affirmationId);

  //   try {
  //     if (isSaved) {
  //       await unsaveAffirmation({ variables: { affirmationId } });
  //     } else {
  //       await saveAffirmation({ variables: { affirmationId } });
  //     }
  //   } catch (error) {
  //     console.error("Error saving/unsaving affirmation:", error);
  //   }
  // };

  if (loading) return <div>Loading...</div>;
  if (!selectedEmotion) return <div></div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Affirmations for {selectedEmotion}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {randomQuotes.map((quote) => (
          <div key={quote._id} className="bg-white p-6 shadow-lg rounded-lg h-full flex flex-col justify-between">
            <p className="text-lg mb-4">{quote.content}</p>
            {/* Button for future implementation of save functionality */}
            {/* <button
              onClick={() => {/* handleSaveUnsave(quote._id) */}
              {/* className="mt-2 py-2 px-4 text-white bg-blue-500 hover:bg-blue-700 rounded transition duration-300">
                Save
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedQuotes;


