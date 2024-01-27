import Auth from "../utils/auth";
import PostQuote from "../components/PostQuote";
import ShowQuotes from "../components/ShowQuotes";

// Apollo GraphQL queries
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_GET_PUBLIC_QUOTES } from "../utils/queries";

const DashBoard = () => {
  const userName = Auth.getProfile().data.userName;

  const { loading, data } = useQuery(QUERY_GET_PUBLIC_QUOTES);

  let quoteDataLength;
  if (data && data.publicQuotes) {
    // console.log("quoteData: ", quoteData);
    quoteDataLength = data.publicQuotes.length;
  }

  // if data isn't here yet, say so
  if (loading) {
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
        <ShowQuotes quotesArray={data.publicQuotes}/>
      </div>
    </>
  );
};

export default DashBoard;
