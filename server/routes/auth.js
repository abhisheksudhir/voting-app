const router = require('express').Router(); //.Router is used to instantiate an object

const handle = require('../handlers');

router.post('/login', handle.login);
router.post('/register', handle.register);

module.exports = router;