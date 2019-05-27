import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withRoot from 'theme/withRoot';
import compose from 'utils/compose';
import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-leaflet';
import Container from '@material-ui/core/Container';
import Typography from 'components/Typography';
import ChercherAddresse from './ChercherAdresse';

const maxPopupWidth = 400;

const styles = theme => ({
  searchInput: {
    display: 'flex'
  },
  popupContainer: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: maxPopupWidth * 0.75
    },
    width: maxPopupWidth
  }
});

function CommunePopupMarker(props) {
  const { classes, commune, onClickMarker, onClickSelectAddress } = props;
  return (
    <Marker position={commune.position} onClick={onClickMarker}>
      <Popup maxWidth={maxPopupWidth}>
        <Container className={classes.popupContainer}>
          <Typography variant="h6" gutterBottom marked="center" align="center">
            {commune.nom}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            marked="center"
            align="center"
          >
            {`Chercher une adresse:`}
          </Typography>
          <ChercherAddresse
            className={classes.searchInput}
            commune={commune}
            onClickSelectAddress={onClickSelectAddress}
          />
        </Container>
      </Popup>
    </Marker>
  );
}
CommunePopupMarker.propTypes = {
  commune: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onClickMarker: PropTypes.func.isRequired,
  onClickSelectAddress: PropTypes.func.isRequired
};

function CommunesMarkersList(props) {
  const { communes, classes, onClickMarker, onClickSelectAddress } = props;
  const markers = communes.map(commune => (
    <CommunePopupMarker
      key={commune.code}
      commune={commune}
      classes={classes}
      onClickMarker={onClickMarker}
      onClickSelectAddress={onClickSelectAddress}
    />
  ));
  return <React.Fragment>{markers}</React.Fragment>;
}
CommunesMarkersList.propTypes = {
  communes: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  onClickMarker: PropTypes.func.isRequired,
  onClickSelectAddress: PropTypes.func.isRequired
};

class CommunesMarkers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      adresses: []
    };
  }

  render() {
    const {
      classes,
      onClickMarker,
      onClickSelectAddress,
      communes
    } = this.props;
    return (
      <CommunesMarkersList
        communes={communes}
        classes={classes}
        onClickMarker={onClickMarker}
        onClickSelectAddress={onClickSelectAddress}
      />
    );
  }
}
CommunesMarkers.propTypes = {
  classes: PropTypes.object.isRequired,
  communes: PropTypes.array.isRequired,
  onClickMarker: PropTypes.func.isRequired,
  onClickSelectAddress: PropTypes.func.isRequired
};

export default compose(
  withRoot,
  withStyles(styles)
)(CommunesMarkers);
