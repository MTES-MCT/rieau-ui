import withRoot from 'theme/withRoot';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import Link from '@material-ui/core/Link';
import Typography from 'components/Typography';
import AppFooter from 'components/AppFooter';
import AppAppBar from 'components/AppAppBar';
import AppForm from 'components/AppForm';
import { withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from 'components/Button';
import compose from 'utils/compose';
import * as Yup from 'yup';
import FranceConnectImg from './FCboutons-10.png';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from 'context/auth-context';

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
  }
});

function Connexion(props) {
  const [showPassword, setShowPassword] = React.useState(false);

  function handleClickShowPassword() {
    setShowPassword(!showPassword);
  }
  const { classes } = props;
  const { login } = useAuth();

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
                Connexion
              </Typography>
              <Typography variant="body2" align="center">
                {'Pas encore de compte ? '}
                <Link
                  color="inherit"
                  component={RouterLink}
                  to="/inscrire"
                  align="center"
                  underline="always"
                  data-cy="inscription-link"
                >
                  Inscrivez-vous
                </Link>
              </Typography>
              <Typography variant="body2" align="center">
                {'Mot de passe oublié ? '}
                <Link
                  color="inherit"
                  underline="always"
                  align="center"
                  component={RouterLink}
                  to="/reinitialiser"
                >
                  Réinitialisez-le
                </Link>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              container
              alignContent="center"
              direction="column"
            >
              <Typography
                color="inherit"
                variant="h6"
                marked="center"
                align="center"
              >
                Ou
              </Typography>
              <IconButton>
                <img
                  src={FranceConnectImg}
                  alt="Se connecter avec France connect"
                />
              </IconButton>
            </Grid>
          </Grid>
        </React.Fragment>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string('Email')
              .email('Entrez un email valide. ex: toto@beta.gouv.fr')
              .required('Votre email est requis'),
            password: Yup.string('Mot de passe')
              .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
              .required('Entrez votre mot de passe')
          })}
          onSubmit={(values, actions) => {
            actions.setFieldError('general', null);
            login(values.email, values.password).then(
              token => {
                return token;
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
              <Card elevation={0} className={classes.card}>
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
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    label="Mot de passe"
                    data-cy="password-input"
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
                      data-cy="connexion-btn"
                    >
                      {'Se connecter'}
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
      <AppFooter />
    </React.Fragment>
  );
}
Connexion.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRoot,
  withStyles(styles)
)(Connexion);
