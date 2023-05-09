import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/entities';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Entity('files')
export class FileEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  filename: string;

  @ApiProperty()
  @Column()
  originalName: string;

  @ApiProperty()
  @Column()
  size: number;

  @ApiProperty()
  @Column()
  mimetype: string;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt?: Date;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => UserEntity, (user) => user.files)
  @ApiHideProperty()
  user: UserEntity;
}
