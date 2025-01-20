import React, { useState } from 'react';

interface FiltersProps {
  onFilterChange: (key: string, value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const [periodType, setPeriodType] = useState('custom'); // 'custom' o 'fixed'
  const [selectedCountry, setSelectedCountry] = useState('');
  const [states, setStates] = useState<string[]>([]);

  const countries = [
    { name: 'México', states: ['Ciudad de México', 'Jalisco', 'Nuevo León'] },
    { name: 'Estados Unidos', states: ['California', 'Texas', 'Florida'] },
    { name: 'Canadá', states: ['Ontario', 'Quebec', 'British Columbia'] },
  ];

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country); // Almacena el valor del país seleccionado
    const countryStates = countries.find((c) => c.name === country)?.states || [];
    setStates(countryStates);
    onFilterChange('country', country); // Utiliza el valor de selectedCountry aquí
    onFilterChange('state', ''); // Reset state when country changes
    selectedCountry;
  };
  

  const handleClearFilters = () => {
    setPeriodType('custom');
    setSelectedCountry('');
    setStates([]);
    onFilterChange('startDate', '');
    onFilterChange('endDate', '');
    onFilterChange('fixedPeriod', '');
    onFilterChange('sentiment', '');
    onFilterChange('category', '');
    onFilterChange('country', '');
    onFilterChange('state', '');
  };

  return (
    <div className="p-4 border border-gray-800 rounded-lg shadow-lg bg-gray-900 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-yellow-500">Filtro</h2>

      {/* Tipo de Período */}
      <div className="mb-6">
        <label className="text-yellow-500 font-medium">Tipo de Período</label>
        <select
          className="border border-gray-700 p-1 rounded w-full mt-2 bg-gray-800 text-yellow-500 focus:ring-2 focus:ring-yellow-500"
          value={periodType}
          onChange={(e) => setPeriodType(e.target.value)}
        >
          <option value="custom">Personalizado</option>
          <option value="fixed">Fijo</option>
        </select>
      </div>

      {/* Fechas o Período Fijo */}
      {periodType === 'custom' ? (
        <div className="flex justify-between gap-4 mb-6">
          <div className="flex-1">
            <label className="text-yellow-500 font-medium">Fecha de Inicio</label>
            <input
              type="date"
              className="border border-gray-700 p-1 rounded w-1/8 mt-2 bg-gray-800 text-yellow-500 focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => onFilterChange('startDate', e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="text-yellow-500 font-medium">Fecha de Fin</label>
            <input
              type="date"
              className="border border-gray-700 p-1 rounded w-1/8 mt-2 bg-gray-800 text-yellow-500 focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => onFilterChange('endDate', e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <label className="text-yellow-500 font-medium">Período Fijo</label>
          <select
            className="border border-gray-700 p-1 rounded w-full mt-2 bg-gray-800 text-yellow-500 focus:ring-2 focus:ring-yellow-500"
            onChange={(e) => onFilterChange('fixedPeriod', e.target.value)}
          >
            <option value="">Seleccione un período</option>
            <option value="last7Days">Últimos 7 días</option>
            <option value="last30Days">Últimos 30 días</option>
            <option value="thisMonth">Este mes</option>
            <option value="lastMonth">Mes pasado</option>
          </select>
        </div>
      )}

      {/* Filtros adicionales */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Sentimiento */}
        <div>
          <label className="text-yellow-500 font-medium">Sentimiento</label>
          <select
            className="border border-gray-700 p-1 rounded w-full mt-2 bg-gray-800 text-yellow-500 focus:ring-2 focus:ring-yellow-500"
            onChange={(e) => onFilterChange('sentiment', e.target.value)}
          >
            <option value="">Todos</option>
            <option value="positive">Positivo</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negativo</option>
          </select>
        </div>

        {/* Categoría */}
        <div>
          <label className="text-yellow-500 font-medium">Categoría</label>
          <select
            className="border border-gray-700 p-1 rounded w-full mt-2 bg-gray-800 text-yellow-500 focus:ring-2 focus:ring-yellow-500"
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            <option value="">Seleccione una categoría</option>
            <option value="technology">Tecnología</option>
            <option value="health">Salud</option>
            <option value="education">Educación</option>
            <option value="entertainment">Entretenimiento</option>
          </select>
        </div>

        {/* País */}
        <div>
          <label className="text-yellow-500 font-medium">País</label>
          <select
            className="border border-gray-700 p-1 rounded w-full mt-2 bg-gray-800 text-yellow-500 focus:ring-2 focus:ring-yellow-500"
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            <option value="">Seleccione un país</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Estado */}
        <div>
          <label className="text-yellow-500 font-medium">Estado</label>
          <select
            className="border border-gray-700 p-1 rounded w-full mt-2 bg-gray-800 text-yellow-500 focus:ring-2 focus:ring-yellow-500"
            onChange={(e) => onFilterChange('state', e.target.value)}
            disabled={!states.length}
          >
            <option value="">Seleccione un estado</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-between">
        <button
          className="bg-yellow-500 text-gray-900 px-4 py-2 rounded shadow hover:bg-yellow-600"
          onClick={() => onFilterChange('apply', '')}
        >
          Aplicar Filtros
        </button>
        <button
          className="bg-gray-700 text-yellow-500 px-4 py-2 rounded shadow hover:bg-gray-600"
          onClick={handleClearFilters}
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};

export default Filters;
