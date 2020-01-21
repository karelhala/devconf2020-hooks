import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import ReduxShowCase from './redux/redux-show-case';
import LifeCycleTransform from './lifecycle-transform';

function App() {
  return (
    <ThemeProvider theme={createMuiTheme({})}>
      <CssBaseline />
      <Container maxWidth={false}>
          <BrowserRouter>
            <Switch>
              <Route path="/redux">
                <ReduxShowCase />
              </Route>
              <Route path="">
                <LifeCycleTransform/>
              </Route>
            </Switch>
          </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
