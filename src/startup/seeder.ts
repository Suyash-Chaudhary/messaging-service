import { RoleRepository } from "../database/repository/role.repository";
import * as RoleList from "../../seed.data/default.roles.json";
import { Logger } from "../common/logger";

export class Seeder {
  _roleRepository = new RoleRepository();

  public seed = async () => {
    try {
      await this.seedRoles();
    } catch (error) {
      Logger.error("Error seeding.", error);
    }
  };

  private seedRoles = async () => {
    try {
      const roles = RoleList["default"];
      roles.forEach(async (role) => {
        try {
          await this._roleRepository.create(role);
        } catch (error) {
          Logger.error(`Error creating Role: ${JSON.stringify(role)}`, error);
        }
      });
    } catch (error) {
      Logger.error("Error seeding Roles", error);
    }
  };
}
