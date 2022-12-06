import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET_TOKEN, (error, decode) => {
            if (error) {
                res
                    .status(401)
                    .json({
                        message: "Invalid Token"
                    })
            } else {
                req.author = decode;
                next();
            }
        })
    } else {
        res
            .status(401)
            .json({
                message: "NO Token"
            })
    }
};