/**
 * This component renders a login form that allows users to authenticate and access their accounts. 
 * It uses React's useState hook to manage form inputs and Apollo Client's useMutation hook to perform 
 * the LOGIN mutation for user authentication.
 */
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(props) {
  // State to hold form inputs for email and password
  const [formState, setFormState] = useState({ email: "", password: "" });
  // GraphQL mutation for logging in a user
  const [login, { loading, error }] = useMutation(LOGIN);

  // Handles form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    try {
      // Executes the login mutation using the email and password from the form state
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      // Extracts the token from the mutation response and logs the user in
      const token = mutationResponse.data.login.token;
      Auth.login(token); // Uses auth utility to set the token in local storage and authenticate the user
    } catch (e) {
      console.log(e); // Logs any errors to the console
    }
  };

  // Update form state based on user input
  const handleChange = (event) => {
    const { name, value } = event.target; // Destructures the name and value component from the event target
    setFormState({
      ...formState, // Spreads the existing form state
      [name]: value, // Update the state with the new value for the named input
    });
  };

  // Renders the login form
  return (
    <div className="container my-1 border rounded-box">
      <Link to="/signup">← Go to Signup</Link>

      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex flex-row space-between my-2">
          <label htmlFor="email">Email address:</label>
          <input
            className="input input-bordered"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row space-between my-2">
          <label htmlFor="pwd">Password:</label>
          <input
            className="input input-bordered"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="flex flex-row flex-end">
          <button className="btn btn-primary" type="submit">
            {loading ? "Logging in..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
