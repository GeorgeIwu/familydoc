
import React from 'react'
import AppBar from './AppBar'
import useStore from './useStore'

const Wrapper = ({ userID, children }) => {
  const [user, userActions] = useStore(userID)
  // const [store, storeActions] = useStore()
  // userID = store.user.id

  const handleLogout= () => {
    userActions.logoutUser(userID)
  }

  return (
    <div>
      <AppBar logout={handleLogout} >{children}</AppBar>
    </div>
  );
};

export default Wrapper;
