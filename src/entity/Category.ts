// TypeORM attributes.
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

// Relation Entities.
import { Product } from './Product';

@Entity()
export  class Category {
    @PrimaryGeneratedColumn()
    CategoryId: number;

    @Column()
    CategoryName: string;

    @OneToMany(() => Product, p => p.Category, {
        cascade: true
    })
    Products: Product[];
}