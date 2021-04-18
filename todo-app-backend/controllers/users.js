const bcrypt = require('bcrypt'); 
const usersRouter = require('express').Router();
const User = require('../models/user'); 

usersRouter.post('/', async (req, res) => {
  const body = req.body; 
  const saltRounds = 10; 
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username, 
    name: body.name, 
    passwordHash: passwordHash
  });

  const savedUser = await user.save(); 

  res.json(savedUser);
});

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
      .populate('todos', { todo: 1 })   
    ;
    res.json(users); 
})

usersRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const user = {
    todos: body.todos, 
    username: body.username, 
    name: body.name, 
    
  }

  User.findByIdAndUpdate(req.params.id, user, { new: true })
    .then(updatedUser => {
      res.json(updatedUser.toJSON())
    })
    .catch(error => next(error))
})


module.exports = usersRouter
