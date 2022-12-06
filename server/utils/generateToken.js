import jwt from 'jsonwebtoken';

export const generateToken = (author) => {
    return jwt.sign(
        {
            _id: author._id, 
            name: author.name,
            email: author.email
        },
        process.env.JWT_SECRET_TOKEN,
        {
            expiresIn: '15d'
        }
    )
};