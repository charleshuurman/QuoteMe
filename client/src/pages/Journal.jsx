/**
  * The Journal component serves as a personalized space for users to write and review their quotes. 
 * It leverages GraphQL to fetch quotes specific to the logged-in user, allowing for a private, 
 * reflective experience. Through the integration of the PostQuote and ShowQuotes components, 
 * users can not only submit new entries but also view their past submissions.
 */

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

  const { loading, data } = useQuery(QUERY_GET_MY_QUOTES);

  // populate quoteData
  if (data) {
    quoteData = data.getMyQuotes;
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
      <div className="rounded-box p-2">
        <h2>Private Journal</h2>
        <p className="text-sm">Your private journal lists all of your private posts to keep track of your emotional journey. You can share your posts to the public. You can also get an AI to generate an affirmation to your post. Any post you make here will be private, but you can share it to the public later.</p>
      </div>
      <PostQuote isJournal={true} />
      <ShowQuotes quotesArray={quoteData} quotesQuery={QUERY_GET_MY_QUOTES}/>
    </div>
  );
};

export default Journal;
