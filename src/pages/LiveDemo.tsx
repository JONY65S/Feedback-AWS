import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { v4 as uuidv4 } from 'uuid';

const LiveDemo = () => {
  const [comment, setComment] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: '', // 'success' or 'error'
  });

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!comment) {
      setNotification({ message: 'Por favor ingrese un comentario.', type: 'error' });
      return;
    }

    const timestamp = new Date().toISOString();
    const commentData = {
      comments: [
        {
          id: uuidv4(),
          comment,
          timestamp,
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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Deja tu comentario</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Escribe tu comentario"
          value={comment}
          onChange={handleCommentChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full p-3 text-white font-semibold rounded-lg ${
            isUploading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {isUploading ? 'Subiendo...' : 'Subir Comentario'}
        </button>
      </form>

      {/* Toast Notification */}
      {notification.message && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-96 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          <p className="text-center font-semibold">{notification.message}</p>
        </div>
      )}
    </div>
  );
};

export default LiveDemo;
