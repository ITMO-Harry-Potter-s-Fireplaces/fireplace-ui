import React from 'react';
import Cookies from 'js-cookie';
import {useForm} from 'react-hook-form';
import Dialog from '@material-ui/core/Dialog';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch} from 'react-redux';
import {InputFormWrapper, Error, Button} from '../../../../login/components/forms/FormsStyles';
import {
  createFireplace,
  CREATE_FIREPLACE_SUCCESS,
  hideFireplaceModal
} from '../../../../../actions/userActions';

function CreateFireplaceModal({isOpen}) {
  const {handleSubmit, register, errors} = useForm();
  const dispatch = useDispatch();

  const [isSnackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
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
