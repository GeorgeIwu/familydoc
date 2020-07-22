
import React from 'react'
import useStore from './useStore'
import MemberItem from "./MemberItem";

const ChatMembers = ({ loggedInUser, chatID }) => {
  const [members, memberActions] = useStore(chatID, loggedInUser)

  const removeMember = async (member) => memberActions.removeMember(member)

  return (
    <div style={{}}>
      {members.items && members.items.map(member =>
          <MemberItem member={member.member} onDelete={removeMember} />)}
    </div>
  )
}

export default ChatMembers
