import express from "express";
import { Logger } from "../common/logger";
import { register as registerParticipantRoutes } from "../api/participants/participant.routes";
import { register as registerMessageRoutes } from "..//api/messages/message.routes";
import { register as registerThreadRoutes } from "..//api/threads/thread.routes";
import { register as registerNamespaceRoutes } from "..//api/namespaces/namespace.routes";
import { register as registerMembershipRoutes } from "..//api/memberships/membership.routes";
import { register as registerConversationRoutes } from "..//api/conversations/conversation.routes";
import { register as registerRoleRoutes } from "..//api/roles/role.routes";

export class Router {
  private _app: express.Application = null;

  constructor(app: express.Application) {
    this._app = app;
  }

  public async init() {
    try {
      this._app.get("/api/v1", (req, res) => {
        res.send({
          message: `Careplan Service API [Version ${process.env.API_VERSION}]`,
        });
      });
      registerParticipantRoutes(this._app);
      registerMessageRoutes(this._app);
      registerMembershipRoutes(this._app);
      registerThreadRoutes(this._app);
      registerNamespaceRoutes(this._app);
      registerConversationRoutes(this._app);
      registerRoleRoutes(this._app);
    } catch (error) {
      Logger.error("Unable to register routes.", error);
    }
  }
}
