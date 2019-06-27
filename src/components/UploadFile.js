import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import RootRef from '@material-ui/core/RootRef';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from 'components/Button';
import compose from 'utils/compose';
import { formatFileSize } from 'utils/files';
import Typography from './Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  dropzone: {
    width: '100%',
    height: 'auto',
    borderWidth: 2,
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: 5,
    padding: theme.spacing(1)
  },
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
});

const maxSize = parseInt(process.env.REACT_APP_MAX_SIZE_UPLOAD_FILE);

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
          handleFile(pieceJointe.nom, file, reader.result);
        };
        setShowDialog(false);
      });
    },
    [handleFile, pieceJointe]
  );
  const {
    getRootProps,
    getInputProps,
    isDragReject,
    rejectedFiles
  } = useDropzone({
    accept: pieceJointe.formats,
    maxSize: maxSize,
    onDrop: onDrop
  });
  const { ref, ...rootProps } = getRootProps();
  function handleClose() {
    onClose();
    setShowDialog(false);
  }

  const rejectedFilesItems = rejectedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {formatFileSize(file.size)}
    </li>
  ));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={showDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <AppBar className={classes.appBar} color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {`Téléverser un fichier`}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <RootRef rootRef={ref}>
          <Paper {...rootProps} className={classes.dropzone}>
            <input {...getInputProps()} />
            {isDragReject ? (
              <p>{`Ce fichier n'est pas acceptable`}</p>
            ) : (
              <React.Fragment>
                <p>
                  {`Cliquez ici pour sélectionner un fichier ou glissez-le ici`}
                </p>
                {rejectedFilesItems.length > 0 && (
                  <aside>
                    <h4 style={{ color: 'red' }}>Fichier rejeté:</h4>
                    <ul>{rejectedFilesItems}</ul>
                  </aside>
                )}
              </React.Fragment>
            )}
            <em>{`(Seuls les fichiers image et pdf de moins de ${formatFileSize(
              maxSize
            )} sont acceptés)`}</em>
          </Paper>
        </RootRef>
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
