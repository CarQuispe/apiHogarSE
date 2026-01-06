// src/modules/auth/infrastructure/auth.controller.ts
import { 
  Controller, 
  Post, 
  Body, 
  Get, 
  HttpException, 
  HttpStatus, 
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { RegisterUseCase } from '../application/register.use-case';
import { LoginUseCase } from '../application/login.use-case';
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { LoginDto } from '../application/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      console.log('📝 Datos recibidos en register:', createUserDto);
      
      // CORRECCIÓN: Pasar argumentos separados
      const user = await this.registerUseCase.execute(
        createUserDto.email,
        createUserDto.password,
        createUserDto.name,

      );
      
      return {
        success: true,
        message: 'Usuario registrado exitosamente',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isActive: user.isActive,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Error en register controller:', error.message);
      
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Error en el registro',
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() loginDto: LoginDto) {
    try {
      console.log('🔐 Datos recibidos en login:', loginDto);
      
      // CORRECCIÓN: Ahora devuelve { user, token }
      const result = await this.loginUseCase.execute(loginDto.email, loginDto.password);
      
      return {
        success: true,
        message: 'Login exitoso',
        token: result.token, // ✅ Ahora sí existe
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('❌ Error en login controller:', error.message);
      
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Error en el login',
        },
        error.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Get('test')
  test() {
    return {
      success: true,
      message: 'Auth module is working!',
      timestamp: new Date().toISOString(),
    };
  }
}