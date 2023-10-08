// File: src/api/index.ts
import { Router } from "express";
import productOptionValueRoutes from "./routes/admin/product-option-value-routes";
import cors from "cors"
import bodyParser from 'body-parser';
import { getConfigFile } from "medusa-core-utils"
import { ConfigModule } from "@medusajs/medusa/dist/types/global"

export default (rootDirectory) => {
  const { configModule } = getConfigFile<ConfigModule>(rootDirectory, "medusa-config")
  const { projectConfig } = configModule

  // Apply CORS to your route
  const corsOptions = {
    origin: projectConfig.admin_cors.split(","),
    optionsSuccessStatus: 200,
    credentials: true,
  };

  const router = Router();
  router.use(cors(corsOptions), bodyParser.json());

  // Import the product option value routes
  productOptionValueRoutes.register(router);
  return router;
};