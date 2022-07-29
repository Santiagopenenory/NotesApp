import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import noteRoutes from './routes/note.routes'

const app = express();

app.use(morgan('dev'));
app.use(cors())
app.use(express.json())

app.use(noteRoutes)


export default app;