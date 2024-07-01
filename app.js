const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const photographyRouter = require('./routes/photography');
const cocktailRouter = require('./routes/cocktails');
const codeRouter = require('./routes/code');
const apiRouter = require('./routes/api');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// use API routes
app.use('/api', apiRouter);
// use sub-main page routes
app.use('/photography', photographyRouter);
app.use('cocktails', cocktailRouter);
app.use('code', codeRouter);
// Use index routes
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});