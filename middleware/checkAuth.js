const jwt = require('jsonwebtoken');

// sign up webtoken check
module.exports = (req, res, next) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log("Auth succeeded")
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};



