import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import andeville from './andeville.jpg';
import baziege from './baziege.jpg';
import castanetTolosan from './castanet-tolosan.jpg';
import laCreche from './la-creche.jpg';
import mours from './mours.jpg';
import nogentSurOise from './nogent-sur-oise.jpg';
import saintTropez from './saint-tropez.jpg';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '../../components/Typography';
import Button from '../../components/Button';
import AppFooter from '../../components/AppFooter';
import AppAppBar from '../../components/AppAppBar';
import withRoot from '../../theme/withRoot';
import { FaGlobe } from 'react-icons/fa';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  title: {
    marginBottom: theme.spacing(14)
  },
  container: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center'
  },
  gridList: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  imgTitle: {
    color: theme.palette.common.white
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  button: {
    marginTop: theme.spacing(8)
  }
});

function Communes(props) {
  const { classes } = props;

  const tileData = [
    {
      img: andeville,
      title: 'Andeville',
      url: 'https://www.andeville.fr/'
    },
    {
      img: baziege,
      title: 'Baziège',
      url: 'https://www.ville-baziege.fr'
    },
    {
      img: castanetTolosan,
      title: 'Castanet-Tolosan',
      url: 'https://www.castanet-tolosan.fr'
    },
    {
      img: laCreche,
      title: 'La Crèche',
      url: 'https://www.ville-lacreche.fr'
    },
    {
      img: mours,
      title: 'Mours',
      url: 'http://www.ville-mours.fr/'
    },
    {
      img: nogentSurOise,
      title: 'Nogent-sur-Oise',
      url: 'www.nogentsuroise.fr'
    },
    {
      img: saintTropez,
      title: 'Saint-Tropez',
      url: 'https://www.saint-tropez.fr'
    }
  ];

  return (
    <React.Fragment>
      <AppAppBar />
      <section className={classes.root}>
        <Container className={classes.container}>
          <Typography
            variant="h4"
            marked="center"
            className={classes.title}
            component="h2"
          >
            {`Communes partenaires`}
          </Typography>
          <div className={classes.root}>
            <GridList className={classes.gridList} cols={3}>
              {tileData.map(tile => (
                <GridListTile key={tile.img}>
                  <img src={tile.img} alt={tile.title} />
                  <GridListTileBar
                    title={tile.title}
                    classes={{
                      root: classes.titleBar,
                      title: classes.imgTitle
                    }}
                    actionIcon={
                      <IconButton>
                        <FaGlobe href={tile.url} className={classes.imgTitle} />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <Button
            color="secondary"
            size="large"
            variant="contained"
            href="mailto:ads-relations-collectivites@developpement-durable.gouv.fr?Subject=Rejoindre%20permis%20construire%20facile"
          >
            {`Rejoignez-nous`}
          </Button>
        </Container>
      </section>
      <AppFooter />
    </React.Fragment>
  );
}

Communes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRoot(Communes));
