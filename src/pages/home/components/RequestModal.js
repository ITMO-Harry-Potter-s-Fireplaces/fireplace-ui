import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Cookies from 'js-cookie';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {createClaim, CREATE_CLAIM_SUCCESS, hideModal} from '../../../actions/userActions';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content'
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing(1)
  }
}));

function RequestModal({isOpen}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedFireplace = useSelector(state => state.user.selectedModalItem);
  const fireplaces = useSelector(state => {
    if (selectedFireplace && selectedFireplace.id)
      return state.user.coordList.filter(i => i.id !== selectedFireplace.id);
    return state.user.coordList;
  });

  const [isSnackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const [departureId, setDepartureId] = React.useState('');
  const [arrivalId, setArrivalId] = React.useState('Choose arrival');

  useEffect(() => {
    if (selectedFireplace && selectedFireplace.id) {
      setDepartureId(selectedFireplace.id);
    }
  }, [selectedFireplace]);

  const handleChange = event => {
    setArrivalId(event.target.value);
  };

  const sendRequest = () => {
    dispatch(createClaim(Cookies.get('token'), arrivalId, departureId)).then(e => {
      if (e.type && e.type === CREATE_CLAIM_SUCCESS) {
        setSnackbarOpen(true);
        setSnackbarMessage('success');
        dispatch(hideModal());
      } else {
        setSnackbarOpen(true);
        setSnackbarMessage(JSON.stringify(e.error));
      }
    });
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isOpen}
        onClose={() => dispatch(hideModal())}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">Create new claim</DialogTitle>
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <InputLabel id="demo-simple-select-label">Departure: </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              disabled
              value={departureId}
              onChange={handleChange}>
              {selectedFireplace && (
                <MenuItem key={selectedFireplace.id} value={selectedFireplace.id}>
                  {selectedFireplace.lat} {selectedFireplace.lng}
                </MenuItem>
              )}
            </Select>
            <InputLabel id="demo-simple-select-label">Arrival: </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={arrivalId}
              defaultValue="Choose arrival"
              onChange={handleChange}>
              {fireplaces &&
                fireplaces.length > 0 &&
                fireplaces.map(i => {
                  return (
                    <MenuItem key={i.id} value={i.id}>
                      {i.lat} {i.lng}
                    </MenuItem>
                  );
                })}
            </Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => sendRequest()} color="primary">
            Send the request
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

export default RequestModal;
