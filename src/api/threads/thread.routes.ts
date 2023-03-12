import express from "express";
import { ThreadController } from "./thread.controller";

export const register = (app: express.Application) => {
  const router = express.Router();
  const controller = new ThreadController();
  router.get("/search", controller.search);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.destroy);
  router.get("/:id", controller.getById);
  app.use("/api/v1/threads", router);
};
