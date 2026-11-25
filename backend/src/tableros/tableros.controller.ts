import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TablerosService } from './tableros.service';
import { CrearTableroDto } from './dto/crear-tablero.dto';

@Controller('tableros')
export class TablerosController {
  constructor(private readonly tablerosService: TablerosService) {}

  @Get('usuario/:usuarioId')
  listarPorUsuario(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    return this.tablerosService.listarPorUsuario(usuarioId);
  }

  @Post()
  crear(@Body() datos: CrearTableroDto) {
    return this.tablerosService.crear(datos);
  }
}
