import React, { useState } from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Typography from 'components/Typography';
import Button from 'components/Button';
import Box from '@material-ui/core/Box';

const maxWidth = 400;
const maxFontSize = 24;
const coefMax = 0.4;

const styles = theme => ({
  root: {
    padding: 2
  },
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'flex'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    [theme.breakpoints.down('md')]: {
      width: maxWidth * coefMax,
      fontSize: maxFontSize * coefMax
    },
    [theme.breakpoints.up('md')]: {
      width: maxWidth,
      fontSize: maxFontSize
    }
  },
  input: {
    [theme.breakpoints.down('md')]: {
      width: maxWidth
    },
    [theme.breakpoints.up('md')]: {
      width: maxWidth
    }
  }
});

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      data-cy="chercher-adresse-input"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, key) => (
          <span key={key} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function ChercherAddresse(props) {
  const {
    classes,
    commune,
    resetCommune,
    setErreur,
    onClickSelectAddress
  } = props;
  const [adresse, setAdresse] = useState('');
  const [adresses, setAdresses] = useState([]);
  const theme = {
    container: classes.container,
    suggestionsContainerOpen: classes.suggestionsContainerOpen,
    suggestionsList: classes.suggestionsList,
    suggestion: classes.suggestion
  };

  function buildSuggestions(result) {
    return result.features.map(feature => {
      var suggestion = {};
      suggestion.value = feature.properties.id;
      suggestion.label = feature.properties.label;
      suggestion.position = [
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0]
      ];
      return suggestion;
    });
  }

  function sanitizedAdresse(adresse) {
    return deburr(adresse.trim()).toLowerCase();
  }

  async function rechercherAdresses() {
    const adresseUrl = 'https://api-adresse.data.gouv.fr/search/?q=';
    const adresseSanitized = sanitizedAdresse(adresse);
    return await fetch(
      adresseUrl + adresseSanitized + '&citycode=' + commune.code
    )
      .then(res => res.json())
      .then(
        result => buildSuggestions(result),
        error => setErreur(error)
      );
  }

  async function onSuggestionsFetchRequested() {
    setAdresses(await rechercherAdresses());
  }

  function onSuggestionsClearRequested() {
    setAdresses([]);
  }

  function onSuggestionSelected(event, { suggestion }) {
    setAdresses(getSuggestionValue(suggestion));
    onClickSelectAddress(suggestion);
  }

  function getSuggestionValue(suggestion) {
    return suggestion.label;
  }

  function shouldRenderSuggestions(value) {
    return value.trim().length > 3;
  }

  function onChange(event, { newValue }) {
    setAdresse(newValue);
  }

  function onBlur(event, { highlightedSuggestion }) {
    if (highlightedSuggestion) {
      setAdresse(getSuggestionValue(highlightedSuggestion));
      onClickSelectAddress(highlightedSuggestion);
    }
  }
  const inputProps = {
    classes,
    placeholder: 'Ex: 1 rue des Fleurs...',
    value: adresse,
    onChange: onChange,
    onBlur: onBlur
  };
  return (
    <div className={classes.root}>
      {commune && (
        <Paper>
          <Box
            display="flex"
            flexDirection="column"
            p={1}
            m={1}
            alignItems="center"
          >
            <Box p={1}>
              <Typography variant="subtitle2">{`Chercher l'adresse du projet à ${commune.nom}`}</Typography>
              <Autosuggest
                classes={classes}
                key={`autosuggest-${commune.code}`}
                data-cy={`chercher-adresse-input`}
                suggestions={adresses}
                shouldRenderSuggestions={shouldRenderSuggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                onSuggestionSelected={onSuggestionSelected}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                renderInputComponent={renderInputComponent}
                inputProps={inputProps}
                theme={theme}
                renderSuggestionsContainer={options => (
                  <Paper {...options.containerProps} square>
                    {options.children}
                  </Paper>
                )}
              />
            </Box>
            <Box p={1}>
              <Button color="inherit" variant="outlined" onClick={resetCommune}>
                {`Changer de commune`}
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </div>
  );
}
ChercherAddresse.propTypes = {
  classes: PropTypes.object,
  commune: PropTypes.object,
  onClickSelectAddress: PropTypes.func.isRequired,
  resetCommune: PropTypes.func.isRequired,
  setErreur: PropTypes.func.isRequired
};

export default withStyles(styles)(ChercherAddresse);
