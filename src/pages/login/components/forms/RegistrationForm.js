import React, {useEffect, useState} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import ReactDatePicker from 'react-datepicker';
import {LOGIN, INITIAL} from '../../../../constants/routes';
import {registerUser, REGISTER_SUCCESS} from '../../../../actions/loginActions';
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

  const authToken = Cookies.get('token');

  let isRegisterSuccess = useSelector(state => state.login.type) === REGISTER_SUCCESS;

  useEffect(() => {
    if (authToken && authToken !== '' && isRegisterSuccess) {
      history.push(INITIAL);
    }
  }, [authToken, isRegisterSuccess]);

  const submit = data => {
    console.log(JSON.stringify(data));
    submitAction(data.email, data.password, data.name, data.surname, data.ReactDatepicker);
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
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,}$/g,
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
    </form>
  );
}

export default RegistrationForm;
