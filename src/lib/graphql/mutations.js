/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      text
      owner
      messageChatId
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      text
      owner
      messageChatId
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      text
      owner
      messageChatId
      type
      createdAt
      updatedAt
    }
  }
`;
export const createChat = /* GraphQL */ `
  mutation CreateChat(
    $input: CreateChatInput!
    $condition: ModelChatConditionInput
  ) {
    createChat(input: $input, condition: $condition) {
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
        }
        nextToken
      }
      messages {
        nextToken
        items {
          id
          text
          owner
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
export const updateChat = /* GraphQL */ `
  mutation UpdateChat(
    $input: UpdateChatInput!
    $condition: ModelChatConditionInput
  ) {
    updateChat(input: $input, condition: $condition) {
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
        }
        nextToken
      }
      messages {
        nextToken
        items {
          id
          text
          owner
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
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat(
    $input: DeleteChatInput!
    $condition: ModelChatConditionInput
  ) {
    deleteChat(input: $input, condition: $condition) {
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
        }
        nextToken
      }
      messages {
        nextToken
        items {
          id
          text
          owner
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
export const createChatMember = /* GraphQL */ `
  mutation CreateChatMember(
    $input: CreateChatMemberInput!
    $condition: ModelChatMemberConditionInput
  ) {
    createChatMember(input: $input, condition: $condition) {
      id
      chatID
      memberID
      status
      priviledges
      chat {
        id
        name
        owner
        members {
          nextToken
        }
        messages {
          nextToken
        }
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
        chats {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateChatMember = /* GraphQL */ `
  mutation UpdateChatMember(
    $input: UpdateChatMemberInput!
    $condition: ModelChatMemberConditionInput
  ) {
    updateChatMember(input: $input, condition: $condition) {
      id
      chatID
      memberID
      status
      priviledges
      chat {
        id
        name
        owner
        members {
          nextToken
        }
        messages {
          nextToken
        }
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
        chats {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteChatMember = /* GraphQL */ `
  mutation DeleteChatMember(
    $input: DeleteChatMemberInput!
    $condition: ModelChatMemberConditionInput
  ) {
    deleteChatMember(input: $input, condition: $condition) {
      id
      chatID
      memberID
      status
      priviledges
      chat {
        id
        name
        owner
        members {
          nextToken
        }
        messages {
          nextToken
        }
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
        chats {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
