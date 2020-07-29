
import React from 'react'
import { useForm, useCreate } from '../_lib/hooks'

const UserForm = ({ userID, onComplete }) => {
  const [created, createActions] = useCreate(userID)
  const [form, formActions] = useForm({ email: '', family_name: '', given_name: '', phone_number: '' })

  const onChange = (e) => formActions.change({ name: e.target.name, value: e.target.value })

  const handleSubmit = async () => {
    await createActions.addUser(form.values)
    onComplete()
  }

  return (
    <div>
      <label htmlFor="given_name">First name</label>
      <input name='given_name' type='text' onChange={onChange} value={form.values.given_name} />

      <label htmlFor="family_name">Surname</label>
      <input name='family_name' type='text' onChange={onChange} value={form.values.family_name} />

      <label htmlFor="email">Email</label>
      <input name='email' type='text' onChange={onChange} value={form.values.email} />

      <label htmlFor="phone_number">Phone number</label>
      <input name='phone_number' type='text' onChange={onChange} value={form.values.phone_number} />

      <button className="pure-button" disabled={form.errors} onClick={handleSubmit}>Sumbit</button>
    </div>
  )
}

export default UserForm

