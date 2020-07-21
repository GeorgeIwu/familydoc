import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import ControlLabel from '@material-ui/core/FormControlLabel';
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useForm } from '../../hooks'

const SendBox = ({ handleSend, handleSave, handleCancel, message = {} }) => {
  const { chat, ...rest} = message
  const [form, formActions] = useForm({ type: '', text: '', ...rest })
  const { values } = form

  const onChange = (e) => {
    formActions.change(e.target)
  }

  const onCancel = () => {
    handleCancel()
    formActions.reset()
  }

  const onSubmit = async () => {
    if (!values.text || !values.type) return
    handleSend(values)
    formActions.reset()
  }

  const onSave = async () => {
    if (!values.text || !values.type) return
    handleSave(values)
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
        <ControlLabel control={<Checkbox checked={values.type === 'ALL'} onChange={onChange} name="type" value='ALL'/>} label="All"/>
      </FormGroup>
      <FormGroup column='true'>
        <Input onChange={onChange} name='text' placeholder='add message' value={values.text} />
        {handleSend && <Button onClick={onSubmit}>Add</Button>}
        <div>
          {handleCancel && <Button onClick={onCancel}>Cancel</Button>}
          {handleSave && <Button onClick={onSave}>Save</Button>}
        </div>
      </FormGroup>

    </div>
  );
}

export default SendBox
