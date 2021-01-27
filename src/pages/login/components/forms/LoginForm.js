import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {loginUser, LOGIN_FAIL, LOGIN_SUCCESS} from '../../../../actions/loginActions';
import {REGISTR, HOME} from '../../../../constants/routes';
import useActions from '../../../../hooks/useAction';
import {Button, InputFormWrapper, Error, Transfer, NavLinkWrapper} from './FormsStyles';

function LoginForm() {
  const {handleSubmit, register, errors} = useForm();
  const [submitAction] = useActions([loginUser]);
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const authToken = Cookies.get('token');

  let isLoginSuccess = useSelector(state => state.login.type) === LOGIN_SUCCESS;

  const submit = data => {
    if (data.login !== '' && data.password !== '') {
      submitAction(data.login, data.password).then(e => {
        if (e.type && e.type === LOGIN_FAIL) {
          setMessage(e.error.message);
          setOpen(true);
        }
        console.log(e);
      });
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
        <label htmlFor="login">Логин</label>
        <input
          ref={register({
            required: 'required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address'
            }
          })}
          name="login"
        />
        <Error>{errors.login && errors.login.message}</Error>
      </InputFormWrapper>
      <br />
      <InputFormWrapper>
        <label htmlFor="password">Пароль</label>
        <input
          ref={register({
            required: 'required',
            pattern: {
              value: /^[A-Z0-9._]{3,15}$/i,
              message: 'invalid password'
            }
          })}
          type="password"
          name="password"
        />
        <Error>{errors.password && errors.password.message}</Error>
      </InputFormWrapper>
      <br />
      <Button data-testid="loginbtn" type="submit">
        Log in
      </Button>
      <NavLinkWrapper>
        <NavLink to={REGISTR}>
          <Button data-testid="loginbtn" type="button">
            Регистрация
          </Button>
        </NavLink>
      </NavLinkWrapper>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </form>
  );
}

export default LoginForm;
