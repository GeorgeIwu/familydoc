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
      type
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
      }
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
      type
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
      }
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
      type
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
      members {
        items {
          id
        }
        nextToken
      }
      messages {
        items {
          id
          text
          owner
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
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
        }
        nextToken
      }
      messages {
        items {
          id
          text
          owner
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
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
        }
        nextToken
      }
      messages {
        items {
          id
          text
          owner
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
    }
  }
`;
export const createMemberChat = /* GraphQL */ `
  mutation CreateMemberChat(
    $input: CreateMemberChatInput!
    $condition: ModelMemberChatConditionInput
  ) {
    createMemberChat(input: $input, condition: $condition) {
      id
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
      }
      member {
        id
        email
        username
        phone_number
        family_name
        given_name
        type
        chats {
          nextToken
        }
      }
    }
  }
`;
export const updateMemberChat = /* GraphQL */ `
  mutation UpdateMemberChat(
    $input: UpdateMemberChatInput!
    $condition: ModelMemberChatConditionInput
  ) {
    updateMemberChat(input: $input, condition: $condition) {
      id
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
      }
      member {
        id
        email
        username
        phone_number
        family_name
        given_name
        type
        chats {
          nextToken
        }
      }
    }
  }
`;
export const deleteMemberChat = /* GraphQL */ `
  mutation DeleteMemberChat(
    $input: DeleteMemberChatInput!
    $condition: ModelMemberChatConditionInput
  ) {
    deleteMemberChat(input: $input, condition: $condition) {
      id
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
      }
      member {
        id
        email
        username
        phone_number
        family_name
        given_name
        type
        chats {
          nextToken
        }
      }
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
      email
      username
      phone_number
      family_name
      given_name
      type
      chats {
        items {
          id
        }
        nextToken
      }
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
      email
      username
      phone_number
      family_name
      given_name
      type
      chats {
        items {
          id
        }
        nextToken
      }
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
      email
      username
      phone_number
      family_name
      given_name
      type
      chats {
        items {
          id
        }
        nextToken
      }
    }
  }
`;
