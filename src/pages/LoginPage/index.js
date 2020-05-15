import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {LOGIN, REGISTR, RECOVERY} from '../../constants/routes';
import {
  LoginWrapper,
  LoginFormWrapper,
  BackImage,
  Logo,
  CloudWrapper,
  Text
} from './LoginPageStyles';
import LoginForm from '../../forms/LoginForm';
import RegistrationForm from '../../forms/RegistrationForm';
import PasswordRecoveryForm from '../../forms/PasswordRecoveryForm';

function AuthenticationPage() {
  return (
    <LoginWrapper>
      <CloudWrapper>
        <BackImage src={`${process.env.PUBLIC_URL}/image/hh1.png`} timeAnimation="40s" />
        <BackImage src={`${process.env.PUBLIC_URL}/image/cloud-2.png`} timeAnimation="100s" />
        <BackImage src={`${process.env.PUBLIC_URL}/image/cloud.png`} timeAnimation="70s" />
        <BackImage src={`${process.env.PUBLIC_URL}/image/hh1.png`} timeAnimation="60s" />
      </CloudWrapper>
      <LoginFormWrapper>
        <Logo src={`${process.env.PUBLIC_URL}/image/logo.png`} />
        <Text>Welcome to Fireplace!</Text>
        <Switch>
          <Route path={LOGIN} component={LoginForm} />
          <Route path={REGISTR} component={RegistrationForm} />
          <Route path={RECOVERY} component={PasswordRecoveryForm} />
        </Switch>
      </LoginFormWrapper>
    </LoginWrapper>
  );
}

export default AuthenticationPage;
