import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NewMessageDialog from 'pages/protected/Dossiers/Dossier/Messages/NewMessageDialog';

const styles = theme => ({
  fab: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(3)
  }
});

function AddMessageButton(props) {
  const { classes, dossierId, onSaveMessage } = props;
  const [showNewDialog, setShowNewDialog] = useState(false);

  function closeNewDialog() {
    setShowNewDialog(false);
  }
  function handleShowNewDialog() {
    setShowNewDialog(true);
  }
  return (
    <React.Fragment>
      <Fab
        color="primary"
        data-cy="message-ajouter-btn"
        aria-label="Ajouter"
        className={classes.fab}
        onClick={handleShowNewDialog}
      >
        <AddIcon color="primary" />
      </Fab>
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
  onSaveMessage: PropTypes.func.isRequired
};

export default withStyles(styles)(AddMessageButton);
