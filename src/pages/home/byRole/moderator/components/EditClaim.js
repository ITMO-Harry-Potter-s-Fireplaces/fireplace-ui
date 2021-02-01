import React, {useEffect} from 'react';
import Cookies from 'js-cookie';
import Snackbar from '@material-ui/core/Snackbar';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {TableBody, Table, TableRow, TableCell, TableHead, Button, Checkbox} from '@material-ui/core';
import styled from 'styled-components';
import Select from 'react-select';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import * as actions from '../../../../../actions/userActions';
import {InputFormWrapper} from './FormsStyles';
import * as statuses from '../../../../../constants/statuses'
const TableWrapper = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;


function EditClaim(props) {
  let {id} = useParams();
  const dispatch = useDispatch();
  const claimbyid = useSelector(state => state.user.claimbyid);
  const fireplaces = useSelector(state => state.user.fireplacesList);
  const history = useHistory();
  const [isSnackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarOpen(false);
  };
  useEffect(() => {
    dispatch(actions.clearClaimById());
  }, []);

  useEffect(() => {
    dispatch(actions.getFireplaces(Cookies.get('token')));
    if (id) {
      dispatch(actions.getClaimById(Cookies.get('token'), id)).then(e => {
        if (e.type === actions.GET_CLAIM_BY_ID_FAIL) {
          history.push('/home/listall');
        }        
      });
    }
  }, [id]);

  var options = [] 
  fireplaces.forEach(element => options.push({value: element.id, label: element.description +" [" + element.lng + "; " + element.lat + "]"}))
  if (options.length > 1) {
    var departure_state = {
      value: options[0].value
    }
    var arrival_state = {
      value: options[1].value
    }
  }

  function departureHandleChange(value) {
    departure_state['value'] = value;
  }
  function arrivalHandleChange(value) {
    arrival_state['value'] = value;
  }
  return (
    <div>
      <InputFormWrapper>
      {claimbyid && String(claimbyid.id) === String(id) && (
        <div>
          <h3>Редактирование заявки с ID: {id}</h3>
          <h3>Статус: {statuses.rusStatus(claimbyid.status)}</h3>
          <h3>
            Координаты пункта отправления: [{claimbyid.arrival.lng}, {claimbyid.arrival.lat}]
          </h3>
          <h3>
            Координаты пункта прибытия: [{claimbyid.departure.lng}, {claimbyid.departure.lat}]
          </h3>   
          <h3>
            Количество поступивших жалоб: {claimbyid.reportsCount}
          </h3> 
          <h3>
            Пользователь: {claimbyid.user.name} {claimbyid.user.surname} ({claimbyid.user.active ? 'активен' : 'не активен'})
          </h3>
          <h3>
            Камин отправления: {claimbyid.departureFireplace && claimbyid.departureFireplace.description ? claimbyid.departureFireplace.description : 'не назначено'}
          </h3> 
          <h3>
            Камин прибытия: {claimbyid.arrivalFireplace && claimbyid.arrivalFireplace.description ? claimbyid.arrivalFireplace.description : 'не назначено'}
          </h3>          
          <h3>Выберите камин для пункта отправления:</h3>
          <Select 
          defaultValue={{label: 'Выберите камин отправления', value: -1 }}
          onChange={value => departureHandleChange(value)}
          options={options} />
          <h3>Выберите камин для пункта прибытия:</h3>
          <Select 
          defaultValue={{ label: "Выберите камин прибытия", value: -1 }}
          onChange={value => arrivalHandleChange(value)}
          options={options} />                   
          <Button
            onClick={() => {
              if (departure_state.value.value == undefined ||
                arrival_state.value.value == undefined ||
                departure_state.value.value == -1 || arrival_state.value.value == -1 || departure_state.value.value == arrival_state.value.value) {
                setSnackbarOpen(true);
                setSnackbarMessage('Камины выбраны неверно');
                dispatch(actions.clearAllStPoints());
              }
              else {
                  dispatch(actions.approveClaim(Cookies.get('token'), id, departure_state.value.value, arrival_state.value.value)).then(e => {
                  if (e.type && e.type === actions.APPROVE_CLAIM_SUCCESS) {
                    setSnackbarOpen(true);
                    setSnackbarMessage('Назначение камина прошло успешно. Перенаправление на список заявок...');
                    dispatch(actions.clearAllStPoints());
                    setTimeout(() => {
                      history.push('/home/listall');
                    }, 3000);
                  } else {
                    setSnackbarOpen(true);
                    setSnackbarMessage(JSON.stringify(e.error));
                  }
                });;
              } 
            }
            }            
            style={{height: '50px', marginRight: '10px', marginTop: '10px'}}
            variant="contained"
            color="primary">
            Сохранить
          </Button>
          <Button
            onClick={() => {              
                  dispatch(actions.rejectClaim(Cookies.get('token'), id)).then(e => {
                  if (e.type && e.type === actions.REJECT_CLAIM_SUCCESS) {
                    setSnackbarOpen(true);
                    setSnackbarMessage('Заявка отменена. Перенаправление на список заявок...');
                    dispatch(actions.clearAllStPoints());
                    setTimeout(() => {
                      history.push('/home/listall');
                    }, 3000);
                  } else {
                    setSnackbarOpen(true);
                    setSnackbarMessage(JSON.stringify(e.error));
                  }
                });;
            }}
            style={{height: '50px', marginRight: '10px', marginTop: '10px'}}
            variant="contained"
            color="primary">
            Отменить заявку
          </Button>
          <Button
            onClick={() => {              
              dispatch(actions.reportClaim(Cookies.get('token'), id)).then(e => {
              if (e.type && e.type === actions.REPORT_CLAIM_SUCCESS) {
                setSnackbarOpen(true);
                setSnackbarMessage('Вы пожаловались на заявку. Перенаправление на список заявок...');
                dispatch(actions.clearAllStPoints());
                setTimeout(() => {
                  history.push('/home/listall');
                }, 3000);
              } else {
                setSnackbarOpen(true);
                setSnackbarMessage(JSON.stringify(e.error));
              }
            });;
        }}
            style={{height: '50px', marginRight: '10px', marginTop: '10px'}}
            variant="contained"
            color="primary">
            Пожаловаться на подозрительную заявку
          </Button>
        </div>
      )}
      </InputFormWrapper>
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
    </div>
  );
}

EditClaim.propTypes = {};

export default EditClaim;
