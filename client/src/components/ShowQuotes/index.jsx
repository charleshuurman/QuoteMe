import React from "react";
import { useState } from "react";
import Auth from "../../utils/auth";
import { useMutation, useLazyQuery } from "@apollo/client";
import { SET_PUBLIC, SET_PRIVATE, DELETE_QUOTE, ADD_REACTION, DEL_REACTION } from "../../utils/mutations";
import { QUERY_ANALYZE_QUOTE } from "../../utils/queries";

const ShowQuotes = (props) => {
  const userName = Auth.getProfile().data.userName;
  const [setPublic, setPublicState] = useMutation(SET_PUBLIC);
  const [setPrivate, setPrivateState] = useMutation(SET_PRIVATE);
  const [deleteQuote, deleteQuoteState] = useMutation(DELETE_QUOTE, {
    refetchQueries: [{ query: props.quotesQuery }],
  });
  const [addReaction, addReactionState] = useMutation(ADD_REACTION);
  const [delReaction, delReactionState] = useMutation(DEL_REACTION);

  // Utilize React's useState to store a list of ai Quotes using the underlying Quote's _id as key
  const [aiQuotes, setAiQuotes] = useState({});

  // QuoteAnalyzer Function Component
  function QuoteAnalyzer({ quoteToAnalyze }) {
    let quoteId = quoteToAnalyze;
    const [analyzeQuote, analyzeResponse] = useLazyQuery(QUERY_ANALYZE_QUOTE, {
      variables: { quoteId },
    });

    // Create a new event handler function so the AI query only happens when users click on Get Affirmations
    const runAnalyzeQuote = async (quoteId, event) => {
      event.preventDefault();
      console.log("running analyze quote");

      // Since Apollo Client returns a promise when getting data, we use the .then to retrieve the affirmation in our aiQuotes object
      analyzeQuote().then((response) => {
        let newAiQuotes = {};
        let newAiQuote = { _id: null };
        newAiQuote[response.data.analyzeQuote._id] = {
          content: response.data.analyzeQuote.content,
          emotion: response.data.analyzeQuote.emotion,
        };
        Object.assign(newAiQuotes, aiQuotes, newAiQuote);
        setAiQuotes(newAiQuotes);
      });
    };

    if (analyzeResponse.loading) return <p>Seeking Affirmation...</p>;
    if (analyzeResponse.error) return `Error! ${analyzeResponse.error.message}`;

    return (
      <div className="flex max-lg:w-full max-lg:justify-center">
        {aiQuotes && aiQuotes?.[quoteId] && (
          <div className="chat chat-start">
            <div className="badge">{aiQuotes[quoteId].emotion}</div>
            <div className="chat-bubble">{aiQuotes[quoteId].content}</div>
          </div>
        )}
        <button className="btn btn-primary" onClick={(event) => runAnalyzeQuote(quoteId, event)}>
          Seek Affirmation
        </button>
      </div>
    );
  }

  // Delete Button Implementation
  const deleteButton = async (id, event) => {
    event.preventDefault();
    const quoteId = id; // event.target.getAttribute("data-id");
    await deleteQuote({ variables: { quoteId } });
  };

  // Set Public Button Implementation
  const setPublicButton = async (id, event) => {
    console.log("setpublicbutton: ", id);
    event.preventDefault();
    const quoteId = id; //event.target.getAttribute("data-id");
    await setPublic({ variables: { quoteId } });
  };

  // Set Private Button Implementation
  const setPrivateButton = async (id, event) => {
    event.preventDefault();
    console.log("setprivatebutton: ", id);
    const quoteId = id; // event.target.getAttribute("data-id");
    await setPrivate({ variables: { quoteId } });
  };

  // Add Reaction Button Implementation
  const addReactionButton = async (id, event) => {
    event.preventDefault();
    const quoteId = id; // event.target.getAttribute("data-id");
    await addReaction({ variables: { quoteId, reactionText: "like" } });
  };

  // Delete Reaction Button Implementation
  const delReactionButton = async (id, reaction, event) => {
    event.preventDefault();
    const quoteId = id; // event.target.getAttribute("data-id");
    const reactionText = reaction; // event.target.getAttribute("data-reactiontext");
    await delReaction({ variables: { quoteId, reactionText } });
  };

  // ReactionsList Component
  function ReactionsList({ reactionsItem, quoteId }) {
    const reactionCounts = reactionsItem.reduce((acc, reaction) => {
      acc[reaction.reactionBody] = (acc[reaction.reactionBody] || 0) + 1;
      return acc;
    }, {});

    return (
      <div className="flex flex-wrap gap-2 max-lg:my-3 max-lg:w-full max-lg:justify-center">
        {Object.entries(reactionCounts).map(([reaction, count]) => (
          <button
            key={reaction}
            className="badge badge-primary"
            onClick={(event) => delReactionButton(quoteId, reaction, event)}
          >
            {reaction} {count > 1 ? `(${count})` : ""}
          </button>
        ))}
      </div>
    );
  }

  if (!props?.quotesArray) return <p> Loading... </p>;

  // Start of the JSX returned by the component
  return (
    <div className="border rounded-box">
      <h2 className="pt-5">
        {props.quotesArray.length
          ? `Viewing ${props.quotesArray.length} ${props.quotesArray.length === 1 ? "quote" : "quotes"}:`
          : "There are no quotes to display"}
      </h2>

      <ul className="menu rounded-box bg-base-200 gap-2 p-2">
        {props.quotesArray.map((quote) => (
          <li
            key={quote._id}
            className="card flex flex-col md:flex-row bg-base-100 m-2 shadow-xl rounded-lg overflow-hidden"
            data-quoteid={quote._id}
          >
            <div className="w-full flex flex-wrap">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full object-cover md:w-48"
                  src={quote.imageUrl}
                  alt="Quote visual representation"
                />
              </div>
              <div className="p-4 flex flex-col gap-2 justify-between">
                <h3 className="text-lg font-bold">{quote.emotion}</h3>
                <p className="mb-2">{quote.content}</p>
                {/* Other elements like reactions, buttons, etc. */}
                <div className="badge badge-outline text-xs">
                  {quote.isGenerated ? quote.userName + " (generated)" : quote.userName}
                </div>
                <div className="flex flex-wrap justify-between max-lg:justify-center gap-2">
                  <ReactionsList reactionsItem={quote.reactions} quoteId={quote._id} />
                  <div className="flex space-x-2">
                    <button
                      className="btn btn-primary"
                      data-id={quote._id}
                      onClick={(event) => addReactionButton(quote._id, event)}
                    >
                      {addReactionState.loading ? "Liking..." : "Like"}
                    </button>
                    {/* Conditionally rendered buttons based on quote ownership and privacy status */}
                    {quote.userName === userName && (
                      <>
                        {quote.isPrivate ? (
                          <button className="btn btn-secondary" onClick={(event) => setPublicButton(quote._id, event)}>
                            {setPublicState.loading ? "Sharing to Public..." : "Share to Public"}
                          </button>
                        ) : (
                          <button className="btn btn-secondary" onClick={(event) => setPrivateButton(quote._id, event)}>
                            {setPrivateState.loading ? "Setting to Private..." : "Set to Private"}
                          </button>
                        )}
                        <button className="btn btn-error" onClick={(event) => deleteButton(quote._id, event)}>
                          {deleteQuoteState.loading ? "Deleting..." : "Delete"}
                        </button>{" "}
                      </>
                    )}
                  </div>
                </div>
                {/* Quote Analyzer asks an AI to relate as a friend to the user's post */}
                {quote.userName === userName && <QuoteAnalyzer quoteToAnalyze={quote._id} />}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowQuotes;
