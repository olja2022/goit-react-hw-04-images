import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import { Context } from 'Context/Context';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {
      <Context>
        <App className="App" />
      </Context>
    }
  </React.StrictMode>
);
