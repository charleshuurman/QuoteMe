/**
 * This utility file encapsulates authentication-related functionalities using JWT tokens. It provides 
 * methods for handling user authentication state, such as logging in, logging out, checking if the 
 * user is logged in, and retrieving the user's profile and ID from the token. It leverages jwt-decode 
 * for decoding JWT tokens to extract user information and verify token expiration.
 * 
 * Key Methods:
 * - getProfile(): Decodes and returns the user's profile information from the JWT token.
 * - getUserId(): Extracts and returns the user's ID from the JWT token.
 * - loggedIn(): Checks if the user is currently logged in by verifying the presence and validity of the JWT token.
 * - isTokenExpired(token): Determines if the provided JWT token has expired.
 * - getToken(): Retrieves the JWT token from localStorage.
 * - login(idToken): Saves the user's JWT token to localStorage and redirects to the home page.
 * - logout(): Removes the user's JWT token from localStorage and redirects to the home page.
 */
import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }
  getUserId() {
    const token = this.getToken();
    if (!token) return null; // Return null if there's no token
    
    try {
      const decoded = decode(token);
      return decoded.user._id; // Adjust this path based on the actual structure of your token
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
