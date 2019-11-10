import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from 'components/Typography';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import { useUser } from 'context/user-context';
import compose from 'utils/compose';
import AppTheme from 'theme/AppTheme';
import { userProfiles } from 'utils/profils';
import PersonneAvatar from 'components/PersonneAvatar';
import { nomComplet } from 'utils/people';

const styles = theme => ({
  root: {
    flexGrow: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
  }
});

function MonCompte(props) {
  const { classes } = props;
  const { user } = useUser();
  return (
    <AppTheme>
      <AppAppBar />
      {user && (
        <Grid container spacing={1} className={classes.root}>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                avatar={<PersonneAvatar personne={user} />}
                title={'Mon Compte'}
                subheader={nomComplet(user)}
              />
              <CardContent>
                <Typography variant="h6" component="h2">
                  {'Profils'}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {userProfiles(user)
                    .map(profil => profil.libelle)
                    .toString()}
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
    </AppTheme>
  );
}
MonCompte.propTypes = {
  classes: PropTypes.object
};
export default compose(withStyles(styles))(MonCompte);
