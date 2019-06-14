import withRoot from 'theme/withRoot';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Typography from 'components/Typography';
import AppFooter from 'components/AppFooter';
import AppAppBar from 'components/AppAppBar';
import AppForm from 'components/AppForm';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from 'components/Button';
import compose from 'utils/compose';
import * as Yup from 'yup';
import auth from 'utils/auth';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertDialog from 'components/AlertDialog';

const styles = theme => ({
  headers: {
    flexGrow: 1,
    display: 'flex'
  },
  form: {
    marginTop: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    color: 'inherit',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  error: {
    color: theme.palette.error
  }
});

function MotDePasseOublie(props) {
  const [showSentDialog, setShowSentDialog] = React.useState(false);

  function confirmDialog() {
    setShowSentDialog(false);
    props.history.push('/connexion');
  }

  const { classes } = props;

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Grid container className={classes.headers} spacing={2}>
            <Grid item xs={12}>
              <Typography
                color="secondary"
                variant="h3"
                gutterBottom
                marked="center"
                align="center"
              >
                Mot de passe oublié ?
              </Typography>
              <Typography variant="body2" align="center">
                {'Mot de passe retrouvé ? '}
                <Link
                  color="inherit"
                  component={RouterLink}
                  to="/connexion"
                  align="center"
                  underline="always"
                >
                  Connectez-vous
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </React.Fragment>
        <Formik
          initialValues={{
            email: ''
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string('Email')
              .email('Entrez un email valide. ex: toto@beta.gouv.fr')
              .required('Votre email est requis')
          })}
          onSubmit={(values, actions) => {
            actions.setFieldError('general', null);
            auth.reset(values.email).then(
              user => {
                setShowSentDialog(true);
              },
              error => {
                actions.setSubmitting(false);
                actions.setFieldError('general', error);
              }
            );
          }}
          render={({
            touched,
            isSubmitting,
            handleReset,
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors
          }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <Card elevation={0}>
                <CardContent>
                  {errors.general && (
                    <Typography variant="h6" color="error">
                      {errors.general}
                    </Typography>
                  )}
                  <TextField
                    value={values.email}
                    helperText={touched.email ? errors.email : ''}
                    error={touched.email && Boolean(errors.email)}
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    label="Email"
                    margin="normal"
                    name="email"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </CardContent>
                <div className={classes.actions}>
                  <div className={classes.buttonWrapper}>
                    <Button
                      variant="contained"
                      className={classes.button}
                      color="secondary"
                      fullWidth
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {'Réinitialiser'}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                  <div className={classes.buttonWrapper}>
                    <Button
                      variant="outlined"
                      className={classes.button}
                      onClick={handleReset}
                      color="inherit"
                      fullWidth
                    >
                      {'Effacer'}
                    </Button>
                  </div>
                </div>
              </Card>
            </form>
          )}
        />
      </AppForm>
      {showSentDialog && (
        <AlertDialog
          initialState={showSentDialog}
          content={`La demande de réinitialisation de votre compte a bien été prise en compte. Vous recevrez prochainement un email pour le réinitialiser.`}
          onClose={confirmDialog}
        />
      )}
      <AppFooter />
    </React.Fragment>
  );
}
MotDePasseOublie.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default compose(
  withRoot,
  withRouter,
  withStyles(styles)
)(MotDePasseOublie);
