import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import AppTheme from 'theme/AppTheme';
import { withStyles, LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import compose from 'utils/compose';
import Typography from 'components/Typography';
import api from 'api/dossiers';
import { useAsync } from 'react-async';
import Error from 'pages/Error';
import NotFound from 'pages/NotFound';
import Button from 'components/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import AddMessageButton from './AddMessageButton';
import { useUser } from 'context/user-context';
import MessagesChat from './MessagesChat';

const styles = theme => ({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

async function handleDossier({ id }) {
  return { dossier: await api.consulterDossier(id) };
}

function Messages(props) {
  const { classes, match, history } = props;
  const dossierId = match.params.dossierId;
  const {
    data = { dossier: null },
    error,
    isLoading,
    isRejected,
    reload
  } = useAsync({
    promiseFn: handleDossier,
    id: dossierId
  });
  async function handleSaveMessage(contenu) {
    await api.saveMessage(dossierId, contenu);
    reload();
  }
  const { isDeposant, isBeta, isInstructeur } = useUser();
  if (isRejected) return <Error error={error.message} />;
  if (isLoading) return <LinearProgress />;
  if (data) {
    const { dossier } = data;
    if (!dossier) return <NotFound />;
    return (
      <AppTheme>
        <AppAppBar />
        <Grid container className={classes.grid}>
          <Grid item xs={12}>
            <Typography variant="h3" marked="center" align="center">
              {`Messages`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" marked="center" align="center">
              {`Du dossier n°${dossier.id}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              aria-label="Dossier"
              data-cy="back-dossier-btn"
              onClick={event => history.push(`/dossiers/${dossierId}`)}
            >
              <BackIcon />
              {`Dossier`}
            </Button>
            {((isDeposant && isBeta) || isInstructeur) && (
              <AddMessageButton
                label={'Ajouter'}
                onSaveMessage={(event, contenu) => handleSaveMessage(contenu)}
                dossierId={dossierId}
              />
            )}
          </Grid>
        </Grid>
        <MessagesChat messages={dossier.messages} />
        <AppFooter />
      </AppTheme>
    );
  }
}
Messages.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(Messages);
