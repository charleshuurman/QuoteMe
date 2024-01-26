import Auth from "../../utils/auth";

const ShowQuotes = (props) => {
  console.log("quotesArray: ", props.quotesArray);
  const quotesArray = props.quotesArray;
  let quotesArrayLength = props.quotesArray.length;
  const userName = Auth.getProfile().data.userName;

  return (
    <>
      <div className="border rounded-box">
        <h2 className="pt-5">
          {quotesArrayLength
            ? `Viewing ${quotesArrayLength} ${quotesArrayLength === 1 ? "quote" : "quotes"}:`
            : "There are no quotes"}
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
                            className="btn btn-warning tooltip"
                            data-id={elem._id}
                            data-tip="Turn this quote to public"
                          >
                            Share to Public
                          </button>
                        ) : (
                          <button
                            className="btn btn-warning tooltip"
                            data-id={elem._id}
                            data-tip="Turn this quote to private"
                          >
                            Set to Private
                          </button>
                        )}
                        <button className="btn btn-warning tooltip" data-id={elem._id} data-tip="Delete this quote">
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
    </>
  );
};

export default ShowQuotes;
