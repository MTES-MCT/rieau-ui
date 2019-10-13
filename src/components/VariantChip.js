import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Chip } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

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
  return (
    <Chip
      className={clsx(classes[variant.variant], className)}
      color="secondary"
      icon={variant.icon}
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
