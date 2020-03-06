const express = require('express');

const handle = require('./handlers');

//creating express server
const app = express();  //app is an instance of express
const port = 4000;

app.get('/', (req, res) => res.json({hello: 'world'}));

app.use(handle.notFound);
app.use(handle.errors);

app.listen(port, console.log(`Server listening on port ${port}`));