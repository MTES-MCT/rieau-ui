import React from 'react';
import Control from 'react-leaflet-control';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ZoomOutMap from '@material-ui/icons/ZoomOutMap';
import Help from '@material-ui/icons/Help';
import HowToVote from '@material-ui/icons/HowToVote';
import Button from 'components/Button';
import Container from '@material-ui/core/Container';
import Popover from '@material-ui/core/Popover';
import Typography from 'components/Typography';

const styles = theme => ({
  containerNotFound: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center'
  }
});

class MapControls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.onClickHelp = this.onClickHelp.bind(this);
    this.onCloseHelp = this.onCloseHelp.bind(this);
  }

  onClickHelp = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  onCloseHelp = event => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { classes, onClickReset } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : null;
    return (
      <React.Fragment>
        <Control position="topright">
          <Button color="primary" variant="contained" onClick={onClickReset}>
            <ZoomOutMap />
            Recentrer
          </Button>
        </Control>
        <Control position="bottomleft">
          <Button
            color="primary"
            variant="contained"
            onClick={this.onClickHelp}
            aria-describedby={id}
          >
            <Help />
            Aide
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={this.onCloseHelp}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
          >
            <Container className={classes.containerNotFound}>
              <Typography
                variant="h6"
                gutterBottom
                marked="center"
                align="center"
              >
                {`La commune n'apparaît pas ?`}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                marked="center"
                align="center"
              >
                {`En attendant qu'elle fasse partie des communes partenaires vous pouvez déposer le dossier papier en mairie:`}
              </Typography>
              <Button
                color="primary"
                variant="contained"
                href="https://www.service-public.fr/particuliers/vosdroits/F17578"
              >
                <HowToVote />
                Déposer
              </Button>
            </Container>
          </Popover>
        </Control>
      </React.Fragment>
    );
  }
}

MapControls.propTypes = {
  classes: PropTypes.object.isRequired,
  onClickReset: PropTypes.func.isRequired
};

export default withStyles(styles)(MapControls);
