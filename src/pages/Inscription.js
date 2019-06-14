import withRoot from 'theme/withRoot';
import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Link from '@material-ui/core/Link';
import Typography from 'components/Typography';
import AppFooter from 'components/AppFooter';
import AppAppBar from 'components/AppAppBar';
import AppForm from 'components/AppForm';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from 'components/Button';
import compose from 'utils/compose';
import * as Yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import auth from 'utils/auth';
import AlertDialog from 'components/AlertDialog';

const styles = theme => ({
  headers: {
    flexGrow: 1,
    display: 'flex'
  },
  form: {
    marginTop: theme.spacing(1)
  },
  card: {
    display: 'flex',
    flexDirection: 'column'
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

function Inscription(props) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [showSentDialog, setShowSentDialog] = React.useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleClickShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

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
                Inscription
              </Typography>
              <Typography variant="body2" align="center">
                {'Déjà inscrit ? '}
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
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required('Votre prénom est requis'),
            lastName: Yup.string().required('Votre nom est requis'),
            email: Yup.string()
              .email('Entrez un email valide. ex: toto@beta.gouv.fr')
              .required('Votre email est requis'),
            password: Yup.string()
              .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
              .required('Entrez votre mot de passe'),
            confirmPassword: Yup.string()
              .required('Confirmez votre mot de passe')
              .oneOf(
                [Yup.ref('password')],
                'Les mots de passe ne correspondent pas'
              )
          })}
          onSubmit={(values, actions) => {
            actions.setFieldError('general', null);
            auth
              .register(
                values.firstName,
                values.lastName,
                values.email,
                values.password
              )
              .then(
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
                    value={values.firstName}
                    helperText={touched.firstName ? errors.firstName : ''}
                    error={touched.firstName && Boolean(errors.firstName)}
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    label="Prénom"
                    margin="normal"
                    name="firstName"
                    data-cy="firstname-input"
                    required
                  />
                  <TextField
                    value={values.lastName}
                    helperText={touched.lastName ? errors.lastName : ''}
                    error={touched.lastName && Boolean(errors.lastName)}
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    label="Nom"
                    margin="normal"
                    name="lastName"
                    data-cy="lastname-input"
                    required
                  />
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
                    data-cy="email-input"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    fullWidth
                    value={values.password}
                    helperText={touched.password ? errors.password : ''}
                    error={touched.password && Boolean(errors.password)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    size="large"
                    required
                    name="password"
                    data-cy="password-input"
                    label="Mot de passe"
                    type={showPassword ? 'text' : 'password'}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Changer la visibilité du mot de passe"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <TextField
                    fullWidth
                    value={values.confirmPassword}
                    helperText={
                      touched.confirmPassword ? errors.confirmPassword : ''
                    }
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    name="confirmPassword"
                    data-cy="confirmpassword-input"
                    label="Confirmez votre mot de passe"
                    type={showConfirmPassword ? 'text' : 'password'}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Changer la visibilité du mot de passe"
                            onClick={handleClickShowConfirmPassword}
                          >
                            {showConfirmPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
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
                      data-cy="inscription-btn"
                    >
                      {`S'inscrire`}
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
          content={`La demande de création de votre compte a bien été prise en compte. Vous recevrez prochainement un email pour le valider.`}
          onClose={confirmDialog}
        />
      )}
      <AppFooter />
    </React.Fragment>
  );
}
Inscription.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRoot,
  withRouter,
  withStyles(styles)
)(Inscription);
