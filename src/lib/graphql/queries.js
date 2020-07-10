/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChat = /* GraphQL */ `
  query GetChat($id: ID!, $nextToken: String) {
    getChat(id: $id) {
      id
      name
      owner
      members {
        items {
          id
          chatID
          memberID
          status
          priviledges
          createdAt
          updatedAt
          member {
            id
            type
            email
            username
            phone_number
            family_name
            given_name
          }
        }
        nextToken
      }
      messages(nextToken: $nextToken) {
        nextToken
        items {
          id
          text
          messageChatId
          type
          createdAt
          updatedAt
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      type
      email
      username
      phone_number
      family_name
      given_name
      chats {
        items {
          id
          chatID
          memberID
          status
          priviledges
          createdAt
          updatedAt
          chat {
            id
            name
            owner
            createdAt
            updatedAt
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        email
        username
        phone_number
        family_name
        given_name
        chats {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
