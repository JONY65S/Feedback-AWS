import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';

const LiveDemo = () => {
  const [comment, setComment] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!comment) {
      alert('Por favor ingrese un comentario.');
      return;
    }

    const timestamp = new Date().toISOString(); // Timestamp en formato ISO
    const commentData = {
      comments: [
        {
          id: `${Date.now()}`, // ID único basado en el tiempo
          comment,
          timestamp,
        },
      ],
    };

    const jsonData = JSON.stringify(commentData); // Convertir el objeto a JSON

    try {
      setIsUploading(true);

      // Subir el archivo JSON al bucket S3
      const fileName = `comments/comments_${timestamp}.json`; // Nombre del archivo basado en la fecha y comentario
      const result = await uploadData({
        path: fileName, // Ruta dentro del bucket
        data: new Blob([jsonData], { type: 'application/json' }), // Crear un Blob con los datos JSON
      }).result;

      console.log('Archivo subido exitosamente:', result);
      alert('Comentario subido exitosamente');
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      alert('Hubo un error al subir el comentario.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h2>Deja tu comentario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe tu comentario"
          value={comment}
          onChange={handleCommentChange}
          required
        />
        <button type="submit" disabled={isUploading}>
          {isUploading ? 'Subiendo...' : 'Subir Comentario'}
        </button>
      </form>
    </div>
  );
};

export default LiveDemo;
