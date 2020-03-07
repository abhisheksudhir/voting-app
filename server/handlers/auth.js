const db = require('../models');

exports.register = async (req, res, next) => {
    try {
      const user = await db.User.create(req.body); 
      const {id, username} = user;
      
      res.json({id, username}); //returning only the id and username of the user
    } catch (err) {
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
            res.json({id, username,valid});
          } else {
            throw new Error('invalid username or password');
          }
    } catch (err) {
        next(err);
    }
  };