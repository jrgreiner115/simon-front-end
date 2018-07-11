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
      contrastText: '#fff',
    },
  }


export default createMuiTheme({
  palette,
  typography: {
    fontFamily: [
      'Gaegu',
      'Indie Flower',
      'Amatic SC',
      'Quicksand',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    "fontSize": 20,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  }
});
