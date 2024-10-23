module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.body.role;
        console.log(userRole)
        if(roles.includes(userRole)) {
            next();
        } else {
            return res.status(401).send('You dont have permission to perform this action.');
        }
    }
}
