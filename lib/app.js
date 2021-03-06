import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js'; 
import bunniesController from './controllers/bunnies.js';
import sundaesController from './controllers/sundaes.js';
import charactersController from './controllers/characters.js';
import championsController from './controllers/champions.js';
import trialsController from './controllers/trials.js';

const app = express();

app.use(express.json());

app.use('/api/v1/bunnies', bunniesController);
app.use('/api/v1/sundaes', sundaesController);
app.use('/api/v1/characters', charactersController);
app.use('/api/v1/champions', championsController);
app.use('/api/v1/trials', trialsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
