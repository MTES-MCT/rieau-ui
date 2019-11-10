import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import steps from 'pages/protected/Dossiers/steps';
import StepConnector from '@material-ui/core/StepConnector';
import format from 'format/dates';

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

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1
  }
})(StepConnector);

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed, icon } = props;
  const icons = steps.map(step => step.icon);
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
  const { activeStepId, steps } = props;
  const activeStep = steps.find(step => step.id === activeStepId);
  const activeStepIndex = steps.lastIndexOf(activeStep);
  const stepProps = {};
  const labelProps = {};

  return (
    <Stepper
      activeStep={activeStepIndex}
      alternativeLabel
      connector={<ColorlibConnector />}
    >
      {steps.map(step => (
        <Step
          key={step.id}
          data-cy={`step-${step.id}`}
          {...stepProps}
          error={step.error ? step.error.toString() : ''}
        >
          <StepLabel
            StepIconComponent={ColorlibStepIcon}
            {...labelProps}
            error={step.error ? step.error : false}
          >
            {`${step.libelle} ${
              step.dateDebut ? 'le ' + format(step.dateDebut) : ''
            }`}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
EtapesStepper.propTypes = {
  activeStepId: PropTypes.string.isRequired,
  steps: PropTypes.array.isRequired
};
export default EtapesStepper;
