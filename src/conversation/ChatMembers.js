
import React from 'react'
import { useForm, useChatMember, useStore, useSearch } from '../lib/hooks'
import SearchBar from "../lib/components/SearchBar";

const searchType = 'PROVIDER'

const ChatMembers = ({ chat }) => {
  const [store] = useStore()
  const [form, formActions] = useForm({ name: '' })
  const [search, searchActions] = useSearch(store.user.id)
  const [members, memberActions] = useChatMember(chat?.id)

  const removeMember = async (member) => memberActions.removeMember(member)

  const addMember = async (user) => { memberActions.addMember(user); formActions.reset(); }

  const handleChange = (e) => { formActions.change(e.target); searchActions.searchUser(e.target.value, searchType) }

  return (
    <div style={{}}>
      <SearchBar value={form.values.name} onChange={handleChange} >
        <div>
          {search && search.items.map(user => (
            <div key={user.id}>
              <div style={{display: 'inline-block', marginRight: '20px'}}>
                <p>{user.given_name}</p>
              </div>
              <div style={{display: 'inline-block', backgroundColor: 'grey'}} onClick={() => addMember(user)}>Add</div>
            </div>
          ))}
        </div>
      </SearchBar>

      {members?.items?.map(member => (
        <div key={member.id}>
          <div style={{display: 'inline-block', marginRight: '20px'}}>
            <p style={{}}>{member?.member.family_name} <span>{member?.member.given_name}</span></p>
          </div>
          <div style={{display: 'inline-block', backgroundColor: 'grey'}} onClick={() => removeMember(member)}>X</div>
        </div>
      ))}
    </div>
  )
}

export default ChatMembers
