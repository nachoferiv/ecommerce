import { Request, Response, NextFunction} from 'express';

export const isAdmin = false;
export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    if (!isAdmin && !req.query.isAdmin) {
        res.status(401).json({ error: 'Not authorized for this action'});
        return;
    }
    next();
}