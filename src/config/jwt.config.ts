import { envConfig } from './env';

export const jwtConfig = {
  secret: envConfig.jwtSecret,
  signOptions: {
    expiresIn: envConfig.jwtExpiration,
  },
};
