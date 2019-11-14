import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '../Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';

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
  },
  pdfContent: {
    width: '100%',
    height: '100%'
  }
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
Transition.displayName = 'TransitionDialog';

function FilePreview(props) {
  const { classes, file, initialState, onClose } = props;
  const [open, setOpen] = React.useState(initialState);
  function handleClose() {
    onClose();
    setOpen(false);
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="pieceJointe-preview-dialog-title"
      fullScreen={file.type === 'application/pdf'}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar} color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {`Aperçu de ${file.nom}`}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="Close"
            data-cy="file-preview-close-btn"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        {file.type === 'application/pdf' && (
          <embed
            src={file.data}
            type={file.type}
            aria-label={file.nom}
            className={classes.pdfContent}
          />
        )}
        {file.type.startsWith('image/') && (
          <img src={file.data} alt={file.nom} />
        )}
      </DialogContent>
    </Dialog>
  );
}
FilePreview.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  initialState: PropTypes.bool.isRequired,
  file: PropTypes.object.isRequired
};

export default withStyles(styles)(FilePreview);
