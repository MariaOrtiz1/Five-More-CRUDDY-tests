import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js'; 
import bunniesController from './controllers/bunnies.js';
import sundaesController from './controllers/sundaes.js';

const app = express();

app.use(express.json());

app.use('/api/v1/bunnies', bunniesController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
