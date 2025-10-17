const jwt = require('jsonwebtoken');

module.exports = {
    verifyToken: (req, res, next) => {
    const {authorization} = req.headers;
    
    if (!authorization) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const jwtsecret = process.env.JWT_SECRET || 'your_jwt_secret';
        const decoded = jwt.verify(token, jwtsecret);
        
        req.user = decoded; 
        
        next();
        
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
};