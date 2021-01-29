import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import {useHistory, Switch, Route} from 'react-router-dom';
import {Button} from '@material-ui/core';
import {LOGIN} from '../../../../constants/routes';
import {LoginWrapper, BackImage, CloudWrapper, Header} from './UserPage.styles';
import {del, getFireplaces} from '../../../../actions/userActions';
import ClaimsList from './components/ClaimsList';
import CreateFly from '../../components/CreateFly';

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();

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
          <div style={{marginRight: '10px'}}>роль USER</div>
          <Button
            onClick={() => history.push('/home')}
            style={{height: '30px', marginRight: '10px'}}
            variant="contained"
            color="primary">
            Создать заявку
          </Button>
          <Button
            onClick={() => history.push('/home/list')}
            style={{height: '30px', marginRight: '10px'}}
            variant="contained"
            color="primary">
            Мои заявки
          </Button>
          <Button
            style={{height: '30px'}}
            onClick={() => signOut()}
            variant="contained"
            color="primary">
            Выйти
          </Button>
        </Header>
        <Switch>
          <Route exact path="/home">
            <CreateFly />
          </Route>
          <Route path="/home/list">
            <ClaimsList />
          </Route>
        </Switch>
      </LoginWrapper>
    </>
  );
}

export default UserPage;
