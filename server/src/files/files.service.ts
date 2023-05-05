import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  findAll() {
    return this.fileRepository.find();
  }
  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }
}
