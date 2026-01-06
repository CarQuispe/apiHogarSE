"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const user_role_enum_1 = require("./user-role.enum");
class User {
    id;
    email;
    password;
    name;
    role;
    isActive;
    createdAt;
    updatedAt;
    constructor(data = {}) {
        this.id = data.id;
        this.email = data.email || '';
        this.password = data.password || '';
        this.name = data.name || '';
        this.role = data.role || user_role_enum_1.UserRole.USER;
        this.isActive = data.isActive !== undefined ? data.isActive : true;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }
    static create(data) {
        return new User(data);
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map