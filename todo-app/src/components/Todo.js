import React from 'react';
import './TodoPage/TodoPage.css';

const Todo = ({ todo, deleteTodo, id }) => {
    return(
        <div className="todo-style">
            <div>
                <div className="todo">{todo}</div>
                <div>
                    <button 
                        className="todo-delete" 
                        onClick={deleteTodo} 
                        value={id}>DELETE
                    </button>
                </div>   
            </div>             
        </div>
    ); 
};

export default Todo;