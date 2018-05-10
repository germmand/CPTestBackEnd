// TypeORM attributes.
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

// Relation Entities.
import { Category } from './Category';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    ProductId: number;

    @Column()
    ProductName: string;

    @Column("double")
    ProductPrice: number;

    @ManyToOne(() => Category, c => c.Products)
    Category: Category;
}