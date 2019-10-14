import React from 'react';
import PropTypes from 'prop-types';
import withRoot from 'theme/withRoot';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import compose from 'utils/compose';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import statuts from 'utils/statutsDossier';

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

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)'
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;
  const icons = statuts.map(statut => statut.icon);
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(icon - 1)]}
    </div>
  );
}
ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

function EtapesStepper(props) {
  const { classes, activeStepId, steps } = props;
  const activeStep = steps.find(step => step.id === activeStepId);
  const stepProps = {};
  const labelProps = {};

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep.order} alternativeLabel>
        {steps.map(step => (
          <Step
            key={step.order}
            data-cy={`step-${step.id}`}
            {...stepProps}
            error={step.error ? step.error.toString() : ''}
          >
            <StepLabel
              StepIconComponent={ColorlibStepIcon}
              {...labelProps}
              error={step.error ? step.error : false}
            >
              {step.label}
            </StepLabel>
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
