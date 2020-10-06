import React from 'react'

const ChatBoxSender = () => {
  return (
    <form>
        <div>
            <button class="btn btn-light mr-3" data-toggle="tooltip" title="Emoji" type="button">
                <i data-feather="smile"></i>
            </button>
        </div>
        <input type="text" class="form-control" placeholder="Write a message."/>
        <div class="form-buttons">
            <button class="btn btn-light" data-toggle="tooltip" title="Add files" type="button">
                <i data-feather="paperclip"></i>
            </button>
            <button class="btn btn-light d-sm-none d-block" data-toggle="tooltip"
                    title="Send a voice record" type="button">
                <i data-feather="mic"></i>
            </button>
            <button class="btn btn-primary" type="submit">
                <i data-feather="send"></i>
            </button>
        </div>
    </form>
  )
}

export default ChatBoxSender
