import express, { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as dotenv from 'dotenv';
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from './src/shared/middleware/error-handler';
import { router as truckRoutes, base as truckBase } from "./src/features/trucks/truck.routes";
import { connect } from './src/shared/database/mongoose';
import cookieParser from "cookie-parser";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Truck Maintenance API',
      version: '1.0.0',
      description: 'API documentation for the Truck Maintenance application',
    },
  },
  apis: ['./src/features/**/*.routes.ts'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
connect();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production')
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.use(truckBase, truckRoutes);


app.use(errorHandler);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});