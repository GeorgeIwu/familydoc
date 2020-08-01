/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateMessageType = /* GraphQL */ `
  mutation UpdateMessageType($input: UpdateMessageTypeInput!) {
    updateMessageType(input: $input) {
      id
      text
      owner
      chatID
      type
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
export const createChat = /* GraphQL */ `
  mutation CreateChat(
    $input: CreateChatInput!
    $condition: ModelChatConditionInput
  ) {
    createChat(input: $input, condition: $condition) {
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
    }
  }
`;
export const createMember = /* GraphQL */ `
  mutation CreateMember(
    $input: CreateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    createMember(input: $input, condition: $condition) {
      id
      chatID
      userID
      status
      priviledges
      chat {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateMember = /* GraphQL */ `
  mutation UpdateMember(
    $input: UpdateMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    updateMember(input: $input, condition: $condition) {
      id
      chatID
      userID
      status
      priviledges
      chat {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteMember = /* GraphQL */ `
  mutation DeleteMember(
    $input: DeleteMemberInput!
    $condition: ModelMemberConditionInput
  ) {
    deleteMember(input: $input, condition: $condition) {
      id
      chatID
      userID
      status
      priviledges
      chat {
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
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      text
      owner
      chatID
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
      chatID
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
      chatID
      type
      createdAt
      updatedAt
    }
  }
`;
