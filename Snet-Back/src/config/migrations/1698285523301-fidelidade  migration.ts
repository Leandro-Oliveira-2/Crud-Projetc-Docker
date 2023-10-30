import {MigrationInterface, QueryRunner} from "typeorm";

export class fidelidade Migration1698285523301 implements MigrationInterface {
    name = 'fidelidade Migration1698285523301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "fidelidade" jsonb NOT NULL DEFAULT '{"dia":0,"data":0}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fidelidade"`);
    }

}
