const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const todosRouter = require('./controllers/todos');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

logger.info(`connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI, {
    userNewUrlParser: true, 
    useFindAndModify: false,
    useUnifiedTopology: true, 
    useCreateIndex: true
}).then(() => {
    logger.info(`connection to MongoDB - successful`);
}). catch(error => {
    logger.error(`error connecting to MongoDB\n${error.message}`)
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use('/api/todos', todosRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use(middleware.handleError);

module.exports = app; 
