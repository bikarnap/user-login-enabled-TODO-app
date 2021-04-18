const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const api = supertest(app);
const helper = require('./test_helper');


describe('where there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('password', 10); 

    const user = new User({
      username: 'root', 
      passwordHash: passwordHash
    });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersStartState = await helper.usersInDb();

    const newUser = {
      username: 'bikarnap', 
      name:'Bikarna Pokharel', 
      passwordHash:'difficultpass'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    ;

    const usersEndState = await helper.usersInDb();
    
    expect(usersEndState)
      .toHaveLength(usersStartState.length + 1)
    ;

    const usernames = usersEndState.map(user => user.username); 

    expect(usernames).toContain(newUser.username);
  });

  test('creation fails if username is already registered', async () => {
    const usersStartState = await helper.usersInDb(); 

    const newUser = {
      username: 'root', 
      name: 'Root User', 
      passwordHash: 'vvdifficultTask'
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    ;

    expect(result.body.error).toContain('username to be unique');

    const usersEndState = await helper.usersInDb(); 

    expect(usersEndState)
      .toHaveLength(usersStartState.length)
    ;
  });
});

// const initialUser = {
//   username: 'username',
//   passwordHash: 'password',
//   name: 'name'
// }

// beforeEach(async () => {
//   await User.deleteMany({})

//   const userObject = new User(initialUser)
//   await userObject.save()
// })

// test('GET /api/users id is id not _id', async () => {
//   try {
//     const response = await api.get('/api/users')
//     expect(response.body[0].id).toBe(24)
//   } catch (e) {
//     console.log('error', e)
//   }
// })

// test('GET /api/users user._id is not set', async () => {
//   try {
//     const response = await api.get('/api/users')
//     expect(response.body[0]._id).toBe(undefined)
//   } catch (e) {
//     console.log('error', e)
//   }
// })

// afterAll(() => {
//   mongoose.connection.close()
// })
