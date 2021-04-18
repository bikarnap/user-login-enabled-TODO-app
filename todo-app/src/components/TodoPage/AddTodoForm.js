import React from 'react'; 
import './AddTodoForm.css';

const AddTodoForm = ({ todo, handleTodoItem, addTodoItem, addTodoError }) => {
    return(
        <form className="todo-form" onSubmit={addTodoItem}>
            <input 
                type="text" 
                onChange={handleTodoItem} 
                value={todo} 
                placeholder="ENTER A TODO" 
            />
            <div className="add-todo-error">
                {addTodoError 
                    ? <div>A todo must be entered!</div>
                    : ''
                }   
            </div>
                     
            <div>
                <button className="add-button">ADD TODO</button>
            </div>
        </form>
    )
};

export default AddTodoForm;