import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  contrasena!: string;

  @CreateDateColumn({ name: 'creado_en' })
  creadoEn!: Date;
}
