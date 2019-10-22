import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Button from 'components/Button';
import NewMessageDialog from './NewMessageDialog';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
});

function AddMessageButton(props) {
  const { classes, label, dossierId, onSaveMessage } = props;
  const [showNewDialog, setShowNewDialog] = useState(false);

  function closeNewDialog() {
    setShowNewDialog(false);
  }
  function handleShowNewDialog() {
    setShowNewDialog(true);
  }
  return (
    <React.Fragment>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        aria-label="ajouter un nouveau message"
        onClick={handleShowNewDialog}
        data-cy="message-ajouter-btn"
      >
        <AddCommentIcon />
        {label}
      </Button>
      {showNewDialog && (
        <NewMessageDialog
          dossierId={dossierId}
          onClose={closeNewDialog}
          initialState={true}
          onSaveMessage={onSaveMessage}
        />
      )}
    </React.Fragment>
  );
}
AddMessageButton.propTypes = {
  classes: PropTypes.object.isRequired,
  dossierId: PropTypes.string.isRequired,
  onSaveMessage: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default withStyles(styles)(AddMessageButton);
