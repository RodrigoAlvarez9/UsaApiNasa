import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { RouterProvider , createBrowserRouter } from 'react-router-dom';

import Home from './paginas/home';
import 'bootstrap/dist/css/bootstrap.min.css';



const roteador = createBrowserRouter([
  {path: '/', element: <Home/>}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={roteador} />
  </React.StrictMode>
);

reportWebVitals();
