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
  const departureFireplaces = useSelector(state => state.user.departureFireplacesList);
  const arrivalFireplaces = useSelector(state => state.user.arrivalFireplacesList);
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
    if (id) {      
      dispatch(actions.getClaimById(Cookies.get('token'), id)).then(e => {
        if (e.type === actions.GET_CLAIM_BY_ID_FAIL) {
          history.push('/home/listall');
        }        
      });
  }
  }, [id]);

  useEffect(() => {
    if (claimbyid) {
      dispatch(actions.getFireplaces(Cookies.get('token'), claimbyid.departure.lng,
      claimbyid.departure.lat, 50000, claimbyid.travelDate, 'departure')).then(e => {
        if (e.type === actions.GET_DEPARTURE_FIREPLACES_FAIL) {
          setSnackbarOpen(true);
          setSnackbarMessage(JSON.stringify(e.error));
          history.push('/home/listall');
        }
      });
      dispatch(actions.getFireplaces(Cookies.get('token'), claimbyid.arrival.lng,
      claimbyid.arrival.lat, 50000, claimbyid.travelDate, 'arrival')).then(e => {
        if (e.type === actions.GET_ARRIVAL_FIREPLACES_FAIL) {
          setSnackbarOpen(true);
          setSnackbarMessage(JSON.stringify(e.error));
          history.push('/home/listall');
        }
      });
    }
  }, [claimbyid])

  var departure_options = []
  departureFireplaces.sort((a, b) => (a.claimsCount > b.claimsCount ? -1 : 1)) 
  departureFireplaces.forEach(element => departure_options.push({value: element.id,
    label: element.description +" [" + element.lat + "; " + element.lng + "]. Число заявок: " + element.claimsCount + ", расстояние: " + element.distance + " км."}))
  
  var arrival_options = []
  arrivalFireplaces.sort((a, b) => (a.claimsCount > b.claimsCount ? -1 : 1)) 
  arrivalFireplaces.forEach(element => arrival_options.push({value: element.id,
    label: element.description +" [" + element.lat + "; " + element.lng + "]. Число заявок: " + element.claimsCount + ", расстояние: " + element.distance + " км."}))

  if (departure_options.length > 0) {
    var departure_state = {
      value: departure_options[0].value
    }

  }
  if (arrival_options.length > 0) {
    var arrival_state = {
      value: arrival_options[0].value
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
            Координаты пункта отправления: [{claimbyid.departure.lat}, {claimbyid.departure.lng}]
          </h3>
          <h3>
            Координаты пункта прибытия: [{claimbyid.arrival.lat}, {claimbyid.arrival.lng}]
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
          options={departure_options} />
          <h3>Выберите камин для пункта прибытия:</h3>
          <Select 
          defaultValue={{ label: "Выберите камин прибытия", value: -1 }}
          onChange={value => arrivalHandleChange(value)}
          options={arrival_options} />                   
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
