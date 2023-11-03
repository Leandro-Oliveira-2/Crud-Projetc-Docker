CREATE TABLE "user" (
    "id" SMALLSERIAL NOT NULL,
    "name" character varying(64) NOT NULL,
    "gender" character varying(10) NOT NULL,
    "email" character varying(64) NOT NULL,
    "adress" character varying(128) NOT NULL,
    "phone" character varying(15) NOT NULL,
    "passwordHash" character varying(1024) NOT NULL,
    "saldo" double precision NOT NULL,
    "fidelidade" jsonb DEFAULT '{"dia": 0, "data": 0}',
    CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
    CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
);

CREATE TABLE "transations" (
    "id" SMALLSERIAL NOT NULL,
    "userId" smallint NOT NULL,
    "date" TIMESTAMP WITH TIME ZONE NOT NULL,
    "transationType" character varying(64) NOT NULL,
    "description" character varying(128) NOT NULL,
    "value" double precision NOT NULL,
    "status" character varying(64) NOT NULL,
    CONSTRAINT "PK_beb741830c6886e50cfd424877f" PRIMARY KEY ("id")
);

ALTER TABLE "transations" 
    ADD CONSTRAINT "FK_5542b653cc0663ede29cdcaaaf8" 
    FOREIGN KEY ("userId") 
    REFERENCES "user"("id") 
    ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE "transations" ADD "recepterId" smallint;
ALTER TABLE "transations" ADD CONSTRAINT "FK_ac01f00263c2a38848250b3f37b" 
    FOREIGN KEY ("recepterId") 
    REFERENCES "user"("id") 
    ON DELETE NO ACTION ON UPDATE NO ACTION;
