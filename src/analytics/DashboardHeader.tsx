import React from 'react';
import LiveGreeting from './LiveDateTime'; // Asegúrate de que el archivo esté en la misma carpeta

const DashboardHeader: React.FC = () => {
  return (
    <div className="pl-4 pr-4 pt-4 pb-6">
      {/* Aquí se integra el componente LiveGreeting */}
      <LiveGreeting />
    </div>
  );
};

export default DashboardHeader;
