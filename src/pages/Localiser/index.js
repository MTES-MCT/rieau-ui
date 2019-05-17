import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Field, Form, FormSpy } from 'react-final-form';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import withRoot from '../../theme/withRoot';
import AppFooter from '../../components/AppFooter';
import AppBar from '../../components/AppBar';
import { email, required } from '../../components/form/validation';
import RFTextField from '../../components/form/RFTextField';
import FormButton from '../../components/form/FormButton';
import FormFeedback from '../../components/form/FormFeedback';
import compose from '../../utils/compose';
import Typography from '../../components/Typography';
import AppForm from '../../components/AppForm';

const styles = theme => ({
  form: {
    marginTop: theme.spacing(6)
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  feedback: {
    marginTop: theme.spacing(2)
  }
});

class Localiser extends React.Component {
  state = {
    sent: false
  };

  validate = values => {
    const errors = required(['email', 'password'], values, this.props);

    if (!errors.email) {
      const emailError = email(values.email, values, this.props);
      if (emailError) {
        errors.email = email(values.email, values, this.props);
      }
    }

    return errors;
  };

  handleSubmit = () => {};

  render() {
    const { classes } = this.props;
    const { sent } = this.state;

    return (
      <React.Fragment>
        <AppBar />
        <AppForm>
          <React.Fragment>
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
            >
              Localiser
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={this.handleSubmit}
            subscription={{ submitting: true }}
            validate={this.validate}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Field
                  autoComplete="email"
                  autoFocus
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                  size="large"
                />
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Mot de passe"
                  type="password"
                  margin="normal"
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  size="large"
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? 'En cours…' : 'Connexion'}
                </FormButton>
              </form>
            )}
          </Form>
          <Typography align="center">
            <Link underline="always" component={RouterLink} to="/reinitialiser">
              Mot de passe oublié ?
            </Link>
          </Typography>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}

Localiser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRoot,
  withStyles(styles)
)(Localiser);
