require('dotenv').config();
const { Client } = require('pg');

(async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const res = await client.query('SELECT NOW()');
    console.log('✅ Conectado a Neon:', res.rows[0]);
  } catch (err) {
    console.error('❌ Error conexión Neon:', err.message);
  } finally {
    await client.end();
  }
})();
