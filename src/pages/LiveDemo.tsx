import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';

const LiveDemo = () => {
  const [comment, setComment] = useState('');
  const [edad, setEdad] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: '', // 'success' or 'error'
  });

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleEdadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEdad(event.target.value);
  };

  const handleEstadoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEstado(event.target.value);
  };

  const handlePaisChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPais(event.target.value);
  };

  const handleMunicipioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMunicipio(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!comment || !edad || !estado || !pais || !municipio) {
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
          estado,
          pais,
          municipio,
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
    <div className="bg-[#FAF3E0]  py-6 h-screen flex justify-center items-center">

      <div className="max-w-lg mx-auto p-8 bg-gray-900 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">¡Déjanos tu Comentario!</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Escribe tu comentario"
            value={comment}
            onChange={handleCommentChange}
            required
            className="w-full p-4 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Edad"
              value={edad}
              onChange={handleEdadChange}
              required
              className="w-full p-4 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            />
            <input
              type="text"
              placeholder="Estado"
              value={estado}
              onChange={handleEstadoChange}
              required
              className="w-full p-4 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="País"
              value={pais}
              onChange={handlePaisChange}
              required
              className="w-full p-4 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            />
            <input
              type="text"
              placeholder="Municipio"
              value={municipio}
              onChange={handleMunicipioChange}
              required
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

        {/* Toast Notification */}
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
