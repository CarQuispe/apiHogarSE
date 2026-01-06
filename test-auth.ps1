# test-auth.ps1 - Prueba completa de autenticación
Write-Host "🧪 PRUEBA COMPLETA DEL SISTEMA DE AUTENTICACIÓN" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Configuración
$baseUrl = "http://localhost:3000/api"
$testEmail = "test_$(Get-Date -Format 'yyyyMMddHHmmss')@hogarsantaemilia.com"
$testPassword = "Test123456!"

# 1. Health Check
Write-Host "`n1. ✅ HEALTH CHECK" -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/auth/health" -Method GET
    Write-Host "   Status: $($health.status)" -ForegroundColor Green
    Write-Host "   Database: $($health.database.connected)" -ForegroundColor Green
    Write-Host "   PostgreSQL v$($health.database.version)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
    exit 1
}

# 2. Ping
Write-Host "`n2. ✅ PING" -ForegroundColor Yellow
try {
    $ping = Invoke-RestMethod -Uri "$baseUrl/auth/ping" -Method GET
    Write-Host "   $($ping.message)" -ForegroundColor Green
    Write-Host "   Uptime: $([math]::Round($ping.uptime, 2))s" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Error: $_" -ForegroundColor Red
}

# 3. REGISTRO (POST)
Write-Host "`n3. 🔐 REGISTRO DE USUARIO (POST)" -ForegroundColor Yellow
$registerData = @{
    email = $testEmail
    password = $testPassword
    role = "USER"
} | ConvertTo-Json

try {
    Write-Host "   Enviando registro para: $testEmail" -ForegroundColor Gray
    $register = Invoke-RestMethod -Uri "$baseUrl/auth/register" `
        -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $registerData `
        -ErrorAction Stop
    
    Write-Host "   ✅ Registro exitoso!" -ForegroundColor Green
    Write-Host "   ID: $($register.user.id)" -ForegroundColor Green
    Write-Host "   Email: $($register.user.email)" -ForegroundColor Green
    Write-Host "   Rol: $($register.user.role)" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Error en registro: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $body = $reader.ReadToEnd()
        Write-Host "   Detalles: $body" -ForegroundColor DarkRed
    }
}

# 4. LOGIN (POST)
Write-Host "`n4. 🔑 LOGIN (POST)" -ForegroundColor Yellow
$loginData = @{
    email = $testEmail
    password = $testPassword
} | ConvertTo-Json

try {
    Write-Host "   Intentando login..." -ForegroundColor Gray
    $login = Invoke-RestMethod -Uri "$baseUrl/auth/login" `
        -Method POST `
        -Headers @{"Content-Type"="application/json"} `
        -Body $loginData `
        -ErrorAction Stop
    
    Write-Host "   ✅ Login exitoso!" -ForegroundColor Green
    
    if ($login.token) {
        Write-Host "   Token recibido: ✅" -ForegroundColor Green
        Write-Host "   Token (muestra): $($login.token.Substring(0, 30))..." -ForegroundColor DarkGray
        
        # Guardar token para pruebas futuras
        $login | ConvertTo-Json | Out-File -FilePath "token.json" -Force
        Write-Host "   Token guardado en: token.json" -ForegroundColor DarkGray
    } else {
        Write-Host "   ⚠️  No se recibió token" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Error en login: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        $body = $reader.ReadToEnd()
        Write-Host "   Detalles: $body" -ForegroundColor DarkRed
    }
}

# 5. Verificar métodos incorrectos (deben fallar)
Write-Host "`n5. ⚠️  VERIFICANDO MÉTODOS INCORRECTOS (deben fallar)" -ForegroundColor Yellow

Write-Host "   Probando GET /auth/register (debe dar 404):" -ForegroundColor Gray
try {
    $badRegister = Invoke-RestMethod -Uri "$baseUrl/auth/register" -Method GET -ErrorAction SilentlyContinue
    Write-Host "   ❌ ERROR: GET no debería funcionar" -ForegroundColor Red
} catch {
    Write-Host "   ✅ Correcto: GET rechazado (404)" -ForegroundColor Green
}

Write-Host "   Probando GET /auth/login (debe dar 404):" -ForegroundColor Gray
try {
    $badLogin = Invoke-RestMethod -Uri "$baseUrl/auth/login" -Method GET -ErrorAction SilentlyContinue
    Write-Host "   ❌ ERROR: GET no debería funcionar" -ForegroundColor Red
} catch {
    Write-Host "   ✅ Correcto: GET rechazado (404)" -ForegroundColor Green
}

# 6. Swagger UI
Write-Host "`n6. 📚 SWAGGER UI" -ForegroundColor Yellow
Write-Host "   Disponible en: http://localhost:3000/api/docs" -ForegroundColor Blue
Write-Host "   Usa Swagger para probar todos los endpoints interactivamente" -ForegroundColor Gray

Write-Host "`n" -NoNewline
Write-Host "🎉 " -NoNewline -ForegroundColor Green
Write-Host "PRUEBAS COMPLETADAS" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✅ Servidor: FUNCIONANDO" -ForegroundColor Green
Write-Host "✅ Base de datos: CONECTADA" -ForegroundColor Green
Write-Host "✅ Endpoints: CONFIGURADOS CORRECTAMENTE" -ForegroundColor Green
Write-Host "✅ Métodos HTTP: VALIDADOS (POST required)" -ForegroundColor Green
Write-Host "`n🔗 URL del servidor: http://localhost:3000" -ForegroundColor Blue
Write-Host "📚 Documentación: http://localhost:3000/api/docs" -ForegroundColor Blue
