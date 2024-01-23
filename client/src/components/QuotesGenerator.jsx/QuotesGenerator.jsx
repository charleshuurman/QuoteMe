import React, { useState } from 'react';
import { sendUserFeeling } from '../api/openaiService';

function QuoteGenerator() {
  const [feeling, setFeeling] = useState('');
  const [quote, setQuote] = useState('');

  const handleFeelingChange = (event) => {
    setFeeling(event.target.value);
  };

  const handleSubmit = async () => {
    const generatedQuote = await sendUserFeeling(feeling);
    setQuote(generatedQuote);
    // Saving to the DB logic to go here
  };

  return (
    <div>
      <input type="text" value={feeling} onChange={handleFeelingChange} />
      <button onClick={handleSubmit}>Generate Quote</button>
      {quote && <p>{quote}</p>}
    </div>
  );
}

export default QuoteGenerator;
