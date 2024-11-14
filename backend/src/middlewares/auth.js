const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({})
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.id){

            req.userId = decoded.id;
            next()
        }
        else{
        return res.status(403).json({})

        }
    } catch (error) {
        return res.status(403).json({msg:"User not Logged In"})
        
    }
}

module.exports = { isLoggedIn }