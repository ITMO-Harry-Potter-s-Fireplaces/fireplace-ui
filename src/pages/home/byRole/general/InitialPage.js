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
import {getFireplaces, del} from '../../../../actions/userActions';
import {LOGIN} from '../../../../constants/routes';
import * as roles from '../../../../constants/roles'
function InitialPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const token = Cookies.get('token');
    dispatch(getFireplaces(token));
  }, []);

  const signOut = () => {
    Cookies.remove('token');
    Cookies.remove('isLoggedIn');
    dispatch(del());
    history.push(LOGIN);
  };

  return (
    <>
      <LoginWrapper>
        <CloudWrapper>
          <BackImage src={`${process.env.PUBLIC_URL}/image/hh1.png`} timeAnimation="40s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/cloud-2.png`} timeAnimation="100s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/cloud.png`} timeAnimation="70s" />
          <BackImage src={`${process.env.PUBLIC_URL}/image/hh1.png`} timeAnimation="60s" />
        </CloudWrapper>
        <Header>
          # Главная страница {user && user.role && `(для роли ${roles.rusRole(user.role)})`}{' '}
          <Button
            style={{marginLeft: '10px', height: '30px'}}
            onClick={() => signOut()}
            variant="contained"
            color="primary">
            Выйти
          </Button>
        </Header>
        <Switch>
          <Route exact path={'/initial'}>
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
              <Button
                onClick={() => history.push('/home/list')}
                style={{height: '30px', marginRight: '10px', marginTop: '30px'}}
                variant="contained"
                color="primary">
                Мои заявки
              </Button>
              {user && user.role && user.role === 'MODERATOR' && (
                <Button
                  onClick={() => history.push('/home/listall')}
                  style={{height: '30px', marginRight: '10px', marginTop: '30px'}}
                  variant="contained"
                  color="primary">
                  Посмотреть полученные заявки
                </Button>
              )}
              {user && user.role && (user.role === 'MODERATOR' || user.role === 'ADMIN') && (
                <Button
                  onClick={() => history.push('/home/listOfAllUsers')}
                  style={{height: '30px', marginRight: '10px', marginTop: '30px'}}
                  variant="contained"
                  color="primary">
                  Посмотреть пользователей
                </Button>
              )}
              {user && user.role && user.role === 'MINISTER' && (
                <Button
                  onClick={() => history.push('/home/listall')}
                  style={{height: '30px', marginRight: '10px', marginTop: '30px'}}
                  variant="contained"
                  color="primary">
                  Посмотреть перемещения
                </Button>
              )}
              {user && user.role && user.role === 'MINISTER' && (
                <Button
                  onClick={() => history.push('/home/fireplaces')}
                  style={{height: '30px', marginRight: '10px', marginTop: '30px'}}
                  variant="contained"
                  color="primary">
                  Show fireplaces
                </Button>
              )}



            </LoginFormWrapper>
          </Route>
        </Switch>
      </LoginWrapper>
    </>
  );
}

export default InitialPage;
