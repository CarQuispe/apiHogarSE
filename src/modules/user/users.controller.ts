import { Controller, Post, Get, Body, Param, Patch, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  async createUser(@Body() createUserDto: {
    ci: string;
    password?: string;
    email: string;
    nombre: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    sexo?: string;
    nacionalidad?: string;
    fechaNacimiento?: Date;
    telefono?: string;
    direccion?: string;
    tipoUsuario?: string;
    sueldoDiario?: number;
    observaciones?: string;
  }): Promise<{ user: User; rawPassword?: string }> {
    const password = createUserDto.password || this.usersService.generateRandomPassword();
    const user = await this.usersService.create(
      createUserDto.ci,
      password,
      createUserDto.email,
      createUserDto.nombre,
      createUserDto.apellidoPaterno,
      createUserDto.apellidoMaterno,
      createUserDto.sexo,
      createUserDto.nacionalidad,
      createUserDto.fechaNacimiento,
      createUserDto.telefono,
      createUserDto.direccion,
      createUserDto.tipoUsuario,
      createUserDto.sueldoDiario,
      createUserDto.observaciones
    );
    return { user, rawPassword: createUserDto.password ? undefined : password };
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User | null> {
    return await this.usersService.findById(id);
  }

  @Get('ci/:ci')
  async getUserByCi(@Param('ci') ci: string): Promise<User | null> {
    return await this.usersService.findByCi(ci);
  }

  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string): Promise<User | null> {
    return await this.usersService.findByEmail(email);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: number, @Body() body: { activo: boolean }) {
    return this.usersService.updateStatus(id, body.activo);
  }

  @Post(':id/reset-password')
  async resetToRandom(@Param('id') id: number) {
    return this.usersService.resetToRandomPassword(id);
  }

  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateData: Partial<User>) {
    return this.usersService.updateUser(id, updateData);
  }
}