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
          messageChatId
          type
          createdAt
          updatedAt
        }
        members {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listChatMembers = /* GraphQL */ `
  query ListChatMembers(
    $chatID: String
    $filter: ModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatMembers(
      chatID: $chatID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        chatID
        memberID
        status
        priviledges
        chat {
          id
          name
          owner
          createdAt
          updatedAt
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
export const listChatMessages = /* GraphQL */ `
  query ListChatMessages(
    $chatID: String
    $filter: ModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatMessages(
      chatID: $chatID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        text
        owner
        messageChatId
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
        items {
          id
          chatID
          memberID
          status
          priviledges
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
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
        messageChatId
        type
        createdAt
        updatedAt
      }
      members {
        items {
          id
          chatID
          memberID
          status
          priviledges
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
