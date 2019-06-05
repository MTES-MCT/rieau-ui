import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class AlertDialog extends React.Component {
  static propTypes = {
    initialState: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    fullScreen: PropTypes.bool.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.initialState
    };
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { content, fullScreen } = this.props;
    const { open } = this.state;
    return (
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Attention'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleClose}
            color="secondary"
            variant="contained"
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(AlertDialog);
