import Auth from "../utils/auth";
import PostQuote from "../components/PostQuote";
import ShowQuotes from "../components/ShowQuotes";

// Apollo GraphQL queries
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_GET_PUBLIC_QUOTES } from "../utils/queries";

const DashBoard = () => {
  let quoteData;

  const userName = Auth.getProfile().data.userName;

  const { loading, data } = useQuery(QUERY_GET_PUBLIC_QUOTES, {
    // variables: { userId },
    fetchPolicy: "no-cache",
  });

  // populate quoteData
  if (data) {
    quoteData = data.publicQuotes;
    // console.log("Journal quoteData:", quoteData);
  }

  let quoteDataLength;
  if (quoteData) {
    // console.log("quoteData: ", quoteData);
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
        <ShowQuotes quotesArray={quoteData}/>
      </div>
    </>
  );
};

export default DashBoard;
