/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String!) {
    onCreateUser(owner: $owner) {
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
          createdAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String!) {
    onUpdateUser(owner: $owner) {
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
          createdAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String!) {
    onDeleteUser(owner: $owner) {
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
          createdAt
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateChatMember = /* GraphQL */ `
  subscription OnCreateChatMember {
    onCreateChatMember {
      id
      chatID
      memberID
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
        owner
      }
      createdAt
    }
  }
`;
export const onUpdateChatMember = /* GraphQL */ `
  subscription OnUpdateChatMember {
    onUpdateChatMember {
      id
      chatID
      memberID
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
        owner
      }
      createdAt
    }
  }
`;
export const onDeleteChatMember = /* GraphQL */ `
  subscription OnDeleteChatMember {
    onDeleteChatMember {
      id
      chatID
      memberID
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
        owner
      }
      createdAt
    }
  }
`;
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat {
    onCreateChat {
      id
      name
      owner
      members {
        items {
          id
          chatID
          memberID
          createdAt
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
      updatedAt
    }
  }
`;
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat {
    onUpdateChat {
      id
      name
      owner
      members {
        items {
          id
          chatID
          memberID
          createdAt
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
      updatedAt
    }
  }
`;
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat {
    onDeleteChat {
      id
      name
      owner
      members {
        items {
          id
          chatID
          memberID
          createdAt
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
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($owner: String!) {
    onCreateMessage(owner: $owner) {
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
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($owner: String!) {
    onUpdateMessage(owner: $owner) {
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
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($owner: String!) {
    onDeleteMessage(owner: $owner) {
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
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
