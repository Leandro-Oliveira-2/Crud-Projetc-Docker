import Transations from "@modules/transations/infra/typeorm/entities/Transations";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Exclude} from "class-transformer";
import { JsonObject } from "swagger-ui-express";

@Entity('user')
class User {

  @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
  id?: number;

  @Column({ type: 'varchar', name: 'name', length: 64})
  name?: string;

  @Column({ type: 'varchar', name: 'gender', length: 10})
  gender?: string;

  @Column({ type: 'varchar', name: 'email', length: 64, unique: true})
  email?: string;

  @Column({ type: 'varchar', name: 'adress', length: 128})
  adress?: string;

  @Column({ type: 'jsonb', name: 'fidelidade', default: { dia: 0, data: new Date(), quantityRewards: 0, rewardDates: [] } })
  fidelidade?: JsonObject;

  @Column({ type: 'jsonb', name: 'saldoHistory', default:{ datas: [], values: [] } })
  saldoHistory?: JsonObject; 

  @Column({ type: 'varchar', name: 'phone', length: 15})
  phone?: string; 

  @Exclude()
  @Column({ type: 'varchar', name: 'passwordHash', length: 1024 })
  passwordHash?: string;

  @Column({ type: 'float', name: 'saldo'})
  saldo?: number;

  @Column({ type: 'boolean', name: 'enabled', default: true }) 
  enabled?: boolean;

 @OneToMany(() => Transations, (transation) => transation.user, {cascade: true})
  transations?: Transations[]; 

  @OneToMany(() => Transations, (transation) => transation.recepter, {cascade: true})
  receivedTransfers?: Transations[]; 
    
}

export default User;