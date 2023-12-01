import User from "@modules/user/infra/typeorm/entities/User";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity('userExtract')
class UserExtract {

    @PrimaryGeneratedColumn({ type: 'smallint', name: 'id' })
    id?: number;

    @Column({ type: 'int', name: 'userId' })
    userId?: number;

    @Column({ type: 'timestamp', name: 'dateOfAtualization' })
    dateOfAtualization?: Date;

    @Column({ type: 'float', name: 'valueOfTheDay'})
    valueOfTheDay?: number;

    @ManyToOne(() => User, (user) => user.extracts)
    @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
    user?: User;
}

export default UserExtract;