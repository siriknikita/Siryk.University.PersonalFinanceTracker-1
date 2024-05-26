import React, { useContext } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext } from './theme';
import { UserContext } from './App';

const AuthorizedThemeProvider = ({ colorMode, theme, children }) => {
  const { isAuthorized } = useContext(UserContext);

  if (!isAuthorized) {
    return <>{children}</>;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AuthorizedThemeProvider;
