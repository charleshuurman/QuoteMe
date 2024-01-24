import React, { useState } from 'react';

const emotions = [
  { name: 'Happy', emoji: '😊' },
  { name: 'Sad', emoji: '😢' },
  { name: 'Anxious', emoji: '😰' },
  { name: 'Angry', emoji: '😠' },
  { name: 'Inspired', emoji: '🤩' } 
];

const ChooseFeeling = ({ onEmotionSelect }) => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
    onEmotionSelect(emotion); // Notify parent component about the selection
  };

  const handleChooseAgain = () => {
    setSelectedEmotion(null);
    onEmotionSelect(null); // Reset the selection
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {selectedEmotion ? (
        <div className="w-full text-left">
          <button 
            className="btn-back"
            onClick={handleChooseAgain}
          >
            ← Choose Again
          </button>
          <h2 className="text-2xl font-semibold mb-4">Quotes for {selectedEmotion.name}</h2>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Quotes. How are you feeling?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {emotions.map((emotion, index) => (
              <button
                key={index}
                className={`p-4 rounded-lg shadow-lg text-center ${emotion.name === selectedEmotion?.name ? 'bg-blue-200' : 'bg-white'}`}
                onClick={() => handleEmotionClick(emotion)}
                style={{ transition: 'background-color 0.3s', fontSize: '2rem' }} 
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






// import Auth from "../../utils/auth";

// const ChooseFeeling = () => {
//   return (
//     <>
//       <h1>ChooseFeeling</h1>
//       <div className="hero min-h-screen bg-base-200">
//         <div className="hero-content text-center">
//           <div className="max-w-md">
//             <h1 className="text-5xl font-bold">Hello there</h1>
//             <p className="py-6">How are you feeling?</p>
//             <ul className="menu menu-lg bg-base-200 w-56 rounded-box">
//               <li>
//                 <a>Happy</a>
//               </li>
//               <li>
//                 <a>Sad</a>
//               </li>
//               <li>
//                 <a>Bored</a>
//               </li>
//             </ul>
//             <button className="btn btn-primary">Save a Quote</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ChooseFeeling;

// import React, { useState } from 'react';

// const emotions = [
//   { name: 'Happy', emoji: '😊' },
//   { name: 'Sad', emoji: '😢' },
//   { name: 'Anxious', emoji: '😰' },
//   { name: 'Angry', emoji: '😠' },
//   { name: 'Inspired', emoji: '🤩' } 
// ];

// const ChooseFeeling = () => {
//   const [selectedEmotion, setSelectedEmotion] = useState(null);

//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       <h2 className="text-2xl font-semibold mb-4">Quotes. How are you feeling?</h2>
//       <div className="flex flex-wrap justify-center gap-4">
//         {emotions.map((emotion, index) => (
//           <button
//             key={index}
//             className={`p-4 rounded-lg shadow-lg text-center ${selectedEmotion === emotion.name ? 'bg-blue-200' : 'bg-white'}`}
//             onClick={() => setSelectedEmotion(emotion.name)}
//             style={{ transition: 'background-color 0.3s', fontSize: '2rem' }} // Adjust font size as needed
//           >
//             <span className="text-6xl">{emotion.emoji}</span> {/* Adjusted text size */}
//             <p className="mt-2 font-medium">{emotion.name}</p>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChooseFeeling;

