import Auth from "../utils/auth";
import PostQuote from "../components/PostQuote";
import ShowQuotes from "../components/ShowQuotes";

// Apollo GraphQL queries
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_GET_MY_QUOTES } from "../utils/queries";

const Journal = () => {
  let quoteData;

  const userId = Auth.getProfile().data._id;

  const { loading, data } = useQuery(QUERY_GET_MY_QUOTES, {
    // variables: { userId },
    // fetchPolicy: "no-cache",
  });

  // populate quoteData
  if (data) {
    quoteData = data.getMyQuotes;
    // console.log("Journal quoteData:", quoteData);
  }

  let quoteDataLength;
  if (quoteData) {
    console.log("journal quoteData: ", quoteData);
    quoteDataLength = quoteData.length;
  };

  // if data isn't here yet, say so
  if (loading) {
    return (
      <>
        <h2>LOADING...</h2>
      </>
    );
  }

  return (
    <div className="container border rounded-box">
      <PostQuote isJournal={true} />
      <ShowQuotes quotesArray={quoteData} />
    </div>
  );
};

export default Journal;
