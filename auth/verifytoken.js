const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['auth-token'];

    if (!token) return res.status(401).send('No token provided. Access Denied');
    
    try{
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid token');
    }
}


function verifyRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) return res.status(403).send('Access Denied');
        next();
    };
}

module.exports = { verifyToken, verifyRole };