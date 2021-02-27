import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import {AppError} from '../errors/AppError';

class UserController {
    async create(request: Request, response: Response) {
        // Destructure only name and email from the sent body, considering body a new user 
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });

        /*if (!(await schema.isValid(request.body))) {
         *   return response.status(400).json({
         *       error: "Validation failed"
         *   });
        }*
        */
        
        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch(err) {
            throw new AppError(err);
        }


        // Create repository to access the users table
        const usersRepository = getCustomRepository(UsersRepository);

        // SELECT * FROM users WHERE email = "EMAIL"
        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        // If there's an attempt of creating a user with an existing email, generate error 400: BAD REQUEST
        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }

        // Assign body's data to the repository
        const user = usersRepository.create({
            name,
            email,
        });

        // Save repository to server
        await usersRepository.save(user);

        return response.status(201).json(user);
    }
}

export { UserController }
