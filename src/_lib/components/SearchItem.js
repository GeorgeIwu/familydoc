import React from 'react';

const SearchItem = ({ item, attribute, handleAction, actionName = 'Add' }) => {

  const onClick = () => {
    handleAction(item)
  }

  return (
    <div key={item.id}>
      <div style={{display: 'inline-block', marginRight: '20px'}}>
        <p style={{}}>{item[attribute]}</p>
      </div>
      {handleAction && <div style={{display: 'inline-block', marginLeft: '5px'}} onClick={onClick}>{actionName}</div>}
    </div>
  );
}

export default SearchItem
