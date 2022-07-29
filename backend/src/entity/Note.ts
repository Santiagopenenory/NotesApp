
import {Column, Entity, PrimaryGeneratedColumn,BaseEntity} from 'typeorm';

@Entity()
export class Note extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column() 
    title : string;
    @Column("text")
    description: string; 
    @Column()
    archive : boolean;
    @Column()
    categories:string;
}

