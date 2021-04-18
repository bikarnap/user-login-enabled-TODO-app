const jwt = require('jsonwebtoken');
const todosRouter = require('express').Router();
const Todo = require('../models/todo');
const User = require('../models/user');

todosRouter.get('/', async (req, res) => { 
  const todos = await Todo
    .find({}).populate('user', { username: 1, name: 1 })
  ;

  res.json(todos.map(todo => todo.toJSON()));
})

const getTokenFrom = req => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

todosRouter.post('/', async (req, res) => {
  const body = req.body;
  const token = getTokenFrom(req)
  // if (!req.token) {
  //     return res.status(401).json({error: 'token missing or invalid'});
  // };
  const decodedToken = jwt.verify(token, process.env.SECRET)

  // if (!decodedToken.id) {
  //   return res.status(401).json({error: 'token missing or invalid'});
  // };
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const todo = new Todo({
    todo: body.todo,
    user: user._id
  })

  const savedTodo = await todo.save()
  user.todos = user.todos.concat(todo)
  await user.save()

  res.json(savedTodo.toJSON())
}); 

todosRouter.get('/:id', async (req, res) => {
  const Todo = await Todo.findById(req.params.id)
  if (Todo) {
    res.json(Todo.toJSON())
  } else {
    res.status(404).end()
  }
})

todosRouter.delete('/:id', async (req, res) => {
  await Todo.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

todosRouter.put('/:id', (req, res, next) => {
  const body = req.body

  const todo = {
    content: body.content,
  }

  Todo.findByIdAndUpdate(req.params.id, todo, { new: true })
    .then(updatedTodo => {
      res.json(updatedTodo.toJSON())
    })
    .catch(error => next(error))
})

module.exports = todosRouter