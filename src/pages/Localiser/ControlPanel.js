import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from 'components/Typography';
import IconButton from '@material-ui/core/IconButton';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import communesPartenaires from './communesPartenaires';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    maxWidth: '320px',
    background: '#fff',
    boxShadow: `0 '2px' '4px' rgba(0,0,0,0.3)`,
    padding: '24px',
    margin: '20px',
    color: '#6b6b76',
    outline: 'none'
  },
  containerNotFound: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center'
  }
});

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commune: null
    };
  }
  static propTypes = {
    classes: PropTypes.object.isRequired,
    communes: PropTypes.array.isRequired,
    containerComponent: PropTypes.node,
    onViewportChange: PropTypes.func.isRequired,
    onSelectCommune: PropTypes.func.isRequired
  };

  defaultContainer = ({ children }) => (
    <Container className={this.props.classes.root}>{children}</Container>
  );

  handleCommuneChange = event => {
    this.setState({ commune: this.findCommuneByCode(event.target.value) });
    this.props.onSelectCommune(this.findCommuneByCode(event.target.value));
  };

  findCommuneByCode = code => {
    return communesPartenaires.find(commune => commune.code === code);
  };

  render() {
    const ControlPanelContainer =
      this.props.containerComponent || this.defaultContainer;
    const { communes, classes, onViewportChange } = this.props;
    const { commune } = this.state;
    return (
      <ControlPanelContainer>
        <FormControl component="fieldset">
          <FormLabel component="legend">Communes partenaires</FormLabel>
          <RadioGroup
            aria-label="Communes partenaires"
            name="commune"
            value={commune ? commune.code : ''}
            onChange={this.handleCommuneChange}
          >
            {communes.map((commune, key) => (
              <FormControlLabel
                key={key}
                value={commune.code}
                label={commune.nom}
                control={<Radio />}
                onClick={() => onViewportChange(commune)}
              />
            ))}
          </RadioGroup>
        </FormControl>{' '}
        <Container className={classes.containerNotFound}>
          <Typography variant="subtitle2">
            {`La commune n'apparaît pas ?`}
          </Typography>
          <IconButton
            color="inherit"
            href="https://www.service-public.fr/particuliers/vosdroits/F17578"
          >
            <HowToVoteIcon aria-label="Déposer en mairie" />
            <Typography variant="body2">{`Déposer en mairie`}</Typography>
          </IconButton>
        </Container>
      </ControlPanelContainer>
    );
  }
}

export default withStyles(styles)(ControlPanel);
