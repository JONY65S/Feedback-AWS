import React, { useEffect, useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';

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

const LiveDemo = () => {
  const [comment, setComment] = useState('');
  const [edad, setEdad] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Cargar los datos desde el archivo JSON o API
  useEffect(() => {
    const loadCountries = async () => {
      const response = await fetch('/country.json');
      const data = await response.json();
      setCountries(data);
    };
    loadCountries();
  }, []);

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value);

  const handleEdadChange = (event: React.ChangeEvent<HTMLSelectElement>) => setEdad(event.target.value);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const countryId = parseInt(event.target.value, 10);
    const country = countries.find((c) => c.id === countryId);
    setSelectedCountry(country || null);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const stateId = parseInt(event.target.value, 10);
    const state = selectedCountry?.states.find((s) => s.id === stateId);
    setSelectedState(state || null);
    setSelectedCity(null);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = parseInt(event.target.value, 10);
    const city = selectedState?.cities.find((c) => c.id === cityId);
    setSelectedCity(city || null);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
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
          pais: selectedCountry?.name || '',
          estado: selectedState?.name || '',
          ciudad: selectedCity?.name || '',
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
  
      // Limpiar los campos después de un retraso
      setTimeout(() => {
        setComment('');
        setEdad('');
        setSelectedCountry(null);
        setSelectedState(null);
        setSelectedCity(null);
        setNotification({ message: '', type: '' }); // Limpiar notificación
      }, 3000); // La notificación desaparece después de 3 segundos
  
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      setNotification({ message: 'Hubo un error al subir el comentario.', type: 'error' });
  
      // Limpiar notificación después de 3 segundos
      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    } finally {
      setIsUploading(false);
    }
  };
  

  return (
    <div className="bg-[#FAF3E0] py-6 h-screen flex justify-center items-center">
      <div className="max-w-lg mx-auto p-8 bg-gray-900 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">¡Déjanos tu Comentario!</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Edad */}
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

          {/* País */}
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

          {/* Estado */}
          {selectedCountry?.states && (
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

          {/* Ciudad */}
          {selectedState?.cities && (
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

          {/* Comentario */}
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

          {/* Botón */}
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

        {/* Notificación */}
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
