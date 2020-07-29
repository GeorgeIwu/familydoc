/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMember = /* GraphQL */ `
  subscription OnCreateMember($chatID: ID) {
    onCreateMember(chatID: $chatID) {
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
export const onUpdateMember = /* GraphQL */ `
  subscription OnUpdateMember($chatID: ID) {
    onUpdateMember(chatID: $chatID) {
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
export const onDeleteMember = /* GraphQL */ `
  subscription OnDeleteMember($chatID: ID) {
    onDeleteMember(chatID: $chatID) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($chatID: ID) {
    onCreateMessage(chatID: $chatID) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($chatID: ID) {
    onUpdateMessage(chatID: $chatID) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($chatID: ID) {
    onDeleteMessage(chatID: $chatID) {
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
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat {
    onCreateChat {
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
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat {
    onUpdateChat {
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
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat {
    onDeleteChat {
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
