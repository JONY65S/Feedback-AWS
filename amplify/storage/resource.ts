// amplify/storage/resource.ts
import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'smart-feedback-bucket' // Aquí pones el nombre de tu bucket existente
});
