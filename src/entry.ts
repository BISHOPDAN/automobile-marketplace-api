import dotenv from 'dotenv';
import mongoose from 'mongoose';
import createApp from './app';

dotenv.config();

function startServer() {
  const app = createApp();
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : `http://localhost:${port}`;
    console.log(`Server running on ${baseUrl}`);

    const dbUri = process.env.DB_URI;
    if (!dbUri) {
      console.error('DB connection string is missing.');
      process.exit(1);
    }

    mongoose.set('strictQuery', false);

    // Connect to the database using promises
    mongoose.connect(dbUri, { ignoreUndefined: true })
      .then(() => {
        console.log('automobile 🙏 [connected]');
        console.log(`App URL: ${baseUrl}`);
      })
      .catch((err) => {
        console.error('Failed to connect to DB:', err);
      });
  });
}

startServer();