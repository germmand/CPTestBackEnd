import { CategoryController } from './controller/CategoryController';

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
}];