import axios from 'axios';

const API_URL = 'https://jb03bfcn34.execute-api.us-west-2.amazonaws.com/dev'; // Reemplaza con la URL real de tu API

// Función para obtener los datos de comentarios
export const fetchCommentsData = async () => {
  try {
    const response = await axios.get(`${API_URL}/comments`);
    
    // Verificamos si la respuesta es exitosa
    if (response.status === 200) {
      return response.data; // Retorna los datos obtenidos
    } else {
      console.error(`Unexpected response status: ${response.status}`);
      throw new Error('Failed to fetch comments data');
    }
  } catch (error: any) {
    // Manejo de errores específico (diferenciar entre error de red, error de API, etc.)
    if (error.response) {
      // Error de la respuesta de la API (por ejemplo, 404, 500)
      console.error('Error fetching comments data:', error.response.data);
    } else if (error.request) {
      // Error de red o no se pudo hacer la solicitud
      console.error('No response received:', error.request);
    } else {
      // Error desconocido en la configuración de la solicitud
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
};
