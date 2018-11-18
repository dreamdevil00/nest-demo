import { RoleManager } from 'casbin';

export class CasbinRoleManager implements RoleManager {
  /**
   * 清空所有角色
   */
  clear() {}

  addLink() {}

  deleteLink() {}

  hasLink(): boolean {
    return true;
  }

  getRoles(): string[] {
    return [];
  }

  getUsers(): string[] {
    return [];
  }

  printRoles(): void {}
}
