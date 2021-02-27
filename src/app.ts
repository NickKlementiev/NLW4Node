// reflect-metadata is a required package for typeORM
import 'reflect-metadata';
import express from 'express';
import "express-async-errors" from 'express';

// importing index.ts from database
import createConnection from './database';
import { router } from './routes';
import {AppError} from './errors/AppError';

createConnection();

const app = express();

// Turn on JSON processing capabilites to the server
app.use(express.json());
app.use(router);

app.use((err: Error, request: Request, response: Respost, _next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    return response.status(500).json({
        status: "Error",
        message: `Internal server error ${err.message}`
    });
});

export { app };
