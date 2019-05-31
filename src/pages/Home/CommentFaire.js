import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from 'components/Button';
import Typography from 'components/Typography';
import Map from '@material-ui/icons/Map';
import Edit from '@material-ui/icons/Edit';
import AttachFile from '@material-ui/icons/AttachFile';
import People from '@material-ui/icons/People';
import { genericHashLink } from 'react-router-hash-link';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden'
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5)
  },
  title: {
    marginBottom: theme.spacing(14)
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    fontSize: 64,
    margin: theme.spacing(4)
  },
  button: {
    marginTop: theme.spacing(8)
  },
  remonter: {
    marginTop: theme.spacing(8),
    scrollBehaviour: 'smooth',
    color: theme.palette.common.white,
    backgroundColor: 'secondary',
    '&:hover': {
      backgroundColor: 'secondary'
    }
  }
});

const IconButtonHashLink = props => genericHashLink(props, IconButton);

function CommentFaire(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          Comment faire ?
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={3}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <Map alt="map" className={classes.icon} />
                <Typography variant="h5" align="center">
                  Localiser son projet
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <Edit alt="edit" className={classes.icon} />
                <Typography variant="h5" align="center">
                  <p>{`Préciser la nature du projet dans le cadre d'une déclaration préalable.`}</p>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <AttachFile alt="pièces jointes" className={classes.icon} />
                <Typography variant="h5" align="center">
                  <p>{'Déposer les pièces jointes (photos, plans, notices)'}</p>
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={3}>
              <div className={classes.item}>
                <div className={classes.number}>4.</div>
                <People alt="people" className={classes.icon} />
                <Typography variant="h5" align="center">
                  {"Suivre l'avancement de l'instruction de la demande"}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          id="localiser-btn"
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component={RouterLink}
          to="/localiser"
        >
          Localiser
        </Button>
        <Fab aria-label="remonter" className={classes.remonter}>
          <IconButtonHashLink
            component={RouterLink}
            to={{ pathname: '/', hash: '#app-bar' }}
          >
            <ExpandLessIcon color="secondary" />
          </IconButtonHashLink>
        </Fab>
      </Container>
    </section>
  );
}

CommentFaire.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentFaire);
