import Auth from "../utils/auth";

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
    console.log("Journal quoteData:", quoteData);
  }

  let quoteDataLength;
  if (quoteData) {
    console.log("quoteData: ", quoteData);
    quoteDataLength = quoteData.length;
    console.log("quoteDataLength: ", quoteDataLength);
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
        <h2 className="pt-5">
          {quoteDataLength
            ? `Viewing ${quoteDataLength} ${quoteDataLength === 1 ? "quote" : "quotes"}:`
            : "You have no saved quotes"}
        </h2>

        <ul className="menu menu-lg rounded-box gap-2">
          {quoteData.map((elem) => {
            return (
              <li key={elem._id} className="card card-side flex flex-row gap-2 m-2 shadow-xl" data-quoteid={elem._id}>
                
                <div className="card-body border rounded-box bg-base-100">
                  {elem.content}
                  {elem.reactions.map((reactionelem) => {
                    return (
                      <div
                        className="border rounded-box tooltip text-xs font-bold p-1 badge badge-primary"
                        data-tip={reactionelem.userName}
                      >
                        {reactionelem.reactionBody}
                      </div>
                    );
                  })}
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
