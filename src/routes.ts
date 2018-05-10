import { CategoryController } from './controller/CategoryController';
import { ProductController } from './controller/ProductController';

export const Routes = [{
    method: "get",
    route: "/categories",
    controller: CategoryController,
    action: "all"
}, {
    method: "post",
    route: "/categories",
    controller: CategoryController,
    action: "save"
}, {
    method: "get",
    route: "/categories/:id",
    controller: CategoryController,
    action: "getOne" 
}, {
    method: "delete",
    route: "/categories/:id",
    controller: CategoryController,
    action: "deleteCategory" 
}, {
    method: "put",
    route: "/categories",
    controller: CategoryController,
    action: "updateCategory" 
}, {
    method: "post",
    route: "/products/:categoryId",
    controller: ProductController,
    action: "save" 
}, {
    method: "delete",
    route: "/products/:productId",
    controller: ProductController,
    action: "deleteProduct" 
}, {
    method: "put",
    route: "/products",
    controller: ProductController,
    action: "updateProduct" 
}, {
    method: "get",
    route: "/products/:productId",
    controller: ProductController,
    action: "getProduct" 
}];