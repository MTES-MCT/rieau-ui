import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { withStyles, Grid } from '@material-ui/core';
import Button from 'components/Button';
import SendIcon from '@material-ui/icons/Send';
import compose from 'utils/compose';

const styles = theme => ({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
});

const formikValues = {
  mapPropsToValues: props => ({
    onSaveMessage: props.onSaveMessage,
    dossierId: props.dossierId
  }),
  initialValues: () => {
    return { message: '' };
  },
  validate: values => {
    const errors = {};
    if (!values.message) {
      errors.message = 'Obligatoire';
    }
    return errors;
  },
  handleSubmit: (
    values,
    { setSubmitting, props: { onSaveMessage, dossierId } }
  ) => {
    onSaveMessage(dossierId, values.message);
  },
  displayName: 'MessageForm'
};

function MessageForm(props) {
  const {
    classes,
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props;

  return (
    <Grid container className={classes.grid}>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <TextField
            label="Message"
            rowsMax={10}
            rows={10}
            multiline
            placeholder="Votre message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            name="message"
            data-cy="message-contenu-textarea"
            margin="normal"
            variant="filled"
            className={classes.textField}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="secondary"
            aria-label="ajouter un nouveau message"
            data-cy="message-envoyer-btn"
            disabled={isSubmitting}
          >
            {`Envoyer`}
            <SendIcon className={classes.rightIcon} />
          </Button>
        </Grid>
        <Grid item xs={12}>
          {errors.message && touched.message && (
            <div id="feedback">{errors.message}</div>
          )}
        </Grid>
      </form>
    </Grid>
  );
}
MessageForm.propTypes = {
  classes: PropTypes.object.isRequired,
  dossierId: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSaveMessage: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles),
  withFormik(formikValues)
)(MessageForm);
