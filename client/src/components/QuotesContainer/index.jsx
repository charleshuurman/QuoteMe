import React, { useState } from 'react';
import ChooseFeeling from '../ChooseFeeling';
import GeneratedQuote from '../GeneratedQuote';

const QuotesContainer = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);

  return (
    <div>
      <ChooseFeeling onEmotionSelect={setSelectedEmotion} />
      {selectedEmotion && <GeneratedQuote selectedFeeling={selectedEmotion} />}
    </div>
  );
};

export default QuotesContainer;
