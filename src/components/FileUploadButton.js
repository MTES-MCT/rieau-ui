import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withRoot from 'theme/withRoot';
import compose from 'utils/compose';
import { withStyles } from '@material-ui/styles';
import Button from 'components/Button';
import FileUploadDialog from 'components/FileUploadDialog';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
});

function FileUploadButton(props) {
  const {
    classes,
    acceptedFormats,
    iconName,
    label,
    variant,
    color,
    onUploadFile,
    reload,
    setError
  } = props;
  const [showDropzone, setShowDropzone] = useState(false);
  function closeDropzone() {
    setShowDropzone(false);
  }
  function handleShowDropzone() {
    setShowDropzone(true);
  }
  function handleFile(dossierId, numero, formData) {
    onUploadFile(dossierId, numero, formData)
      .then(function() {
        closeDropzone();
        reload();
      })
      .catch(error => setError(error));
  }
  return (
    <React.Fragment>
      <Button
        className={classes.button}
        variant={variant}
        color={color}
        aria-label={label}
        onClick={handleShowDropzone}
        data-cy="file-upload-btn"
      >
        {label}
        <Icon className={classes.rightIcon}>{iconName}</Icon>
      </Button>
      {showDropzone && (
        <FileUploadDialog
          handleFile={handleFile}
          onClose={closeDropzone}
          acceptedFormats={acceptedFormats}
        />
      )}
    </React.Fragment>
  );
}
FileUploadButton.propTypes = {
  classes: PropTypes.object.isRequired,
  acceptedFormats: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  onUploadFile: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles),
  withRoot
)(FileUploadButton);
