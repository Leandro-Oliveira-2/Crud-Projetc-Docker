import {MigrationInterface, QueryRunner} from "typeorm";

export class transationMigration1697761704141 implements MigrationInterface {
    name = 'transationMigration1697761704141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transations" ADD "recepterId" smallint`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "fidelidade" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "fidelidade" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "transations" ADD CONSTRAINT "FK_ac01f00263c2a38848250b3f37b" FOREIGN KEY ("recepterId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transations" DROP CONSTRAINT "FK_ac01f00263c2a38848250b3f37b"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "fidelidade" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "fidelidade" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transations" DROP COLUMN "recepterId"`);
    }

}
