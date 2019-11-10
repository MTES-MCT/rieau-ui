import React from 'react';
import PropTypes from 'prop-types';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CssBaseline from '@material-ui/core/CssBaseline';

function AppTheme(props) {
  const { children } = props;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme({
          palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            primary: {
              main: '#fff'
            },
            secondary: {
              main: '#4874b8'
            },
            info: {
              main: '#4874b8'
            },
            success: green[600],
            warning: amber[700]
          },
          typography: {
            fontFamily: "'Work Sans', sans-serif",
            fontSize: 14,
            fontWeightLight: 300, // Work Sans
            fontWeightRegular: 400, // Work Sans
            fontWeightMedium: 700, // Roboto Condensed
            fontFamilySecondary: "'Roboto Condensed', sans-serif"
          }
        })
      ),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

AppTheme.propTypes = {
  children: PropTypes.array.isRequired
};
export default AppTheme;
