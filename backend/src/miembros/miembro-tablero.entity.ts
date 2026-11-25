import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Tablero } from '../tableros/tablero.entity';

export enum RolMiembro {
  ADMIN = 'admin',
  MIEMBRO = 'miembro',
  OBSERVADOR = 'observador',
}

@Entity('miembros_tablero')
export class MiembroTablero {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario!: Usuario;

  @ManyToOne(() => Tablero, (tablero) => tablero.miembros, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tablero_id' })
  tablero!: Tablero;

  @Column({ type: 'enum', enum: RolMiembro, enumName: 'rol_miembro', default: RolMiembro.MIEMBRO })
  rol!: RolMiembro;
}
