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
      imageUrl
      userName
      reactions {
        reactionBody
        userName
      }
    }
  }
`;

export const QUERY_GET_ALL_QUOTES = gql`
  {
    allquotes {
        _id
        content
        createdAt
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

export const QUERY_LIST_QUOTES = gql`
  {
    listQuotes {
        _id
        content
        createdAt
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


export const QUERY_ALL_USERS = gql`
  {
    users {
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

export const QUERY_GET_PUBLIC_QUOTES = gql`
  {
    publicQuotes {
        _id
        content
        createdAt
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

export const QUERY_GET_PRIVATE_QUOTES = gql`
  {
    privateQuotes {
        _id
        content
        createdAt
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

export const QUERY_GET_BULLETIN = gql`
  {
    getBulletin {
        _id
        content
        createdAt
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


export const QUERY_SINGLE_USER_BY_NAME = gql`
query singleUser($userName: String!) {
  singleUserByUsrName(userName: $userName) {
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

export const QUERY_SINGLE_USER_BY_ID = gql`
query singleUser($userId: ID!) {
  singleUserById(userId: $userId) {
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


export const QUERY_QUOTES_OF_A_USER = gql`
query quotes($userName: String!){
  quotes(userName: $userName) {
        _id
        content
        createdAt
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

export const QUERY_A_QUOTE = gql`
query quote($quoteId: ID!){
  quote(quoteId: $quoteId) {
        _id
        content
        createdAt
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
