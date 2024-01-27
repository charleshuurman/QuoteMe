import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { SET_PUBLIC, SET_PRIVATE } from "../../utils/mutations";

/**
 * ShowQuotes
 *   props.quotesArray is a list of quote objects passed from the parent
 *   Returns multiple <li> elements of quote cards and renders the set private, set public, like, and delete buttons for each
 *   data-id on each button designates the quote ID
 */

const ShowQuotes = (props) => {
  const [setPublic, { setPublicError }] = useMutation(SET_PUBLIC);
  const [setPrivate, { setPrivateError }] = useMutation(SET_PRIVATE);

  const deleteButton = () => {
    alert(`Delete button`);
  };

  const setPublicButton = async (event) => {
    event.preventDefault();
    try {
      console.log(`Setting quote to public:`, event.target.dataset.id);

      event.target.textContent = "Setting to public...";
      const { data } = await setPublic({
        variables: { quoteId: event.target.dataset.id },
      });
      console.log("set to public:", data);
      // setSkill('');
    } catch (err) {
      console.error(err);
    }
  };

  const setPrivateButton = async (event) => {
    event.preventDefault();
    try {
      console.log(`Setting quote to private:`, event.target.dataset.id);

      event.target.textContent = "Setting to private...";

      const { data } = await setPrivate({
        variables: { quoteId: event.target.dataset.id },
      });
      console.log("set to private:", data);
      // setSkill('');
    } catch (err) {
      console.error(err);
    }
  };

  // Check if React passes our prop or not
  // let quotesArray;
  // if (props.hasOwnProperty("quotesArray")) {
  //   quotesArray = props.quotesArray;
  // } else {
  //   quotesArray = [];
  // }
  // Use Javascript optional chaining instead of the above.
  // Ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  const quotesArray = props?.quotesArray || [];

  let quotesArrayLength = quotesArray.length;

  const userName = Auth.getProfile().data.userName;

  return (
    <div key={userName} className="border rounded-box">
      <h2 className="pt-5">
        {quotesArrayLength
          ? `Viewing ${quotesArrayLength} ${quotesArrayLength === 1 ? "quote" : "quotes"}:`
          : "There are no quotes to display"}
      </h2>

      <ul className="menu menu-lg rounded-box bg-base-200 gap-2 p-2">
        {quotesArray.map((elem) => {
          return (
            <li key={elem._id} className="card card-side m-2 shadow-xl" data-quoteid={elem._id}>
              <div className="w-full">
                <figure className="min-h-full">
                  <img className="object-cover" src={elem.imageUrl} alt="image" />
                </figure>
                <div className="card-body w-[100%] flex flex-col bg-base-100 w-[75%] gap-2">
                  <h1 className="btn text-3xl p-1 btn-primary w-fit">{elem.emotion}</h1>
                  <h3 className="badge text-2xl p-1 badge-info">{elem.userName}</h3>
                  <span className="text-xs">{elem.createdAt}</span>
                  <h3 className="text-2xl">{elem.content}</h3>
                  <div className="gap-2 flex flex-start">
                    {elem.reactions.map((reactionelem) => {
                      return (
                        <div
                          key={reactionelem.reactionId}
                          className="border rounded-box tooltip text-xs font-bold p-1 badge badge-primary justify-end"
                          data-tip={reactionelem.userName}
                        >
                          {reactionelem.reactionBody}
                        </div>
                      );
                    })}
                  </div>
                  {/* render buttons on the user's own posts */}
                  {elem.userName === userName ? (
                    <div className="gap-2 flex flex-end justify-end">
                      {/* if the quote is private, give the option to set it to public, and vice versa */}
                      {elem.isPrivate ? (
                        <button
                          onClick={(event) => setPublicButton(event)}
                          className="btn btn-warning tooltip"
                          data-id={elem._id}
                          data-tip="Turn this quote to public"
                        >
                          Share to Public
                        </button>
                      ) : (
                        <button
                          onClick={setPrivateButton}
                          className="btn btn-warning tooltip"
                          data-id={elem._id}
                          data-tip="Turn this quote to private"
                        >
                          Set to Private
                        </button>
                      )}
                      <button
                        onClick={deleteButton}
                        className="btn btn-warning tooltip"
                        data-id={elem._id}
                        data-tip="Delete this quote"
                      >
                        🗑️
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ShowQuotes;
