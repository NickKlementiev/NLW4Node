import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

// Generate a new database entity
@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        // if the id does not exist, then generate a new one using uuid.v4()
        if (!this.id)
            this.id = uuid();
    }
}

export { User }
