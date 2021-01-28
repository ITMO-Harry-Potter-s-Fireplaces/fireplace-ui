import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch} from 'react-redux';
import CustomMap from './CustomMap';

function MapModal({hideAction, point, setAction, isOpen}) {
  const dispatch = useDispatch();

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isOpen}
        onClose={() => dispatch(hideAction())}
        aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">Кликните на карту</DialogTitle>
        <DialogContent>
          <CustomMap coordinates={point} setAction={(lat, lng) => setAction(lat, lng)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MapModal;
