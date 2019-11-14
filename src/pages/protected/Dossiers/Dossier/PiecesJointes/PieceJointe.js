import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import api from 'api/dossiers';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import FileUploadButton from 'components/files/FileUploadButton';
import {
  isCerfa,
  isDecision
} from 'pages/protected/Dossiers/Dossier/PiecesJointes/piecesjointes';
import { useUser } from 'context/user-context';
import FilePreviewButton from 'components/files/FilePreviewButton';

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
  }
});

function PieceJointe(props) {
  const { classes, pieceJointe, setError, reload } = props;

  const { isDeposant } = useUser();

  async function handleSavePieceJointe(file) {
    await api.savePieceJointe(pieceJointe.DossierId, pieceJointe.numero, file);
    reload();
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
        {isDeposant && !isCerfa(pieceJointe) && !isDecision(pieceJointe) && (
          <FileUploadButton
            iconName="cloud_upload"
            label="Téléverser"
            variant="outlined"
            color="inherit"
            onUploadFile={handleSavePieceJointe}
            setError={setError}
            acceptedFormats={pieceJointe.formats.split(',')}
          />
        )}
        <FilePreviewButton
          fichierId={pieceJointe.fichierId}
          setError={setError}
        />
      </CardActions>
    </Card>
  );
}
PieceJointe.propTypes = {
  classes: PropTypes.object.isRequired,
  pieceJointe: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired
};

export default withStyles(styles)(PieceJointe);
