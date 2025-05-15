import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',   // or 'dark'
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ac0800',
    },
  },
  typography: {
    // customize font sizes, fontFamily, etc.
  },
});

export default theme;
