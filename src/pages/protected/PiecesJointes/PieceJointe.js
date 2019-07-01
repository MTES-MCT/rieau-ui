import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import UploadFile from 'components/UploadFile';
import depots from 'utils/depots';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FilePreview from 'components/FilePreview';
import Button from 'components/Button';
import { useAsync } from 'react-async';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginBottom: theme.spacing(1)
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  actions: {
    display: 'flex'
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
  return { file: await depots.loadPieceJointe(pieceJointe.code) };
}

function PieceJointe(props) {
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
  } = useAsync({ promiseFn: handleFilePreview, code: pieceJointe.code });
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
  function savePieceJointe(code, file, binary) {
    depots.savePieceJointe(code, file, binary).then(function() {
      closeDropzone();
      reload();
    });
  }
  function title(text, required) {
    var title = text;
    if (required) text += '(* obligatoire)';
    return title;
  }
  return (
    <Card className={classes.card}>
      <CardHeader title={title(pieceJointe.titre, pieceJointe.required)} />
      <CardContent className={classes.content}>
        {pieceJointe.description}
      </CardContent>
      <CardActions disableSpacing className={classes.actions}>
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
        {showPreview && (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </CardActions>
    </Card>
  );
}
PieceJointe.propTypes = {
  classes: PropTypes.object.isRequired,
  pieceJointe: PropTypes.object.isRequired
};

export default withStyles(styles)(PieceJointe);
