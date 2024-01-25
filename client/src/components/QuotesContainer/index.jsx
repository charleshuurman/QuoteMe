import React, { useState } from 'react';
import ChooseFeeling from '../ChooseFeeling';
import GeneratedQuotes from '..GeneratedQuotes';

const QuotesContainer = () => {
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  const handleEmotionSelect = (feeling) => {
    setSelectedFeeling(feeling);
  };

  return (
    <div>
      <ChooseFeeling onEmotionSelect={handleEmotionSelect} />
      {selectedFeeling && <GeneratedQuotes selectedFeeling={selectedFeeling} />}
    </div>
  );
};

export default QuotesContainer;

