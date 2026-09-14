import { connectDB } from '../config/db.js';
import app, { initializeApp } from '../server.js';

let initialization;

export default async function handler(req, res) {
  if (!initialization) {
    initialization = connectDB().then(initializeApp);
  }

  await initialization;
  return app(req, res);
}
