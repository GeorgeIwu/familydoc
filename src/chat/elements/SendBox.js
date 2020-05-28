import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import ControlLabel from '@material-ui/core/FormControlLabel';
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useForm } from '../../components/hooks'

const SendBox = ({ handleSend, message }) => {
  const [form, formActions] = useForm(message || { type: '', text: '' })
  const { values } = form

  const onChange = (e) => formActions.change({ name: e.target.name, value: e.target.value })

  const onSubmit = async () => {
    if (!values.text || !values.type) return
    const { chat, ...rest} = message || {}
    const input = { ...rest, text: values.text, type: values.type }
    handleSend(input)
    formActions.reset()
  }

  const onCancel = () => {
    handleSend(null)
    formActions.reset()
  }

  return (
    <div>
      <FormGroup row={true}>
        <ControlLabel control={<Checkbox checked={values.type === 'DRUG'} onChange={onChange} name="type" value='DRUG'/>} label="Drug"/>
        <ControlLabel control={<Checkbox checked={values.type === 'SCAN'} onChange={onChange} name="type" value='SCAN'/>} label="Scan"/>
        <ControlLabel control={<Checkbox checked={values.type === 'VITAL'} onChange={onChange} name="type" value='VITAL'/>} label="Vital"/>
        <ControlLabel control={<Checkbox checked={values.type === 'FINANCE'} onChange={onChange} name="type" value='FINANCE'/>} label="Finance"/>
        <ControlLabel control={<Checkbox checked={values.type === 'LAB'} onChange={onChange} name="type" value='LAB'/>} label="Lab"/>
      </FormGroup>
      <FormGroup column='true'>
        <Input
          onChange={onChange}
          name='text'
          placeholder='add message'
          value={values.text}
        />
        {!message && <Button onClick={onSubmit}>Add</Button>}
        {message &&<div><Button onClick={onCancel}>Cancel</Button><Button onClick={onSubmit}>Save</Button></div>}
      </FormGroup>

    </div>
  );
}

export default SendBox
