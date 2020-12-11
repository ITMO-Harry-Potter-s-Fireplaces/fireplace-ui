import React, {useState, useEffect} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import {LOGIN, HOME} from '../constants/routes';
import {registerUser, REGISTER_SUCCESS} from '../actions/loginActions';
import useActions from '../hooks/useAction';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {Button, InputFormWrapper, Error, Transfer} from './FormsStyles';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';

const defaultValues = {
  eventDate: null
};

function RegistrationForm() {
  const {handleSubmit, register, errors, control} = useForm({defaultValues});
  const history = useHistory();
  // Alternative bindActionCreators
  const [submitAction] = useActions([registerUser]);

  const authToken = Cookies.get('token');

  let isRegisterSuccess = useSelector(state => state.login.type) === REGISTER_SUCCESS;

  useEffect(() => {
    if (authToken && authToken !== '' && isRegisterSuccess) {
      history.push(HOME);
    }
  }, [authToken, isRegisterSuccess]);

  const submit = data => {
    console.log(JSON.stringify(data));
    submitAction(
      data.email,
      data.password,
      data.name,
      data.surname,
      data.middleName,
      data.ReactDatepicker
    );
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <InputFormWrapper>
        <label htmlFor="email">Enter your email</label>
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
        <Error>{errors.login && errors.login.message}</Error>
      </InputFormWrapper>
      <br />
      <InputFormWrapper>
        <label htmlFor="password">Create the password(6-15 symbols)</label>
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
        />
        <Error>{errors.password && errors.password.message}</Error>
      </InputFormWrapper>
      <br />
      <InputFormWrapper>
        <label htmlFor="name">Enter your name</label>
        <input
          ref={register({
            required: 'required'
          })}
          type="name"
          name="name"
        />
        <Error>{errors.name && errors.name.message}</Error>
      </InputFormWrapper>
      <InputFormWrapper>
        <label htmlFor="middleName">Enter your middle name</label>
        <input
          ref={register({
            required: 'required'
          })}
          type="middleName"
          name="middleName"
        />
        <Error>{errors.middleName && errors.middleName.message}</Error>
      </InputFormWrapper>
      <InputFormWrapper>
        <label htmlFor="surname">Enter your surname</label>
        <input
          ref={register({
            required: 'required'
          })}
          type="surname"
          name="surname"
        />
        <Error>{errors.surname && errors.surname.message}</Error>
      </InputFormWrapper>
      <InputFormWrapper>
        <label htmlFor="surname">Choose your date of birth</label>
        <Controller
          as={ReactDatePicker}
          control={control}
          valueName="selected" // DateSelect value's name is selected
          onChange={([selected]) => selected}
          name="ReactDatepicker"
          className="input"
          placeholderText="Select date"
        />
        <Error>{errors.surname && errors.surname.message}</Error>
      </InputFormWrapper>
      <br />
      <Button type="submit">Sign up</Button>
      <NavLink to={LOGIN}>
        <Transfer>Have an account?</Transfer>
      </NavLink>
    </form>
  );
}

export default RegistrationForm;
