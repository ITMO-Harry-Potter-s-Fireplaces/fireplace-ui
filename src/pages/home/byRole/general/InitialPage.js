import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import {useHistory, Switch, Route} from 'react-router-dom';
import {Button} from '@material-ui/core';
import {
  LoginWrapper,
  LoginFormWrapper,
  BackImage,
  Logo,
  CloudWrapper,
  Header
} from '../user/UserPage.styles';
import {getFireplaces} from '../../../../actions/userActions';

function InitialPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const token = Cookies.get('token');
    dispatch(getFireplaces(token));
  }, []);

  return (
    <>
      <LoginWrapper>
        <CloudWrapper>
          <BackImage src={`${process.env.PUBLIC_URL}/image/hh1.png`} timeAnimation="40s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/cloud-2.png`} timeAnimation="100s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/cloud.png`} timeAnimation="70s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/hh1.png`} timeAnimation="60s" />
        </CloudWrapper>
        <Header>Главная страница {user && user.role && `(для роли ${user.role})`} </Header>
        <Switch>
          <Route exact path="/initial">
            <LoginFormWrapper>
              <Logo src={`${process.env.PUBLIC_URL}/image/logo.png`} />
              <Button
                onClick={() => history.push('/home')}
                style={{height: '30px', marginRight: '10px'}}
                variant="contained"
                color="primary">
                Создать новый полет
              </Button>
              <Button
                onClick={() => history.push('/home')}
                style={{height: '30px', marginRight: '10px', marginTop: '30px'}}
                variant="contained"
                color="primary">
                Создать заявку
              </Button>
            </LoginFormWrapper>
          </Route>
        </Switch>
      </LoginWrapper>
      );
    </>
  );
}

export default InitialPage;
