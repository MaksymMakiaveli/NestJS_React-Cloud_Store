import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Logger,
  ParseFilePipe,
  MaxFileSizeValidator,
  Get,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from './storage';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { MAX_FILE_SIZE } from '../constants';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return file;
  }
}
