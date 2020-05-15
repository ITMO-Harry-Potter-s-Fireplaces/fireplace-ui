import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import {REGISTR, RECOVERY} from '../constants/routes';
import {loginUser} from '../actions/loginActions';
import useActions from '../hooks/useAction';
import {Button, InputFormWrapper, Link, Error, Transfer} from './FormsStyles';

function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const {handleSubmit, register, errors} = useForm();

  //Alternative bindActionCreators
  const [submitAction] = useActions([loginUser]);

  const submit = () => {
    if (login !== '' && password !== '') {
      submitAction(login, password);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <InputFormWrapper>
        <label for="login">Email</label>
        <input
          ref={register({
            required: 'required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address'
            }
          })}
          name="login"
          onChange={e => setLogin(e.target.value)}
        />
        <Error>{errors.login && errors.login.message}</Error>
      </InputFormWrapper>
      <br />
      <InputFormWrapper>
        <label for="password">Password</label>
        <input
          ref={register({
            required: 'required',
            pattern: {
              value: /^[A-Z0-9._]{6,15}$/i,
              message: 'invalid password'
            }
          })}
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Error>{errors.password && errors.password.message}</Error>
      </InputFormWrapper>
      <NavLink to={RECOVERY}>
        <Link>Forgot password</Link>
      </NavLink>
      <br />
      <Button type="submit">Log in</Button>

      <NavLink to={REGISTR}>
        <Transfer>Need an account?</Transfer>
      </NavLink>
    </form>
  );
}

export default LoginForm;
