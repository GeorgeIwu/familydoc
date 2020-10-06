import React from 'react';

const SearchItem = ({ item, attribute, onAction, actionName = 'Add' }) => {

  const handleClick = () => {
    onAction(item)
  }

  return (
    <div key={item.id}>
      <div style={{display: 'inline-block', marginRight: '20px'}}>
        <p style={{}}>{item[attribute]}</p>
      </div>
      {onAction && <div style={{display: 'inline-block', marginLeft: '5px'}} onClick={handleClick}>{actionName}</div>}
    </div>
  );
}

export default SearchItem
