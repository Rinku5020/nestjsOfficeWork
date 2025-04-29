import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;

    @Column({ unique: true })
    Email: string;

    @Column()  
    Phone: string;

    @Column()
    gender: string;

    @Column('simple-array')  
    hobbies: string[];

    @Column({ type: 'date' })
    dateOfBirth: Date;

    @Column()
    address: string;

    @Column()
    image: string;
}
