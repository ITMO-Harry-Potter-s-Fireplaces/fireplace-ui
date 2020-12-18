import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import {useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';
import {
  InputFormWrapper,
  Error,
  Button,
  Transfer,
  NavLinkWrapper
} from '../../../../login/components/forms/FormsStyles';

import {
  createClaim,
  createFireplace,
  CREATE_CLAIM_SUCCESS,
  CREATE_FIREPLACE_SUCCESS,
  hideFireplaceModal
} from '../../../../../actions/userActions';

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

function CreateFireplaceModal({isOpen}) {
  const {handleSubmit, register, errors} = useForm();

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const selectedFireplace = useSelector(state => state.user.selectedModalItem);

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

  const submit = data => {
    console.log(JSON.stringify(data));
    dispatch(createFireplace(Cookies.get('token'), data.lat, data.lng, data.description)).then(
      e => {
        if (e.type && e.type === CREATE_FIREPLACE_SUCCESS) {
          setSnackbarOpen(true);
          setSnackbarMessage('success');
          dispatch(hideFireplaceModal());
        } else {
          setSnackbarOpen(true);
          setSnackbarMessage(JSON.stringify(e.error));
        }
      }
    );
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isOpen}
        onClose={() => dispatch(hideFireplaceModal())}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">Create new fireplace</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(submit)}>
            <InputFormWrapper>
              <label htmlFor="lat">Enter latitude</label>
              <input
                ref={register({
                  required: 'required'
                })}
                name="lat"
              />
              <Error>{errors.lat && errors.lat.message}</Error>
            </InputFormWrapper>
            <br />
            <InputFormWrapper>
              <label htmlFor="lng">Enter longitude</label>
              <input
                ref={register({
                  required: 'required'
                })}
                name="lng"
              />
              <Error>{errors.lng && errors.lng.message}</Error>
            </InputFormWrapper>
            <br />
            <InputFormWrapper>
              <label htmlFor="description">Enter description</label>
              <input
                ref={register({
                  required: 'required'
                })}
                type="name"
                name="description"
              />
              <Error>{errors.description && errors.description.message}</Error>
            </InputFormWrapper>
            <Button type="submit">Create</Button>
          </form>
        </DialogContent>
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

export default CreateFireplaceModal;
