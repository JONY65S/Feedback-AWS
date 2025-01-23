import React, { useEffect, useState } from 'react';

const LiveGreeting: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [utcOffset, setUtcOffset] = useState(0); // UTC por defecto
  const [showUTCSelector, setShowUTCSelector] = useState(false); // Controla la visibilidad del combo box

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date(new Date().getTime() + utcOffset * 60 * 60 * 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [utcOffset]);

  const formatGreeting = () => {
    const currentTime = new Date(); // Asegúrate de definir esto
    const hour = currentTime.getUTCHours(); // Cambiar a getHours() si prefieres hora local
    if (hour < 12) return '¡Buenos noches!';
    if (hour < 18) return '¡Buenas días!';
    return '¡Buenas tardes!';
  };
  const formatDate = () =>
    currentTime.toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const formatTime = () =>
    currentTime.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const handleUTCChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUtcOffset(Number(event.target.value));
    setShowUTCSelector(false); // Oculta el combo box después de seleccionar
  };

  return (
    <div className="p-6 border border-gray-800 rounded-lg shadow-lg bg-gray-900 max-w-xl mx-auto relative"> {/* Cambié max-w-sm por max-w-xl */}
      {/* Botón para mostrar/ocultar el selector de UTC */}
      <button
        className="absolute top-2 right-2 text-yellow-500 bg-gray-800 px-2 py-1 rounded hover:bg-gray-700 transition"
        onClick={() => setShowUTCSelector((prev) => !prev)}
      >
        UTC {utcOffset >= 0 ? `+${utcOffset}` : utcOffset}
      </button>

      {/* Selector UTC */}
      {showUTCSelector && (
        <select
          className="absolute top-10 right-2 bg-gray-700 text-yellow-500 rounded px-2 py-1 focus:outline-none"
          value={utcOffset}
          onChange={handleUTCChange}
        >
          {Array.from({ length: 25 }, (_, i) => i - 12).map((offset) => (
            <option key={offset} value={offset}>
              UTC {offset >= 0 ? `+${offset}` : offset}
            </option>
          ))}
        </select>
      )}

      <h2 className="text-2xl font-bold mb-4 text-center text-yellow-500">{formatGreeting()}</h2>

      {/* <div className="text-center">
        <p className="text-yellow-500 text-lg font-medium mb-2">Fecha Actual</p>
        <p className="text-yellow-500 text-xl font-semibold">{formatDate()}</p>
      </div>

      <div className="text-center mt-2">
        <p className="text-yellow-500 text-lg font-medium mb-2">Hora Actual</p>
        <p className="text-yellow-500 text-2xl font-bold">{formatTime()}</p>
      </div> */}

      <div className="text-center">
        <p className="text-yellow-500 text-lg font-medium mb-2">

          Fecha: {formatDate()} <br />
          Hora: {formatTime()}
        </p>
      </div>

    </div>
  );
};

export default LiveGreeting;
