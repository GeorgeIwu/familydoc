import React from 'react';
import { useStore, useForm } from '../_lib/hooks';

const Login = () => {
  const [store, storeActions] = useStore()
  const [form, formActions] = useForm({phone_number: '', password: ''})

  const {phone_number, password} = form.values
  const onSubmit = () => storeActions.login(form.values)
  const onChange = (e) => formActions.change({ name: e.target.name, value: e.target.value })

  return (
    <div>
      <label htmlFor="phone_number">Phone number</label>
      <input name='phone_number' type='text' onChange={onChange} value={phone_number} />
      <label htmlFor="password">Password</label>
      <input name='password' type='password' onChange={onChange} value={password} />
      <button disabled={form.errors} onClick={onSubmit}>Sumbit</button>
    </div>
  )
};

export default Login;
