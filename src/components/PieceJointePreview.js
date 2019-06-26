import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { pdfjs, Document, Page } from 'react-pdf';
import { withStyles } from '@material-ui/core';
import Typography from './Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const styles = theme => ({
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  document: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  page: {
    maxWidth: '95%',
    boxShadow: '0 0 8px rgba(0, 0, 0, .5)',
    margin: 1,
    '&canvas': {
      maxWidth: '100%',
      height: 'auto !important'
    }
  }
});
function PieceJointePreview(props) {
  const { classes, file, initialState, onClose } = props;
  const [numPages, setNumPages] = useState(1);
  const [openPdf, setOpenPdf] = React.useState(initialState);
  function handleClosePdf() {
    onClose();
    setOpenPdf(false);
  }
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages({ numPages });
  }
  return (
    <Dialog
      open={openPdf}
      onClose={handleClosePdf}
      aria-labelledby="pieceJointe-preview-dialog-title"
    >
      <DialogTitle
        disableTypography
        className={classes.dialogTitle}
        id="pieceJointe-preview-dialog-title"
      >
        <Typography variant="h6">{`Aperçu`}</Typography>
        <IconButton
          aria-label="Fermer"
          className={classes.closeButton}
          onClick={handleClosePdf}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {file && file.type === 'application/pdf' && (
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className={classes.document}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                className={classes.page}
              />
            ))}
          </Document>
        )}
        {file && file.type.startsWith('image/') && (
          <img src={file.data} alt={file.path} />
        )}
      </DialogContent>
    </Dialog>
  );
}
PieceJointePreview.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  initialState: PropTypes.bool.isRequired,
  file: PropTypes.object.isRequired
};

export default withStyles(styles)(PieceJointePreview);
