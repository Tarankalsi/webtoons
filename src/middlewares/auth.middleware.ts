import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

declare global {
    namespace Express {
        interface Request {

            userId?: string;
        }
    }
}

interface JwtPayload {
    userId: string;
}

const secret = process.env.JWT_SECRET
if (!secret) {
    throw new Error(' jwt secret keys must be defined in the environment variables');
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Error: Missing or invalid Authorization Token"
        })
    }
    const authToken = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(authToken, secret) as JwtPayload
        req.userId = decoded.userId
        next();
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal Error in Authorization Middleware"
        })
    }
  
}

export default authMiddleware;