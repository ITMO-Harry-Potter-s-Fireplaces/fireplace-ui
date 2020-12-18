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

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function AllClaimsList() {
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

  useEffect(() => {
    console.log('update claims list');
  }, [claimsList]);

  const approveClaim = (claimId, approve) => {
    dispatch(userActions.approveClaim(Cookies.get('token'), claimId, approve)).then(e => {
      if (e.type && e.type === userActions.APPROVE_CLAIM_SUCCESS) {
        console.log('fine');
        // dispatch(userActions.getAllClaims());
      } else {
        console.log('problem');
      }
    });
  };

  return (
    <div>
      <LoginFormWrapper>
        <Logo src={`${process.env.PUBLIC_URL}/image/logo.png`} />
        <Text>All claims</Text>
        {claimsList && claimsList.length > 0 && (
          <div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">id</TableCell>
                    <TableCell align="right">created</TableCell>
                    <TableCell align="right">modified</TableCell>
                    <TableCell align="right">status</TableCell>
                    <TableCell align="right">depature</TableCell>
                    <TableCell align="right">departure time</TableCell>
                    <TableCell align="right">arrival</TableCell>
                    <TableCell align="right">user id</TableCell>
                    <TableCell align="right">user name</TableCell>
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
                      <TableCell align="right">
                        {row.status}
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
                        lat: {(row.departure && row.departure.lat) || 'unset'} <br />
                        lng: {(row.departure && row.departure.lng) || 'unset'}
                      </TableCell>
                      <TableCell align="left">{row.departureTime || 'unset'}</TableCell>
                      <TableCell align="left">
                        lat: {(row.arrival && row.arrival.lat) || 'unset'} <br />
                        lng: {(row.arrival && row.arrival.lng) || 'unset'}
                      </TableCell>
                      <TableCell align="left">{row.user.id}</TableCell>
                      <TableCell align="left">
                        {row.user.surname} {row.user.name} {row.user.middleName}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </LoginFormWrapper>
    </div>
  );
}

AllClaimsList.propTypes = {};

export default AllClaimsList;
