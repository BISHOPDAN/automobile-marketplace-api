import dotenv from 'dotenv';
import mongoose from 'mongoose';
import createApp from './app';

dotenv.config();

function startServer() {
  const app = createApp();
  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);

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
        console.log(`http://localhost:${port}`);
      })
      .catch((err) => {
        console.error('Failed to connect to DB:', err);
      });
  });
}

startServer();