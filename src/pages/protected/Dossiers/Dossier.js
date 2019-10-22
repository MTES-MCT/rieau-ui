import React from 'react';
import PropTypes from 'prop-types';
import withRoot from 'theme/withRoot';
import { withRouter } from 'react-router-dom';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import compose from 'utils/compose';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { useAsync } from 'react-async';
import api from 'utils/dossiers';
import Error from 'pages/Error';
import LinearProgress from '@material-ui/core/LinearProgress';
import NotFound from 'pages/NotFound';
import CardActions from '@material-ui/core/CardActions';
import Button from 'components/Button';
import { Link as RouterLink } from 'react-router-dom';
import Typography from 'components/Typography';
import { dossierWorkflow } from 'utils/statutsDossier';
import Grid from '@material-ui/core/Grid';
import EtapesStepper from 'pages/protected/Dossiers/EtapesStepper';
import { useUser } from 'context/user-context';
import AddMessageButton from 'pages/protected/Messages/AddMessageButton';

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  grid: {
    display: 'flex',
    alignItems: 'center'
  }
});

async function handleDossier({ id }) {
  return { dossier: await api.consulterDossier(id) };
}

function Dossier(props) {
  const { classes, match } = props;
  const id = match.params.id;
  const { isMairie, isInstructeur } = useUser();
  const {
    data = { dossier: null },
    error,
    isLoading,
    isRejected,
    reload
  } = useAsync({
    promiseFn: handleDossier,
    id: id
  });

  async function handleQualifier() {
    await api.qualifierDossier(id);
    reload();
  }
  async function handleInstruire() {
    await api.instruireDossier(id);
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

  if (isRejected) return <Error error={error.message} />;
  if (isLoading) return <LinearProgress />;
  if (data) {
    const { dossier } = data;
    if (!dossier) return <NotFound />;
    return (
      <React.Fragment>
        <AppAppBar />
        <Typography variant="h2" marked="center" align="center">
          {`Dossier n°${dossier.id}`}
        </Typography>
        <Card className={classes.card}>
          <CardHeader title={dossier.type.libelle} />
          <CardContent className={classes.content}>
            <Grid container className={classes.grid}>
              <Grid item xs={12}>
                <EtapesStepper
                  steps={dossierWorkflow(dossier)}
                  activeStepId={dossier.statutActuel.id}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to={`/dossiers/${dossier.id}/piecesjointes`}
              data-cy="piecesjointes-btn"
            >
              {`Pièces jointes`}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to={`/dossiers/${dossier.id}/messages`}
              data-cy="messages-btn"
            >
              {`Messages`}
            </Button>
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
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={event => handleInstruire()}
                  data-cy="instruire-btn"
                >
                  {`Instruire`}
                </Button>
              )}
            {isInstructeur && dossier.statutActuel.id === 'INSTRUCTION' && (
              <React.Fragment>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={event => handleDeclarerComplet()}
                  data-cy="declarer-complet-btn"
                >
                  {`Déclarer complet`}
                </Button>
                <AddMessageButton
                  label={'Déclarer incomplet'}
                  dossierId={dossier.id}
                  onSaveMessage={(event, contenu) =>
                    handleDeclarerIncomplet(contenu)
                  }
                />
              </React.Fragment>
            )}
          </CardActions>
        </Card>
        <AppFooter />
      </React.Fragment>
    );
  }
}
Dossier.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withRoot,
  withRouter
)(Dossier);
