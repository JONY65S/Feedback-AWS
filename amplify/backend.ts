// amplify/backend.ts
import { defineBackend } from '@aws-amplify/backend';
import { storage } from './storage/resource'; // Importar almacenamiento

defineBackend({
  storage // Añadir solo almacenamiento a la configuración del backend
});
