import express, { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as dotenv from 'dotenv';
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from './src/middleware/errorHandler';
import { connect } from './src/config/mongoose';
import cookieParser from "cookie-parser";
import { Environment } from './src/config/environment';
import { isAuthorized } from './src/middleware/auth';
import router from './src/routes';
dotenv.config();
const app: Express = express();
const port = process.env.PORT;
// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: 'Truck Maintenance API',
//       version: '1.0.0',
//       description: 'API documentation for the Truck Maintenance application',
//     },
//   },
//   apis: ['./src/features/**/*.routes.ts'],
// };
// const swaggerSpec = swaggerJsdoc(swaggerOptions);
connect();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// if (!Environment.getInstance().isProduction)
//   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.use(isAuthorized);
app.use(router);


app.use(errorHandler);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});