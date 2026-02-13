import * as functions from 'firebase-functions';
import { createNestServer } from '../../src/main';

let server: any;

export const api = functions
  .region('us-central1')
  .https.onRequest(async (req, res) => {
    if (!server) {
      server = await createNestServer();
    }
    return server(req, res);
  });
