import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#133E87',
      one: '#2C74B3',
      two: '#205295',
      three: '#144272',
      four: '#0A2647',
    },
    error: {
      main: '#CD1616',
    },
    success: {
      main: '#0C7E6E',
    },
    warning: {
      main: '#F2A001',
    },
    grey: {
      main: '#E6E6E6',
      dark: '#636363',
    },
    white: {
      main: '#ffffff',
    },
  },
});

export default theme;
