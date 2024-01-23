import Auth from "../utils/auth";

const CreateQuote = () => {
  return (
    <>
      <ul className="menu menu-lg bg-base-200 w-56 rounded-box">
        <li>
          <a>Quote 1</a>
        </li>
        <li>
          <a>Quote 2</a>
        </li>
        <li>
          <a>Quote 3</a>
        </li>
      </ul>
    </>
  );
};

export default CreateQuote;

// import React, { useState } from 'react';
// import QuotesGenerator from '../components/QuotesGenerator';

// const QuotesPage = () => {
//   const [quotes, setQuotes] = useState([]);

//   // Define the list of emotions
//   const emotionsList = ['Happy', 'Sad', 'Anxious', 'Excited', 'Angry'];

//   // Get the necessary properties and functions from GeneratedQuotes
//   const { selectedEmotions, handleEmotionChange, handleSubmit } = QuotesGenerator({ onQuotesFetch: setQuotes });

//   return (
//     <div>
//       <h2>Select Your Emotions</h2>
//       <div>
//         {emotionsList.map((emotion) => (
//           <label key={emotion}>
//             <input
//               type="checkbox"
//               name="emotions"
//               value={emotion}
//               checked={selectedEmotions.includes(emotion)}
//               onChange={() => handleEmotionChange(emotion)}
//             />
//             {emotion}
//           </label>
//         ))}
//       </div>

//       <button onClick={handleSubmit}>Get Quotes</button>

//       <div>
//         <h2>Quotes</h2>
//         {quotes.length > 0 ? (
//           quotes.map((quote, index) => <p key={index}>{quote}</p>)
//         ) : (
//           <p>No quotes to display.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuotesPage;
