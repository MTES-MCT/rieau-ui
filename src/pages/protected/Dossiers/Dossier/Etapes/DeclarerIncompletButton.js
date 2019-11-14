import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import AddCommentIcon from '@material-ui/icons/AddComment';
import Button from 'components/Button';
import NewMessageDialog from 'pages/protected/Dossiers/Dossier/Messages/NewMessageDialog';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
});

function DeclarerIncompletButton(props) {
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
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        aria-label="déclarer incomplet"
        onClick={handleShowNewDialog}
        data-cy="declarer-incomplet-btn"
      >
        {`Incomplet`}
        <AddCommentIcon />
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
DeclarerIncompletButton.propTypes = {
  classes: PropTypes.object.isRequired,
  dossierId: PropTypes.string.isRequired,
  onSaveMessage: PropTypes.func.isRequired
};

export default withStyles(styles)(DeclarerIncompletButton);
