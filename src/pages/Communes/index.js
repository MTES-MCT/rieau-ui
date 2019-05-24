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
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from 'components/Typography';
import Button from 'components/Button';
import AppFooter from 'components/AppFooter';
import AppAppBar from 'components/AppAppBar';
import withRoot from 'theme/withRoot';
import compose from 'utils/compose';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  images: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%'
  },
  title: {
    marginBottom: theme.spacing(10)
  },
  container: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center'
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15
      },
      '& $imageMarked': {
        opacity: 0
      },
      '& $imageTitle': {
        border: '4px solid currentColor'
      }
    }
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) +
      6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  },
  button: {
    margin: theme.spacing(10)
  }
});

function Communes(props) {
  const { classes } = props;

  const images = [
    {
      file: andeville,
      title: 'Andeville',
      url: 'https://www.andeville.fr/',
      width: '50%'
    },
    {
      file: baziege,
      title: 'Baziège',
      url: 'https://www.ville-baziege.fr',
      width: '50%'
    },
    {
      file: castanetTolosan,
      title: 'Castanet-Tolosan',
      url: 'https://www.castanet-tolosan.fr',
      width: '50%'
    },
    {
      file: laCreche,
      title: 'La Crèche',
      url: 'https://www.ville-lacreche.fr',
      width: '50%'
    },
    {
      file: mours,
      title: 'Mours',
      url: 'http://www.ville-mours.fr/',
      width: '50%'
    },
    {
      file: nogentSurOise,
      title: 'Nogent-sur-Oise',
      url: 'http://www.nogentsuroise.fr',
      width: '50%'
    },
    {
      file: saintTropez,
      title: 'Saint-Tropez',
      url: 'https://www.saint-tropez.fr',
      width: '100%'
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
          <div className={classes.images}>
            {images.map(image => (
              <ButtonBase
                focusRipple
                key={image.title}
                className={classes.image}
                focusVisibleClassName={classes.focusVisible}
                style={{
                  width: image.width
                }}
                href={image.url}
              >
                <span
                  className={classes.imageSrc}
                  style={{
                    backgroundImage: `url(${image.file})`
                  }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    className={classes.imageTitle}
                  >
                    {image.title}
                    <span className={classes.imageMarked} />
                  </Typography>
                </span>
              </ButtonBase>
            ))}
          </div>
          <Button
            color="secondary"
            size="large"
            variant="contained"
            className={classes.button}
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

export default compose(
  withRoot,
  withStyles(styles)
)(Communes);
