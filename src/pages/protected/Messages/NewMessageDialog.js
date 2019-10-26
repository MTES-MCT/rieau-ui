import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from 'components/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import MessageForm from './MessageForm';

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
Transition.displayName = 'TransitionNewMessgeDialog';

function NewMessageDialog(props) {
  const { classes, dossierId, initialState, onClose, onSaveMessage } = props;
  const [open, setOpen] = React.useState(initialState);
  function handleClose() {
    onClose();
    setOpen(false);
  }
  function handleSaveMessage(contenu) {
    onSaveMessage(dossierId, contenu);
    setOpen(false);
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="message-new-dialog-title"
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar} color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {`Nouveau message`}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <MessageForm
          dossierId={dossierId}
          onSaveMessage={(event, contenu) => handleSaveMessage(contenu)}
        />
      </DialogContent>
    </Dialog>
  );
}
NewMessageDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  initialState: PropTypes.bool.isRequired,
  dossierId: PropTypes.string.isRequired,
  onSaveMessage: PropTypes.func.isRequired
};

export default withStyles(styles)(NewMessageDialog);
