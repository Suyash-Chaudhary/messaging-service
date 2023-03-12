import express from "express";
import { NamespaceController } from "./namespace.controller";

export const register = (app: express.Application) => {
  const router = express.Router();
  const controller = new NamespaceController();
  router.get("/search", controller.search);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.destroy);
  router.get("/:id", controller.getById);
  app.use("/api/v1/namespaces", router);
};
