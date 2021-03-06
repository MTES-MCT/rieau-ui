import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'components/Typography';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Button from 'components/Button';
import { Link as RouterLink } from 'react-router-dom';
import HeroImg from './hero.jpg';
import './hero.css';
import LazyLoad from 'react-lazyload';
import IconButton from '@material-ui/core/IconButton';
import { genericHashLink } from 'react-router-hash-link';
import { env } from 'config/env-helper';

const styles = theme => ({
  root: {
    flexGrow: 1,
    color: theme.palette.primary,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      height: '100vh',
      minHeight: 500,
      maxHeight: 1300
    }
  },
  container: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(14),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.3,
    zIndex: -1
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2
  },
  arrowDown: {
    fontSize: 48,
    scrollBehaviour: 'smooth'
  },
  button: {
    minWidth: 200,
    bottom: theme.spacing(4)
  },
  more: {
    marginTop: theme.spacing(2)
  },
  aide: {
    marginBottom: theme.spacing(4)
  },
  title: {
    marginBottom: theme.spacing(10)
  },
  description: {
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  }
});

const IconButtonHashLink = props => genericHashLink(props, IconButton);

class Hero extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  render() {
    const { classes } = this.props;

    return (
      <section className={classes.root}>
        <Container className={classes.container}>
          <div className={classes.backdrop} />
          <div className={clsx(classes.background, 'hero')} />
          <LazyLoad>
            <img src={HeroImg} style={{ display: 'none' }} alt="hero" />
          </LazyLoad>
          <div className={classes.title}>
            <Paper>
              <Typography
                color="inherit"
                align="center"
                variant="h3"
                marked="center"
                className={classes.description}
              >
                {env('REACT_APP_DESCRIPTION')}
              </Typography>
              <Typography color="inherit" align="center" variant="h5">
                {env('REACT_APP_VISION')}
              </Typography>
            </Paper>
          </div>
          <div className={classes.aide}>
            <Button
              color="secondary"
              variant="contained"
              size="large"
              component={RouterLink}
              to="/aide"
            >
              {'Découvrez comment'}
            </Button>
          </div>
          <Paper>
            <IconButtonHashLink
              color="secondary"
              aria-label="arrowDown"
              component={RouterLink}
              to={{ pathname: '/', hash: '#connexion-btn' }}
            >
              <ExpandMoreIcon className={classes.arrowDown} />
            </IconButtonHashLink>
          </Paper>
        </Container>
      </section>
    );
  }
}

export default withStyles(styles)(Hero);
