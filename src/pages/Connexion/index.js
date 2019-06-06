import withRoot from 'theme/withRoot';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
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
import CardActions from '@material-ui/core/CardActions';
import Button from 'components/Button';
import compose from 'utils/compose';
import * as Yup from 'yup';
import FranceConnectImg from './FCboutons-10.png';

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
  }
});

class Connexion extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    values: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    dirty: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    setFieldTouched: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const {
      classes,
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset
    } = this.props;

    const { showPassword } = this.state;

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
          <form onSubmit={handleSubmit} className={classes.form}>
            <Card elevation={0}>
              <CardContent>
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
                <TextField
                  fullWidth
                  value={values.password}
                  helperText={touched.password ? errors.password : ''}
                  error={touched.password && Boolean(errors.password)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  name="password"
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
                          onClick={this.handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="secondary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {'Se connecter'}
                </Button>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={handleReset}
                  color="inherit"
                  fullWidth
                >
                  {'Effacer'}
                </Button>
              </CardActions>
            </Card>
          </form>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}

const Form = withFormik({
  mapPropsToValues: ({ email, password }) => {
    return {
      email: email || '',
      password: password || ''
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string('Email')
      .email('Entrez un email valide. ex: toto@beta.gouv.fr')
      .required('Votre email est requis'),
    password: Yup.string('Mot de passe')
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      .required('Entrez votre mot de passe')
  }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      // submit to the server
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 1000);
  }
})(Connexion);

export default compose(
  withRoot,
  withStyles(styles)
)(Form);
