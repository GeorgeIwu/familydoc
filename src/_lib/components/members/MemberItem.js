
import React from 'react'

const MemberItem = ({ member, onDelete = () => {} }) => {

  const handleRemove = () => {
    onDelete(member)
  };

  return (
    <div key={member.id}>
      <div style={{display: 'inline-block', marginRight: '20px'}}>
        <p style={{}}>{member.family_name} <span>{member.given_name}</span></p>
      </div>
      <div style={{display: 'inline-block', backgroundColor: 'grey'}} onClick={handleRemove}>X</div>
    </div>
  );
};

export default MemberItem;
