import { useReducer } from 'react';

const defaultValues = {};
const formReducer = (state = {values: defaultValues}, action = {type: ''}) => {
  const {type, validation, name, value, initialState} = action
  switch(type) {
    case "form/change":
      let newValues = {...state.values, [name]: value}
      return {
        ...state,
        values: newValues,
        errors: validation(newValues)
      }
    case "form/reset":
      return initialState
    default:
      return state
  }
}

const useForm = (values = defaultValues, validation = () => null) => {
  const initialState = {values}
  const [state, dispatch] = useReducer(formReducer, initialState, formReducer)

  const form = { values: state.values, errors: state.errors }
  const actions = {
    reset: () => dispatch({type: "form/reset", initialState}),
    change: ({name, value}) => dispatch({type: "form/change", validation, name, value}),
  }
  return [form, actions]
}

export {formReducer, useForm}
