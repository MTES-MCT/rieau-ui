import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export default withStyles(theme => ({
  root: {
    fontWeight: theme.typography.fontWeightMedium,
    fontFamily: theme.typography.fontFamilySecondary,
    fontSize: theme.typography.pxToRem(12),
    boxShadow: 'none',
    '&:hover, &:active, &:focus': {
      boxShadow: 'none'
    }
  },
  sizeSmall: {
    padding: theme.spacing(1, 3),
    fontSize: theme.typography.pxToRem(11)
  },
  sizeLarge: {
    padding: theme.spacing(2, 5),
    fontSize: theme.typography.pxToRem(14)
  }
}))(Button);
