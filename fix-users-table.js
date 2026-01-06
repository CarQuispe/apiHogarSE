const { Client } = require('pg');
require('dotenv').config();

(async () => {
  console.log('🔧 CORRIGIENDO ESTRUCTURA DE TABLA USERS');
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();

    // Verificar estructura actual
    const columns = await client.query(`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'users'
      ORDER BY ordinal_position
    `);

    console.log('\n📋 Estructura actual:');
    columns.rows.forEach(col => {
      console.log(`   - ${col.column_name} (${col.data_type})`);
    });

    // Si tiene is_active pero no isActive
    const hasIsActive = columns.rows.find(c => c.column_name === 'is_active');
    const hasIsActiveCamel = columns.rows.find(c => c.column_name === 'isActive');

    if (hasIsActive && !hasIsActiveCamel) {
      console.log('\n🔄 La tabla tiene is_active pero TypeORM busca isActive');
      console.log('💡 Solución: Renombrar columna o usar naming strategy');

      // Opción A: Renombrar columna
      console.log('\n🔄 Renombrando is_active → isActive...');
      await client.query('ALTER TABLE users RENAME COLUMN is_active TO "isActive"');
      console.log('✅ Columna renombrada');

      // También renombrar otras columnas
      await client.query('ALTER TABLE users RENAME COLUMN created_at TO "createdAt"');
      await client.query('ALTER TABLE users RENAME COLUMN updated_at TO "updatedAt"');
      console.log('✅ Todas las columnas renombradas a camelCase');
    }

    // Verificar resultado
    const newColumns = await client.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'users'
    `);

    console.log('\n🎉 Nueva estructura:');
    newColumns.rows.forEach(col => {
      console.log(`   - ${col.column_name}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
})();