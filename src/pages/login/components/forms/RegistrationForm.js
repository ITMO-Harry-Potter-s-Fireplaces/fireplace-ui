import React, {useEffect} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {useForm, Controller} from 'react-hook-form';
import {useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import ReactDatePicker from 'react-datepicker';
import {LOGIN, HOME} from '../../../../constants/routes';
import {registerUser, REGISTER_SUCCESS} from '../../../../actions/loginActions';
import useActions from '../../../../hooks/useAction';
import 'react-datepicker/dist/react-datepicker.css';

import {Button, InputFormWrapper, Error, Transfer, NavLinkWrapper} from './FormsStyles';

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
        <Error>{errors.email && errors.email.message}</Error>
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
      <br />
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
      <br />
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
      <br />
      <InputFormWrapper>
        <label htmlFor="surname">Click to choose your date of birth</label>
        <Controller
          as={ReactDatePicker}
          control={control}
          valueName="selected" // DateSelect value's name is selected
          onChange={([selected]) => selected}
          name="ReactDatepicker"
          className="input"
        />
        <Error>{errors.surname && errors.surname.message}</Error>
      </InputFormWrapper>
      <br />
      <Button data-testid="signupbtn" type="submit">Sign up</Button>
      <NavLinkWrapper>
        <NavLink to={LOGIN}>
          <Transfer>Have an account?</Transfer>
        </NavLink>
      </NavLinkWrapper>
    </form>
  );
}

export default RegistrationForm;
