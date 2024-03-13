import React, { useState, useEffect } from 'react';
import GeneratedQuotes from '../GeneratedQuotes';
import { emotions } from '../../utils/GlobalState';
import AuthService from '../../utils/auth';




const ChooseFeeling = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const profile = AuthService.getProfile();
      setCurrentUser(profile.data);
    }
    // Delay for the starting of emotion button animations
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
  };

  const handleChooseAgain = () => {
    setSelectedEmotion(null);
  };


  return (
    <div className="flex flex-col items-center text-color-primary justify-center p-4 ">
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
           <h2 className="text-6xl font-semibold text-base-800 mb-12 animate-fadeIn">
             How are you feeling?
           </h2>
           <div className="flex flex-wrap justify-center gap-4">
             {emotions.map((emotion, index) => (
               <button
                 key={emotion.name}
                 className={`emotion-btn p-4 rounded-lg text-center text-color-primary transition-all duration-300 ease-in-out hover:text-color-secondary ${animationStarted ? 'start-animation' : ''}`}
                 style={{
                   fontSize: '1.5rem',
                   animationDelay: `${index * 0.1 + 0.1}s`, // Start after text animation + staggered for each button
                 }}
                 onClick={() => handleEmotionClick(emotion)}
               >
                 <p className="font-medium">{emotion.name}</p>
               </button>
             ))}
           </div>
         </>
       )}
     </div>
  );
 };

export default ChooseFeeling;
