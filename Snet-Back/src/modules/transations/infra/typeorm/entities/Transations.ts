import User from "@modules/user/infra/typeorm/entities/User";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('transations')
class Transations {

    @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
    id?: number;

    @Column({ type: 'int', name: 'userId' })
    userId?: number;

    @Column({ type: 'timestamptz', name: 'date' })
    date?: Date;

    @Column({ type: 'varchar', name: 'transationType', length: 64 })
    transationType?: string;

    @Column({ type: 'varchar', name: 'description', length: 128 })
    description?: string;

    @Column({ type: 'float', name: 'value' })
    value?: number;

    @Column({ type: 'varchar', name: 'status', length: 64 })
    status?: string;

    @ManyToOne(() => User, (user) => user.transations)
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user?: User;
}
export default Transations