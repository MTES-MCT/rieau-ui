import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import api from 'api/dossiers';
import FilePreview from 'components/files/FilePreview';
import Button from 'components/Button';
import { useAsync } from 'react-async';
import CircularProgress from '@material-ui/core/CircularProgress';
import Error from 'pages/Error';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    color: 'inherit',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
});

async function handleFilePreview(fichierId) {
  let fichier = null;
  if (
    fichierId &&
    fichierId !== null &&
    fichierId.fichierId &&
    fichierId.fichierId !== null
  )
    fichier = await api.lireFichier(fichierId.fichierId);
  return { file: fichier };
}

function FilePreviewButton(props) {
  const { classes, fichierId, label } = props;
  const [showPreview, setShowPreview] = useState(fichierId !== null);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const {
    data = {
      file: null
    },
    isSettled,
    isLoading,
    isRejected,
    error
  } = useAsync({
    promiseFn: handleFilePreview,
    fichierId: fichierId
  });
  const { file } = data;
  useEffect(() => {
    if (isSettled) {
      if (file && file !== null) setShowPreview(true);
    }
  }, [isSettled, file]);

  function closePreviewDialog() {
    setShowPreviewDialog(false);
  }
  function handleShowPreviewDialog() {
    setShowPreviewDialog(true);
  }
  if (isRejected) return <Error error={error} />;
  return (
    <React.Fragment>
      {showPreview && isSettled && file && (
        <React.Fragment>
          <div className={classes.buttonWrapper}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              aria-label="prévisualiser"
              onClick={handleShowPreviewDialog}
              disabled={isLoading}
              data-cy="file-preview-btn"
            >
              {label ? label : 'Prévisualiser'}
              <VisibilityIcon className={classes.rightIcon} />
            </Button>
          </div>
          {isLoading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
          {showPreviewDialog && (
            <FilePreview
              file={file}
              onClose={closePreviewDialog}
              initialState={true}
            />
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
FilePreviewButton.propTypes = {
  classes: PropTypes.object.isRequired,
  fichierId: PropTypes.string,
  label: PropTypes.string,
  setError: PropTypes.func.isRequired
};

export default withStyles(styles)(FilePreviewButton);
