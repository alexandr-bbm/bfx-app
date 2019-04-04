import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {ThemeProvider} from 'styled-components'

import {configureStore} from './core/store'
import {App} from './core/app/App';
import {theme} from './shared/styles/theme';

import 'normalize.css/normalize.css'
import './index.scss';

ReactDOM.render(
  <Provider store={configureStore()}>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
