/**
 * This component provides a user interface for new users to create an account in the application.
 * It includes form fields for entering username, first name, last name, email, and password.
 * Upon form submission, it uses a GraphQL mutation (ADD_USER) to create a new user account.
 * Successful account creation results in automatic login of the user by storing the received
 * authentication token via the Auth utility. This component is designed to enhance user
 * experience by providing straightforward navigation to the login page and real-time feedback
 * for the account creation process.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup(props) {
  // State for managing form inputs
  const [formState, setFormState] = useState({ email: '', password: '' });
  // Apollo useMutation hook to call the ADD_USER mutation
  const [addUser] = useMutation(ADD_USER);

  // Handles form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Executes the addUser mutation with variables from formState
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
        userName: formState.userName
      },
    });
    // Extracts the token from the mutation response and logs the user in
    const token = mutationResponse.data.addUser.token;
    Auth.login(token); // Uses Auth service to handle login
  };

  // Updates form state based on input changes
  const handleChange = (event) => {
    const { name, value } = event.target; // Extracts name and value from the event target
    setFormState({
      ...formState, // Spreads current formState
      [name]: value, // Updates the value for the given name
    });
  };

  // Renders the sign-up form
  return (
    <div className="container my-1 border rounded-box">
      <Link to="/login">← Go to Login</Link>

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
      <div className="flex flex-row space-between my-2">
          <label htmlFor="userName">username:</label>
          <input
            className="input input-bordered"
            placeholder="username (handle)"
            name="userName"
            type="userName"
            id="userName"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row space-between my-2">
          <label htmlFor="firstName">First Name:</label>
          <input
            className="input input-bordered"
            placeholder="First"
            name="firstName"
            type="firstName"
            id="firstName"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row space-between my-2">
          <label htmlFor="lastName">Last Name:</label>
          <input
            className="input input-bordered"
            placeholder="Last"
            name="lastName"
            type="lastName"
            id="lastName"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
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
        <div className="flex flex-row flex-end">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
