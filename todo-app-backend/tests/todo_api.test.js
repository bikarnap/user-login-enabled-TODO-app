const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Todo = require('../models/todo');
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
    await Todo.deleteMany({}); 
    await Todo.insertMany(helper.initialTodos);
    // let todoObj = new Todo(helper.initialTodos[0]); 
    // await todoObj.save(); 
    // todoObj = new Todo(helper.initialTodos[1]);
    // await todoObj.save(); 
});

describe('when some todos are initially saved', () => {
    test('all notes are returned', async () => {
        const res = await api.get('/api/todos');
        expect(res.body)
            .toHaveLength(helper.initialTodos.length)
        ;
    });

    test('todos are returned as json', async () => {
        await api
            .get('/api/todos')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        ;
    });

    test('a specific todo is within the returned todos', async () => {
        const res = await api.get('/api/todos');
        const todos = res.body.map(todo => todo.todo); 
    
        expect(todos).toContain(
            'Explore the Jest documentation'
        );
    });
});

describe('displyaing a specific todo item', () => {
    test('succeeds with a valid id', async () => {
        const todosInitialState = await helper.todosInDb(); 
        const todoToView = todosInitialState[0]; 
    
        const resultTodo = 
            await api
                .get (`/api/todos/${todoToView.id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        ;
    
        const processedTodoToView = JSON.parse(JSON.stringify(todoToView));
    
        expect(resultTodo.body)
            .toEqual(processedTodoToView)
        ;
    });

    test('fails with a status code of 404 if todo item not present', async () => {
        const validNonExistingId = await helper.nonExistingId();

        console.log(validNonExistingId);

        await api
            .get(`/api/todos/${validNonExistingId}`)
            .expect(404)
        ;
    });

    test('fails with a status code of 400 id invalid', async () => {
        const invalidId = '6a3d5da54070081a92a3445'; 

        await api
            .get(`/api/todos/${invalidId}`)
            .expect(400)
        ;
    });
});

describe('creating a new todo', () => {
    test('succeeds with valid todo data', async () => {
        const newTodo = {
            todo: 'The sun is shining, go out!'
        };

        await api   
            .post('/api/todos')
            .send(newTodo)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        ;

        const todosEndState = await helper.todosInDb();
        expect(todosEndState).toHaveLength(helper.initialTodos.length + 1);

        const todos = todosEndState.map(todo => todo.todo);
        expect(todos).toContain(
            'The sun is shining, go out!'
        );
    });

    test('fails with a status code of 404 id invalid todo', async () => {
        const newTodo = {
            
        };

        await api
            .post('/api/todo')
            .send(newTodo)
            .expect(404)
        ;

        const todosEndState = await helper.todosInDb(); 

        expect(todosEndState).toHaveLength(
            helper.initialTodos.length
        );
    });
});

describe('delete action on todo item', () => {
    test('succeeds with a status code 204 if valid id', async () => {
        const todosInitialState = await helper.todosInDb();
        const todoToDelete = todosInitialState[0];

        await api
            .delete(`/api/todos/${todoToDelete.id}`)
            .expect(204)
        ;

        const todosEndState = await helper.todosInDb();

        expect(todosEndState)
            .toHaveLength(
                helper.initialTodos.length - 1
            )
        ;

        const todos = todosEndState.map(todo => todo.todo);

        expect(todos).not.toContain(todoToDelete.todo);
    });
});




// test('there are two todos', async () => {
//     const res = await api.get('/api/todos');
//     expect(res.body).toHaveLength(helper.initialTodos.length);
// });

// test('the first todo is about JWT', async () => {
//     const res = await api.get('/api/todos'); 
//     expect(res.body[0].todo)
//         .toBe('Learn about JWT')
//     ;
// });



// test('a valid todo can be added', async () => {
//     const newTodo = {
//         todo: `Keep a reminder for today's meeting`
//     };

//     await api 
//         .post('/api/todos')
//         .send(newTodo)
//         .expect(200)
//         .expect('Content-Type', /application\/json/)
//     ;
    
//     const todosEndState = await helper.todosInDb();
//     expect(todosEndState).toHaveLength(helper.initialTodos.length + 1); 

//     const todos = todosEndState.map(todo => todo.todo);
//     expect(todos).toContain(
//         `Keep a reminder for today's meeting`
//     );

// });

// test('todo item without a todo is not added', async () => {
//     const newTodo = {
//         todo: ''
//     };

//     await api
//         .post('/api/todos')
//         .send(newTodo)
//         .expect(500)
//     ;

//     const todosEndState = await helper.todosInDb();

//     expect(todosEndState).toHaveLength(helper.initialTodos.length);
// });



// test('a todo can be deleted', async () => {
//     const todosInitialState = await helper.todosInDb();
//     const todoToDelete = todosInitialState[0];

//     await api
//         .delete(`/api/todos/${todoToDelete.id}`)
//         .expect(204)
//     ;

//     const todosEndState = await helper.todosInDb();

//     expect(todosEndState)
//         .toHaveLength(
//             helper.initialTodos.length - 1
//         )
//     ;

//     const todos = todosEndState.map(todo => todo.todo);
    
//     expect(todos)
//             .not
//             .toContain(
//                 todoToDelete.todo
//             )
//     ;
// });

afterAll(() => {
    mongoose.connection.close();
});