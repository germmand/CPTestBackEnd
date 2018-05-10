import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";

createConnection().then(async connection => {

    // Creando app.
    const app = express();
    app.use(bodyParser.json());

    // Habilitando CORS.
    // Por simplicidad, se habilita todo a través de '*'.
    // En producción, debe cambiarse a sus respectivos valores.
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', '*');
        response.header('Access-Control-Allow-Headers', '*');

        next();
    });

    // Registrando rutas.
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            (new (route.controller as any))[route.action](req, res, next);
        });
    });

    // Preparando app...
    // ...

    // Iniciando servidor express.
    app.listen(3000);

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
