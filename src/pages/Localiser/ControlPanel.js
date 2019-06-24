import React, { useState } from 'react';
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

function ControlPanel(props) {
  const {
    communes,
    classes,
    onViewportChange,
    containerComponent,
    onSelectCommune
  } = props;
  const ControlPanelContainer = containerComponent || DefaultContainer;
  const [commune, setCommune] = useState();

  function DefaultContainer(props) {
    const { children } = props;
    return <Container className={classes.root}>{children}</Container>;
  }
  DefaultContainer.propTypes = {
    children: PropTypes.node.isRequired
  };

  function handleCommuneChange(event) {
    const commune = findCommuneByCode(event.target.value);
    setCommune(commune);
    onSelectCommune(commune);
  }

  function handleSelectCommune(commune) {
    setCommune(commune);
    onSelectCommune(commune);
    onViewportChange(commune);
  }

  function findCommuneByCode(code) {
    return communesPartenaires.find(commune => commune.code === code);
  }
  return (
    <ControlPanelContainer>
      <FormControl component="fieldset">
        <FormLabel component="legend">Communes partenaires</FormLabel>
        <RadioGroup
          aria-label="Communes partenaires"
          name="commune"
          value={commune ? commune.code : ''}
          onChange={handleCommuneChange}
        >
          {communes.map((commune, key) => (
            <FormControlLabel
              key={key}
              value={commune.code}
              label={commune.nom}
              control={<Radio />}
              onClick={() => handleSelectCommune(commune)}
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
ControlPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  communes: PropTypes.array.isRequired,
  containerComponent: PropTypes.node,
  onViewportChange: PropTypes.func.isRequired,
  onSelectCommune: PropTypes.func.isRequired
};

export default withStyles(styles)(ControlPanel);
