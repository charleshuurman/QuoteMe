import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { FETCH_AFFIRMATIONS_BY_EMOTION, FETCH_SAVED_AFFIRMATIONS } from "../../utils/queries";
import { SAVE_AFFIRMATION, UNSAVE_AFFIRMATION } from "../../utils/mutations";

const GeneratedQuotes = ({ selectedEmotion, user }) => {
  const [randomQuotes, setRandomQuotes] = useState([]);
  const [savedAffirmationIds, setSavedAffirmationIds] = useState([]);

  const { loading, data } = useQuery(FETCH_AFFIRMATIONS_BY_EMOTION, {
    variables: { emotion: selectedEmotion },
    skip: !selectedEmotion,
  });

  // Use this to refetch saved affirmations after mutations
  const { data: savedData, refetch: refetchSavedAffirmations } = useQuery(FETCH_SAVED_AFFIRMATIONS, {
    skip: !user,
  });

  useEffect(() => {
    if (data?.affirmationsByEmotion) {
      // Create a shallow copy of the array before sorting
      const shuffledQuotes = [...data.affirmationsByEmotion].sort(() => 0.5 - Math.random()).slice(0, 3);
      setRandomQuotes(shuffledQuotes);
    }
    if (savedData?.savedAffirmations) {
      const ids = savedData.savedAffirmations.map(a => a._id);
      setSavedAffirmationIds(ids);
    }
  }, [data, savedData]);
  

  const [saveAffirmation] = useMutation(SAVE_AFFIRMATION, {
    onCompleted: () => refetchSavedAffirmations(),
  });

  const [unsaveAffirmation] = useMutation(UNSAVE_AFFIRMATION, {
    onCompleted: () => refetchSavedAffirmations(),
  });

  const handleSaveUnsave = async (affirmationId) => {
    // Determine if the affirmation is currently saved
    const isSaved = savedAffirmationIds.includes(affirmationId);

    try {
      if (isSaved) {
        await unsaveAffirmation({ variables: { affirmationId } });
      } else {
        await saveAffirmation({ variables: { affirmationId } });
      }
    } catch (error) {
      console.error("Error saving/unsaving affirmation:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!selectedEmotion) return <div>Select an emotion to see affirmations.</div>;

  return (
    <div>
      <h2>Affirmations for {selectedEmotion}</h2>
      {randomQuotes.map((quote) => (
        <div key={quote._id}>
          <p>{quote.content}</p>
          <button onClick={() => handleSaveUnsave(quote._id)}>
            {savedAffirmationIds.includes(quote._id) ? "Unsave" : "Save"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default GeneratedQuotes;



