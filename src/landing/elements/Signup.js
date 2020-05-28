import React from 'react';
import { useForm } from '../../components/hooks';

const Signup = ({ signup }) => {
    const [form, formActions] = useForm({email: '', family_name: '', given_name: '', phone_number: '', password: ''})

    const {given_name, family_name, phone_number, email, password, nickname} = form.values
    const onSubmit = () => signup(form.values)
    const onChange = (e) => formActions.change({ name: e.target.name, value: e.target.value })

  return (
    <div id="signup" className="content">
        <h2 className="content-head is-center">Dolore magna aliqua. Uis aute irure.</h2>

        <div className="pure-g">
            <div className="l-box-lrg pure-u-1 pure-u-md-2-5">
                <div className="pure-form pure-form-stacked">
                    <fieldset>

                        <label htmlFor="given_name">First name</label>
                        <input name='given_name' type='text' onChange={onChange} value={given_name} />

                        <label htmlFor="family_name">Surname</label>
                        <input name='family_name' type='text' onChange={onChange} value={family_name} />

                        <label htmlFor="email">Email</label>
                        <input name='email' type='text' onChange={onChange} value={email} />

                        <label htmlFor="phone_number">Phone number</label>
                        <input name='phone_number' type='text' onChange={onChange} value={phone_number} />

                        <label htmlFor="nickname">Type</label>
                        <input name='nickname' type='text' onChange={onChange} value={nickname} />

                        <label htmlFor="password">Password</label>
                        <input name='password' type='password' onChange={onChange} value={password} />

                        <button className="pure-button" disabled={form.errors} onClick={onSubmit}>Sumbit</button>
                    </fieldset>
                </div>
            </div>

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
        </div>

    </div>
  )
};

export default Signup;
