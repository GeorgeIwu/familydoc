/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($owner: String!) {
    onCreateMessage(owner: $owner) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($owner: String!) {
    onUpdateMessage(owner: $owner) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($owner: String!) {
    onDeleteMessage(owner: $owner) {
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
export const onCreateChatMember = /* GraphQL */ `
  subscription OnCreateChatMember {
    onCreateChatMember {
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
export const onUpdateChatMember = /* GraphQL */ `
  subscription OnUpdateChatMember {
    onUpdateChatMember {
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
export const onDeleteChatMember = /* GraphQL */ `
  subscription OnDeleteChatMember {
    onDeleteChatMember {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
