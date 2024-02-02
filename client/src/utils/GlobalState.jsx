import { createContext, useContext, useReducer, useState } from "react";
import { reducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

// Create context for theme that can be stored in local storage
const ThemeContext = createContext(localStorage.getItem('colorTheme'));

const useThemeContext = () => {
  return useContext(ThemeContext);
}

export { StoreProvider, useStoreContext, ThemeContext, useThemeContext };
