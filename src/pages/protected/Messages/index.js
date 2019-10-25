import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import withRoot from 'theme/withRoot';
import { withStyles, LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import compose from 'utils/compose';
import Typography from 'components/Typography';
import Message from './Message';
import api from 'utils/dossiers';
import { useAsync } from 'react-async';
import Error from 'pages/Error';
import NotFound from 'pages/NotFound';
import Button from 'components/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import AddMessageButton from './AddMessageButton';

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
    console.log('contenu=', JSON.stringify(contenu));
    await api.saveMessage(dossierId, contenu);
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
            <AddMessageButton
              label={'Ajouter'}
              onSaveMessage={(event, contenu) => handleSaveMessage(contenu)}
              dossierId={dossierId}
            />
          </Grid>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={12}>
            {dossier.messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </Grid>
        </Grid>
        <AppFooter />
      </React.Fragment>
    );
  }
}
Messages.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default compose(
  withRoot,
  withRouter,
  withStyles(styles)
)(Messages);
