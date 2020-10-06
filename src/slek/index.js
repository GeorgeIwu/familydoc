import React from 'react'
import ChatBar from "./ChatBar";
import ChatBox from "./ChatBox";
import ChatList from "./ChatList";
import ChatNav from "./ChatNav";

const SlekTwo = () => {
  return (
    <div class="layout">
        <ChatNav />

        <div class="content">

            <ChatList />

            <ChatBox />

            <ChatBar />
        </div>
    </div>
  )
}

export default SlekTwo
