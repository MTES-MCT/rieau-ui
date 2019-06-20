import React from 'react';
import AppAppBar from 'components/AppAppBar';
import AppForm from 'components/AppForm';
import AppFooter from 'components/AppFooter';
import { Formik } from 'formik';
import withRoot from 'theme/withRoot';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from 'components/Button';
import Input from '@material-ui/core/Input';
import * as Yup from 'yup';
import dossiers from 'utils/dossiers';
import Typography from 'components/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import PropTypes from 'prop-types';
import compose from 'utils/compose';
import UploadIcon from '@material-ui/icons/SaveAlt';
import CircularProgress from '@material-ui/core/CircularProgress';

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

function Deposer(props) {
  const { classes } = props;
  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <Formik
          initialValues={{ cerfa: '' }}
          validationSchema={Yup.object().shape({
            cerfa: Yup.string('cerfa')
              .cerfa('Entrez un cerfa valide. ex: toto@beta.gouv.fr')
              .required('Votre cerfa est requis')
          })}
          onSubmit={(values, actions) => {
            actions.setFieldError('general', null);
            dossiers.deposer(values.cerfa).then(
              cerfa => {
                return cerfa;
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
                  <Input
                    value={values.cerfa}
                    helperText={touched.cerfa ? errors.cerfa : ''}
                    error={touched.cerfa && Boolean(errors.cerfa)}
                    autoFocus
                    onChange={handleChange}
                    onBlur={handleBlur}
                    fullWidth
                    label="cerfa"
                    margin="normal"
                    name="cerfa"
                    data-cy="cerfa-input"
                    required
                    type="file"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <UploadIcon />
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
                      data-cy="deposer-btn"
                    >
                      {'Déposer'}
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
Deposer.propTypes = {
  classes: PropTypes.object
};

export default compose(
  withRoot,
  withStyles(styles)
)(Deposer);
