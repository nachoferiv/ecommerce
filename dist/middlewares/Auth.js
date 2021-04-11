"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.isAdmin = void 0;
exports.isAdmin = false;
var isAuthorized = function (req, res, next) {
    if (!exports.isAdmin && !req.query.isAdmin) {
        res.status(401).json({ error: 'Not authorized for this action' });
        return;
    }
    next();
};
exports.isAuthorized = isAuthorized;
