const db = require('../models');

exports.showPolls = async (req, res, next) => {
    try {
        const polls = await db.Poll.find()
        .populate('user', ['username', 'id']);
        
        res.status(200).json(polls); //returning all the polls with status 200 meaning OK
    } catch (err) {
        err.status = 400;
        next(err);
    }
  };

exports.usersPolls = async (req, res, next) => {    
    try {
        const {id} = req.decoded;
        const user = await db.User.findById(id).populate('polls');
    
        return res.status(200).json(user.polls);
    } catch (err) {
        err.status = 400;
        next(err);
    }
  };

exports.createPoll = async (req, res, next) => {
    try {
        //console.log(req.decoded);
        const {id} = req.decoded;
        const user = await db.User.findById(id);

        //req body will have the question and options
        const {question, options} = req.body;
        const poll = await db.Poll.create({
            question, 
            user,
            options: options.map(option => ({option, votes:0})),//we need the format of options in database as the option and votes
        }); 
        user.polls.push(poll._id);  //giving the user the poll_id attribute value
        await user.save();  //saving the updated data
        
        res.status(200).json({ ...poll._doc, user: user._id }); //returning created poll and user id with status 200
    } catch (err) {
        err.status = 400;
        next(err);
    }
  };

exports.getPoll = async (req, res, next) => {
    try {
      const {id} = req.params;
      const poll = await db.Poll.findById(id)
      .populate('user', ['username', 'id']);
    
      if (!poll) {
        throw new Error('No poll found');
      }
  
      res.status(200).json(poll);
    } catch (err) {
        err.status = 400;
        next(err);
    }
  };

exports.deletePoll = async (req, res, next) => {
    try {
      const {id: pollId} = req.params;
      const {id: userId} = req.decoded;
      const poll = await db.Poll.findById(pollId);
    
      if (!poll) {
        throw new Error('No poll found');   //checking if the poll exists
      }

      if (poll.user.toString() !== userId) {    //as poll.user is an object
        throw new Error('Unauthorized access'); //checking if the same person who created the poll is deleting it
      }

      await poll.remove();
      res.status(202).json(poll);
    } catch (err) {
        err.status = 400;
        next(err);
    }
  };

exports.vote = async (req, res, next) => {
    try {
      const {id: pollId} = req.params;
      const {id: userId} = req.decoded;
      const {answer} = req.body;

      const poll = await db.Poll.findById(pollId);
      if (!poll) {
          throw new Error('No poll found');   //checking if the poll exists
      }
    
      else if (answer) {
           const vote = poll.options.map(option => {
               if(option.option === answer) {
                   return { //if user inputs any other option than provided option
                    option: option.option,
                    _id: option._id,
                    votes: option.votes + 1,
                   }
               } else {
                   return option;
               }

           });

           if(poll.voted.filter(user => user.toString() === userId).length <= 0) {    //checking if the user has already voted
               poll.voted.push(userId); 
               poll.options = vote;
               await poll.save();

               res.status(202).json(poll);
           } else {
               throw new Error("Already voted");
           }
      } else {
        throw new Error("No answer provided");
    }
    } catch (err) {
        err.status = 400;
        next(err);
    }
  };

  