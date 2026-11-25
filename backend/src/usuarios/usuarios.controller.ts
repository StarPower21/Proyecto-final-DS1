import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  listar() {
    return this.usuariosService.listar();
  }

  @Post()
  registrar(@Body() datos: RegistrarUsuarioDto) {
    return this.usuariosService.registrar(datos);
  }
}
