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

// export const CREATE_QUOTE = gql`
//   mutation createQuote($text: String!, $author: String!) {
//     createQuote(text: $text, author: $author) {
//       _id
//       text
//       author
//     }
//   }
// `;

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
