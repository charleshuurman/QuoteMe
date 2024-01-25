import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      _id
      userName
      firstName
      lastName
      email
      tier
      quotes {
        _id
        content
        reactions {
          reactionBody
          userName
        }
      }
      friends {
        _id
      }
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    } 
  }
`;

export const QUERY_GET_MY_QUOTES = gql`
  {
    getMyQuotes {
      _id
      content
      emotion
      isPrivate
      isGenerated
      userName
      reactions {
        reactionBody
        userName
      }
    }
  }
`;