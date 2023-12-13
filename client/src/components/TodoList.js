import React from 'react';
import TodoItem from './TodoItem';
import "./TodoList.css";

function TodoList({ todoArr, deleteTodoItem, completedTasks, editTasks, clMode }) {
 
  return (
    <div className='listContainer'>
        {todoArr.map((item) => (
            <TodoItem key={item.id} item={item} deleteTodoItem={deleteTodoItem} completedTasks={completedTasks} editTasks={editTasks} clMode={clMode} />
        ))}  
    </div>
  )
}

export default TodoList;