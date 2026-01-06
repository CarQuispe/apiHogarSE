// test/diagnose.ts
import * as dotenv from 'dotenv';
import * as path from 'path';

// 🔴 CARGA EXPLÍCITA DEL .env EN LA RAÍZ
const envPath = path.resolve(process.cwd(), '.env');
const result = dotenv.config({ path: envPath });

console.log('🔍 Diagnóstico de conexión a Neon\n');

// ==========================
// VALIDACIÓN DOTENV
// ==========================
if (result.error) {
  console.error('❌ Error cargando .env:', result.error);
  process.exit(1);
}

console.log('📁 .env cargado desde:', envPath);

// ==========================
// VARIABLES DE ENTORNO
// ==========================
console.log('\n📋 Variables de entorno:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL existe?:', !!process.env.DATABASE_URL);

if (!process.env.DATABASE_URL) {
  console.error('\n❌ DATABASE_URL NO está definido');
  process.exit(1);
}

console.log(
  'DATABASE_URL (primeros 60 chars):',
  process.env.DATABASE_URL.substring(0, 60) + '...',
);

// ==========================
// PARSEO DE URL
// ==========================
try {
  const url = new URL(
    process.env.DATABASE_URL.replace('postgresql://', 'http://'),
  );

  console.log('\n📊 URL parseada correctamente:');
  console.log('  Protocolo:', 'postgresql');
  console.log('  Usuario:', url.username);
  console.log('  Host:', url.hostname);
  console.log('  Puerto:', url.port || '5432 (default)');
  console.log('  Base de datos:', url.pathname.replace('/', ''));
  console.log('  Parámetros:', url.search);

} catch (error: any) {
  console.error('❌ Error parseando DATABASE_URL:', error.message);
  process.exit(1);
}

// ==========================
// RESULTADO FINAL
// ==========================
console.log(
  '\n✅ Configuración lista para:',
  process.env.NODE_ENV === 'development' ? 'Desarrollo' : 'Producción',
);
