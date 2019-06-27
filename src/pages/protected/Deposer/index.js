import React from 'react';
import PropTypes from 'prop-types';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import withRoot from 'theme/withRoot';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import compose from 'utils/compose';
import Typography from 'components/Typography';
import { listePiecesJointesDP } from './piecesJointes';
import PieceJointeField from './PieceJointeField';

const styles = theme => ({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

function Deposer(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <AppAppBar />
      <Typography variant="h3" marked="center" align="center">
        {`Mes pièces jointes`}
      </Typography>
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          {listePiecesJointesDP.map(pieceJointe => (
            <PieceJointeField key={pieceJointe.nom} pieceJointe={pieceJointe} />
          ))}
        </Grid>
      </Grid>
      <AppFooter />
    </React.Fragment>
  );
}
Deposer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRoot,
  withStyles(styles)
)(Deposer);
