import React from 'react';
import ReactDOM from 'react-dom';

import Patients from './components/Patients';
import './css/Patients.css';

ReactDOM.render(
  <React.StrictMode>
    <Patients />
  </React.StrictMode>,
  document.getElementById('root')
);
