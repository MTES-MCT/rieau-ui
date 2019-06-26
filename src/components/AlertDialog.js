import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import withMobileDialog from '@material-ui/core/withMobileDialog';

function AlertDialog(props) {
  const { content, fullScreen, initialState, onClose, type } = props;
  const selectedType = type || 'info';
  const [open, setOpen] = useState(initialState);
  function handleClose() {
    onClose();
    setOpen(false);
  }
  function title(type) {
    switch (type) {
      case 'info':
        return 'Information';
      case 'warning':
        return 'Attention';
      case 'error':
        return 'erreur';
      default:
        return 'Information';
    }
  }
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title(selectedType)}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          variant="contained"
          autoFocus
          data-cy="confirm-dialog-btn"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
AlertDialog.propTypes = {
  initialState: PropTypes.bool.isRequired,
  type: PropTypes.arrayOf('info', 'error', 'warning'),
  content: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withMobileDialog()(AlertDialog);
