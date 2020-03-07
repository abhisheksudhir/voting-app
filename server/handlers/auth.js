const jwt = require('jsonwebtoken');

const db = require('../models');

exports.register = async (req, res, next) => {
    try {
      const user = await db.User.create(req.body); 
      const {id, username} = user;

      const token = jwt.sign({id, username}, process.env.SECRET);
      
      res.status(201).json({id, username,token}); //returning only the id,token and username of the user with status 201 saying it is created
    } catch (err) {
        if(err.code === 11000){
            err.message = 'Username already taken' ;
        }
        next(err);
    }
  };

  exports.login = async (req, res, next) => {
    try {
        const user = await db.User.findOne({username: req.body.username});
        
        if(user===null) {
            throw new Error('user does not exist');
          } 
          
        const {id, username} = user;
        const valid = await user.comparePassword(req.body.password);    //comparing if passwords match. returns true if they match

        if(valid) {
            const token = jwt.sign({id, username}, process.env.SECRET);
            res.json({id, username,token});
          } else {
            throw new Error(); 
          }
    } catch (err) {
        if(err.message!='user does not exist'){
            err.message = 'Invalid username or password'
        }            
        next(err);
    }
  };