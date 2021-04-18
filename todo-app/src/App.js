import { useEffect, useState } from 'react';
import './App.css';

/* Services */
import todoService from './services/todos';
import loginService from './services/login';
import userService from './services/users';

/* Images only for demonstration purpose */
import user1 from './images/image1.jpeg';
import user2 from './images/image4.JPG';
import user3 from './images/image5.JPG';

/* Import Components */
import LoginPage from './components/LoginPage/LoginPage';
import TodoPage from './components/TodoPage/TodoPage';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [date, setDate] = useState(new Date().toDateString());
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loggedin, setLoggedin] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [addTodoError, setAddTodoError] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (time === '12:00:00 AM')
      setDate(new Date().toDateString()); 
    setTimeout(()=> {
      setTime(new Date().toLocaleTimeString());
    }, 1000)
  }, [time])
   
  /* handling for initial page loading */
  useEffect(() => {
    const loggeUserJson = window
      .localStorage
      .getItem('loggedUser')
    ; 

    if (loggeUserJson) {
      const user = JSON.parse(loggeUserJson);
      setUser(user);
      userService.getAll()
        .then(users => {
          const currentUser = users
            .find(u => u.username === user.username); 
          setTodos(currentUser.todos)
        })
      ;       
    }
  }, [username]);

  const selectProfileDp = (username) => {
    if (username === 'bikp@gmail.com')
      setProfileImage(user1);
    else if (username === 'rudolf@gmail.com')
      setProfileImage(user2);
    else 
      setProfileImage(user3);
  };
  const handleLogin = async (event) => {
    event.preventDefault(); 
  
    try{
      const user = await loginService.login({
        username,
        password
      });

      todoService.setToken(user.token);

      /* Save the details of logged-in user in local storage */
      window.localStorage.setItem(
        'loggedUser', 
        JSON.stringify(user)
      );

      // setIsLoginError(false);
      setUser(user);
      selectProfileDp(user.username);
      setLoggedin(true);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setIsLoginError(true);
      setTimeout(() => setIsLoginError(false), 5000);
    }
  };

  const handleLogout = () => {
    try{      
      window.localStorage.removeItem('loggedUser');
      setUser(null);
      setTodos([]);
      setLoggedin(false);
    } catch (exception) {
      console.log('Logout failed!')
    }    
  };

  const handleTodoItem = (event) => {
    const todoItem = event.target.value; 
    setTodo(todoItem);
  }

  const addTodoItem = async (event) => {
    event.preventDefault(); 
    try {
      if (todo) {
        const todoObj = {
          user: user,
          todo: todo
        }; 
  
        const auth = user.token
  
        todoService
          .create(todoObj, auth)
          .then(todo => {
            setTodos(todos.concat(todo))
            setTodo('')
        ;
        });   
      } else {
        setAddTodoError(true);
        setTimeout(() => setAddTodoError(false), 5000);
      }
      
         
    } catch (exception) {
      console.log('Todo could not be added!');
    }
  }
 
  const handleDeleteTodo = (event) => {
    const todoId = event.target.value; 
    const todoToDelete = todos.find(t => t.id === todoId);
      
    if (window.confirm(`Do you want to delete the todo - ${todoToDelete.todo}?`)){
      todoService.remove(todoId)
      .then(() => {
        setTodos(todos.filter(t => t.id !== todoId));
      })
      .catch(error => console.log(error));   
    }
    
  };

  const loginPage = () => 
    <div>
        <LoginPage 
          username={username}
          password={password}
          handleLogin={handleLogin}
          handlePassword={({target}) => setPassword(target.value)}
          handleUsername={({target}) => setUsername(target.value)}
          isLoginError={isLoginError}         
        />
    </div> 
  ; 

  const todoPage = () => 
    <TodoPage 
      todo={todo}
      todos={todos}
      addTodoItem={addTodoItem}
      handleTodoItem={handleTodoItem}
      handleLogout={handleLogout}
      deleteTodo={handleDeleteTodo}
      date={date}
      time={time}
      totalTodos={todos.length}
      user={user.name ? user.name : user.username}
      addTodoError={addTodoError}
      profileDp={profileImage}
    /> 
  ; 

  return (
    <div className="App">
      {user === null && !loggedin
        ? loginPage()
        : todoPage()          
      } 
    </div>
  );
};

export default App;
