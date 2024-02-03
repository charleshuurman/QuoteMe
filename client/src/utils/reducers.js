/**
* This file defines the reducer function for the application's state management, 
 * particularly handling actions related to products, shopping cart, and categories. 
 * It takes the current state and an action as arguments and returns a new state 
 * based on the action type. The reducer supports actions such as updating product 
 * listings, adding items to the cart, updating cart quantities, removing items from 
 * the cart, clearing the cart, toggling the cart's visibility, updating categories, 
 * and setting the current category. This centralized handling of state transitions 
 * ensures a predictable state evolution in response to user actions or events.
 */
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

// Defining a reducer accepting a new state and returns a new state based on action.type
export const reducer = (state, action) => {
  switch (action.type) {

    // Returning the state with an updated "products:" object, containing the new action.products
    //  return{ key: "sometihng", products: [' ','a'], products: ['b','c']}
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product],
      };

    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };
    //  {action.purchaseQuantity}
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action._id === product._id) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    case REMOVE_FROM_CART:
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });

      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };

    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    default:
      return state;
  }
};
