import Auth from "../utils/auth";
import PostQuote from "../components/PostQuote";

// Apollo GraphQL queries
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_GET_MY_QUOTES } from "../utils/queries";

const Journal = () => {
  let quoteData;

  const userId = Auth.getProfile().data._id;

  const { loading, data } = useQuery(QUERY_GET_MY_QUOTES, {
    // variables: { userId },
    fetchPolicy: "no-cache",
  });

  // populate quoteData
  if (data) {
    quoteData = data.getMyQuotes;
    // console.log("Journal quoteData:", quoteData);
  }

  let quoteDataLength;
  if (quoteData) {
    console.log("quoteData: ", quoteData);
    quoteDataLength = quoteData.length;
  }

  // if data isn't here yet, say so
  if (loading || !quoteDataLength) {
    return (
      <>
        <h2>LOADING...</h2>
      </>
    );
  }

  return (
    <>
      <div className="container border rounded-box">
        <PostQuote />
        <h2 className="pt-5">
          {quoteDataLength
            ? `Viewing ${quoteDataLength} ${quoteDataLength === 1 ? "quote" : "quotes"}:`
            : "You have no saved quotes"}
        </h2>

        <ul className="menu menu-lg rounded-box bg-base-200 gap-2 p-2">
          {quoteData.map((elem) => {
            return (
              <li key={elem._id} className="card card-side m-2 shadow-xl" data-quoteid={elem._id}>
                <div className="w-full">
                  <figure className="h-full">
                    <img src={elem.imageUrl} alt="image" />
                  </figure>
                  <div className="card-body w-[100%] flex flex-col bg-base-100 w-[75%] gap-2">
                    <h3 className="text-2xl">{elem.content}</h3>
                    <p className="gap-2 flex flex-start">
                      {elem.reactions.map((reactionelem) => {
                        return (
                          <div
                            className="border rounded-box tooltip text-xs font-bold p-1 badge badge-primary justify-end"
                            data-tip={reactionelem.userName}
                          >
                            {reactionelem.reactionBody}
                          </div>
                        );
                      })}
                    </p>
                    <div className="gap-2 flex flex-end justify-end">
                      <button className="btn btn-warning tooltip" data-tip="Turn this quote to public/private">
                        {quoteData.isPrivate ? "Set Public" : "Set Private"}
                      </button>
                      <button className="btn btn-warning tooltip" data-tip="Delete this quote">
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          {/* <li>
            <a>Quote 1</a>
          </li>
          <li>
            <a>Quote 2</a>
          </li>
          <li>
            <a>Quote 3</a>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default Journal;
