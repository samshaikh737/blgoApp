import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from './OwnRedux/Provider';
import { Reducer, db } from './OwnRedux/Reducer';


ReactDOM.render(
  <React.StrictMode>
    <Provider reducer={Reducer} database={db} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('blogApp')
);
