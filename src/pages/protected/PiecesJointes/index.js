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
import PieceJointe from './PieceJointe';
import api from 'utils/dossiers';
import { useAsync } from 'react-async';
import Error from 'pages/Error';
import NotFound from 'pages/NotFound';
import { pieceJointe } from 'utils/piecesjointes';
import Button from 'components/Button';
import BackIcon from '@material-ui/icons/ArrowBack';

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

function PiecesJointes(props) {
  const { classes, match, history } = props;
  const dossierId = match.params.dossierId;
  const {
    data = { dossier: null },
    error,
    setError,
    isLoading,
    isRejected,
    reload
  } = useAsync({
    promiseFn: handleDossier,
    id: dossierId
  });
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
              {`CERFA initial et pièces jointes`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" marked="center" align="center">
              {`${dossier.type.libelle}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              aria-label="Dossier"
              onClick={event => history.push(`/dossiers/${dossierId}`)}
            >
              <BackIcon />
              {`Dossier`}
            </Button>
          </Grid>
        </Grid>
        <Grid container className={classes.grid}>
          <Grid item xs={12}>
            <PieceJointe
              key={dossier.cerfa.numero}
              pieceJointe={pieceJointe(dossier, dossier.cerfa.numero)}
              setError={setError}
              reload={reload}
            />
            {dossier.piecesAJoindre.map(pieceAJoindre => (
              <PieceJointe
                key={pieceAJoindre}
                pieceJointe={pieceJointe(dossier, pieceAJoindre)}
                setError={setError}
                reload={reload}
              />
            ))}
          </Grid>
        </Grid>
        <AppFooter />
      </React.Fragment>
    );
  }
}
PiecesJointes.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default compose(
  withRoot,
  withRouter,
  withStyles(styles)
)(PiecesJointes);
