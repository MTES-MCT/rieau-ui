import withRoot from 'theme/withRoot';
import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
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
import CardActions from '@material-ui/core/CardActions';
import Button from 'components/Button';
import compose from 'utils/compose';
import * as Yup from 'yup';

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
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="secondary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {'Réinitialiser'}
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
  mapPropsToValues: ({ email }) => {
    return {
      email: email || ''
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string('Email')
      .email('Entrez un email valide. ex: toto@beta.gouv.fr')
      .required('Votre email est requis')
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
