import React from 'react';
import { useStore, useForm } from '../_lib/hooks';

const Recover = () => {
  const [store, storeActions] = useStore()
  const [form, formActions] = useForm({code: '', phone_number: ''})

  const {phone_number, code} = form.values
  const onSubmit = () => storeActions.auth.verify(form.values)
  const onChange = (e) => formActions.change({ name: e.target.name, value: e.target.value })

  return (
    <div>
      <label htmlFor="phone_number">Phone number</label>
      <input name='phone_number' type='text' onChange={onChange} value={phone_number} />
      <label htmlFor="code">Verification Code</label>
      <input name='code' type='text' onChange={onChange} value={code} />
      <button disabled={form.errors} onClick={onSubmit}>Sumbit</button>
    </div>
  )
};

export default Recover;
