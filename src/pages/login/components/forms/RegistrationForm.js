import React, {useEffect, useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ReactDatePicker from 'react-datepicker';
import {LOGIN, INITIAL} from '../../../../constants/routes';
import {registerUser, REGISTER_SUCCESS, REGISTER_FAIL} from '../../../../actions/loginActions';
import useActions from '../../../../hooks/useAction';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import {Button, InputFormWrapper, Error, Transfer, NavLinkWrapper} from './FormsStyles';

registerLocale('ru', ru);

const defaultValues = {
  eventDate: null
};

function RegistrationForm() {
  const {handleSubmit, register, errors, control} = useForm({defaultValues});
  const history = useHistory();
  const [helpIsHidden, setHelpHidden] = useState(false);
  // Alternative bindActionCreators
  const [submitAction] = useActions([registerUser]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const authToken = Cookies.get('token');
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  let isRegisterSuccess = useSelector(state => state.login.type) === REGISTER_SUCCESS;

  useEffect(() => {
    if (authToken && authToken !== '' && isRegisterSuccess) {
      history.push(INITIAL);
    }
  }, [authToken, isRegisterSuccess]);

  const submit = data => {
    console.log(JSON.stringify(data));
    submitAction(data.email, data.password, data.name, data.surname, data.ReactDatepicker).then(e => {
      if (e && e.type && e.type === REGISTER_FAIL) {
        setMessage(e.error.message);
        setOpen(true);
      } 
      else {
        setMessage('Успешная регистрация и авторизация. Перенаправление на главную страницу...');
        setTimeout(() => {
          history.push('/initial');
        }, 3000);
      }
      console.log(e);
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <InputFormWrapper>
        <label htmlFor="email">Введите адрес эл. почты</label>
        <input
          ref={register({
            required: 'required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'invalid email address'
            }
          })}
          name="email"
        />
        <Error>{errors.email && errors.email.message}</Error>
      </InputFormWrapper>
      <br />
      <div>
        <InputFormWrapper>
          <label htmlFor="password">Введите пароль</label>
          <input
            ref={register({
              required: 'required',
              pattern: {
                value: /^.*$/g,
                message: 'invalid password'
              }
            })}
            type="password"
            name="password"
          />
          <Error>{errors.password && errors.password.message}</Error>
          <Button
            data-testid="signupbtn"
            onClick={() => setHelpHidden(!helpIsHidden)}
            type="button">
            {!helpIsHidden ? '?' : 'скрыть подсказку'}
          </Button>
        </InputFormWrapper>
        {helpIsHidden && (
          <div>
            (минимальная длина – 10 символов, обязательно использовать цифры и буквы в верхнем и
            нижнем регистрах)
          </div>
        )}
      </div>
      <br />
      <InputFormWrapper>
        <label htmlFor="name">Введите имя</label>
        <input
          ref={register({
            required: 'required'
          })}
          type="name"
          name="name"
        />
        <Error>{errors.name && errors.name.message}</Error>
      </InputFormWrapper>
      <br />
      <InputFormWrapper>
        <label htmlFor="surname">Введите фамилию</label>
        <input
          ref={register({
            required: 'required'
          })}
          type="surname"
          name="surname"
        />
        <Error>{errors.surname && errors.surname.message}</Error>
      </InputFormWrapper>
      <br />
      <InputFormWrapper>
        <label htmlFor="surname">Дата рождения:</label>
        <Controller
          as={ReactDatePicker}
          control={control}
          valueName="selected" // DateSelect value's name is selected
          onChange={([selected]) => selected}
          name="ReactDatepicker"
          className="input"
          dateFormat="dd.MM.yyyy"
          locale='ru'
          maxDate={new Date()}
        />
      </InputFormWrapper>
      <br />
      <Button data-testid="signupbtn" type="submit">
        Зарегистрироваться
      </Button>
      <NavLinkWrapper>
        <NavLink to={LOGIN}>
          <Button data-testid="signupbtn" type="submit">
            Уже зарегистрированы?
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

export default RegistrationForm;
