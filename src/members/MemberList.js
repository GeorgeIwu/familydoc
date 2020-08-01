
import React from 'react'
import useStore from './useStore'
import MemberItem from "./MemberItem";
import SearchBar from "./SearchBar";

const ChatMembers = ({ userID, chatID }) => {
  const [members, memberActions] = useStore(chatID)

  const removeMember = async (member) => memberActions.removeMember(member)
  const addMember = async (user) => memberActions.addMember(user)

  return (
    <div style={{}}>
      <SearchBar chatID={chatID} onSelect={addMember} items={members.items} />
      {members.items.map((member) => <MemberItem key={member.id} member={member} onDelete={removeMember} />)}
    </div>
  )
}

export default ChatMembers
