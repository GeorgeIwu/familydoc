
import React from 'react'
import { useForm, useUsers } from '../../components/hooks'
import Button from "../../components/Button";
import Input from "../../components/Input";

const ChatMembers = ({ chatApi }) => {
  const [chat, chatActions] = chatApi
  const [users, usersActions] = useUsers()
  const [form, formActions] = useForm({ name: '' })
  const { values } = form

  const onChange = (e) => {
    formActions.change({ name: e.target.name, value: e.target.value })
  }

  const searchUser = async () => {
    if (!values.name) return
    usersActions.searchUser(values.name)
  }

  const removeMember = async (member) => {
    chatActions.removeMember(member)
  }

  const addMember = async (user) => {
    const input = { user }
    chatActions.addMember(input)
    formActions.reset()
  }

  return (
    <div style={{}}>
      <div>
        <Input
          onChange={onChange}
          name='name'
          placeholder='search user'
          value={values.name}
        />
        <Button onClick={searchUser}>Search</Button>
      </div>
      {users.items.map(user => (
        <div key={user.id}>
          <div style={{display: 'inline-block', marginRight: '20px'}}>
            <p style={{}}>{user.username}</p>
          </div>
          <div style={{display: 'inline-block', backgroundColor: 'grey'}} onClick={() => addMember(user)}>Add</div>
        </div>
      ))}
      {<div>-------------------------------</div>}
      {chat.members && chat.members.items.map(member => (
        <div key={member.id}>
          <div style={{display: 'inline-block', marginRight: '20px'}}>
            <p style={{}}>{member.text}</p>
          </div>
          <div style={{display: 'inline-block', backgroundColor: 'grey'}} onClick={() => removeMember(member)}>X</div>
        </div>
      ))}
    </div>
  )
}

export default ChatMembers
