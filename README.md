# User Login Enabled TODO Application

## Description
A user can access a TODO Applcation by providing login credentials - _email (as username) and password_. It is assumed that the user has been registered by the administrator of the application. After a successful login, the user sees an interface to add todo items. The first time the user logins into the application, the todo list is empty, however, if the user had previously entered some todo items, they will appear as a list with the possibility to delete a todo as required. Additionally, the UI shows the user's profile picture, name of the user, current local date and time, and the total number of todo items that belong to the user. There is a Logout button to logout of the application. 

The running app is available at [Todo-App](https://todo-app-bp.herokuapp.com)

## Getting started
Open a terminal (or a shell) and navigate to the location of your choice. Then issue the following command to clone the repository:
#### `git clone https://github.com/bikarnap/preliminary-task-rudolf.git`

## Start the backend server
After cloning the repository as mentioned above, run the following commands
##### `cd preliminary-task-rudolf`
##### `cd todo-app-backend`
##### `npm install`
##### `npm start`

## Start the frontend 
Open a new terminal (or a shell), and navigate the the preliminary-task-rudolf folder that was cloned previously. Then issue the following commands.
##### `cd todo-app`
##### `npm install`
##### `npm start`

After this, the frontend app should automatically launch on the browswer at 
##### `localhost:3000`
In case, the app does not launch automatically, it can be manually launched on your browser by entering
##### `localhost:3000`

## Screenshots of running application

#### Login Page
![Login Page](https://gitlab.com/bikarnap/todo-application-with-login/-/blob/master/screenshots/login-page.PNG)

#### Todo App Page
![Todo App Page](https://gitlab.com/bikarnap/todo-application-with-login/-/blob/master/screenshots/todo-app-page.PNG)

## Tools used during development
1. The frontend was bootstraped with [Create React App](https://github.com/facebook/create-react-app)
2. The backend was created as an `npm` project
3. IDE used: `Visual Studio Code`
4. Version Control using `git`
5. Database: `MongoDB Atlas cloud`
6. `REST client` in Visual Studio Code for performing HTTP actions

## Dependencies Used
1. `express` for backend/api server
2. `axios` for fetching data from the backend/api
3. `mongoose` for mongoDB
5. `cors`for allowing cross-origin in the backend server
6. `dotenv` for environment variables 
7. `bcrypt` for password hashing
8. `jsonwebtoken` user token authentication 

## Development Dependencies Used
1. `jest` for backend testing
2. `cross-env` for cross-platform environment
3. `nodemon` for reloading the devlopment backend server
4. `supertest` for testing the backend server
