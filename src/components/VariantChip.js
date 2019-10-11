import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Chip } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import { withStyles } from '@material-ui/core';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const classes = theme => ({
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  success: {
    backgroundColor: theme.palette.success
  },
  root: {
    backgroundColor: theme.palette.error
  },
  info: {
    backgroundColor: theme.palette.info
  },
  warning: {
    backgroundColor: theme.palette.warning
  }
});

function VariantChip(props) {
  const { className, variantId, variants } = props;
  const variant = variants.find(v => v.id === variantId);
  const Icon = variantIcon[variant.variant];
  return (
    <Chip
      className={clsx(classes[variant.variant], className)}
      color="secondary"
      icon={<Icon className={clsx(classes.icon, classes.iconVariant)} />}
      label={variant.label}
    />
  );
}
VariantChip.propTypes = {
  className: PropTypes.string,
  variantId: PropTypes.string.isRequired,
  variants: PropTypes.array.isRequired
};
export default withStyles(classes)(VariantChip);
