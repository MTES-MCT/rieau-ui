import React from 'react';
import { GeoJSON } from 'react-leaflet';
import PropTypes from 'prop-types';

class ParcellesLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      parcelles: []
    };
  }

  getGeoJSONStyle = (feature, layer) => {
    return {
      color: '#006400',
      weight: 5,
      opacity: 0.65
    };
  };

  rechercherParcelles = async commune => {
    const parcellesUrl =
      'https://cadastre.data.gouv.fr/bundler/cadastre-etalab/communes/';
    const parcellesUri = '/geojson/parcelles';
    return await fetch(parcellesUrl + commune.code + parcellesUri)
      .then(res => res.json())
      .then(
        result => result,
        error => {
          this.setState({
            error
          });
        }
      );
  };

  render() {
    const { commune } = this.props;
    const { error } = this.state;
    if (error) {
      return <div>Erreur: {error.message}</div>;
    } else {
      return (
        <GeoJSON
          data={this.rechercherParcelles(commune)}
          attribution={`adresses et cadastre © <a href="https://www.etalab.gouv.fr">Etalab</a>/<a href="https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf">Licence-Ouverte-v2.0</a>`}
          style={this.getGeoJSONStyle}
        />
      );
    }
  }
}
ParcellesLayer.propTypes = {
  commune: PropTypes.object.isRequired
};

export default ParcellesLayer;
