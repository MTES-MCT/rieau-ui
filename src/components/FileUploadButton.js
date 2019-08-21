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
    pieceJointe,
    iconName,
    label,
    variant,
    color,
    onUploadFile,
    reload
  } = props;
  const [showDropzone, setShowDropzone] = useState(false);
  function closeDropzone() {
    setShowDropzone(false);
  }
  function handleShowDropzone() {
    setShowDropzone(true);
  }
  function handleFile(code, file, binary) {
    onUploadFile(code, file, binary).then(function() {
      closeDropzone();
      reload();
    });
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
          pieceJointe={pieceJointe}
        />
      )}
    </React.Fragment>
  );
}
FileUploadButton.propTypes = {
  classes: PropTypes.object.isRequired,
  pieceJointe: PropTypes.object.isRequired,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  onUploadFile: PropTypes.func.isRequired,
  reload: PropTypes.func
};

export default compose(
  withStyles(styles),
  withRoot
)(FileUploadButton);
