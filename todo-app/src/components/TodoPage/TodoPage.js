import React from 'react';

import './TodoPage.css';
import TodoForm from './AddTodoForm';
import TodoList from '../TodoList';

const TodoPage = (props) => {
    const { 
        todo
        , handleTodoItem
        , handleLogout
        , addTodoItem 
        , addTodoError
        , todos
        , deleteTodo
        , totalTodos
        , time
        , date
        , user
        , profileDp
    } = props;   
    
    return(
        <div>
            <div className="row navbar">
                <div className="navbar-left u-company-name">BikarnaSoft</div>
                <div className="navbar-right u-app-name">Todo Application</div>
            </div>

            <div className="u-row">
                <div className="u-column u-left">
                    <div>
                        <img className="user-dp" src={profileDp} alt="" />
                    </div>

                    <div className="welcome-user">
                        <p>User: {user}</p>
                    </div>                   

                    <div className="date">{date}</div>
                    <div className="time">{time}</div>
                    <div className="total-todos">You have {totalTodos} TODO items</div>

                    <div className="u-logout">
                        <button onClick={handleLogout} className="u-logout-button">LOGOUT</button>
                    </div>
                </div>

                <div className="u-column u-right">
                    <TodoForm 
                        todo={todo}
                        handleTodoItem={handleTodoItem}
                        addTodoItem={addTodoItem}
                        addTodoError={addTodoError}
                    />
                    <TodoList 
                        todos={todos}
                        deleteTodo={deleteTodo}
                    />
                </div>
            </div>           
        </div>
    );
};

export default TodoPage; 