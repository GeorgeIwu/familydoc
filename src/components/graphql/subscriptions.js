/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat($owner: String!) {
    onCreateChat(owner: $owner) {
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
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat($owner: String!) {
    onUpdateChat(owner: $owner) {
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
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat($owner: String!) {
    onDeleteChat(owner: $owner) {
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
export const onCreateMemberChat = /* GraphQL */ `
  subscription OnCreateMemberChat {
    onCreateMemberChat {
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
export const onUpdateMemberChat = /* GraphQL */ `
  subscription OnUpdateMemberChat {
    onUpdateMemberChat {
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
export const onDeleteMemberChat = /* GraphQL */ `
  subscription OnDeleteMemberChat {
    onDeleteMemberChat {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
