import gql from 'graphql-tag'
import { API, graphqlOperation } from 'aws-amplify'
import Auth from '@aws-amplify/auth';
// import { v4 as uuid } from 'uuid';
import {createChat as addChat} from '../graphql/mutations'

const createChat = async (name) => {
  const family_name = (await Auth.currentUserInfo()).attributes.family_name
  const input = { name: name || family_name, createdAt: new Date() }
  console.log('creating chat', input)
  const data = await API.graphql(graphqlOperation(gql`${addChat}`, {input}))
  return data
}

export default createChat

