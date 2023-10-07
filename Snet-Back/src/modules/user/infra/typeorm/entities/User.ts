import Transations from "@modules/transations/infra/typeorm/entities/Transations";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Exclude} from "class-transformer";

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

  @Column({ type: 'varchar', name: 'phone', length: 15})
  phone?: string; 

  @Column({ type: 'varchar', name: 'passwordHash', length: 1024 })
  passwordHash?: string;

  @Column({ type: 'float', name: 'saldo'})
  saldo?: number;

 @OneToMany(() => Transations, (transation) => transation.user, {cascade: true})
  transations?: Transations[]; 
    
}

export default User;