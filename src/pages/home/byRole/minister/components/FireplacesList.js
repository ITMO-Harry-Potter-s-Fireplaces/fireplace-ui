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
import {LoginFormWrapper, Logo, Text} from '../../admin/AdminPage.styles';
import * as userActions from '../../../../../actions/userActions';
import CreateFireplaceModal from './CreateFireplaceModal';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function FireplacesList() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [action] = useActions([userActions.getFireplaces]);
  const isModalShown = useSelector(state => state.user.isFireplaceModal);

  const fireplacesList = useSelector(state => state.user.fireplacesList);

  useEffect(() => {
    action(Cookies.get('token'));
    const interval = setInterval(() => {
      action(Cookies.get('token'));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <LoginFormWrapper>
        <Logo src={`${process.env.PUBLIC_URL}/image/logo.png`} />
        <div>
          <Text>All fireplaces</Text>
          <Button
            onClick={() => dispatch(userActions.showFireplaceModal())}
            style={{height: '30px', maxWidth: '176px', marginRight: '10px'}}
            variant="contained"
            color="primary">
            Create fireplace
          </Button>
        </div>
        {fireplacesList && fireplacesList.length > 0 && (
          <div>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">id</TableCell>
                    <TableCell align="right">lat</TableCell>
                    <TableCell align="right">lng</TableCell>
                    <TableCell align="right">description</TableCell>
                    <TableCell align="right">action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fireplacesList.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.lat}</TableCell>
                      <TableCell align="right">{row.lng}</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">
                        <Button
                          onClick={() =>
                            dispatch(userActions.deleteFireplace(Cookies.get('token'), row.id))
                          }
                          style={{height: '30px', maxWidth: '176px'}}
                          variant="contained"
                          color="primary">
                          DELETE
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </LoginFormWrapper>
      <CreateFireplaceModal isOpen={isModalShown} />
    </div>
  );
}

FireplacesList.propTypes = {};

export default FireplacesList;
