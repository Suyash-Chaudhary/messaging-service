import express from "express";
import { RoleController } from "./role.controller";

export const register = (app: express.Application) => {
  const router = express.Router();
  const controller = new RoleController();
  router.get("/search", controller.search);
  router.post("/", controller.create);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.destroy);
  router.get("/:id", controller.getById);
  app.use("/api/v1/roles", router);
};
