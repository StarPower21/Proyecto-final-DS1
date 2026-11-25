import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tablero } from './tablero.entity';
import { MiembroTablero } from '../miembros/miembro-tablero.entity';
import { TablerosController } from './tableros.controller';
import { TablerosService } from './tableros.service';

@Module({
  imports: [TypeOrmModule.forFeature([Tablero, MiembroTablero])],
  controllers: [TablerosController],
  providers: [TablerosService],
})
export class TablerosModule {}
