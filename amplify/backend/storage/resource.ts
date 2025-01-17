export const storage = defineStorage({
    name: 'smart-feedback-bucket',  // Usa el bucket existente
    access: (allow) => ({
      'picture-submissions/*': [
        allow.guest.to(['read', 'write']),
      ],
    }),
  });
  