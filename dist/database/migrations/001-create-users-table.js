"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1704067200000 = void 0;
class CreateUsersTable1704067200000 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    `);
        await queryRunner.query(`
      CREATE TYPE user_role_enum AS ENUM ('ADMIN', 'PERSONAL', 'USER');
    `);
        await queryRunner.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role user_role_enum NOT NULL DEFAULT 'USER',
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);
        await queryRunner.query(`
      CREATE INDEX idx_users_email ON users(email);
    `);
        await queryRunner.query(`
      CREATE INDEX idx_users_role ON users(role);
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS users;`);
        await queryRunner.query(`DROP TYPE IF EXISTS user_role_enum;`);
    }
}
exports.CreateUsersTable1704067200000 = CreateUsersTable1704067200000;
//# sourceMappingURL=001-create-users-table.js.map