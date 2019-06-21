import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
  previewsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },
  img: {
    display: 'block',
    width: 'auto',
    height: '100%'
  }
});

function UploadFile(props) {
  const { classes, handleFile } = props;
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: 'image/*,application/pdf',
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
      handleFile(files);
    }
  });
  const previews = files.map(file => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <img src={file.preview} className={classes.img} alt={file.path} />
        {file.path} - {file.size} octets
      </div>
    </div>
  ));

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Glissez puis déposer les fichiers ici ...</p>
      ) : (
        <div>
          <p>
            Glissez puis déposer les fichiers ou cliquez pour les sélectionner
          </p>
          <button type="button" onClick={open}>
            Ouvrir le sélecteur de fichiers
          </button>
        </div>
      )}
      <aside className={classes.previewsContainer}>{previews}</aside>
    </div>
  );
}
UploadFile.propTypes = {
  classes: PropTypes.object.isRequired,
  handleFile: PropTypes.func.isRequired
};

export default withStyles(styles)(UploadFile);
