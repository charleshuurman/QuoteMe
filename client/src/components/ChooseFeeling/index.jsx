// Importing React with the useState hook
import React, { useState } from 'react';
// Importing the GeneratedQuotes component
import GeneratedQuotes from '../GeneratedQuotes';

// Array of emotions with their corresponding names and emoji symbols
const emotions = [
  { name: 'Happy', emoji: '😊' },
  { name: 'Sad', emoji: '😢' },
  { name: 'Anxious', emoji: '😰' },
  { name: 'Angry', emoji: '😠' },
  { name: 'Stressed', emoji: '😥' },
  { name: 'Lonely', emoji: '🙍‍♂️' },
  { name: 'Overwhelmed', emoji: '😵' },
  { name: 'Frustrated', emoji: '😤' },
  { name: 'Disappointed', emoji: '😞' },
  { name: 'Grateful', emoji: '🙏' },
  { name: 'Exhausted', emoji: '😩' },
  { name: 'Insecure', emoji: '🙇‍♂️' },
  { name: 'Nervous', emoji: '😟' },
  { name: 'Hopeless', emoji: '😔' },
  { name: 'Jealous', emoji: '😒' },
  { name: 'Lost', emoji: '🤔' }
];

// Defining the ChooseFeeling functional component
const ChooseFeeling = () => {
  // useState hook to manage the state of the selected emotion
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  // Function to handle emotion selection
  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
  };

  // Function to reset the emotion selection
  const handleChooseAgain = () => {
    setSelectedEmotion(null);
  };

  // JSX to render the component UI
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100">
      {/* Conditional rendering based on whether an emotion is selected */}
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
          {/* Render GeneratedQuotes component with the selected emotion */}
          <GeneratedQuotes selectedFeeling={selectedEmotion.name} />
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How are you feeling?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {/* Map over emotions array to render each emotion as a button */}
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

// Export the ChooseFeeling component for use in other parts of the application
export default ChooseFeeling;