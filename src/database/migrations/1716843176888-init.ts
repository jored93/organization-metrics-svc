import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1716843176888 implements MigrationInterface {
    name = 'Init1716843176888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "organization" ("id_organization" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "status" integer NOT NULL DEFAULT '1', CONSTRAINT "UQ_c1137363ad9deea0a4e9c6ff32b" UNIQUE ("id_organization"), CONSTRAINT "PK_c1137363ad9deea0a4e9c6ff32b" PRIMARY KEY ("id_organization"))`);
        await queryRunner.query(`CREATE TABLE "tribe" ("id_tribe" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "status" integer NOT NULL DEFAULT '1', "id_organization" integer NOT NULL, CONSTRAINT "UQ_c165ed5e52b4e2ff2af9a7d0fb6" UNIQUE ("id_tribe"), CONSTRAINT "PK_c165ed5e52b4e2ff2af9a7d0fb6" PRIMARY KEY ("id_tribe"))`);
        await queryRunner.query(`CREATE TABLE "repository" ("id_repository" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "state" character varying(1) NOT NULL, "id_tribe" integer NOT NULL, "create_time" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(1) NOT NULL, CONSTRAINT "UQ_431a174129d882e2c5398a9f420" UNIQUE ("id_repository"), CONSTRAINT "PK_431a174129d882e2c5398a9f420" PRIMARY KEY ("id_repository"))`);
        await queryRunner.query(`CREATE TABLE "metric" ("id_metric" SERIAL NOT NULL, "coverage" numeric(10,2) NOT NULL, "bugs" integer NOT NULL, "vulnerabilities" integer NOT NULL, "hotspot" integer NOT NULL, "code_smells" integer NOT NULL, "repositoryIdRepository" integer NOT NULL, CONSTRAINT "UQ_c914f6c87b50e052b0e52e52b81" UNIQUE ("id_metric"), CONSTRAINT "REL_15419d129a300fe2939b80220e" UNIQUE ("repositoryIdRepository"), CONSTRAINT "PK_c914f6c87b50e052b0e52e52b81" PRIMARY KEY ("id_metric"))`);
        await queryRunner.query(`ALTER TABLE "tribe" ADD CONSTRAINT "FK_dcdd03e44f28bdf784d43314825" FOREIGN KEY ("id_organization") REFERENCES "organization"("id_organization") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "repository" ADD CONSTRAINT "FK_3572e75b71052040481c022dfdd" FOREIGN KEY ("id_tribe") REFERENCES "tribe"("id_tribe") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "metric" ADD CONSTRAINT "FK_15419d129a300fe2939b80220e8" FOREIGN KEY ("repositoryIdRepository") REFERENCES "repository"("id_repository") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "metric" DROP CONSTRAINT "FK_15419d129a300fe2939b80220e8"`);
        await queryRunner.query(`ALTER TABLE "repository" DROP CONSTRAINT "FK_3572e75b71052040481c022dfdd"`);
        await queryRunner.query(`ALTER TABLE "tribe" DROP CONSTRAINT "FK_dcdd03e44f28bdf784d43314825"`);
        await queryRunner.query(`DROP TABLE "metric"`);
        await queryRunner.query(`DROP TABLE "repository"`);
        await queryRunner.query(`DROP TABLE "tribe"`);
        await queryRunner.query(`DROP TABLE "organization"`);
    }

}
