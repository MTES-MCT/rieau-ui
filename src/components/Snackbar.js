import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiSnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const classes = theme => ({
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  margin: {
    margin: theme.spacing(1)
  },
  success: {
    backgroundColor: theme.palette.success
  },
  root: {
    backgroundColor: theme.palette.error
  },
  info: {
    backgroundColor: theme.palette.info
  },
  warning: {
    backgroundColor: theme.palette.warning
  }
});

function SnackbarContent(props) {
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <MuiSnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Fermer"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}
SnackbarContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
};

function Snackbar(props) {
  const [open, setOpen] = useState(true);
  const { variant, message, onClose } = props;

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    if (onClose) onClose();
    setOpen(false);
  }

  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: 'up',
        horizontal: 'center'
      }}
      open={open}
      className={classes.root}
      autoHideDuration={30000}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes.margin}
        onClose={handleClose}
        variant={variant}
        message={message}
      />
    </MuiSnackbar>
  );
}
Snackbar.propTypes = {
  initialState: PropTypes.bool,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
};

export default withStyles(classes)(Snackbar);
