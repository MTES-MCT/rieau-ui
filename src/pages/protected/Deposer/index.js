import React from 'react';
import PropTypes from 'prop-types';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import withRoot from 'theme/withRoot';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import compose from 'utils/compose';
import Typography from 'components/Typography';
import { listePiecesJointesDP } from './piecesJointes';
import PieceJointeField from './PieceJointeField';

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column'
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
      <Card elevation={0} className={classes.card}>
        <CardContent>
          {listePiecesJointesDP.map(pieceJointe => (
            <PieceJointeField key={pieceJointe.nom} pieceJointe={pieceJointe} />
          ))}
        </CardContent>
      </Card>
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
