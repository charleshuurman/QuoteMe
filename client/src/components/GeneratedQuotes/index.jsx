import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import { useQuery } from "@apollo/client";
import { FETCH_AFFIRMATIONS_BY_EMOTION } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { CREATE_QUOTE } from "../../utils/mutations";
import API from '../../utils/API';
// import { SAVE_AFFIRMATION, UNSAVE_AFFIRMATION } from "../../utils/mutations";
function SelectQuote({ quote, feeling, indexValue, image }) {
  const [createQuote, { data, loading, error }] = useMutation(CREATE_QUOTE);

  async function handleSaveQuote(event) {
    event.preventDefault();
    try {
      const response = await createQuote({
        variables: {
          content: quote,
          emotion: feeling.toLowerCase(),
          isPrivate: true,
          isGenerated: true,
          imageUrl: image,
        },
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  }

  return (
    <div key={indexValue} className="bg-white p-4 shadow-md rounded-lg flex flex-col justify-between">
      <p className="text-lg mb-4">{quote}</p>
      <figure>
        <img className="object-cover w-full h-32 md:h-48" src={image} alt="image" />
      </figure>
      {Auth.loggedIn() ? (
        <button onClick={handleSaveQuote} className="badge badge-primary text-xs mt-4 self-end">
          {loading ? "Saving..." : "Save"}
        </button>
      ) : (
        <a href="/Login" className="badge badge-primary text-xs mt-4 self-end">
          Login to Save
        </a>
      )}
    </div>
  );
}


const GeneratedQuotes = ({ selectedEmotion, onBack }) => {
  const [randomQuotes, setRandomQuotes] = useState([]);

  const { loading, data } = useQuery(FETCH_AFFIRMATIONS_BY_EMOTION, {
    variables: { emotion: selectedEmotion },
    skip: !selectedEmotion,
  });


  useEffect(() => {
    console.log("useEffect");
    console.log(data);

    API.searchImage(selectedEmotion)
      .then((apiRes) => {
        console.log(apiRes);

        if (data?.affirmationsByEmotion) {
          const shuffled = [...data.affirmationsByEmotion].sort(() => 0.5 - Math.random());
          const SelectedQuoteContent = shuffled.slice(0, 3);
          console.log("SelectedQuoteContent", SelectedQuoteContent);

          const searchedImageArrays = apiRes.data.hits.sort(() => 0.5 - Math.random());
          console.log("searchedImageArrays", searchedImageArrays);
          const selectedImageArrays = searchedImageArrays.slice(0, 3);
          const selectedImages0 = selectedImageArrays[0].webformatURL;
          const selectedImages1 = selectedImageArrays[1].webformatURL;
          const selectedImages2 = selectedImageArrays[2].webformatURL;

          const selectedQuotes = [
            { content: SelectedQuoteContent[0].content, image: selectedImages0 },
            { content: SelectedQuoteContent[1].content, image: selectedImages1 },
            { content: SelectedQuoteContent[2].content, image: selectedImages2 },
          ];

          console.log("selectedQuotes", selectedQuotes);

          setRandomQuotes(selectedQuotes);
        }

      })
      .catch(err => { console.log(err) });
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (!selectedEmotion) return <div></div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Affirmations for {selectedEmotion}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {randomQuotes.map((quote, index) => (
          <SelectQuote key={index} quote={quote.content} feeling={selectedEmotion} indexValue={index} image={quote.image} />
        ))}
      </div>
    </div>
  );
};

export default GeneratedQuotes;


