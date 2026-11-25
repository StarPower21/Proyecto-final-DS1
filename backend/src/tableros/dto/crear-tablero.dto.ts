import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CrearTableroDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre!: string;

  @IsInt()
  creadorId!: number;
}
