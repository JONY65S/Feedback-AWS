import React, { useEffect, useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';

const LiveDemo = () => {
  const [comment, setComment] = useState('');
  const [edad, setEdad] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countries, setCountries] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    // Simulación de carga de datos de país, estado y ciudad
    const loadCountries = async () => {
      const response = await fetch('/country.json');
      const data = await response.json();
      setCountries(data);
    };
    loadCountries();
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleEdadChange = (event) => {
    setEdad(event.target.value);
  };

  const handleCountryChange = (event) => {
    const countryId = parseInt(event.target.value, 10);
    const country = countries.find((c) => c.id === countryId);
    setSelectedCountry(country || null);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (event) => {
    const stateId = parseInt(event.target.value, 10);
    const state = selectedCountry?.states.find((s) => s.id === stateId);
    setSelectedState(state || null);
    setSelectedCity(null);
  };

  const handleCityChange = (event) => {
    const cityId = parseInt(event.target.value, 10);
    const city = selectedState?.cities.find((c) => c.id === cityId);
    setSelectedCity(city || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!comment || !edad || !selectedCountry || !selectedState || !selectedCity) {
      setNotification({ message: 'Por favor complete todos los campos.', type: 'error' });
      return;
    }

    const timestamp = new Date().toISOString();
    const commentData = {
      comments: [
        {
          id: uuidv4(),
          comment,
          timestamp,
          edad,
          pais: selectedCountry.name,
          estado: selectedState.name,
          ciudad: selectedCity.name,
        },
      ],
    };

    const jsonData = JSON.stringify(commentData);

    try {
      setIsUploading(true);
      const uniqueFolio = uuidv4();
      const fileName = `comments/${uniqueFolio}.json`;

      const result = await uploadData({
        path: fileName,
        data: new Blob([jsonData], { type: 'application/json' }),
      }).result;

      console.log('Archivo subido exitosamente:', result);
      setNotification({ message: 'Comentario subido exitosamente', type: 'success' });
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setNotification({ message: 'Hubo un error al subir el comentario.', type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-[#FAF3E0] py-6 h-screen flex justify-center items-center">
      <div className="max-w-lg mx-auto p-8 bg-gray-900 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">¡Déjanos tu Comentario!</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="edad" className="block text-white mb-1">Selecciona tu edad:</label>
            <select
              id="edad"
              value={edad}
              onChange={handleEdadChange}
              className="w-full p-4 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            >
              <option value="">-- Selecciona tu edad --</option>
              {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
                <option key={age} value={age}>{age}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="country" className="block text-white mb-1">Selecciona tu país:</label>
            <select
              id="country"
              onChange={handleCountryChange}
              className="w-full p-4 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            >
              <option value="">-- Selecciona País --</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>{country.name}</option>
              ))}
            </select>
          </div>

          {selectedCountry && (
            <div>
              <label htmlFor="state" className="block text-white mb-1">Selecciona tu estado:</label>
              <select
                id="state"
                onChange={handleStateChange}
                className="w-full p-4 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              >
                <option value="">-- Selecciona Estado --</option>
                {selectedCountry.states.map((state) => (
                  <option key={state.id} value={state.id}>{state.name}</option>
                ))}
              </select>
            </div>
          )}

          {selectedState && (
            <div>
              <label htmlFor="city" className="block text-white mb-1">Selecciona tu ciudad:</label>
              <select
                id="city"
                onChange={handleCityChange}
                className="w-full p-4 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              >
                <option value="">-- Selecciona Ciudad --</option>
                {selectedState.cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="comment" className="block text-white mb-1">Escribe tu comentario:</label>
            <textarea
              id="comment"
              placeholder="Escribe tu comentario"
              value={comment}
              onChange={handleCommentChange}
              required
              rows={5}
              className="w-full p-4 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            />
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className={`w-full p-4 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform ${
              isUploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {isUploading ? 'Subiendo...' : 'Subir Comentario'}
          </button>
        </form>

        {notification.message && (
          <div
            className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-96 p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
              notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
          >
            <p className="text-center font-semibold">{notification.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveDemo;
