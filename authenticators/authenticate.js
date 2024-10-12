const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined) {
        return res.status(401).json("You don't have permission for this action.")
    }
    next();
}
module.exports = {isAuthenticated}