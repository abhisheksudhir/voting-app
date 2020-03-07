const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.headers['authorization']) {  //checking the headers for the authorization key
        const token = req.headers.authorization.split(' ')[1]; //eg: Bearer adhfajhidfijarkfrnv (we don't want the first part)
        jwt.verify(token, process.env.SECRET, (err, decoded) => {   //verifying if the json web token is an actual token
            if(err) {
                next(Error('Failed to authenticate token'));
            } else {
                req.decoded = decoded;  //to know the specific user who is logged in
                next();
            }
        });
    } else{
        ext(Error('No token provided'));
    }
};