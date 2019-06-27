import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import UploadFile from 'components/UploadFile';
import dossiers from 'utils/dossiers';
import Grid from '@material-ui/core/Grid';
import FilePreview from 'components/FilePreview';
import Button from 'components/Button';
import Typography from 'components/Typography';
import { useAsync } from 'react-async';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  title: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1)
  },
  buttons: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1)
  },
  card: {
    maxWidth: 230
  },
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
async function handleFilePreview(pieceJointe) {
  return { file: await dossiers.loadPieceJointe(pieceJointe.nom) };
}

function PieceJointeField(props) {
  const { classes, pieceJointe } = props;
  const [showDropzone, setShowDropzone] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const {
    data = {
      file: null
    },
    isSettled,
    isLoading,
    reload
  } = useAsync({ promiseFn: handleFilePreview, nom: pieceJointe.nom });
  const { file } = data;

  useEffect(() => {
    if (isSettled) {
      if (file) setShowPreview(true);
    }
  }, [isSettled, file]);

  function closeDropzone() {
    setShowDropzone(false);
  }
  function handleShowDropzone() {
    setShowDropzone(true);
  }
  function closePreviewDialog() {
    setShowPreviewDialog(false);
  }
  function handleShowPreviewDialog() {
    setShowPreviewDialog(true);
  }
  function savePieceJointe(nom, file, binary) {
    dossiers.savePieceJointe(nom, file, binary).then(function() {
      closeDropzone();
      reload();
    });
  }
  return (
    <Grid container spacing={1} className={classes.title}>
      <Grid item xs={12}>
        <Typography variant="h6" component="h2">
          {pieceJointe.description}
        </Typography>
      </Grid>
      <Grid container item xs={12} className={classes.buttons}>
        {showPreview && (
          <Grid item xs={12}>
            <div className={classes.buttonWrapper}>
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                aria-label="prévisualiser"
                onClick={handleShowPreviewDialog}
                disabled={isLoading}
              >
                {`Prévisualiser`}
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
          </Grid>
        )}
        <Button
          className={classes.button}
          variant="outlined"
          aria-label="téléverser"
          onClick={handleShowDropzone}
        >
          {`Téléverser`}
          <CloudUploadIcon className={classes.rightIcon} />
        </Button>
        {showDropzone && (
          <UploadFile
            handleFile={savePieceJointe}
            onClose={closeDropzone}
            pieceJointe={pieceJointe}
          />
        )}
      </Grid>
    </Grid>
  );
}
PieceJointeField.propTypes = {
  classes: PropTypes.object.isRequired,
  pieceJointe: PropTypes.object.isRequired
};

export default withStyles(styles)(PieceJointeField);
