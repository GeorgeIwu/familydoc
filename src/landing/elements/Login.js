import React from 'react';
import { useForm } from '../../components/hooks';

const Login = ({ login }) => {
    const [form, formActions] = useForm({phone_number: '', password: ''})

    const {phone_number, password} = form.values
    const onSubmit = () => login(form.values)
    const onChange = (e) => formActions.change({ name: e.target.name, value: e.target.value })

  return (
    <div id="login" className="content">
        <h2 className="content-head is-center">Dolore magna aliqua. Uis aute irure.</h2>

        <div className="pure-g">
            <div className="l-box-lrg pure-u-1 pure-u-md-3-5">
                <h4>Contact Us</h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>

                <h4>More Information</h4>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>

            <div className="l-box-lrg pure-u-1 pure-u-md-2-5">
                <div className="pure-form pure-form-stacked">
                    <fieldset>

                        <label htmlFor="phone_number">Phone number</label>
                        <input name='phone_number' type='text' onChange={onChange} value={phone_number} />

                        <label htmlFor="password">Password</label>
                        <input name='password' type='password' onChange={onChange} value={password} />

                        <button className="pure-button" disabled={form.errors} onClick={onSubmit}>Sumbit</button>
                    </fieldset>
                </div>
            </div>
        </div>

    </div>
  )
};

export default Login;
