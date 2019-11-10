import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'components/Typography';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import AppTheme from 'theme/AppTheme';
import { withRouter } from 'react-router-dom';
import Button from 'components/Button';
import BackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import compose from 'utils/compose';

const styles = theme => ({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

function Error(props) {
  const { classes, error, history } = props;
  return (
    <AppTheme>
      <AppAppBar />
      <Grid container className={classes.grid}>
        <Grid item xs={12}>
          <Typography variant="h3" marked="center" align="center">
            {`Erreur`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" marked="center" align="center">
            {error.message}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            aria-label="Retour"
            data-cy="back-btn"
            onClick={event => history.push('/')}
          >
            <BackIcon />
            {`Retour`}
          </Button>
        </Grid>
      </Grid>
      <AppFooter />
    </AppTheme>
  );
}
Error.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(Error);
