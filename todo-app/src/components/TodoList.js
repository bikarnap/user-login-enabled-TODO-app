import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, deleteTodo}) => {
    return(
        <div>
            { todos.map(todo => 
            <Todo 
                key={todo.todo}
                todo={todo.todo} 
                deleteTodo={deleteTodo}
                id={todo.id}
            />
        )}
        </div>       
    );
}
export default TodoList;