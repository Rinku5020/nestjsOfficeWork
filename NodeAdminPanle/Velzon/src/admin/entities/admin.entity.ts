import { IsEnum } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Admin {
    
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    FirstName: string;
    @Column()
    LastName: string;
    @Column({ unique: true })
    Email: string;
    @Column()
    Password: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @Column({default: 1})
    status: number
}
