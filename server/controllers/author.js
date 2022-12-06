import bcrypt from 'bcrypt';

import Author from '../models/author.js';
import { generateToken } from '../utils/generateToken.js';

/** GET: All Authors */
let AUTHORS_LIST_PER_PAGE = 10;

export const getAuthorsList = async (req , res, next) => {
    try {
        // List Per Page
        const { query } = req;
        const page = query.page || 1;
        const pageSize = query.pageSize || AUTHORS_LIST_PER_PAGE;

        const authorsList = await Author
            .find()
            .skip((page - 1) * pageSize)
            .limit(pageSize)
        
        const countAuthorsList = await Author.countDocuments();

        res
            .status(200)
            .json({
                authorsList,
                countAuthorsList,
                page,
                pages: Math.ceil(countAuthorsList / pageSize)
            })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/** DELETE: Author */ 
export const deleteAuthor = async (req, res, next) => {
    try {
        const author = await Author.findById(req.params.id);
        // CHECK: if author id is not equal
        if (!author) {
            const error = new Error('A author with this ID could not be found!');
            error.statusCode = 401;
            throw error;
        };
       
        if (author) {
            await author.remove();

            res
                .status(200)
                .json({
                    message: "Author Deleted"
                })
        };
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

/** UPDATE: Name, Email, Password */
export const updateAuthorInfo = async (req, res, next) => {
    try {
        const author = await Author.findById(req.author._id);
        // CHECK: if author id is not equal
        if (!author) {
            const error = new Error('A author with this ID could not be found!');
            error.statusCode = 401; 
            throw error;
        };

        if (author) {
            author.name = req.body.name || author.name;
            author.email = req.body.email || author.email;
    
            // CHECK: enter password is equal req.body.password 
            if (req.body.password) {
                const salt = await bcrypt.genSalt(12);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            };
 
            const updatedAuthor = await author.update();

            res
                .status(200) 
                .json({
                    _id: updatedAuthor._id,
                    name: updatedAuthor.name,
                    email: updatedAuthor.email,
                    password: updatedAuthor.password,
                    token: generateToken(updatedAuthor)
                })
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};