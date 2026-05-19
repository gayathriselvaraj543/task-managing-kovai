import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';
import globalErrorHandler from './middleware/errorHandler.js';
import ApiError from './utils/apiError.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Simple health endpoint and ignore favicon requests to avoid noisy 404 logs
app.get('/', (req, res) => res.status(200).json({ status: 'ok', message: 'API running' }));
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use((req, res, next) => {
  next(new ApiError(404, 'Route not found'));
});

app.use(globalErrorHandler);

export default app;
