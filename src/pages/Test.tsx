import React, { useEffect, useState } from 'react';

// Definimos las interfaces de los datos
interface City {
  id: number;
  name: string;
}

interface State {
  id: number;
  name: string;
  cities: City[];
}

interface Country {
  id: number;
  name: string;
  states: State[];
}

const CountryStateCityDemo = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // Cargar los datos desde el archivo JSON o API
  useEffect(() => {
    // Puedes reemplazar esta URL con la URL de tu API si es necesario
    const loadCountries = async () => {
      const response = await fetch('/country.json');
      const data = await response.json();
      setCountries(data);
    };

    loadCountries();
  }, []);

  // Manejo de cambios en las selecciones
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = parseInt(event.target.value, 10);
    const country = countries.find((c) => c.id === countryId);
    setSelectedCountry(country || null);
    setSelectedState(null); // Resetear estado y ciudad al cambiar el país
    setSelectedCity(null);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stateId = parseInt(event.target.value, 10);
    const state = selectedCountry?.states.find((s) => s.id === stateId);
    setSelectedState(state || null);
    setSelectedCity(null); // Resetear ciudad al cambiar el estado
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = parseInt(event.target.value, 10);
    const city = selectedState?.cities.find((c) => c.id === cityId);
    setSelectedCity(city || null);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="country" className="block">Select Country:</label>
        <select id="country" onChange={handleCountryChange} className="w-full p-2 border border-gray-300">
          <option value="">-- Select Country --</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div>
          <label htmlFor="state" className="block">Select State:</label>
          <select id="state" onChange={handleStateChange} className="w-full p-2 border border-gray-300">
            <option value="">-- Select State --</option>
            {selectedCountry.states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedState && (
        <div>
          <label htmlFor="city" className="block">Select City:</label>
          <select id="city" onChange={handleCityChange} className="w-full p-2 border border-gray-300">
            <option value="">-- Select City --</option>
            {selectedState.cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedCity && (
        <div>
          <p>You selected: {selectedCity.name}, {selectedState?.name}, {selectedCountry?.name}</p>
        </div>
      )}
    </div>
  );
};

export default CountryStateCityDemo;
