import { getRepository, Repository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

// Entities
import { Category } from '../entity/Category';


export class CategoryController {
    private categoryRepository: Repository<Category> = getRepository(Category);

    async all(request: Request, response: Response, next: NextFunction): Promise<void> {
        let page: number = request.query.page == null ? 0 : request.query.page;
        let size: number = request.query.size == null ? 0 : request.query.size;

        let categories : Promise<Category[]> = page == 0 || size == 0 
            ? this.categoryRepository.find()
            : this.categoryRepository
                .createQueryBuilder("category")
                .orderBy("category.categoryid")
                .skip((page - 1) * size)
                .take(size)
                .getMany();

        categories.then(result => result !== null && result !== undefined 
            ? response.json(result) 
            : undefined);
    }

    async save(request: Request, response: Response, next: NextFunction): Promise<void> {
        // Validaciones del modelo acá... 

        let category: Category = await this.categoryRepository.save(request.body as Category);

        response.status(201);
        response.json({
            uri: "/categories/" + category.CategoryId,
            category: category
        });
    }

    async getOne(request: Request, response: Response, next: NextFunction): Promise<void> {
        let categoryId: number = request.params.id;

        let category: Category = await this.categoryRepository.findOne(categoryId);

        if(category !== null && category !== undefined) {
            response.json(category);
        } else {
            response.status(400);
            response.json({
                message: "Invalid Category Id"
            });
        }
    }

    async deleteCategory(request: Request, response: Response, next: NextFunction): Promise<void> {
        let categoryId: number = request.params.id;
        let category: Category = await this.categoryRepository.findOne(categoryId);

        if(category !== null && category !== undefined) {
            let deletedCategory: Category = await this.categoryRepository.remove(category);
            response.json(deletedCategory)
        } else {
            response.status(400);
            response.json({
                message: "Invalid Category Id"
            });
        }
    }

    async updateCategory(request: Request, response: Response, next: NextFunction): Promise<void> {
        let categoryId: number = (request.body as Category).CategoryId;
        let category: Category = await this.categoryRepository.findOne(categoryId);

        if(category !== null && category !== undefined) {
            category.CategoryName = (request.body as Category).CategoryName;
            
            let newCategory: Category = await this.categoryRepository.save(category);
            response.json(newCategory)
        } else {
            response.status(400);
            response.json({
                message: "Invalid Category Id"
            });
        }
    }
}