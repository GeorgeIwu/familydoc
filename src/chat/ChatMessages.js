
import React from 'react'
import { useChat, useForm } from '../_lib/hooks'
import Button from "../_lib/components/Button";
import Input from "../_lib/components/Input";

const ChatMessages = ({match: { params: { id } } }) => {
  const [chat, chatActions] = useChat(id)
  const [form, formActions] = useForm({ text: '' })
  const { values } = form

  const onChange = (e) => formActions.change({ name: e.target.name, value: e.target.value })

  const addMessage = async () => {
    if (!values.text) return
    const input = { text: values.text, type: 'DRUG' }
    chatActions.addMessage(input)
    formActions.reset()
  }

  const removeMessage = async (message) => {
    chatActions.removeMessage(message)
  }

  return (
    <div style={{}}>
      <h1 style={{}}>Messages</h1>
      {chat.messages.map(message => (
          <div key={message.id}>
            <div style={{display: 'inline-block', marginRight: '20px'}}>
              <p style={{}}>{message.text}</p>
            </div>
            <div style={{display: 'inline-block', backgroundColor: 'grey'}} onClick={() => removeMessage(message)}>X</div>
          </div>
        ))
      }
      <div>
        <Input
          onChange={onChange}
          name='text'
          placeholder='add message'
          value={values.text}
        />
        <Button onClick={addMessage}>Create Message</Button>
      </div>
    </div>
  )
}

export default ChatMessages
