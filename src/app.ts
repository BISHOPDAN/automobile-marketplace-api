import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './config/swagger';
import routes from './routes';

function createApp(): Application {
  const app: Application = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use(cors());

  // Define routes
  app.use('/api', routes);

  return app;
}

export default createApp;
