import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import {teal, orange} from 'material-ui/colors'
import { hot } from 'react-hot-loader'

const theme = createMuiTheme({
  palette: {
    primary: {
    light: '#52c7b8',
    main: '#4267B2',
    dark: '#00675b',
    contrastText: '#fff',
  },
  secondary: {
    light: '#282828',
    main: '#63747a',
    dark: '#c77800',
    contrastText: '#000',
  },
    openTitle: teal['700'],
    protectedTitle: orange['700'],
    type: 'light'
  }
})
//application du them en post chargement 
const App = () => (
  <BrowserRouter>
    <MuiThemeProvider theme={theme}>
      <MainRouter/>
    </MuiThemeProvider>
  </BrowserRouter>
)

export default hot(module)(App)
