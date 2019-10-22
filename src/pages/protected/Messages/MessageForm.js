import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { withStyles } from '@material-ui/core';
import Button from 'components/Button';
import SendIcon from '@material-ui/icons/Send';
import compose from 'utils/compose';
import withRoot from 'theme/withRoot';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
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
    console.log('values.message=', JSON.stringify(values.message));
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
    <form className={classes.container} onSubmit={handleSubmit}>
      <TextareaAutosize
        aria-label="message"
        rows={10}
        cols={70}
        placeholder="Votre message"
        value={values.message}
        onChange={handleChange}
        onBlur={handleBlur}
        name="message"
      />
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
      {errors.message && touched.message && (
        <div id="feedback">{errors.message}</div>
      )}
    </form>
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
  withRoot,
  withStyles(styles),
  withFormik(formikValues)
)(MessageForm);
