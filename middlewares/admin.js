module.exports = (req, res, next) => {
    if (req.client.role !== "admin") {
        return res.status(401).send(" You Are Not Asmin ");
    }
    next();
};
