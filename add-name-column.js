const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

(async () => {
  try {
    await client.connect();
    console.log("✅ Conectado a NeonDB");

    // 1. Añadir columna name si no existe
    console.log("\n🔄 Añadiendo columna name a la tabla users...");

    try {
      await client.query("ALTER TABLE users ADD COLUMN name VARCHAR(100)");
      console.log("✅ Columna name añadida exitosamente");
    } catch (error) {
      if (error.message.includes("already exists") || error.message.includes("duplicate column")) {
        console.log("ℹ️  Columna name ya existe");
      } else {
        throw error;
      }
    }

    // 2. Verificar estructura actualizada
    console.log("\n📋 Verificando estructura actual:");
    const columns = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `);

    columns.rows.forEach(col => {
      console.log(`  - ${col.column_name} (${col.data_type}) - nullable: ${col.is_nullable}`);
    });

    // 3. Verificar datos existentes
    console.log("\n👥 Usuarios existentes:");
    const users = await client.query("SELECT id, email, name FROM users");
    console.log(`Total usuarios: ${users.rows.length}`);
    users.rows.forEach(user => {
      console.log(`  - ID: ${user.id}, Email: ${user.email}, Name: ${user.name || "(vacío)"}`);
    });

    // 4. Si hay usuarios sin name, actualizar uno de prueba
    if (users.rows.length > 0 && !users.rows[0].name) {
      console.log("\n✏️  Actualizando name para primer usuario...");
      await client.query(`UPDATE users SET name = 'Usuario Demo' WHERE id = ${users.rows[0].id}`);
      console.log("✅ Name actualizado");
    }

  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Detalles:", error);
  } finally {
    await client.end();
    console.log("\n🔌 Conexión cerrada");
  }
})();
