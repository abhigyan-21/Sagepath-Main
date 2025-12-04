import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import courseRoutes from './routes/courses.js';
import communityRoutes from './routes/community.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mount routes with and without /api prefix to handle Vercel path stripping
const routes = [
    { path: '/auth', route: authRoutes },
    { path: '/users', route: userRoutes },
    { path: '/courses', route: courseRoutes },
    { path: '/community', route: communityRoutes }
];

routes.forEach(({ path, route }) => {
    app.use(`/api${path}`, route);
    app.use(path, route);
});

app.get('/', (req, res) => {
    res.json({ message: 'Sagepath API is running with Supabase' });
});

app.get('/api', (req, res) => {
    res.json({ message: 'Sagepath API is running with Supabase (API Root)' });
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
