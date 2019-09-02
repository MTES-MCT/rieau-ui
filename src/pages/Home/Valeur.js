import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from 'components/Typography';
import EuroSymbol from '@material-ui/icons/EuroSymbol';
import Timer from '@material-ui/icons/Timer';
import Timeline from '@material-ui/icons/Timeline';

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'hidden'
  },
  container: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(10),
    display: 'flex',
    position: 'relative'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5)
  },
  image: {
    fontSize: 64
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180
  }
});

function Valeur(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <div className={classes.item}>
              <Typography
                variant="h4"
                marked="center"
                className={classes.title}
                component="h2"
              >
                Les objectifs visés
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <EuroSymbol className={classes.image} />
              <Typography variant="h6" className={classes.title}>
                Plus économique
              </Typography>
              <Typography variant="h5">
                {
                  'Fini les impressions papiers en plusieurs exemplaires et les courriers recommandés.'
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Timer className={classes.image} />
              <Typography variant="h6" className={classes.title}>
                Plus rapide
              </Typography>
              <Typography variant="h5">
                {
                  "Fini les délais supplémentaires d'expédition et d'accusé de réception par courrier postal."
                }
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <Timeline className={classes.image} />
              <Typography variant="h6" className={classes.title}>
                Plus clair
              </Typography>
              <Typography variant="h5">
                {
                  "Suivre l'état de sa demande et échanger directement avec les instructeurs."
                }
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

Valeur.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Valeur);
