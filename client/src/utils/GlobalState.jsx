import { createContext, useContext, useReducer } from "react";
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

// Define pre-selected emotions
// Array of emotions with their corresponding names and emoji symbols
const emotions = [
  { name: 'Happy', emoji: '😊' },
  { name: 'Sad', emoji: '😢' },
  { name: 'Anxious', emoji: '😰' },
  { name: 'Angry', emoji: '😠' },
  { name: 'Stressed', emoji: '😥' },
  { name: 'Lonely', emoji: '🙍‍♂️' },
  { name: 'Overwhelmed', emoji: '😵' },
  { name: 'Frustrated', emoji: '😤' },
  { name: 'Disappointed', emoji: '😞' },
  { name: 'Grateful', emoji: '🙏' },
  { name: 'Exhausted', emoji: '😩' },
  { name: 'Insecure', emoji: '🙇‍♂️' },
  { name: 'Nervous', emoji: '😟' },
  { name: 'Hopeless', emoji: '😔' },
  { name: 'Jealous', emoji: '😒' },
  { name: 'Lost', emoji: '🤔' }
];


export { StoreProvider, useStoreContext, ThemeContext, useThemeContext, emotions };
