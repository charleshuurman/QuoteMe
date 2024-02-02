/**
 * This file establishes a global state management system using React's Context API and useReducer hook, 
 * and it also sets up a separate context for managing the application's theme. The global state includes 
 * data structures for products, shopping cart details, categories, and the currently selected category, 
 * allowing components throughout the application to access and manipulate global state efficiently.
 * 
 * The ThemeContext is specifically designed to manage the application's visual theme, which can be persisted 
 * in localStorage for consistency across user sessions. This dual context approach ensures that both application 
 * data and UI preferences are centrally managed and easily accessible throughout the application.
 */

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

/**
 * Exports:
 * - StoreProvider: A context provider component that wraps the application, providing global state to all child components.
 * - useStoreContext: A custom hook for components to access the global state and dispatch actions to the reducer.
 * - ThemeContext: A context for managing and accessing the application's theme.
 * - useThemeContext: A custom hook for components to access and modify the theme.
 */
