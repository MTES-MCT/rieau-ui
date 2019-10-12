import React from 'react';
import PropTypes from 'prop-types';
import withRoot from 'theme/withRoot';
import { withStyles } from '@material-ui/core/styles';
import compose from 'utils/compose';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const styles = theme => ({
  root: {
    width: '90%'
  },
  backButton: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
});

function EtapesStepper(props) {
  const { classes, activeStepId, steps } = props;
  const activeStep = steps.find(step => step.id === activeStepId);
  const stepProps = {};
  const labelProps = {};

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep.order} alternativeLabel color="secondary">
        {steps.map((step, index) => (
          <Step key={step.order} {...stepProps}>
            <StepLabel {...labelProps}>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
EtapesStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  activeStepId: PropTypes.string.isRequired,
  steps: PropTypes.array.isRequired
};
export default compose(
  withStyles(styles),
  withRoot
)(EtapesStepper);
