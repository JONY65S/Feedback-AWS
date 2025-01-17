import { Storage } from 'aws-amplify';

const commentsData = {
  comments: [
    {
      id: 4,
      comment: "La página está muy lenta y no carga bien en mi teléfono móvil.",
      timestamp: "2025-01-15T10:00:00Z",
    },
  ],
};

const fileName = `comments-${new Date().toISOString()}.json`; // Nombre único para el archivo

try {
  // Subir el archivo JSON al bucket especificado de S3
  await Storage.put(fileName, JSON.stringify(commentsData), {
    contentType: 'application/json',
  });
  alert('Comentario guardado correctamente');
} catch (err) {
  console.error('Error subiendo el archivo:', err);
}
