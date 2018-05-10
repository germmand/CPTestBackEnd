import { getRepository, Repository } from 'typeorm';
import { NextFunction, Request, Response } from 'express';

// Entities
import { Product } from '../entity/Product';
import { Category } from '../entity/Category';

export class ProductController {
    private productRepository: Repository<Product> = getRepository(Product);
    private categoryRepository: Repository<Category> = getRepository(Category);

    async save(request: Request, response: Response, next: NextFunction): Promise<void> {
        let categoryId: number = request.params.categoryId;
        let product: Product = request.body as Product;

        let category: Category = await this.categoryRepository.findOne(categoryId);
        if(category !== null && category !== undefined) {
            product.Category = category;

            let savedProduct: Product = await this.productRepository.save(product);
            response.status(201);
            response.json({
                uri: "/products/" + savedProduct.ProductId,
                product: savedProduct
            });
        } else {
            response.status(400);
            response.json({
                message: "Invalid Category Id."
            });
        }
    }

    async deleteProduct(request: Request, response: Response, next: NextFunction): Promise<void> {
        let productId: number = request.params.productId;
        let product: Product = await this.productRepository.findOne(productId);

        if(product !== null && product !== undefined) {
            let deletedProduct: Product = await this.productRepository.remove(product);
            response.json(deletedProduct);
        } else {
            response.status(400);
            response.json({
                message: "Invalid Product Id."
            });
        }
    }

    async updateProduct(request: Request, response: Response, next: NextFunction): Promise<void> {
        let productId: number = (request.body as Product).ProductId;
        let product: Product = await this.productRepository.findOne(productId);

        if(product !== null && product !== undefined) {
            let sentProduct: Product = request.body as Product;

            product.ProductName = sentProduct.ProductName;
            product.ProductPrice = sentProduct.ProductPrice;

            // Se chequea si se envío otra categoría a la que se desea cambiar el producto.
            let categoryId: number = request.body.CategoryId;
            if(categoryId !== null && categoryId !== undefined) {
                let category: Category = await this.categoryRepository.findOne(categoryId);

                if(category !== null && category !== undefined) {
                    product.Category = category;
                }

                // Si la categoría es inválida, 
                // el producto simplemente conserva su categoría original.
            }

            // Se guarda el nuevo producto.
            let updatedProduct: Product = await this.productRepository.save(product);
            response.json(updatedProduct);
        } else {
            response.status(400);
            response.json({
                message: "Invalid Product Id."
            });
        }
    }

    async getProduct(request: Request, response: Response, next: NextFunction): Promise<void> {
        let productId: number = request.params.productId;
        
        // Cargamos el producto con su categoría.
        let product: Product = await this.productRepository
            .createQueryBuilder("product")
            .leftJoinAndSelect("product.Category", "category")
            .where("product.productid = :productid", { productid: productId })
            .getOne();

        if(product !== null && product !== undefined) {
            response.json(product);
        } else {
            response.status(400);
            response.json({
                message: "Invalid Product Id."
            });
        }
    }
}