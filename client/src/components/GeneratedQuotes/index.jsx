// import React, { useState } from 'react';
// import { useQuery, gql } from '@apollo/client';

// const GET_QUOTES_QUERY = gql`
//   query GetQuotes($emotions: [String]) {
//     getQuotes(emotions: $emotions) {
//       text
//     }
//   }
// `;

// const QuotesGenerator = ({ onQuotesFetch }) => {
//   const [selectedEmotions, setSelectedEmotions] = useState([]);

//   // Define the list of available emotions
//   const emotionsList = ['Happy', 'Sad', 'Anxious', 'Excited', 'Angry'];

//   const handleEmotionChange = (emotion) => {
//     setSelectedEmotions((prevEmotions) =>
//       prevEmotions.includes(emotion)
//         ? prevEmotions.filter((em) => em !== emotion)
//         : [...prevEmotions, emotion]
//     );
//   };

//   const { loading, error } = useQuery(GET_QUOTES_QUERY, {
//     variables: { emotions: selectedEmotions },
//     skip: selectedEmotions.length === 0,
//     onCompleted: (data) => onQuotesFetch(data.getQuotes.map(quote => quote.text))
//   });

//   // Render the emotion selection checkboxes
//   const renderEmotionCheckboxes = () => {
//     return emotionsList.map((emotion) => (
//       <label key={emotion}>
//         <input
//           type="checkbox"
//           name="emotions"
//           value={emotion}
//           checked={selectedEmotions.includes(emotion)}
//           onChange={() => handleEmotionChange(emotion)}
//         />
//         {emotion}
//       </label>
//     ));
//   };

//   // Loading and error states
//   if (loading) return <p>Loading quotes...</p>;
//   if (error) return <p>Error fetching quotes: {error.message}</p>;

//   // Emotion selection and quotes fetch button
//   return (
//     <div>
//       <h2>Select Emotions</h2>
//       <div>{renderEmotionCheckboxes()}</div>
//       <button onClick={() => useQuery.refetch()}>Fetch Quotes</button>
//     </div>
//   );
// };

// export default QuotesGenerator;






// import Auth from "../../utils/auth";

// const GeneratedQuotes = () => {
//   return (
//     <>
//       <h1>GeneratedQuotes</h1>
//       <ul className="menu menu-lg bg-base-200 w-56 rounded-box">
//         <li>
//           <a>Quote 1</a>
//         </li>
//         <li>
//           <a>Quote 2</a>
//         </li>
//         <li>
//           <a>Quote 3</a>
//         </li>
//       </ul>
//     </>
//   );
// };

// export default GeneratedQuotes;


import React from 'react';

const exampleQuotes = [
  { feeling: 'Happy', quote: 'Happiness is not by chance, but by choice.', author: 'Jim Rohn' },
  { feeling: 'Anxious', quote: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  { feeling: 'Sad', quote: 'Life is 10% what happens to us and 90% how we react to it.', author: 'Charles R. Swindoll' },
  { feeling: 'Happy', quote: 'Happiness is not by chance, but by choice2.', author: 'Jim Rohn' },
  { feeling: 'Inspired', quote: 'The only way to do great work is to love what you do2.', author: 'Steve Jobs' },
  // ...add more quotes as needed
];

const ChooseFeeling = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Hope these quotes are just what you needed:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {exampleQuotes.map((item, index) => (
          <div key={index} className="bg-base-100 shadow-xl p-4 rounded-lg">
            <p className="text-lg font-semibold">{item.quote}</p>
            <p className="text-md text-gray-700">{item.author}</p>
            <p className="text-sm text-gray-500 italic">{item.feeling}</p>
            <div className="mt-4 text-right">
              <button className="btn btn-primary">Save</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseFeeling;









