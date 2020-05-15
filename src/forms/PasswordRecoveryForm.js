import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {LOGIN} from '../constants/routes';
import {loginUser} from '../actions/loginActions';
import useActions from '../hooks/useAction';
import {Button, InputFormWrapper, Error, Link} from './FormsStyles';

function PasswordRecoveryForm() {
  const [email, setEmail] = useState('');
  const {handleSubmit, register, errors} = useForm();

  // Alternative bindActionCreators
  const [submitAction] = useActions([loginUser]);

  const submit = () => {
    if (email !== '') {
      submitAction(email);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <InputFormWrapper>
        <label htmlFor="email">Enter your email to recovery password</label>
        <input
          ref={register({
            required: 'required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address'
            }
          })}
          name="email"
          onChange={e => setEmail(e.target.value)}
        />
        <Error>{errors.email && errors.email.message}</Error>
      </InputFormWrapper>
      <br />
      <NavLink to={LOGIN}>
        <Link>Back to authorization</Link>
      </NavLink>
      <br />
      <Button type="submit">Get the code</Button>
    </form>
  );
}

export default PasswordRecoveryForm;
