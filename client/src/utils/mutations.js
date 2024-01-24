import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
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
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation createQuote($text: String!, $author: String!) {
    createQuote(text: $text, author: $author) {
      _id
      text
      author
    }
  }
`;

export const LIKE_QUOTE = gql`
  mutation likeQuote($quoteId: ID!) {
    likeQuote(quoteId: $quoteId) {
      _id
      text
      author
      likes
  }
}
`;

export const CREATE_COMMENT = gql`
  mutation createComment($quoteId: ID!, $text: String!) {
    createComment(quoteId: $quoteId, text: $text) {
      _id
      text
      quote {
        _id
        text
        author
      }
    }
  }
`;
