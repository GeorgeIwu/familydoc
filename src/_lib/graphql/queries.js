/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listChats = /* GraphQL */ `
  query ListChats(
    $userID: String
    $filter: ModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChats(
      userID: $userID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        owner
        messages {
          id
          text
          owner
          chatID
          type
          createdAt
          updatedAt
        }
        members {
          nextToken
        }
        createdAt
        updatedAt
        appointmentStart
        appointmentEnd
      }
      nextToken
    }
  }
`;
export const listMembers = /* GraphQL */ `
  query ListMembers(
    $chatID: String
    $filter: ModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMembers(
      chatID: $chatID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        chatID
        userID
        status
        priviledges
        chat {
          id
          name
          owner
          createdAt
          updatedAt
          appointmentStart
          appointmentEnd
        }
        member {
          id
          type
          email
          username
          phone_number
          family_name
          given_name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $chatID: String
    $filter: ModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(
      chatID: $chatID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        text
        owner
        chatID
        type
        createdAt
        updatedAt
      }
      nextToken
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
        id
        chatID
        userID
        status
        priviledges
        chat {
          id
          name
          owner
          createdAt
          updatedAt
          appointmentStart
          appointmentEnd
        }
        member {
          id
          type
          email
          username
          phone_number
          family_name
          given_name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    searchUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        email
        username
        phone_number
        family_name
        given_name
        chats {
          id
          chatID
          userID
          status
          priviledges
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChat = /* GraphQL */ `
  query GetChat($id: ID!) {
    getChat(id: $id) {
      id
      name
      owner
      messages {
        id
        text
        owner
        chatID
        type
        createdAt
        updatedAt
      }
      members {
        nextToken
      }
      createdAt
      updatedAt
      appointmentStart
      appointmentEnd
    }
  }
`;
export const searchChats = /* GraphQL */ `
  query SearchChats(
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    searchChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        owner
        messages {
          id
          text
          owner
          chatID
          type
          createdAt
          updatedAt
        }
        members {
          items {
            id
            chatID
            userID
            status
            priviledges
            createdAt
            updatedAt
          }
          nextToken
        }
        createdAt
        updatedAt
        appointmentStart
        appointmentEnd
      }
      nextToken
    }
  }
`;
