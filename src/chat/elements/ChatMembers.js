
import React from 'react'
import { useForm, useMember, useUsers, useStore } from '../../components/hooks'
import Input from "../../components/Input";

const ChatMembers = ({ chat }) => {
  const [store] = useStore()
  const [users, usersActions] = useUsers()
  const [form, formActions] = useForm({ name: '' })
  const [members, memberActions] = useMember(chat.id, store.user.id)
  const { values } = form

  const removeMember = async (member) => memberActions.removeMember(member)

  const addMember = async (user) => { memberActions.addMember(user); formActions.reset(); }

  const onChange = (e) => { formActions.change(e.target); usersActions.searchUser(e.target.value) }

  return (
    <div style={{}}>
      <div>
        <Input
          onChange={onChange}
          name='name'
          placeholder='search user'
          value={values.name}
        />
      </div>
      {users.items.map(user => (
        <div key={user.id}>
          <div style={{display: 'inline-block', marginRight: '20px'}}>
            <p style={{}}>{user.given_name}</p>
          </div>
          <div style={{display: 'inline-block', backgroundColor: 'grey'}} onClick={() => addMember(user)}>Add</div>
        </div>
      ))}
      {<div>-------------------------------</div>}
      {members && members.items.map(member => (
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
