import React from 'react';
import Snackbar from 'components/Snackbar';
import PropTypes from 'prop-types';

function logErrorToMyService(error, info) {
  window.console.log('error=' + JSON.stringify(error));
  window.console.log('info=' + JSON.stringify(info));
}

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false, message: 'Oops! Une erreur est survenue.' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: JSON.stringify(error) };
  }

  componentDidCatch(error, info) {
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Snackbar variant="error" message={this.state.message} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
