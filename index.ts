import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import helmet from "helmet";
import cors from "cors";
import { errorHandler } from './src/shared/middleware/error-handler';
import { router as truckRoutes, base as truckBase } from "./src/features/trucks/truck.routes";
import { connect } from './src/shared/database/mongoose';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
connect();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(truckBase, truckRoutes);


app.use(errorHandler);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});