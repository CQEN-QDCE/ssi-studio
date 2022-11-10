import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { OcaService } from './oca.service';

@Controller()
export class OcaController {
  constructor(private readonly ocaService: OcaService) {}

  @Get('/oca')
  getOca(): string {
    return this.ocaService.getOca();
  }

  @Post('/api/v1/create-schema')
  @HttpCode(201)
  createSchema(@Body() book: any): string {
    console.log (book);
    return this.ocaService.createSchema(book);
  }
}
