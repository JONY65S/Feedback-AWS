import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.tsx'
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports'; // Ajusta la ruta si es necesario

Amplify.configure(awsExports); // Asegúrate de que esta línea esté presente y correcta


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
