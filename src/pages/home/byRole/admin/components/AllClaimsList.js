import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {makeStyles} from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import {Button} from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Cookies from 'js-cookie';
import useActions from '../../../../../hooks/useAction';
import {LoginFormWrapper, Logo, Text} from '../AdminPage.styles';
import * as userActions from '../../../../../actions/userActions';
import {useHistory} from 'react-router-dom';
import * as statuses from '../../../../../constants/statuses';
import {TableWrapper} from '../../user/UserPage.styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function AllClaimsList() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [action] = useActions([userActions.getAllClaims]);
  const claimsList = useSelector(state => state.user.claimsList);

  useEffect(() => {
    action(Cookies.get('token'));
    const interval = setInterval(() => {
      action(Cookies.get('token'));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const approveClaim = (claimId, approve) => {
    dispatch(userActions.approveClaim(Cookies.get('token'), claimId, approve));
  };

  return (
    <div>
      <LoginFormWrapper>
        <Logo src={`${process.env.PUBLIC_URL}/image/logo.png`} />
        <Text>Полученные заявки</Text>
        {claimsList && claimsList.length > 0 && (
          <TableWrapper>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table" >
                <TableHead>
                  <TableRow>
                  <TableCell align="right">ID заявки</TableCell>
                    <TableCell align="right">Время создания</TableCell>
                    <TableCell align="right">Время изменения</TableCell>
                    <TableCell align="right">Статус</TableCell>
                    <TableCell align="right">Пункт отправления</TableCell>
                    <TableCell align="right">Время отправления</TableCell>
                    <TableCell align="right">Пункт прибытия</TableCell>
                    <TableCell align="right">ID пользователя</TableCell>
                    <TableCell align="right">Имя пользователя</TableCell>
                    <TableCell align="right">Количество жалоб</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claimsList
                    .sort((a, b) => (a.reportsCount > b.reportsCount ? -1 : 1))
                    .map(row => (
                      <TableRow
                        onClick={() => history.push(`/home/editclaim/${row.id}`)}
                        key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="right">{row.created}</TableCell>
                        <TableCell align="right">{row.modified}</TableCell>
                        <TableCell align="right">
                        {statuses.rusStatus(row.status)}
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyItems: 'center'
                            }}>
                            {row.status === 'CREATED' && (
                              <>
                                <Button
                                  onClick={() => approveClaim(row.id, true)}
                                  style={{height: '30px', marginBottom: '10px'}}
                                  variant="contained"
                                  color="primary">
                                  Approve
                                </Button>
                                <Button
                                  onClick={() => approveClaim(row.id, false)}
                                  style={{height: '30px'}}
                                  variant="contained"
                                  color="red">
                                  Cancel
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          широта: {(row.departure && row.departure.lat) || 'не задано'} <br />
                          долгота: {(row.departure && row.departure.lng) || 'не задано'}
                        </TableCell>
                        <TableCell align="left">{row.departureTime || 'не задано'}</TableCell>
                        <TableCell align="left">
                          широта: {(row.arrival && row.arrival.lat) || 'не задано'} <br />
                          долгота: {(row.arrival && row.arrival.lng) || 'не задано'}
                        </TableCell>
                        {row.user && (
                          <>
                            <TableCell align="left">{row.user.id}</TableCell>
                            <TableCell align="left">
                              {row.user.surname} {row.user.name} {row.user.middleName}
                            </TableCell>
                          </>
                        )}
                        <TableCell align="left">
                          {row.reportsCount}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TableWrapper>
        )}
      </LoginFormWrapper>
    </div>
  );
}

AllClaimsList.propTypes = {};

export default AllClaimsList;
