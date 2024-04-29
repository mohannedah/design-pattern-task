import express from "express";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if(!req.headers.authorization?.startsWith("Bearer")) return res.status(404).json({message: "Not Authenticated"});
    const token = req.headers.authorization?.split("Bearer")[1].trim();
    try {
        var payload = (await jwt.verify(token, (process.env.SECRET_TOKEN_KEY as string))) as any;
        if(!payload) {
            return res.status(401).json({message: "Unauthorized to access this route"});
        }
        req.body.userId = payload.userId;
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({message: "Unauthorized to access this route"});    
    } 
}