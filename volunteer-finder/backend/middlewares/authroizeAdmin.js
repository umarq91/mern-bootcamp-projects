export const authorizeUser = (req, res, next) => {
    if (!req.isAdmin && req.user._id !== req.params.userId) {
        return next(customError(403, "You don't have permission to modify this resource!"));
    }
    next();
};
