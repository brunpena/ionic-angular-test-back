import { envConfig } from './env';

export const firebaseConfig = {
  projectId: envConfig.firebaseProjectId,
  privateKey: envConfig.firebasePrivateKey,
  clientEmail: envConfig.firebaseClientEmail,
};
