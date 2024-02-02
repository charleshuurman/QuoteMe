// Importing React with the useState hook
import React, { useState, useEffect } from 'react';
// Importing the GeneratedQuotes component
import GeneratedQuotes from '../GeneratedQuotes';

// Import the emotions array
import { emotions } from '../../utils/GlobalState';

import AuthService from '../../utils/auth';

const ChooseFeeling = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in and fetch profile
    if (AuthService.loggedIn()) {
      const profile = AuthService.getProfile();
      setCurrentUser(profile.data);
    }
  }, []);

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
    console.log("user id:", currentUser);
  };

  const handleChooseAgain = () => {
    setSelectedEmotion(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-base-200">
      {selectedEmotion ? (
        <>
          <div className="w-full text-left">
            <button
              className="btn btn-secondary"
              onClick={handleChooseAgain}
            >
              ← Choose Again
            </button>
          </div>
          <GeneratedQuotes selectedEmotion={selectedEmotion.name} user={currentUser} />
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-base-800 mb-4">How are you feeling?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {emotions.map((emotion, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg shadow-lg text-center transition-colors duration-300 ease-in-out ${emotion.name === selectedEmotion?.name ? 'bg-blue-300' : 'bg-white'} hover:bg-blue-200`}
                style={{ fontSize: '2rem' }}
                onClick={() => handleEmotionClick(emotion)}
              >
                <span className="text-6xl">{emotion.emoji}</span>
                <p className="mt-2 font-medium">{emotion.name}</p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChooseFeeling;