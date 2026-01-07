// test-crud-completo.js
require('dotenv').config(); // Cargar variables de entorno
const axios = require('axios');

// Configuración desde .env
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:3000/api/ninios'
  : `http://localhost:${process.env.PORT || 3000}${process.env.API_PREFIX || '/api'}/ninios`;

const AUTH_TOKEN = process.env.JWT_TEST_TOKEN || 'TU_TOKEN_AQUI'; // Puedes crear JWT_TEST_TOKEN en .env

// Mostrar configuración
console.log('🔧 CONFIGURACIÓN DEL SISTEMA 🔧');
console.log('================================');
console.log('Entorno:', process.env.NODE_ENV);
console.log('API URL:', API_URL);
console.log('Puerto:', process.env.PORT);
console.log('Prefijo API:', process.env.API_PREFIX);
console.log('Frontend:', process.env.FRONTEND_URL);
console.log('Base de datos:', process.env.DB_HOST);
console.log('================================\n');

const headers = {
  'Authorization': `Bearer ${AUTH_TOKEN}`,
  'Content-Type': 'application/json'
};

// Clase Ninio para pruebas locales (basada en tu entidad)
class TestNinio {
  constructor(data) {
    this.id = data.id || 0;
    this.ci = data.ci;
    this.nombre = data.nombre;
    this.apellido_paterno = data.apellido_paterno;
    this.apellido_materno = data.apellido_materno || null;
    this.sexo = data.sexo || 'no especificado';
    this.nacionalidad = data.nacionalidad || 'Boliviana';
    this.etnia = data.etnia || null;
    this.fecha_nacimiento = new Date(data.fecha_nacimiento);
    this.fecha_ingreso = new Date(data.fecha_ingreso || new Date());
    this.estado = data.estado || 'activo';
    this.observaciones_ingreso = data.observaciones_ingreso;
    this.fecha_egreso = data.fecha_egreso ? new Date(data.fecha_egreso) : undefined;
    this.motivo_egreso = data.motivo_egreso;
    this.fecha_creacion = data.fecha_creacion || new Date();
    this.fecha_actualizacion = data.fecha_actualizacion || new Date();
  }

  toJSON() {
    return {
      ci: this.ci,
      nombre: this.nombre,
      apellido_paterno: this.apellido_paterno,
      apellido_materno: this.apellido_materno,
      sexo: this.sexo,
      nacionalidad: this.nacionalidad,
      etnia: this.etnia,
      fecha_nacimiento: this.fecha_nacimiento.toISOString().split('T')[0],
      fecha_ingreso: this.fecha_ingreso.toISOString().split('T')[0],
      estado: this.estado,
      observaciones_ingreso: this.observaciones_ingreso,
      fecha_egreso: this.fecha_egreso ? this.fecha_egreso.toISOString().split('T')[0] : null,
      motivo_egreso: this.motivo_egreso
    };
  }
}

// Datos de prueba basados en tu entidad Ninio
const testNinios = [
  new TestNinio({
    ci: '1234567890',
    nombre: 'Juan Carlos',
    apellido_paterno: 'Pérez',
    apellido_materno: 'Gómez',
    sexo: 'masculino',
    nacionalidad: 'Boliviana',
    etnia: 'Quechua',
    fecha_nacimiento: '2010-05-15',
    fecha_ingreso: '2024-01-20',
    estado: 'activo',
    observaciones_ingreso: 'Niño en buen estado de salud'
  }),
  new TestNinio({
    ci: '0987654321',
    nombre: 'María Fernanda',
    apellido_paterno: 'López',
    apellido_materno: 'Rodríguez',
    sexo: 'femenino',
    nacionalidad: 'Boliviana',
    etnia: 'Aymara',
    fecha_nacimiento: '2012-08-22',
    fecha_ingreso: '2024-02-15',
    estado: 'activo',
    observaciones_ingreso: 'Requiere seguimiento psicológico'
  }),
  new TestNinio({
    ci: '1122334455',
    nombre: 'Carlos Andrés',
    apellido_paterno: 'Martínez',
    apellido_materno: null,
    sexo: 'masculino',
    nacionalidad: 'Boliviana',
    etnia: null,
    fecha_nacimiento: '2011-11-30',
    fecha_ingreso: '2024-03-10',
    estado: 'egresado',
    observaciones_ingreso: 'Egresado por mayoría de edad',
    fecha_egreso: '2024-12-31',
    motivo_egreso: 'Mayoría de edad'
  })
];

async function testConnection() {
  console.log('🔗 Probando conexión con la API...');
  try {
    const response = await axios.get(API_URL.replace('/ninios', '/health'), {
      headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` }
    });
    console.log('✅ Conexión API: OK');
    console.log('   Status:', response.status);
    console.log('   Data:', response.data);
    return true;
  } catch (error) {
    console.log('⚠️  No se pudo conectar al endpoint /health, probando /api...');
    try {
      const response = await axios.get(API_URL.replace('/ninios', ''), {
        headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` }
      });
      console.log('✅ Conexión API base: OK');
      return true;
    } catch (error2) {
      console.error('❌ Error de conexión:');
      console.error('   URL:', API_URL);
      console.error('   Error:', error2.message);
      return false;
    }
  }
}

async function testAuthentication() {
  console.log('\n🔐 Probando autenticación...');
  try {
    // Intentar crear sin token primero
    const testData = testNinios[0].toJSON();
    
    // Test 1: Sin autenticación (debe fallar)
    console.log('   1. Probando sin token (debe fallar con 401)...');
    try {
      await axios.post(API_URL, testData);
      console.log('   ❌ ERROR: Debería fallar sin autenticación');
      return false;
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('   ✅ CORRECTO: 401 Unauthorized sin token');
      } else {
        console.log('   ⚠️  Status inesperado:', error.response?.status);
      }
    }
    
    // Test 2: Con token inválido
    console.log('\n   2. Probando con token inválido...');
    try {
      await axios.post(API_URL, testData, {
        headers: { 'Authorization': 'Bearer token-invalido' }
      });
      console.log('   ❌ ERROR: Debería fallar con token inválido');
      return false;
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log('   ✅ CORRECTO: Rechazado con token inválido');
      }
    }
    
    // Test 3: Con token válido (si existe)
    if (AUTH_TOKEN && AUTH_TOKEN !== 'TU_TOKEN_AQUI') {
      console.log('\n   3. Probando con token válido...');
      try {
        const response = await axios.get(API_URL, { headers });
        console.log(`   ✅ Autenticación exitosa! ${response.data.length} niños encontrados`);
        return true;
      } catch (error) {
        console.log('   ❌ Token podría ser inválido o expirado');
        console.log('   Error:', error.response?.status, error.response?.data?.message);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error en test de autenticación:', error.message);
    return false;
  }
}

async function runCompleteCRUDTest() {
  console.log('\n🚀 INICIANDO PRUEBA CRUD COMPLETA 🚀');
  console.log('=====================================\n');
  
  // Verificar conexión
  if (!await testConnection()) {
    console.error('❌ No se pudo establecer conexión con la API');
    return;
  }
  
  // Verificar autenticación
  if (!await testAuthentication()) {
    console.error('❌ Problemas con la autenticación');
    console.log('   Necesitas un token JWT válido en AUTH_TOKEN');
    return;
  }
  
  const createdIds = [];
  
  try {
    // ============================================
    // 1. CREAR MÚLTIPLES NIÑOS
    // ============================================
    console.log('\n📝 1. CREANDO MÚLTIPLES NIÑOS');
    console.log('----------------------------');
    
    for (const [index, testNinio] of testNinios.entries()) {
      console.log(`\n   Creando niño ${index + 1}/${testNinios.length}:`);
      console.log('   Nombre:', testNinio.nombre, testNinio.apellido_paterno);
      console.log('   CI:', testNinio.ci);
      
      try {
        const response = await axios.post(API_URL, testNinio.toJSON(), { headers });
        
        console.log('   ✅ CREADO - ID:', response.data.id);
        console.log('   Estado:', response.data.estado);
        
        // Verificar campos snake_case
        const hasRequiredFields = 
          response.data.apellido_paterno !== undefined &&
          response.data.fecha_nacimiento !== undefined &&
          response.data.fecha_ingreso !== undefined;
        
        if (!hasRequiredFields) {
          console.log('   ⚠️  ADVERTENCIA: Campos snake_case podrían no estar presentes');
        }
        
        createdIds.push({
          id: response.data.id,
          ci: testNinio.ci,
          nombre: testNinio.nombre
        });
        
      } catch (error) {
        console.error(`   ❌ ERROR al crear niño ${index + 1}:`);
        console.error('      Status:', error.response?.status);
        console.error('      Mensaje:', error.response?.data?.message);
        
        // Si es error de CI duplicado, continuar con el siguiente
        if (error.response?.data?.message?.includes('Ya existe') || 
            error.response?.status === 409) {
          console.log('      ⏭️  CI duplicado, continuando con siguiente...');
          continue;
        }
      }
    }
    
    if (createdIds.length === 0) {
      console.error('\n❌ No se pudo crear ningún niño para las pruebas');
      return;
    }
    
    // ============================================
    // 2. LEER Y VERIFICAR DATOS
    // ============================================
    console.log('\n🔍 2. LEYENDO Y VERIFICANDO DATOS');
    console.log('---------------------------------');
    
    for (const ninioInfo of createdIds) {
      console.log(`\n   Verificando niño ID: ${ninioInfo.id} (${ninioInfo.nombre})`);
      
      try {
        const response = await axios.get(`${API_URL}/${ninioInfo.id}`, { headers });
        
        // Verificar estructura de respuesta
        const expectedFields = [
          'id', 'ci', 'nombre', 'apellido_paterno', 'apellido_materno',
          'sexo', 'nacionalidad', 'fecha_nacimiento', 'fecha_ingreso', 'estado'
        ];
        
        const missingFields = expectedFields.filter(field => !(field in response.data));
        
        if (missingFields.length > 0) {
          console.log(`   ⚠️  Campos faltantes: ${missingFields.join(', ')}`);
        } else {
          console.log('   ✅ Estructura de datos correcta');
        }
        
        // Verificar valores específicos
        if (response.data.ci !== ninioInfo.ci) {
          console.log(`   ⚠️  CI no coincide: esperado ${ninioInfo.ci}, obtenido ${response.data.ci}`);
        }
        
        console.log('   Datos completos:', {
          nombre: response.data.nombre,
          apellidos: `${response.data.apellido_paterno} ${response.data.apellido_materno || ''}`,
          estado: response.data.estado,
          fecha_nacimiento: response.data.fecha_nacimiento
        });
        
      } catch (error) {
        console.error(`   ❌ Error al leer niño ${ninioInfo.id}:`, error.message);
      }
    }
    
    // ============================================
    // 3. ACTUALIZAR REGISTROS
    // ============================================
    console.log('\n✏️  3. ACTUALIZANDO REGISTROS');
    console.log('---------------------------');
    
    if (createdIds.length > 0) {
      const firstNinioId = createdIds[0].id;
      
      console.log(`   Actualizando niño ID: ${firstNinioId}`);
      
      const updateData = {
        observaciones_ingreso: 'Observaciones actualizadas después de evaluación completa',
        estado: 'activo'
      };
      
      try {
        const response = await axios.patch(`${API_URL}/${firstNinioId}`, updateData, { headers });
        
        console.log('   ✅ ACTUALIZADO');
        console.log('   Nuevas observaciones:', response.data.observaciones_ingreso);
        console.log('   Fecha actualización:', response.data.fecha_actualizacion || 'No disponible');
        
      } catch (error) {
        console.error('   ❌ Error al actualizar:', error.response?.data?.message);
      }
    }
    
    // ============================================
    // 4. PRUEBAS DE BÚSQUEDA Y FILTROS
    // ============================================
    console.log('\n🔎 4. PRUEBAS DE BÚSQUEDA Y FILTROS');
    console.log('-----------------------------------');
    
    // Buscar todos
    console.log('\n   Buscando TODOS los niños:');
    try {
      const allResponse = await axios.get(API_URL, { headers });
      console.log(`   ✅ Total niños en sistema: ${allResponse.data.length}`);
    } catch (error) {
      console.error('   ❌ Error al buscar todos:', error.message);
    }
    
    // Buscar por estado
    console.log('\n   Buscando niños ACTIVOS:');
    try {
      const activeResponse = await axios.get(`${API_URL}?estado=activo`, { headers });
      console.log(`   ✅ Niños activos: ${activeResponse.data.length}`);
    } catch (error) {
      console.error('   ❌ Error al buscar por estado:', error.message);
    }
    
    // Buscar por texto
    console.log('\n   Buscando por nombre "María":');
    try {
      const searchResponse = await axios.get(`${API_URL}?search=María`, { headers });
      console.log(`   ✅ Resultados: ${searchResponse.data.length}`);
    } catch (error) {
      console.error('   ❌ Error al buscar por texto:', error.message);
    }
    
    // ============================================
    // 5. LIMPIEZA (ELIMINAR REGISTROS DE PRUEBA)
    // ============================================
    console.log('\n🗑️  5. LIMPIANDO REGISTROS DE PRUEBA');
    console.log('-----------------------------------');
    
    let deletedCount = 0;
    let errorCount = 0;
    
    for (const ninioInfo of createdIds) {
      console.log(`   Eliminando niño ID: ${ninioInfo.id} (${ninioInfo.nombre})`);
      
      try {
        await axios.delete(`${API_URL}/${ninioInfo.id}`, { headers });
        console.log('   ✅ ELIMINADO');
        deletedCount++;
        
        // Verificar eliminación
        try {
          await axios.get(`${API_URL}/${ninioInfo.id}`, { headers });
          console.log('   ⚠️  ADVERTENCIA: El niño todavía existe después de eliminar');
        } catch (verifyError) {
          if (verifyError.response?.status === 404) {
            console.log('   ✅ CONFIRMADO: Eliminación verificada (404)');
          }
        }
        
      } catch (error) {
        console.error(`   ❌ Error al eliminar ${ninioInfo.id}:`, error.response?.data?.message);
        errorCount++;
      }
    }
    
    // ============================================
    // 6. RESUMEN FINAL
    // ============================================
    console.log('\n📊 6. RESUMEN FINAL');
    console.log('------------------');
    console.log(`   Total niños creados: ${createdIds.length}`);
    console.log(`   Total eliminados: ${deletedCount}`);
    console.log(`   Errores en eliminación: ${errorCount}`);
    
    if (errorCount > 0) {
      console.log('\n   ⚠️  ADVERTENCIA: Algunos registros no se pudieron eliminar');
      console.log('   Puede que necesiten limpieza manual en la base de datos.');
    }
    
    console.log('\n🎉 🎉 🎉 ¡PRUEBA CRUD COMPLETADA! 🎉 🎉 🎉');
    console.log('==========================================');
    
  } catch (error) {
    console.error('\n❌ ERROR CRÍTICO EN PRUEBA CRUD');
    console.error('===============================');
    console.error('Error:', error.message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
    
    // Intentar limpiar si hubo error
    console.log('\n⚠️  Intentando limpiar registros creados...');
    for (const ninioInfo of createdIds) {
      try {
        await axios.delete(`${API_URL}/${ninioInfo.id}`, { headers });
        console.log(`   Limpiado ID ${ninioInfo.id}`);
      } catch (cleanupError) {
        console.error(`   No se pudo limpiar ID ${ninioInfo.id}`);
      }
    }
  }
}

// Ejecutar la prueba
runCompleteCRUDTest();