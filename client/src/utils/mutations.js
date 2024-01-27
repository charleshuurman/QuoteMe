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


// Mutation to save an affirmation
export const SAVE_AFFIRMATION = gql`
  mutation SaveAffirmation($userId: ID!, $affirmationId: ID!) {
    saveAffirmation(userId: $userId, affirmationId: $affirmationId) {
      _id
      savedAffirmations {
        _id
        content
        emotion 
      }
    }
  }
`;

// Mutation to unsave an affirmation
export const UNSAVE_AFFIRMATION = gql`
  mutation UnsaveAffirmation($userId: ID!, $affirmationId: ID!) {
    unsaveAffirmation(userId: $userId, affirmationId: $affirmationId) {
      _id
      savedAffirmations {
        _id
        content
        emotion 
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
    $userName: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      userName: $userName
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
  mutation createComment($quoteId: ID!, $commentText: String!) {
    createComment(quoteId: $quoteId, commentText: $commentText) {
      _id
      comments {
        _id
        commentText
        commentAuthor
        createdAt        
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($quoteId: ID!, $commentId: ID!) {
    createComment(quoteId: $quoteId, commentId: $commentId) {
      _id
      comments {
        _id
      }
    }
  }
`;
