import { createMuiTheme } from '@material-ui/core/styles';

  const palette = {
    primary: {
      light: '#d3a3df',
      main: '#a174ad',
      dark: '#72487e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffe9ff',
      main: '#f7b6e6',
      dark: '#c386b4',
      contrastText: '#000',
    },
  }


export default createMuiTheme({
  palette,
  typography: {
    fontFamily: [
      'Quicksand',
      'Amatic SC',
      'Indie Flower',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});
