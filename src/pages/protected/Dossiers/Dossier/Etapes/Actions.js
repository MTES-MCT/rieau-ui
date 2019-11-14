import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import api from 'api/dossiers';
import Button from 'components/Button';
import FileUploadButton from 'components/files/FileUploadButton';
import { useUser } from 'context/user-context';
import FilePreviewButton from 'components/files/FilePreviewButton';
import {
  cerfa,
  decision
} from 'pages/protected/Dossiers/Dossier/PiecesJointes/piecesjointes';
import DeclarerIncompletButton from 'pages/protected/Dossiers/Dossier/Etapes/DeclarerIncompletButton';
import Typography from 'components/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

function Actions(props) {
  const { classes, dossier, match, setError, reload } = props;
  const id = match.params.id;
  const { isMairie, isInstructeur } = useUser();

  async function handleQualifier() {
    await api.qualifierDossier(id);
    reload();
  }
  async function handleDeclarerIncomplet(contenu) {
    await api.declarerIncompletDossier(id, contenu);
    reload();
  }
  async function handleDeclarerComplet() {
    await api.declarerCompletDossier(id);
    reload();
  }
  async function handlePrendreDecision(formData) {
    await api.prendreDecision(id, formData);
    reload();
  }
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h6" marked="center" align="center">
          {`CERFA initial`}
        </Typography>
        <FilePreviewButton
          fichierId={cerfa(dossier).fichierId}
          label="CERFA"
          setError={setError}
        />
        {dossier.statutActuel.id === 'DECISION' && (
          <React.Fragment>
            <Typography variant="h6" marked="center" align="center">
              {`Décision`}
            </Typography>
            <FilePreviewButton
              fichierId={decision(dossier).fichierId}
              label="Décision"
              setError={setError}
            />
          </React.Fragment>
        )}
      </Grid>
      <Grid item xs={12}>
        {((isMairie &&
          ['DEPOSE', 'COMPLET'].includes(dossier.statutActuel.id)) ||
          (isInstructeur &&
            ['QUALIFIE', 'INCOMPLET'].includes(dossier.statutActuel.id))) && (
          <Typography variant="h6" marked="center" align="center">
            {`Actions`}
          </Typography>
        )}
        {isMairie && dossier.statutActuel.id === 'DEPOSE' && (
          <Button
            variant="contained"
            color="secondary"
            onClick={event => handleQualifier()}
            data-cy="qualifier-btn"
          >
            {`Qualifier`}
          </Button>
        )}
        {isInstructeur &&
          ['QUALIFIE', 'INCOMPLET'].includes(dossier.statutActuel.id) && (
            <React.Fragment>
              <Button
                variant="contained"
                color="secondary"
                onClick={event => handleDeclarerComplet()}
                data-cy="declarer-complet-btn"
              >
                {`Complet`}
              </Button>
              <DeclarerIncompletButton
                dossierId={dossier.id}
                onSaveMessage={(event, contenu) =>
                  handleDeclarerIncomplet(contenu)
                }
              />
            </React.Fragment>
          )}
        {isMairie && dossier.statutActuel.id === 'COMPLET' && (
          <FileUploadButton
            iconName="attach_file"
            color="secondary"
            label="Décider"
            variant="contained"
            onUploadFile={handlePrendreDecision}
            setError={setError}
            acceptedFormats={['application/pdf']}
          />
        )}
      </Grid>
    </Grid>
  );
}
Actions.propTypes = {
  classes: PropTypes.object.isRequired,
  dossier: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired
};

export default withStyles(styles)(Actions);
