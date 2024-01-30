import React from 'react';
import Auth from "../../utils/auth";
import { useMutation, useLazyQuery } from "@apollo/client";
import { SET_PUBLIC, SET_PRIVATE, DELETE_QUOTE, ADD_REACTION, DEL_REACTION } from "../../utils/mutations";
import { QUERY_ANALYZE_QUOTE } from "../../utils/queries";

const ShowQuotes = (props) => {
  const userName = Auth.getProfile().data.userName;
  const [setPublic] = useMutation(SET_PUBLIC);
  const [setPrivate] = useMutation(SET_PRIVATE);
  const [deleteQuote] = useMutation(DELETE_QUOTE);
  const [addReaction] = useMutation(ADD_REACTION);
  const [delReaction] = useMutation(DEL_REACTION);

  // QuoteAnalyzer Function Component
  function QuoteAnalyzer({ quoteId }) {
    const [analyzeQuote, { loading, error, data }] = useLazyQuery(QUERY_ANALYZE_QUOTE, {
      variables: { quoteId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error.message}`;

    return (
      <div>
        {data?.analyzeQuote && (
          <div className="chat chat-start">
            <div className="badge">{data.analyzeQuote.emotion}</div>
            <div className="chat-bubble">{data.analyzeQuote.content}</div>
          </div>
        )}
        <button className="btn btn-primary" onClick={() => analyzeQuote()}>
          Seek Feedback
        </button>
      </div>
    );
  }

  // Delete Button Implementation
  const deleteButton = async (event) => {
    event.preventDefault();
    const quoteId = event.target.getAttribute('data-id');
    await deleteQuote({ variables: { quoteId } });
    window.location.reload();
  };

  // Set Public Button Implementation
  const setPublicButton = async (event) => {
    event.preventDefault();
    const quoteId = event.target.getAttribute('data-id');
    await setPublic({ variables: { quoteId } });
    window.location.reload();
  };

  // Set Private Button Implementation
  const setPrivateButton = async (event) => {
    event.preventDefault();
    const quoteId = event.target.getAttribute('data-id');
    await setPrivate({ variables: { quoteId } });
    window.location.reload();
  };

  // Add Reaction Button Implementation
  const addReactionButton = async (event) => {
    event.preventDefault();
    const quoteId = event.target.getAttribute('data-id');
    await addReaction({ variables: { quoteId, reactionText: "like" } });
    window.location.reload();
  };

  // Delete Reaction Button Implementation
  const delReactionButton = async (event) => {
    event.preventDefault();
    const quoteId = event.target.getAttribute('data-id');
    const reactionText = event.target.getAttribute('data-reactiontext');
    await delReaction({ variables: { quoteId, reactionText } });
    window.location.reload();
  };

  // ReactionsList Component
  function ReactionsList({ reactionsItem, quoteId }) {
    const reactionCounts = reactionsItem.reduce((acc, reaction) => {
      acc[reaction.reactionBody] = (acc[reaction.reactionBody] || 0) + 1;
      return acc;
    }, {});

    return (
      <div className="flex gap-2">
        {Object.entries(reactionCounts).map(([reaction, count]) => (
          <button
            key={reaction}
            className="badge badge-primary"
            data-id={quoteId}
            data-reactiontext={reaction}
            onClick={delReactionButton}
          >
            {reaction} {count > 1 ? `(${count})` : ''}
          </button>
        ))}
      </div>
    );
  }

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
          <li key={quote._id} className="card flex flex-col md:flex-row bg-white m-2 shadow-xl rounded-lg overflow-hidden" data-quoteid={quote._id}>
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-48" src={quote.imageUrl} alt="Quote visual representation" />
            </div>
            <div className="p-4 flex flex-col justify-between">
              <h3 className="text-lg font-bold">{quote.emotion}</h3>
              <p className="mb-2">{quote.content}</p>
              {/* Other elements like reactions, buttons, etc. */}
              <div className="flex justify-between items-center">
                <ReactionsList reactionsItem={quote.reactions} quoteId={quote._id} />
                <button className="btn btn-primary" data-id={quote._id} onClick={addReactionButton}>
                  Like
                </button>
                {/* Conditionally rendered buttons based on quote ownership and privacy status */}
                {quote.userName === userName && (
                  <div className="flex space-x-2">
                    {quote.isPrivate ? (
                      <button
                        className="btn btn-secondary"
                        onClick={(event) => setPublicButton(event)}
                        data-id={quote._id}
                      >
                        Share to Public
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        onClick={setPrivateButton}
                        data-id={quote._id}
                      >
                        Set to Private
                      </button>
                    )}
                    <button
                      className="btn btn-error"
                      onClick={deleteButton}
                      data-id={quote._id}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowQuotes;