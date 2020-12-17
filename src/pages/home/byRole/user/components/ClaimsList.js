import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
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
import {LoginFormWrapper, Logo, Text} from '../UserPage.styles';
import {getCurrentClaims} from '../../../../../actions/userActions';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function ClaimsList() {
  const classes = useStyles();

  const [action] = useActions([getCurrentClaims]);

  useEffect(() => {
    action(Cookies.get('token'));
    const interval = setInterval(() => {
      action(Cookies.get('token'));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const claimsList = useSelector(state => state.user.claimsList);

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
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="left">
                        lat: {(row.departure && row.departure.lat) || 'unset'} <br />
                        lng: {(row.departure && row.departure.lng) || 'unset'}
                      </TableCell>
                      <TableCell align="left">{row.departureTime || 'unset'}</TableCell>
                      <TableCell align="left">
                        lat: {(row.arrival && row.arrival.lat) || 'unset'} <br />
                        lng: {(row.arrival && row.arrival.lng) || 'unset'}
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

ClaimsList.propTypes = {};

export default ClaimsList;
