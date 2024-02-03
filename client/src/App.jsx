// App component: Serves as the entry point for the application. It sets up the Apollo Client for GraphQL interactions,
// manages global theme state, and provides a structured layout with navigation and content outlets.
import { Outlet } from 'react-router-dom'; // Oulet component for rendering matched child routes
import {
  ApolloClient, // For interacting with GraphQL server
  InMemoryCache, // In-memory caching for GraphQL server
  ApolloProvider, // Context provider for Apollo Clienr
  createHttpLink, // Funtion to create middleware chain for HTTP requests
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context'; // Apollo link for setting context on a per-request basis

import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';

// Create an HTTP link for Apollo Client
const httpLink = createHttpLink({
  uri: '/graphql', // URI for GraphQL server endpoint
});

// Create a context link for authentification
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token'); // Retrieve authentification token from local storage
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Add token to request headers if available
    },
  };
});

// Initialize Apollo Client with authentication and HTTP link
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine auth and HTTP links
  cache: new InMemoryCache(), // Configure Apollo Client with in-memory cache
});

import { useState, useEffect } from 'react';
import { ThemeContext } from './utils/GlobalState';

function App() {
  // State hook for managing the global theme
  const [theme, setTheme] = useState(localStorage.getItem('colorTheme'));

  // Effect hook to apply selected theme to the app
  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ApolloProvider client={client}>
      <ThemeContext.Provider value={[theme, setTheme]}>
        {console.log("top level:", theme)}
        <StoreProvider>
          <Nav />
          <Outlet />
        </StoreProvider>
      </ThemeContext.Provider>
    </ApolloProvider>
  );
}

export default App;
