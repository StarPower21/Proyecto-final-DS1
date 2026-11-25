import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { MiembroTablero } from '../miembros/miembro-tablero.entity';

@Entity('tableros')
export class Tablero {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ default: false })
  archivado!: boolean;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'creador_id' })
  creador!: Usuario;

  @OneToMany(() => MiembroTablero, (miembro) => miembro.tablero)
  miembros!: MiembroTablero[];

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn!: Date;
}
