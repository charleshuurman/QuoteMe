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
    console.log("userData: ", userData);
    userDataLength = Object.keys(userData).length;
    console.log("userDataLength: ", userDataLength);
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
      <div className="container text-3xl rounded-box font-bold gap-2 relative">
        <h2 className="rounded-box bg-base-200 p-2">Profile</h2>
        <h2 className="p-2">Welcome, {userData.userName} !</h2>
        <div className="text-xl p-2">
          <div className="overflow-x-auto">
            <table className="table w-fit">
              <tbody>
                <tr>
                  <td>username</td>
                  <td>{userData.userName}</td>
                </tr>
                <tr>
                  <td>Name</td>
                  <td>{userData.firstName+" "+userData.lastName}</td>
                </tr>
                <tr>
                  <td>email</td>
                  <td>{userData.email}</td>
                </tr>
                <tr>
                  <td>QuoteMe Tier</td>
                  <td>{userData.tier}</td>
                </tr>
                <tr>
                  <td># of Quotes</td>
                  <td>{userData.quotes.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Shop />
      </div>
    </>
  );
};

export default Profile;
