module.exports = (roles) => {
    return (req, res, next) => {
        const userRole = req.session.role;
        console.log(req.session.role)
        if(roles.includes(userRole)) {
            next();
        } else {
            return res.status(401).send('You dont have permission to perform this action.');
        }
    }
}
