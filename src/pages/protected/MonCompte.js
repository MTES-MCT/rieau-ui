import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from 'components/Typography';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import { useUser } from 'context/user-context';
import compose from 'utils/compose';
import withRoot from 'theme/withRoot';

const styles = theme => ({
  root: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  },
  card: {
    maxWidth: 230
  }
});

function MonCompte(props) {
  const { classes } = props;
  const { user } = useUser();
  return (
    <React.Fragment>
      <AppAppBar />
      {user && (
        <Grid container spacing={1} className={classes.root}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <AccountCircleIcon
                    color="secondary"
                    fontSize="large"
                    aria-label="mon compte"
                  />
                }
                title={'Mon Compte'}
                subheader={user.firstName + ' ' + user.lastName}
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {'Profil'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {user.profile}
                </Typography>
                <Typography variant="h6" component="h2">
                  {'Email'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      <AppFooter />
    </React.Fragment>
  );
}
MonCompte.propTypes = {
  classes: PropTypes.object
};
export default compose(
  withRoot,
  withStyles(styles)
)(MonCompte);