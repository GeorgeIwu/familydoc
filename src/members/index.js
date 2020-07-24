
import React from 'react'
import useStore from './useStore'
import MemberItem from "./MemberItem";

const ChatMembers = ({ userID, chatID }) => {
  const [members, memberActions] = useStore(chatID, userID)

  const removeMember = async (member) => memberActions.removeMember(member)

  return (
    <div style={{}}>
      {members.map(member =>
          <MemberItem key={member.member.id} member={member.member} onDelete={removeMember} />)}
    </div>
  )
}

export default ChatMembers
