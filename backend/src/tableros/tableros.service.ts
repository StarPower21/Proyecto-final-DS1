import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Tablero } from './tablero.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { MiembroTablero, RolMiembro } from '../miembros/miembro-tablero.entity';
import { CrearTableroDto } from './dto/crear-tablero.dto';

@Injectable()
export class TablerosService {
  constructor(
    @InjectRepository(Tablero) private readonly tableros: Repository<Tablero>,
    private readonly dataSource: DataSource,
  ) {}

  listarPorUsuario(usuarioId: number) {
    return this.tableros.find({
      where: { archivado: false, miembros: { usuario: { id: usuarioId } } },
      order: { nombre: 'ASC' },
    });
  }

  crear(datos: CrearTableroDto) {
    return this.dataSource.transaction(async (manager) => {
      const creador = await manager.findOne(Usuario, { where: { id: datos.creadorId } });
      if (!creador) {
        throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      const tablero = await manager.save(
        manager.create(Tablero, { nombre: datos.nombre, creador }),
      );
      await manager.save(
        manager.create(MiembroTablero, { usuario: creador, tablero, rol: RolMiembro.ADMIN }),
      );
      return { id: tablero.id, nombre: tablero.nombre };
    });
  }
}
