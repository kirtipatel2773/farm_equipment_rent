import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = Number(process.env.PORT) || 5001;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🌱 AgriRent Express API Server running on port ${PORT}`);
      console.log(`📡 Local Endpoint: http://localhost:${PORT}/api/health`);
      console.log(`🗄️ Connected to MongoDB Database: agrirent_db`);
      console.log(`====================================================`);
    });

    const shutdown = () => {
      console.log('\n[Server] Shutting down AgriRent API gracefully...');
      server.close(() => {
        console.log('[Server] HTTP connections closed.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (err) {
    console.error('[Server Fatal Error] Could not connect to MongoDB:', err.message);
    process.exit(1);
  }
};

startServer();
