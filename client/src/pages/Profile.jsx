import Shop from "./Shop";
import Auth from "../utils/auth";

// Apollo GraphQL queries
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

const Profile = () => {

  let userData;

  const userId = Auth.getProfile().data._id;

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId },
    fetchPolicy: "no-cache",
  });

  // populate userData
  if (data && data.user) {
    userData = data.user;
  }

  let userDataLength;
  if (userData) {
    console.log('userData: ',userData);
    userDataLength = Object.keys(userData).length;
    console.log('userDataLength: ',userDataLength);
  }

  // if data isn't here yet, say so
  if (loading || !userDataLength) {
    return (
      <>
        <h2>LOADING...</h2>
      </>
    );
  }

  return (
    <>
      <div className="container text-3xl rounded-box font-bold">
        Profile
        <br />
        Welcome, {userData.userName} !
        <div className="text-xl">
          Current QuoteMe Tier: {userData.tier}
          <br />
          You have {userData.quotes.length} quotes.
          <br />
          You have {userData.friends.length} friends.
          <br />
        </div>

        <Shop />
      </div>
    </>
  );
};

export default Profile;
