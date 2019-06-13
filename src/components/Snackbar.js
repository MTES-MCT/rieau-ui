import React from 'react';
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

// const variantColor = theme => ({
//   success: theme.palette.success,
//   error: theme.palette.error,
//   info: theme.palette.info,
//   warning: theme.palette.warning,
// });

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

class SnackbarContent extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
  };

  render() {
    const { className, message, onClose, variant, ...other } = this.props;
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
}

class Snackbar extends React.Component {
  static propTypes = {
    initialState: PropTypes.bool,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.initialState || true
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.onClose();
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { variant, message } = this.props;

    return (
      <MuiSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        className={classes.root}
        autoHideDuration={30000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          className={classes.margin}
          onClose={this.handleClose}
          variant={variant}
          message={message}
        />
      </MuiSnackbar>
    );
  }
}

export default withStyles(classes)(Snackbar);
