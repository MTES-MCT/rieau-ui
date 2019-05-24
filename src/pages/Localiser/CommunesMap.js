import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withRoot from 'theme/withRoot';
import compose from 'utils/compose';
import PropTypes from 'prop-types';
import { GeoJSON, Marker, Popup } from 'react-leaflet';
import Container from '@material-ui/core/Container';
import Typography from 'components/Typography';
import ChercherAddresse from './ChercherAdresse';

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
      width: 200
    },
    width: 400
  }
});

const COMMUNES = [
  { nom: 'Andeville', position: [49.258172, 2.1673], code: '60012' },
  { nom: 'Baziège', position: [43.454982, 1.613846], code: '31048' },
  { nom: 'Mours', position: [49.13367, 2.270546], code: '95436' },
  { nom: 'Nogent-sur-Oise', position: [49.274714, 2.467452], code: '60463' },
  { nom: 'La Crèche', position: [46.363291, -0.298161], code: '79048' },
  { nom: 'Castanet-Tolosan', position: [43.517586, 1.498613], code: '31113' },
  { nom: 'Saint-Tropez', position: [43.273612, 6.639691], code: '83119' }
];

function CommunePopupMarker(props) {
  const { classes, commune, onClickMarker } = props;
  return (
    <Marker position={commune.position} onClick={onClickMarker}>
      <Popup maxWidth={400}>
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
          <ChercherAddresse className={classes.searchInput} commune={commune} />
        </Container>
      </Popup>
    </Marker>
  );
}
CommunePopupMarker.propTypes = {
  commune: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onClickMarker: PropTypes.func.isRequired
};

function CommunesMarkersList(props) {
  const { communes, classes, onClickMarker } = props;
  const markers = communes.map(commune => (
    <CommunePopupMarker
      key={commune.code}
      commune={commune}
      classes={classes}
      onClickMarker={onClickMarker}
    />
  ));
  return <React.Fragment>{markers}</React.Fragment>;
}
CommunesMarkersList.propTypes = {
  communes: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  onClickMarker: PropTypes.func.isRequired
};

class CommunesMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      adresses: [],
      parcelles: [],
      communes: COMMUNES
    };
  }

  findCommuneByLatLng = (lat, lng) => {
    return this.COMMUNES.find(
      commune => commune.position[0] === lat && commune.position[1] === lng
    );
  };

  getGeoJSONStyle = (feature, layer) => {
    return {
      color: '#006400',
      weight: 5,
      opacity: 0.65
    };
  };

  rechercherParcelles = () => {
    const parcellesUrl =
      'https://cadastre.data.gouv.fr/bundler/cadastre-etalab/communes/';
    const parcellesUri = '/geojson/parcelles';
    fetch(parcellesUrl + this.state.commune + parcellesUri)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            parcelles: result
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  };

  render() {
    const { classes, onClickMarker } = this.props;
    const { error, parcelles, communes } = this.state;
    if (error) {
      return <div>Erreur: {error.message}</div>;
    } else {
      return (
        <React.Fragment>
          <GeoJSON
            data={parcelles}
            attribution={`adresses et cadastre © <a href="https://www.etalab.gouv.fr">Etalab</a>/<a href="https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf">Licence-Ouverte-v2.0</a>`}
            style={this.getGeoJSONStyle}
          />
          <CommunesMarkersList
            communes={communes}
            classes={classes}
            onClickMarker={onClickMarker}
          />
        </React.Fragment>
      );
    }
  }
}
CommunesMap.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickMarker: PropTypes.func.isRequired
};

export default compose(
  withRoot,
  withStyles(styles)
)(CommunesMap);
