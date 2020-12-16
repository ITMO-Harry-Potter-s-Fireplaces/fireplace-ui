import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import {REGISTR, HOME} from '../constants/routes';
import {loginUser, LOGIN_SUCCESS} from '../actions/loginActions';
import useActions from '../hooks/useAction';
import {Button, InputFormWrapper, Error, Transfer, NavLinkWrapper} from './FormsStyles';

function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const {handleSubmit, register, errors} = useForm();
  const [submitAction] = useActions([loginUser]);
  const history = useHistory();

  const authToken = Cookies.get('token');

  let isLoginSuccess = useSelector(state => state.login.type) === LOGIN_SUCCESS;

  const submit = () => {
    if (login !== '' && password !== '') {
      submitAction(login, password);
    }
  };

  useEffect(() => {
    if (authToken && authToken !== '' && isLoginSuccess) {
      history.push(HOME);
    }
  }, [authToken, isLoginSuccess]);

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
          value={login}
          name="login"
          onChange={e => setLogin(e.target.value)}
        />
        <Error>{errors.login && errors.login.message}</Error>
      </InputFormWrapper>
      <br />
      <InputFormWrapper>
        <label for="password">Password</label>
        <input
          value={password}
          ref={register({
            required: 'required',
            pattern: {
              value: /^[A-Z0-9._]{3,15}$/i,
              message: 'invalid password'
            }
          })}
          type="password"
          name="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Error>{errors.password && errors.password.message}</Error>
      </InputFormWrapper>
      <br />
      <Button type="submit">Log in</Button>
      <NavLinkWrapper>
        <NavLink to={REGISTR}>
          <Transfer>Need an account?</Transfer>
        </NavLink>
      </NavLinkWrapper>
    </form>
  );
}

export default LoginForm;
