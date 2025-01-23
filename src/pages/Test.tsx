import { useState, useEffect } from 'react';
import axios from 'axios';

const CommentsTestComponent = () => {
  // Estado para manejar los comentarios, error y el estado de carga
  const [comments, setComments] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Esta función se encargará de realizar la solicitud GET
  const fetchComments = async () => {
    setIsLoading(true); // Inicia el estado de carga
    setError(null); // Resetea cualquier error previo

    try {
      // Realiza la solicitud GET al endpoint de tu API
      const response = await axios.get(
        'https://jb03bfcn34.execute-api.us-west-2.amazonaws.com/dev/comments'
      );

      // Guarda los datos de los comentarios en el estado
      setComments(response.data);
    } catch (err) {
      // Si hay un error, lo mostramos
      setError('Error fetching data');
    } finally {
      // Finaliza el estado de carga
      setIsLoading(false);
    }
  };

  // Usamos useEffect para llamar a la función fetchComments cuando el componente se monte
  useEffect(() => {
    fetchComments();
  }, []); // El array vacío asegura que la llamada solo se realice una vez

  return (
    <div>
      <h2>Comentarios:</h2>
      
      {/* Botón para forzar la solicitud GET */}
      <button onClick={fetchComments}>Cargar Comentarios</button>

      {/* Muestra el estado de carga */}
      {isLoading && <p>Cargando...</p>}

      {/* Muestra los posibles errores */}
      {error && <p>{error}</p>}

      {/* Muestra la lista de comentarios si existen */}
      {comments.length > 0 && (
        <ul>
          {comments.map((comment: any, index: number) => (
            <li key={index}>
              <strong>Comentario:</strong> {comment.ComentarioTexto} <br />
              <strong>Edad:</strong> {comment.Edad} <br />
              <strong>Recomendacion:</strong> {comment.Recomendacion} <br />
              <strong>Sentimiento:</strong> {comment.Sentiment} <br />
              <strong>Sentiment Score:</strong> {comment.SentimentScore} <br />
              <strong>Pais:</strong> {comment.Pais} <br />
              <strong>Estado:</strong> {comment.Estado} <br />
              <strong>Ciudad:</strong> {comment.Ciudad} <br />
              <strong>Timestamp:</strong> {comment.Timestamp} <br /><br /><br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsTestComponent;
