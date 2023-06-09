import dotenv from "dotenv";
dotenv.config();

import { Application } from "./app";
(async () => {
  const app = Application.instance();
  app.start();
})();
