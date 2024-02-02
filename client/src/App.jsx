import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import { StoreProvider } from './utils/GlobalState';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

import { useState, useEffect } from 'react';
import { ThemeContext } from './utils/GlobalState';

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('colorTheme'));

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
