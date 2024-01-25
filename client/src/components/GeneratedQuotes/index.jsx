import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_REACT_APP_OPENAI_API_URL;
const apiKey = import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY;
const apiHost = import.meta.env.VITE_REACT_APP_RAPIDAPI_HOST;

const GeneratedQuotes = ({ selectedFeeling }) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    if (selectedFeeling) {
      fetchQuotes(selectedFeeling);
    }
  }, [selectedFeeling]);

  const fetchQuotes = async (feeling) => {
    console.log("Selected feeling:", feeling);

    const dataPayload = {
      messages: [
        {
          role: "user",
          content: `You are an affirmations generator. When given a list of current emotions, please respond with 3 meaningful and heartfelt quotes to uplift the user. The quotes should not be numbered and should simply have '|||' between each to distinguish them. The user's emotions, when asked how they are feeling right now, is ${feeling}.`
        }
      ],
      web_access: false,
      system_prompt: "",
      temperature: 0.9,
      top_k: 5,
      top_p: 0.9,
      max_tokens: 256
    };

    console.log("Data payload for API request:", dataPayload);

    try {
      const response = await axios({
        method: 'post',
        url: apiUrl,
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': apiHost,
        },
        data: dataPayload
      });

      // Process the response
      const generatedQuotes = response.data.result.trim().split('|||').map(quote => quote.trim());
      setQuotes(generatedQuotes);

    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  return (
    <div>
      {quotes.length > 0 ? (
        <div>
          <h2>Quotes for {selectedFeeling}</h2>
          {quotes.map((quote, index) => (
            <p key={index}>{quote}</p>
          ))}
        </div>
      ) : (
        <p>Select a feeling to generate quotes.</p>
      )}
    </div>
  );
};

export default GeneratedQuotes;






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












