import React, { useState } from 'react';
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from 'react-redux';
import {Button} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import {useHistory} from 'react-router-dom';
import {LoginFormWrapper, Logo, Text} from '../byRole/user/UserPage.styles';
import MapModal from './MapModal';
import * as actions from '../../../actions/userActions';
import DatePicker from  "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .MuiInputBase-root.Mui-disabled {
    width: 400px;
  }
`;

function CreateFly(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const isModal1Shown = useSelector(state => state.user.isModal1);
  const startingPoint = useSelector(state => state.user.startingPoint);
  const finalPoint = useSelector(state => state.user.finalPoint);
  const [travelDate, changeTravelDate] = useState(new Date());
  const isModal2Shown = useSelector(state => state.user.isModal2);
  const classes = useStyles();
  const [isSnackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };

  const sendRequest = () => {
    dispatch(actions.createClaim(Cookies.get('token'), startingPoint, finalPoint, travelDate)).then(e => {
      if (e.type && e.type === actions.CREATE_CLAIM_SUCCESS) {
        setSnackbarOpen(true);
        setSnackbarMessage('Успешная подача заявки, ожидайте переадресации 3сек');
        dispatch(actions.clearAllStPoints());
        setTimeout(() => {
          history.push('/home/list');
        }, 3000);
        // dispatch(hideModal());
      } else {
        setSnackbarOpen(true);
        setSnackbarMessage(JSON.stringify(e.error));
      }
    });
  };

  return (
    <LoginFormWrapper>
      <Logo src={`${process.env.PUBLIC_URL}/image/logo.png`} />
      <Text>Создание заявки</Text>
      <form className={classes.root} noValidate autoComplete="off">
        <InputWrapper>
          <TextField
            disabled
            id="standard-disabled"
            label="Координаты нач. пункта"
            defaultValue="не заданы"
            value={`${
              startingPoint ? `lat: ${startingPoint.lat},lng: ${startingPoint.lng}` : `не заданы`
            }`}
          />
          <Button
            style={{height: '30px'}}
            onClick={() => dispatch(actions.setModal1(!isModal1Shown))}
            variant="contained"
            color="primary">
            Выбрать точку отправления
          </Button>
        </InputWrapper>
        <InputWrapper>
          <TextField
            disabled
            id="standard-disabled"
            label="Координаты кон. пункта"
            defaultValue="Hello World"
            value={`${finalPoint ? `lat: ${finalPoint.lat},lng: ${finalPoint.lng}` : `не заданы`}`}
          />
          <Button
            style={{height: '30px'}}
            onClick={() => dispatch(actions.setModal2(!isModal2Shown))}
            variant="contained"
            color="primary">
            Выбрать точку прибытия
          </Button>
        </InputWrapper>

        <InputWrapper>
          <TextField
            disabled
            id="standard-disabled"
            label="Дата полёта"
            defaultValue="Hello World"
            value={("0" + (travelDate.getDate())).slice(-2) + '.' + ("0" + (travelDate.getMonth() + 1)).slice(-2) + '.' + travelDate.getFullYear()}
          />
      <DatePicker locale='ru'
      selected={travelDate}
      onChange={date => changeTravelDate(date)}
      dateFormat="dd.MM.yyyy"
      minDate={new Date()}
      />
        </InputWrapper>

        <Button
          style={{height: '30px', marginTop: '50px'}}
          onClick={() => sendRequest()}
          variant="contained"
          disabled={!finalPoint || !startingPoint}
          color="primary">
          Опубликовать
        </Button>
      </form>
      <MapModal
        point={startingPoint}
        setAction={(lat, lng) => dispatch(actions.setStartingPoint(lat, lng))}
        hideAction={() => dispatch(actions.setModal1(false))}
        isOpen={isModal1Shown}
      />
      <MapModal
        point={finalPoint}
        setAction={(lat, lng) => dispatch(actions.setFinalPoint(lat, lng))}
        hideAction={() => dispatch(actions.setModal2(false))}
        isOpen={isModal2Shown}
      />
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
    </LoginFormWrapper>
  );
}

CreateFly.propTypes = {};

export default CreateFly;
