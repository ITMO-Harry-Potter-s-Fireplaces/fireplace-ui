import React, {useEffect} from 'react';
import Cookies from 'js-cookie';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {TableBody, Table, TableRow, TableCell, TableHead, Button} from '@material-ui/core';
import styled from 'styled-components';
import * as actions from '../../../../../actions/userActions';

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
        } else {
          dispatch(actions.getFireplaces(Cookies.get('token')));
        }
      });
    }
  }, [id]);

  return (
    <div>
      {claimbyid && String(claimbyid.id) === String(id) && (
        <div>
          <h3>Редактирование заявки с ID: {id}</h3>
          <h3>
            Координаты пункта отправления: [{claimbyid.arrival.lat}, {claimbyid.arrival.lng}]
          </h3>
          <h3>
            Координаты пункта прибытия: [{claimbyid.departure.lat}, {claimbyid.departure.lng}]
          </h3>
          {!claimbyid.arrivalFireplace && fireplaces && fireplaces.length > 0 && (
            <>
              <h3>Выберите камин для пункта отправления:</h3>
              
            </>
          )}
        </div>
      )}
    </div>
  );
}

EditClaim.propTypes = {};

export default EditClaim;
