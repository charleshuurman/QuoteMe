/**
 * This file defines a collection of GraphQL mutations used throughout the application for interacting 
 * with the backend API. These mutations cover a wide range of functionalities, including user 
 * authentication, quote management, comment and reaction handling, and order processing.
 * 
 * These mutations enable the application to perform CRUD operations and more, facilitating interactive 
 * and dynamic user experiences. They are utilized within the application through Apollo Client's useMutation 
 * hook, allowing components to easily interact with the API.
 */

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
  mutation SaveAffirmation($affirmationId: ID!) {
    saveAffirmation(affirmationId: $affirmationId) {
      _id
      savedAffirmations {
        _id
        content
        emotion
        createdAt
        updatedAt
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
        createdAt
        updatedAt 
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
  mutation m00002($content: String!, $emotion: String!, $isPrivate: Boolean!, $isGenerated: Boolean!, $imageUrl: String!) {
    createQuote(content: $content, emotion: $emotion, isPrivate: $isPrivate, isGenerated: $isGenerated, imageUrl: $imageUrl) {
      _id
      content
      emotion
      isPrivate
      isGenerated
      userName
      reactions {
        reactionId
        reactionBody
        userName
      }
    }
  }
`;

export const DELETE_QUOTE = gql`
  mutation m00003($quoteId: ID!) {
    deleteQuote(_id: $quoteId) {
      _id
      content
      emotion
      isPrivate
      isGenerated
      userName
      reactions {
        reactionId
        reactionBody
        userName
      }
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

export const SET_PUBLIC = gql`
  mutation m00001($quoteId: ID!) {
    setPublic(quoteId: $quoteId) {
      _id
      content
      emotion
      isPrivate
      isGenerated
      userName
      reactions {
        reactionId
        reactionBody
        userName
      }
    }
  }
`;

export const SET_PRIVATE = gql`
  mutation m00001($quoteId: ID!) {
    setPrivate(quoteId: $quoteId) {
      _id
      content
      emotion
      isPrivate
      isGenerated
      userName
      reactions {
        reactionId
        reactionBody
        userName
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation mut0006($quoteId: ID!, $reactionText: String!) {
    addReaction(quoteId: $quoteId, reactionText: $reactionText) {
      _id
      content
      emotion
      isPrivate
      isGenerated
      imageUrl
      createdAt
      userName
      reactions {
        userName
        reactionBody
      }
      comments {
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const DEL_REACTION = gql`
  mutation mut0007($quoteId: ID!, $reactionText: String!) {
    delReaction(quoteId: $quoteId, reactionText: $reactionText) {
      _id
      content
      emotion
      isPrivate
      isGenerated
      imageUrl
      createdAt
      userName
      reactions {
        userName
        reactionBody
      }
      comments {
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;