import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Cookies from 'js-cookie';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Route, Switch, useHistory} from 'react-router-dom';
import {Button} from '@material-ui/core';
import {LOGIN} from '../../../../constants/routes';
import useActions from '../../../../hooks/useAction';
import AllClaimsList from './components/AllClaimsList';

import {
  LoginWrapper,
  LoginFormWrapper,
  BackImage,
  Logo,
  CloudWrapper,
  Text,
  Header
} from './AdminPage.styles';
import {
  del,
  deactivateUser,
  DELETE_USER__SUCCESS,
  getAllUsers
} from '../../../../actions/userActions';
import CreateFly from '../../components/CreateFly';
import ClaimsList from '../user/components/ClaimsList';
import { TableWrapper } from '../user/UserPage.styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function AdminPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [getAllUsersAction] = useActions([getAllUsers]);

  const listOfUsers = useSelector(state => state.user.usersList);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token && token.length > 0) {
      getAllUsersAction(token);
    }
  }, []);

  const signOut = () => {
    console.log('press');
    Cookies.remove('token');
    Cookies.remove('isLoggedIn');
    dispatch(del());
    history.push(LOGIN);
  };

  const dUser = userId => {
    const token = Cookies.get('token');

    dispatch(deactivateUser(token, userId)).then(e => {
      if (e.type && e.type === DELETE_USER__SUCCESS) {
        getAllUsersAction(token);
      }
    });
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
          <div style={{marginRight: '10px'}}>роль ADMIN</div>
          <Button
            onClick={() => history.push('/home')}
            style={{height: '30px', marginRight: '10px'}}
            variant="contained"
            color="primary">
            Оставить заявку
          </Button>
          <Button
            onClick={() => history.push('/home/list')}
            style={{height: '30px', marginRight: '10px'}}
            variant="contained"
            color="primary">
            Посмотреть мои заявки
          </Button>
          <Button
            onClick={() => history.push('/home/listOfAllUsers')}
            style={{height: '30px', marginRight: '10px'}}
            variant="contained"
            color="primary">
            Посмотреть пользователей
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
        <Switch>
          <Route exact path="/home/listOfAllUsers">
            <LoginFormWrapper>
              <Logo src={`${process.env.PUBLIC_URL}/image/logo.png`} />
              <Text>Список всех пользователей</Text>
              {listOfUsers && listOfUsers.length > 0 && (
                <TableWrapper>
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="right">ID пользователя</TableCell>
                          <TableCell align="right">email</TableCell>
                          <TableCell align="right">Имя</TableCell>
                          <TableCell align="right">Фамилия</TableCell>
                          <TableCell align="right">Дата рождения</TableCell>
                          <TableCell align="right">Пользователь активен?</TableCell>
                          <TableCell align="right">Роль</TableCell>
                          <TableCell align="right">Блокировка</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {listOfUsers.map(row => (
                          <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                              {row.id}
                            </TableCell>
                            <TableCell align="right">{row.email}</TableCell>
                            <TableCell align="right">{row.name || 'unset'}</TableCell>
                            <TableCell align="right">{row.surname || 'unset'}</TableCell>
                            <TableCell align="right">{row.dateOfBirth || 'unset'}</TableCell>
                            <TableCell align="right">
                              {row.active ? 'true' : 'false' || 'unset'}
                            </TableCell>
                            <TableCell align="right">{row.role || 'unset'}</TableCell>{' '}
                            <TableCell align="right">
                              {row.active && row.role !== 'ADMIN' && row.role !== 'MODERATOR' && (
                                <Button
                                  onClick={() => dUser(row.id)}
                                  style={{height: '30px', marginRight: '10px'}}
                                  variant="contained"
                                  color="primary">
                                  Заблокировать
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TableWrapper>
              )}
            </LoginFormWrapper>
          </Route>
          <Route path="/home/list/all">
            <AllClaimsList />
          </Route>
        </Switch>
      </LoginWrapper>
    </>
  );
}

export default AdminPage;
