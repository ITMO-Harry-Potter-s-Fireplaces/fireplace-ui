import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {makeStyles} from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Cookies from 'js-cookie';
import useActions from '../../../../../hooks/useAction';
import {LoginFormWrapper, Logo, TableWrapper, Text} from '../UserPage.styles';
import * as userActions from '../../../../../actions/userActions';
import {Button} from '@material-ui/core';
import * as statuses from '../../../../../constants/statuses';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxHeight: 400
  }
});


function ClaimsList() {
  const classes = useStyles();
  const claimsList = useSelector(state => state.user.claimsList);
  const dispatch = useDispatch();
  const [action] = useActions([userActions.getCurrentClaims]);

  useEffect(() => {
    action(Cookies.get('token'));
    const interval = setInterval(() => {
      action(Cookies.get('token'));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const cancelClaim = (claimId, cancel) => {
    dispatch(userActions.cancelClaim(Cookies.get('token'), claimId, cancel));
  };

  return (
    <div>
      <LoginFormWrapper style={{ minWidth: 1200}}>
        <Logo src={`${process.env.PUBLIC_URL}/image/logo.png`} />
        <Text>Заявки текущего пользователя</Text>
        {claimsList && claimsList.length > 0 && (
          <TableWrapper>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">ID заявки</TableCell>
                    <TableCell align="right">Время создания</TableCell>
                    <TableCell align="right">Время изменения</TableCell>
                    <TableCell align="right">Статус</TableCell>
                    <TableCell align="right">Пункт отправления</TableCell>
                    <TableCell align="right">Дата отправления</TableCell>
                    <TableCell align="right">Пункт прибытия</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claimsList.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.created}</TableCell>
                      <TableCell align="right">{row.modified}</TableCell>
                      <TableCell align="left">
                        {statuses.rusStatus(row.status)}
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyItems: 'center'
                          }}>
                          {row.status === 'APPROVED' && (
                            <>
                              <Button
                                onClick={() => cancelClaim(row.id, false)}
                                style={{height: '30px', marginBottom: '10px'}}
                                variant="contained"
                                color="primary">
                                Complete
                              </Button>
                            </>
                          )}
                          {row.status !== 'COMPLETED' &&
                            row.status !== 'CANCELLED' &&
                            row.status !== 'REJECTED' && (
                              <Button
                                onClick={() => cancelClaim(row.id, true)}
                                style={{height: '30px'}}
                                variant="contained"
                                color="red">
                                Cancel
                              </Button>
                            )}
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        широта: {(row.departure && row.departure.lat) || 'не задано'} <br />
                        долгота: {(row.departure && row.departure.lng) || 'не задано'}
                      </TableCell>
                      <TableCell align="left">{row.travelDate || 'не задано'}</TableCell>
                      <TableCell align="left">
                        широта: {(row.arrival && row.arrival.lat) || 'не задано'} <br />
                        долгота: {(row.arrival && row.arrival.lng) || 'не задано'}
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

ClaimsList.propTypes = {};

export default ClaimsList;
