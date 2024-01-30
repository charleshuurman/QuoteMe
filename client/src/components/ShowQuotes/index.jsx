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
          <li key={quote._id} className="card flex flex-col md:flex-row m-2 shadow-xl" data-quoteid={quote._id}>
            <figure className="md:w-1/4 w-full">
              <img className="object-cover md:h-full" src={quote.imageUrl} alt="image" />
            </figure>
            <div className="card-body flex flex-col bg-base-100 gap-2 w-full">
             
              <h1 className="btn text-3xl p-1 btn-primary w-fit">{quote.emotion}</h1>
              {quote.isGenerated === true ? (
                <h3 className="badge text-2xl p-1 badge-secondary">Generated</h3>
              ) : (
                <h3 className="badge text-2xl p-1 badge-info">{quote.userName}</h3>
              )}
              <span className="text-xs">{quote.createdAt}</span>
              <h3 className="text-2xl">{quote.content}</h3>
              <div className="flex flex-row justify-between">
                <div className="gap-2 flex flex-start">
                  <ReactionsList reactionsItem={quote.reactions} quoteId={quote._id} />
                </div>
                <div>
                  <button className="badge badge-secondary" data-id={quote._id} onClick={addReactionButton}>
                    like
                  </button>
                </div>
              </div>
              {quote.userName === userName ? (
                <>
                  <div className="gap-2 flex flex-end justify-end">
                    {quote.isPrivate ? (
                      <button
                        onClick={(event) => setPublicButton(event)}
                        className="btn btn-warning tooltip"
                        data-id={quote._id}
                        data-tip="Turn this quote to public"
                      >
                        Share to Public
                      </button>
                    ) : (
                      <button
                        onClick={setPrivateButton}
                        className="btn btn-warning tooltip"
                        data-id={quote._id}
                        data-tip="Turn this quote to private"
                      >
                        Set to Private
                      </button>
                    )}
                    <button
                      onClick={deleteButton}
                      className="btn btn-warning tooltip"
                      data-id={quote._id}
                      data-tip="Delete this quote"
                    >
                      🗑️
                    </button>
                  </div>
                  <QuoteAnalyzer quoteId={quote._id} />
                </>
              ) : (
                <></>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowQuotes;


// import Auth from "../../utils/auth";
// import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
// import { SET_PUBLIC, SET_PRIVATE, DELETE_QUOTE, ADD_REACTION, DEL_REACTION } from "../../utils/mutations";
// import { QUERY_ANALYZE_QUOTE } from "../../utils/queries";
// import { useEffect } from "react";

// /**
//  * ShowQuotes
//  *   props.quotesArray is a list of quote objects passed from the parent
//  *   Returns multiple <li> elements of quote cards and renders the set private, set public, like, and delete buttons for each
//  *   data-id on each button designates the quote ID
//  */

// const ShowQuotes = (props) => {
//   const userName = Auth.getProfile().data.userName;

//   const [setPublic, { setPublicError }] = useMutation(SET_PUBLIC);
//   const [setPrivate, { setPrivateError }] = useMutation(SET_PRIVATE);
//   const [deleteQuote, { deleteQuoteError }] = useMutation(DELETE_QUOTE);

//   const [addReaction, { addReactionError }] = useMutation(ADD_REACTION);
//   const [delReaction, { delReactionError }] = useMutation(DEL_REACTION);

//   //========
//   function QuoteAnalyzer(props) {
//     const [analyzeQuote, { loading, error, data }] = useLazyQuery(QUERY_ANALYZE_QUOTE, {
//       variables: { quoteId: props.quoteId },
//     });
//     if (loading) return <p>Loading ...</p>;
//     if (error) return `Error! ${error}`;
//     return (
//       <div>
//         {data?.analyzeQuote && (
//           <div class="chat chat-start">
//             <div className="badge">{data.analyzeQuote.emotion}</div>
//             <div className="chat-bubble">{data.analyzeQuote.content}</div>
//           </div>
//         )}
//         <button className="btn btn-primary" onClick={() => analyzeQuote({ variables: { quoteId: props.quoteId } })}>
//           seek feedback
//         </button>
//       </div>
//     );
//   }
//   //=======

//   const deleteButton = async (event) => {
//     event.preventDefault();
//     try {
//       console.log(`Deleting quote:`, event.target.dataset.id);

//       event.target.textContent = "Deleting...";
//       const { data } = await deleteQuote({
//         variables: { quoteId: event.target.dataset.id },
//       });
//       console.log("deleted quote:", data);
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const setPublicButton = async (event) => {
//     event.preventDefault();
//     try {
//       console.log(`Setting quote to public:`, event.target.dataset.id);

//       event.target.textContent = "Setting to public...";
//       const { data } = await setPublic({
//         variables: { quoteId: event.target.dataset.id },
//       });
//       console.log("set to public:", data);
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const setPrivateButton = async (event) => {
//     event.preventDefault();
//     try {
//       console.log(`Setting quote to private:`, event.target.dataset.id);

//       event.target.textContent = "Setting to private...";

//       const { data } = await setPrivate({
//         variables: { quoteId: event.target.dataset.id },
//       });
//       console.log("set to private:", data);
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const addReactionButton = async (event) => {
//     event.preventDefault();
//     try {
//       console.log(`Adding reaction:`, event.target.dataset.id);

//       event.target.textContent = "Adding reaction...";

//       const { data } = await addReaction({
//         variables: { quoteId: event.target.dataset.id, reactionText: "like" },
//       });
//       console.log("added reaction:", data);
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const delReactionButton = async (event) => {
//     event.preventDefault();
//     try {
//       console.log(
//         `Deleting reaction:`,
//         event.target.dataset,
//         event.target.dataset.id,
//         event.target.dataset.reactiontext
//       );

//       event.target.textContent = "Deleting reaction...";

//       const { data } = await delReaction({
//         variables: { quoteId: event.target.dataset.id, reactionText: event.target.dataset.reactiontext },
//       });
//       // console.log("deleted reaction:", data);
//       window.location.reload();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Check if React passes our prop or not
//   // let quotesArray;
//   // if (props.hasOwnProperty("quotesArray")) {
//   //   quotesArray = props.quotesArray;
//   // } else {
//   //   quotesArray = [];
//   // }
//   // Use Javascript optional chaining instead of the above.
//   // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
//   const quotesArray = props?.quotesArray || [];

//   let quotesArrayLength = quotesArray.length;

//   // Render all reactions as a row of badges with the number of reactions listed on the side
//   // Convert straight reactions element to an object with reactions as keys and an array of users
//   // ie. { "like": [ "roxie", "kendrick", "alice" ],
//   //       "cry": [ "kendrick" ] }
//   function ReactionsList(prop) {
//     let x = {};
//     const userName = Auth.getProfile().data.userName;
//     prop.reactionsItem.forEach((elem) => {
//       if (!x.hasOwnProperty(elem.reactionBody)) {
//         x[elem.reactionBody] = [];
//       }
//       x[elem.reactionBody].push(` ${elem.userName} `);
//     });
//     let y = Object.keys(x);
//     return (
//       <>
//         {y.map((elem, index) => {
//           return (
//             <>
//               {/* Get an onclick listener to delete the reaction if any of it is from our user */}
//               {x[elem].includes(` ${userName} `) ? (
//                 <button
//                   key={index}
//                   className="badge badge-primary tooltip"
//                   data-tip={x[elem]}
//                   data-id={prop.quoteId}
//                   data-reactiontext={elem}
//                   onClick={delReactionButton}
//                 >
//                   {elem}
//                   {/* render the number of each reaction if greater than one */}
//                   <span className="text-xs">{x[elem].length > 1 ? ` (${x[elem].length})` : ""}</span>
//                 </button>
//               ) : (
//                 <button key={index} className="badge badge-primary tooltip" data-tip={x[elem]}>
//                   {elem}
//                   {/* render the number of each reaction if greater than one */}
//                   <span className="text-xs">{x[elem].length > 1 ? ` (${x[elem].length})` : ""}</span>
//                 </button>
//               )}
//             </>
//           );
//         })}
//       </>
//     );
//   }

//   return (
//     <div className="border rounded-box">
//       <h2 className="pt-5">
//         {quotesArrayLength
//           ? `Viewing ${quotesArrayLength} ${quotesArrayLength === 1 ? "quote" : "quotes"}:`
//           : "There are no quotes to display"}
//       </h2>

//       <ul className="menu rounded-box bg-base-200 gap-2 p-2">
//         {quotesArray.map((elem) => {
//           return (
//             <li key={elem._id} className="card card-side m-2 shadow-xl" data-quoteid={elem._id}>
//               <div className="w-full">
//                 <figure className="min-h-full">
//                   <img className="object-cover" src={elem.imageUrl} alt="image" />
//                 </figure>
//                 <div className="card-body w-[100%] flex flex-col bg-base-100 w-[75%] gap-2">
//                   <h1 className="btn text-3xl p-1 btn-primary w-fit">{elem.emotion}</h1>
//                   {elem.isGenerated === true ? (
//                     <h3 className="badge text-2xl p-1 badge-secondary">Generated</h3>
//                   ) : (
//                     <h3 className="badge text-2xl p-1 badge-info">{elem.userName}</h3>
//                   )}
//                   <span className="text-xs">{elem.createdAt}</span>
//                   <h3 className="text-2xl">{elem.content}</h3>
//                   <div className="flex flex-row justify-between">
//                     <div className="gap-2 flex flex-start">
//                       <ReactionsList reactionsItem={elem.reactions} quoteId={elem._id} />
//                     </div>
//                     <div>
//                       <button className="badge badge-secondary" data-id={elem._id} onClick={addReactionButton}>
//                         like
//                       </button>
//                     </div>
//                   </div>
//                   {/* render buttons on the user's own posts */}
//                   {elem.userName === userName ? (
//                     <>
//                       <div className="gap-2 flex flex-end justify-end">
//                         {/* if the quote is private, give the option to set it to public, and vice versa */}
//                         {elem.isPrivate ? (
//                           <button
//                             onClick={(event) => setPublicButton(event)}
//                             className="btn btn-warning tooltip"
//                             data-id={elem._id}
//                             data-tip="Turn this quote to public"
//                           >
//                             Share to Public
//                           </button>
//                         ) : (
//                           <button
//                             onClick={setPrivateButton}
//                             className="btn btn-warning tooltip"
//                             data-id={elem._id}
//                             data-tip="Turn this quote to private"
//                           >
//                             Set to Private
//                           </button>
//                         )}
//                         <button
//                           onClick={deleteButton}
//                           className="btn btn-warning tooltip"
//                           data-id={elem._id}
//                           data-tip="Delete this quote"
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                       <QuoteAnalyzer quoteId={elem._id} />
//                     </>
//                   ) : (
//                     <></>
//                   )}
//                 </div>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

// export default ShowQuotes;
