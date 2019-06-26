import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from 'components/Button';
import compose from 'utils/compose';

const styles = theme => ({
  dropzone: {
    width: '100%',
    height: 'auto',
    borderWidth: 2,
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: 5
  }
});

function UploadFile(props) {
  const { handleFile, onClose, fullScreen, classes, pieceJointe } = props;
  const [showDialog, setShowDialog] = useState(true);
  const onDrop = useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onabort = () => window.console.log('file reading was aborted');
        reader.onerror = () => window.console.log('file reading has failed');
        reader.readAsDataURL(file);
        reader.onload = () => {
          var binary = null;
          if (file.type.startsWith('image/')) {
            binary = reader.result;
          } else if (file.type === 'application/pdf') {
            binary = atob(reader.result.split(',')[1]);
          }
          handleFile(pieceJointe.nom, file, binary);
        };
        setShowDialog(false);
      });
    },
    [handleFile, pieceJointe]
  );
  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    accept: pieceJointe.formats,
    onDrop: onDrop
  });
  function handleClose() {
    onClose();
    setShowDialog(false);
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      open={showDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Ajouter un fichier`}</DialogTitle>
      <DialogContent>
        <div {...getRootProps()} className={classes.dropzone}>
          <input {...getInputProps()} />
          {isDragReject ? (
            <p>{`Ce fichier n'est pas au bon format (pdf ou image)`}</p>
          ) : (
            <p>
              {`Cliquez ici pour sélectionner un fichier ou glissez puis déposez-le ici`}
            </p>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          variant="contained"
          autoFocus
          data-cy="confirm-dialog-btn"
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
UploadFile.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFile: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  pieceJointe: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withMobileDialog()
)(UploadFile);
