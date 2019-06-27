import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import withRoot from 'theme/withRoot';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import compose from 'utils/compose';
import Typography from 'components/Typography';
import { listePiecesJointesDP } from './listePiecesJointesDP';
import PieceJointe from './PieceJointe';
import { listePiecesJointesPCMI } from './listePiecesJointesPCMI';

const styles = theme => ({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

function listePiecesJointes(typeDemande) {
  switch (typeDemande) {
    case 'dp':
      return listePiecesJointesDP;
    case 'pcmi':
      return listePiecesJointesPCMI;
    default:
      return [];
  }
}

function type(typeDemande) {
  switch (typeDemande) {
    case 'dp':
      return 'Déclaration préalable de travaux';
    case 'pcmi':
      return 'Demande de permis de construire pour une maison individuelle';
    default:
      return '';
  }
}

function PiecesJointes(props) {
  const { classes, match } = props;
  const typeDemande = match.params.typeDemande;
  return (
    <React.Fragment>
      <AppAppBar />
      <Typography variant="h3" marked="center" align="center">
        {`Pièces jointes`}
      </Typography>
      <Typography variant="subtitle1" marked="center" align="center">
        {`${type(typeDemande)} n° 00001`}
      </Typography>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          {listePiecesJointes(typeDemande).map(pieceJointe => (
            <PieceJointe key={pieceJointe.code} pieceJointe={pieceJointe} />
          ))}
        </Grid>
      </Grid>
      <AppFooter />
    </React.Fragment>
  );
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
