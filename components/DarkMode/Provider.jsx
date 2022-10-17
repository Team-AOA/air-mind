import React from 'react';
import useDarkMode from 'use-dark-mode';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';

export default function Providers({ children }) {
  const darkMode = useDarkMode(true);
  const theme = darkMode.value ? darkTheme : lightTheme;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

Providers.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};
