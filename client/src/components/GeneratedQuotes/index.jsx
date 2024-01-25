import React, { useState, useEffect } from 'react';

// Predefined quotes for each emotion
const quotesData = {
  Happy: [
    "The more you praise and celebrate your life, the more there is in life to celebrate. — Oprah Winfrey",
    "Happiness is not by chance, but by choice. — Jim Rohn",
    "The secret of being happy is accepting where you are in life and making the most out of every day.",
    "Happiness is not something ready made. It comes from your own actions. — Dalai Lama",
    "The purpose of our lives is to be happy. — Dalai Lama",
    "You will never be happy if you continue to search for what happiness consists of. You will never live if you are looking for the meaning of life. - Albert Camus",
    "For every minute you are angry, you lose sixty seconds of happiness. - Ralph Waldo Emerson",
    "Count your age by friends, not years. Count your life by smiles, not tears. - John Lennon",
    "No medicine cures what happiness cannot. - Gabriel Garcia Marquez",
    "Learn to value yourself, which means: fight for your happiness. _ Ayn Rand",
    "Now and then, it's good to pause in our pursuit of happiness and just be happy. - Guillaume Apollinaire",
    "Success is what you want, happiness is what you get. - W.P. Kinsella",
    "They say a person needs just three things to be truly happy in this world: someone to love, something to do, and something to hope for. - Tom Bodett",
    "Happiness cannot be traveled to, owned, earned, worn or consumed. Happiness is the spiritual experience of living every minute with love, grace, and gratitude. - Denis Waitley",
    "The biggest adventure you can ever take is to live the life of your dreams. - Oprah Winfrey", 
    "Optimism is a happiness magnet. If you stay positive, good things and good people will be drawn to you. - Mary Lou Retton",
    "Everything has its wonders, even darkness and silence, and I learn, whatever state I may be in, therein to be content. - Helen Keller",
    "Everyday is a new day. - Carrie Underwood",
    "Beauty is everywhere. You only have to look to see it. - Bob Ross"


  ],
  Sad: [
    "I allow myself to feel my feelings, but I also know they do not define me.",
    "With every breath, I release the anxiety and fear within me.",
    "I am stronger than my struggles and braver than my fears.",
    "I choose to focus on what I can control, and let go of what I cannot.",
    "Even in the midst of sadness, I have so many reasons to be grateful.",
    "I am deserving of happiness, love, peace, and joy.",
    "My feelings are valid, but they do not hold power over my day.",
    "I am gently moving towards happiness and healing every day.",
    "I am patient with myself and accept that sadness is a part of life.",
    "This feeling is temporary, and I am in the process of positive change.",
    "I am surrounded by people who love and support me.",
    "I find comfort in the knowledge that I am not alone in my feelings.",
    "Each day brings me closer to finding joy and peace within myself.",
    "I am worthy of happiness and I invite it into my life.",
    "I am capable of moving beyond my challenges and learning from them.",
    "Even in sorrow, I can find beauty and strength.",
    "I am resilient, and I can handle the challenges life throws at me.",
    "I give myself the gift of compassion and self-care today.",
    "I have the power to create change in my life and find happiness.",
    "My heart is open to love, healing, and the light that new days bring."
  ],
  Anxious: [
    "I am safe and in control, even when life feels uncertain.",
    "With each breath, I release my anxiety and embrace calm.",
    "I am strong enough to move through my fears and towards my goals.",
    "I choose to focus on the present moment and find peace in it.",
    "I trust in my ability to navigate through challenging situations.",
    "I am more than my anxious thoughts; I am capable and competent.",
    "My mind is slowing down, and I am finding clarity within myself.",
    "I let go of worries about the future and focus on what I can control.",
    "I am surrounded by love and support, which eases my anxiety.",
    "Each deep breath I take fills me with peace and tranquility.",
    "I am deserving of a calm, serene, and peaceful mind.",
    "Anxiety does not define me; I am defined by my courage and strength.",
    "I have the power to overcome my anxiety and live the life I desire.",
    "I embrace my feelings, but I also know they are not my reality.",
    "Every day, I grow stronger and more relaxed in all situations.",
    "I choose to release fear and embrace love and positivity.",
    "I am in charge of my breathing, and I can slow it down when I need to.",
    "I am finding it easier to relax and enjoy my life.",
    "My mind is clear, my body is relaxed, and my spirit is at peace.",
    "I am centered, I am balanced, and I am at ease within myself."
  ],
  Angry: [
    "I choose to respond to anger with understanding and compassion.",
    "I am in control of my emotions and I choose peace over anger.",
    "Anger is a feeling, it will pass, and I remain calm and centered.",
    "I release my anger and embrace forgiveness and understanding.",
    "I am more than this moment; I am calm, patient, and in control.",
    "Every breath I take dissipates my anger and brings me peace.",
    "I choose to seek peaceful and positive solutions to my frustrations.",
    "My feelings are valid, but I control my reaction to them.",
    "I am letting go of anger to make space for more peace and joy.",
    "With each moment, I am moving towards greater patience and understanding.",
    "I choose to heal rather than to hurt, to forgive rather than to fester.",
    "I am stronger than my anger, and my calmness is my power.",
    "I find strength in tranquility and clarity in calmness.",
    "I let go of anger and welcome peace and positivity into my life.",
    "My anger is a sign of my passion, but I channel it towards positive action.",
    "I have the power to overcome anger and feel peace and serenity.",
    "Anger is just a feeling, and like all feelings, it will pass.",
    "I am learning to transform my anger into understanding and empathy.",
    "Every calm breath I take reduces my anger and brings me peace.",
    "I am in control of my emotions and choose harmony and balance."
  ],
  Stressed: [
    "I have the strength to manage my stress and keep my peace.",
    "With every breath, I release the stress inside me and become more calm.",
    "I am capable of solving any problems that come my way.",
    "I choose to let go of stress and embrace peace and relaxation.",
    "I am in control of my schedule and my priorities, and I choose balance.",
    "I give myself permission to step back and take a break when needed.",
    "I am more than my stress; I am resilient and adaptable.",
    "I focus on one task at a time, knowing each step leads to progress.",
    "I am letting go of what I cannot control and focusing on what I can.",
    "I find peace and joy in the simple moments of life.",
    "I am deserving of a life free from overwhelming stress.",
    "I trust in my ability to navigate through challenging situations calmly.",
    "My mind is clear, my body is relaxed, and my spirit is at peace.",
    "I embrace activities that help me relax and recharge.",
    "I am learning to balance my responsibilities with my well-being.",
    "I am stronger than the stress that I am currently facing.",
    "I take things one step at a time and trust in the journey.",
    "I am surrounded by peace, and I carry this tranquility with me.",
    "I am in harmony with the rhythm of life and find ease in its flow.",
    "Every challenge I face is an opportunity to grow stronger and more serene."
  ],
  Anxious: [
    "I am safe and in control, even when life feels uncertain.",
    "With each breath, I release my anxiety and embrace calm.",
    "I am strong enough to move through my fears and towards my goals.",
    "I choose to focus on the present moment and find peace in it.",
    "I trust in my ability to navigate through challenging situations.",
    "I am more than my anxious thoughts; I am capable and competent.",
    "My mind is slowing down, and I am finding clarity within myself.",
    "I let go of worries about the future and focus on what I can control.",
    "I am surrounded by love and support, which eases my anxiety.",
    "Each deep breath I take fills me with peace and tranquility.",
    "I am deserving of a calm, serene, and peaceful mind.",
    "Anxiety does not define me; I am defined by my courage and strength.",
    "I have the power to overcome my anxiety and live the life I desire.",
    "I embrace my feelings, but I also know they are not my reality.",
    "Every day, I grow stronger and more relaxed in all situations.",
    "I choose to release fear and embrace love and positivity.",
    "I am in charge of my breathing, and I can slow it down when I need to.",
    "I am finding it easier to relax and enjoy my life.",
    "My mind is clear, my body is relaxed, and my spirit is at peace.",
    "I am centered, I am balanced, and I am at ease within myself."
  ],
  Anxious: [
    "I am safe and in control, even when life feels uncertain.",
    "With each breath, I release my anxiety and embrace calm.",
    "I am strong enough to move through my fears and towards my goals.",
    "I choose to focus on the present moment and find peace in it.",
    "I trust in my ability to navigate through challenging situations.",
    "I am more than my anxious thoughts; I am capable and competent.",
    "My mind is slowing down, and I am finding clarity within myself.",
    "I let go of worries about the future and focus on what I can control.",
    "I am surrounded by love and support, which eases my anxiety.",
    "Each deep breath I take fills me with peace and tranquility.",
    "I am deserving of a calm, serene, and peaceful mind.",
    "Anxiety does not define me; I am defined by my courage and strength.",
    "I have the power to overcome my anxiety and live the life I desire.",
    "I embrace my feelings, but I also know they are not my reality.",
    "Every day, I grow stronger and more relaxed in all situations.",
    "I choose to release fear and embrace love and positivity.",
    "I am in charge of my breathing, and I can slow it down when I need to.",
    "I am finding it easier to relax and enjoy my life.",
    "My mind is clear, my body is relaxed, and my spirit is at peace.",
    "I am centered, I am balanced, and I am at ease within myself."
  ],
  Anxious: [
    "I am safe and in control, even when life feels uncertain.",
    "With each breath, I release my anxiety and embrace calm.",
    "I am strong enough to move through my fears and towards my goals.",
    "I choose to focus on the present moment and find peace in it.",
    "I trust in my ability to navigate through challenging situations.",
    "I am more than my anxious thoughts; I am capable and competent.",
    "My mind is slowing down, and I am finding clarity within myself.",
    "I let go of worries about the future and focus on what I can control.",
    "I am surrounded by love and support, which eases my anxiety.",
    "Each deep breath I take fills me with peace and tranquility.",
    "I am deserving of a calm, serene, and peaceful mind.",
    "Anxiety does not define me; I am defined by my courage and strength.",
    "I have the power to overcome my anxiety and live the life I desire.",
    "I embrace my feelings, but I also know they are not my reality.",
    "Every day, I grow stronger and more relaxed in all situations.",
    "I choose to release fear and embrace love and positivity.",
    "I am in charge of my breathing, and I can slow it down when I need to.",
    "I am finding it easier to relax and enjoy my life.",
    "My mind is clear, my body is relaxed, and my spirit is at peace.",
    "I am centered, I am balanced, and I am at ease within myself."
  ],

  // ...add other emotions and their quotes
};

const GeneratedQuotes = ({ selectedFeeling }) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    if (selectedFeeling) {
      fetchQuotes(selectedFeeling);
    }
  }, [selectedFeeling]);

  const fetchQuotes = (feeling) => {
    // Get the full array of quotes for the selected feeling
    const availableQuotes = quotesData[feeling] || [];

    // Shuffle through quotes and pick 3 at random
    const shuffledQuotes = availableQuotes.sort(() => 0.5 - Math.random());
    const selectedQuotes = shuffledQuotes.slice(0, 3);

    setQuotes(selectedQuotes);
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












