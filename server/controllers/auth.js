import bcrypt from 'bcrypt';

import Author from '../models/author.js';
import { generateToken } from '../utils/generateToken.js';

/** POST: Author Login */
export const login = async (req, res, next) => {
    try {
        const author = await Author.findOne({ email: req.body.email });
        // CHECK: if email is not equal
        if (!author) {
            const error = new Error('A author with this email could not be found!');
            error.statusCode = 401;
            throw error;
        };
        
        if (author) {
            const isEqual = await bcrypt.compare(req.body.password, author.password);
            if (!isEqual) {
                const error = new Error('Invalid Password!');
                error.statusCode = 401;   
                throw error;
            }
        };

        res
            .status(200)
            .json({
                _id: author._id,
                name: author.name,
                email: author.email,
                token: generateToken(author)
            })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/** Sign Up for new membership */
export const signup = async (req, res, next) => {
    try {
        // Hash Password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newAuthor = new Author({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        const author = await newAuthor.save();

        res
            .status(200)
            .json({
                _id: author._id,
                name: author.name,
                email: author.email,
                token: generateToken(author)
            })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};