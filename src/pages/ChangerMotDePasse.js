import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { withRouter } from 'react-router-dom';
import Typography from 'components/Typography';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import AppForm from 'components/AppForm';
import compose from 'utils/compose';
import withRoot from 'theme/withRoot';
import auth from 'utils/auth';
import LockIcon from '@material-ui/icons/Lock';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from 'components/Button';
import { withStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as Yup from 'yup';
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

function Header(props) {
  const { isTokenValid } = props;
  const header = isTokenValid
    ? 'Changer de mot de passe'
    : '404 | Page non trouvée';
  return (
    <React.Fragment>
      <Typography variant="h3" marked="center" align="center">
        {header}
      </Typography>
    </React.Fragment>
  );
}
Header.propTypes = {
  isTokenValid: PropTypes.bool.isRequired
};

function Form(props) {
  const { token, classes, history } = props;
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
    history.push('/connexion');
  }
  return (
    <AppForm>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
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
          auth.changePassword(token, values.password).then(
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
                  label="Nouveau mot de passe"
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
                    data-cy="enregistrer-btn"
                  >
                    {`Enregistrer`}
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
      {showSentDialog && (
        <AlertDialog
          initialState={showSentDialog}
          content={`La modification de votre mot de passe a bien été prise en compte. Vous pouvez vous connectez.`}
          onClose={confirmDialog}
        />
      )}
    </AppForm>
  );
}
Form.propTypes = {
  classes: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.string.isRequired
};

class ChangerMotDePasse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTokenValid: false,
      showPassword: false,
      showConfirmPassword: false,
      showSentDialog: false
    };
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    auth.confirm(token).then(
      confirmation => {
        this.setState(() => ({
          isTokenValid: confirmation.type === 'reset'
        }));
      },
      error => {
        this.setState(() => ({
          isTokenValid: false
        }));
      }
    );
  }

  render() {
    const { token } = this.props.match.params;
    const { isTokenValid } = this.state;
    const { classes, history } = this.props;
    return (
      <React.Fragment>
        <AppAppBar />
        <React.Fragment>
          <Grid container className={classes.headers} spacing={2}>
            <Grid item xs={12}>
              <Header isTokenValid={isTokenValid} />
            </Grid>
          </Grid>
        </React.Fragment>
        {isTokenValid && (
          <Form classes={classes} history={history} token={token} />
        )}
        <AppFooter />
      </React.Fragment>
    );
  }
}
ChangerMotDePasse.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};
export default compose(
  withRoot,
  withRouter,
  withStyles(styles)
)(ChangerMotDePasse);
