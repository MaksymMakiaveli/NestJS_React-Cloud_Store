import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserAndFileTable1682674718783 implements MigrationInterface {
    name = 'CreateUserAndFileTable1682674718783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "hash" character varying NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "files" ("id" SERIAL NOT NULL, "filename" character varying NOT NULL, "originalName" character varying NOT NULL, "size" integer NOT NULL, "mimetype" character varying NOT NULL, "deletedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
