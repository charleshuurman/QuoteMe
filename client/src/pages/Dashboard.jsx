/**
 * The DashBoard component serves as the main hub for users to interact with public quotes. It displays
 * a collection of quotes that have been marked as public by users, allowing for broader engagement
 * within the community. The component uses GraphQL to query these public quotes and renders them
 * using the ShowQuotes component. Additionally, users can post new quotes through the PostQuote
 * component accessible from the dashboard.
 */
import Auth from "../utils/auth";
import PostQuote from "../components/PostQuote";
import ShowQuotes from "../components/ShowQuotes";

// Apollo GraphQL queries
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_GET_PUBLIC_QUOTES } from "../utils/queries";

const DashBoard = () => {
  // Retrieving the username from the logged-in user's profile
  const userName = Auth.getProfile().data.userName;

  // Execute the GraphQL query to fetch public quotes
  const { loading, data } = useQuery(QUERY_GET_PUBLIC_QUOTES);

  // Initialize variable for the length of the fetched quotes data
  let quoteDataLength;
  if (data && data.publicQuotes) {
    // Uncomment below to log quote data for debugging
    // console.log("quoteData: ", quoteData);
    quoteDataLength = data.publicQuotes.length; // Determine the number of public quotes fetched
  }

  // Display loading message while data is being fetched
  if (loading) {
    return (
      <>
        <h2>LOADING...</h2>
      </>
    );
  }

  // Render the dashboard with PostQuote and ShowQuotes components
  return (
    <>
      <div className="container border rounded-box">
        <div className="rounded-box">
          <h2>Public Dashboard</h2>
          <p className="text-sm">
            Shared quote posts from all users, including your own posts. You can like or delete likes on all posts. But you can only modify/delete your own posts. Any quotes you post here will be shared, but you can set them to private later.
          </p>
        </div>
        <PostQuote />
        <ShowQuotes quotesArray={data.publicQuotes} />
      </div>
    </>
  );
};

export default DashBoard;
