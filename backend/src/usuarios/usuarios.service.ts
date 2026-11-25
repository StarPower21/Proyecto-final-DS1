import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from './usuario.entity';
import { RegistrarUsuarioDto } from './dto/registrar-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private readonly usuarios: Repository<Usuario>,
  ) {}

  listar() {
    return this.usuarios.find({ order: { nombre: 'ASC' } });
  }

  async registrar(datos: RegistrarUsuarioDto) {
    const existe = await this.usuarios.findOne({ where: { email: datos.email } });
    if (existe) {
      throw new HttpException('El email ya está registrado', HttpStatus.CONFLICT);
    }
    const contrasena = await bcrypt.hash(datos.contrasena, 10);
    const usuario = await this.usuarios.save(
      this.usuarios.create({ ...datos, contrasena }),
    );
    return { id: usuario.id, nombre: usuario.nombre, email: usuario.email };
  }
}
