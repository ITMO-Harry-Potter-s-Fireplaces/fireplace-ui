import React, {useEffect} from 'react';
import Cookies from 'js-cookie';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {TableBody, Table, TableRow, TableCell, TableHead, Button, Checkbox} from '@material-ui/core';
import styled from 'styled-components';
import Select from 'react-select';
import * as actions from '../../../../../actions/userActions';
import {InputFormWrapper} from './FormsStyles';

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

  useEffect(() => {
    dispatch(actions.clearClaimById());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(actions.getClaimById(Cookies.get('token'), id)).then(e => {
        if (e.type === actions.GET_CLAIM_BY_ID_FAIL) {
          history.push('/home/listall');
        }
        dispatch(actions.getFireplaces(Cookies.get('token')));
      });
    }
  }, [id]);
  
  var options = [] 
  //var lng = claimbyid.arrival.lng;
  //var lat = claimbyid.arrival.lat;
  fireplaces.forEach(element => options.push({value: element.id, label: element.description +" [" + element.lng + "; " + element.lat + "]"}))
  return (
    <div>
      <InputFormWrapper>
      {claimbyid && String(claimbyid.id) === String(id) && (
        <div>
          <h3>Редактирование заявки с ID: {id}</h3>
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
          <h3>Выберите камин для пункта отправления:</h3>
          <Select options={options} />
          <h3>Выберите камин для пункта прибытия:</h3>
          <Select options={options} />
          Пожаловаться на заявку: <Checkbox
            value="checkedA"
            inputProps={{ 'aria-label': 'Checkbox A' }}
          />    
          <h3></h3>          
          <Button
            onClick={() => history.push('/home/listOfAllUsers')}
            style={{height: '50px', marginRight: '10px', marginTop: '10px'}}
            variant="contained"
            color="primary">
            Сохранить (-> approved)
          </Button>
          <Button
            onClick={() => history.push('/home/listOfAllUsers')}
            style={{height: '50px', marginRight: '10px', marginTop: '10px'}}
            variant="contained"
            color="primary">
            Отменить заявку (-> rejected)
          </Button>
          <Button
            onClick={() => history.push('/home/listOfAllUsers')}
            style={{height: '50px', marginRight: '10px', marginTop: '10px'}}
            variant="contained"
            color="primary">
            Завершить заявку (-completed)
          </Button>
        </div>
      )}
      </InputFormWrapper>
    </div>
  );
}

EditClaim.propTypes = {};

export default EditClaim;
