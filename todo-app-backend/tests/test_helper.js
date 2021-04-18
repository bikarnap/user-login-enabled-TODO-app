const Todo = require('../models/todo');
const User = require('../models/user');

const initialTodos = [
    {
        todo: 'Learn about JWT'
    }, 
    {
        todo: 'Explore the Jest documentation'
    }
];

const nonExistingId = async () => {
    const todo = new Todo({
        todo: 'remove the lights'
    });
    await todo.save(); 
    await todo.remove(); 

    return todo._id.toString(); 
};

const todosInDb = async () => {
    const todos = await Todo.find({}); 
    return todos.map(todo => todo.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
};

module.exports = {
    initialTodos,
    nonExistingId, 
    todosInDb,
    usersInDb
};