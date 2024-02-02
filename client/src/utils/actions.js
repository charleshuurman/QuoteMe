/**
 * This file exports constants representing the types of actions that can be dispatched 
 * to the reducer in the application's state management system. These action types cover 
 * a range of functionalities related to updating products, managing the shopping cart, 
 * and handling product categories. They are used to specify the type of action being 
 * dispatched to the reducer, enabling the application to update its state accordingly.
 */

export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";

export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_MULTIPLE_TO_CART = "ADD_MULTIPLE_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const UPDATE_CART_QUANTITY = "UPDATE_CART_QUANTITY";
export const TOGGLE_CART = "TOGGLE_CART";

export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";

/**
 * Action Types Include:
 * - UPDATE_PRODUCTS: For updating the list of products.
 * - ADD_TO_CART, ADD_MULTIPLE_TO_CART: For adding single or multiple items to the shopping cart.
 * - REMOVE_FROM_CART: For removing an item from the cart.
 * - CLEAR_CART: For clearing all items from the cart.
 * - UPDATE_CART_QUANTITY: For changing the quantity of a specific item in the cart.
 * - TOGGLE_CART: For toggling the visibility of the cart UI.
 * - UPDATE_CATEGORIES: For updating the list of product categories.
 * - UPDATE_CURRENT_CATEGORY: For setting the current category being viewed.
 */