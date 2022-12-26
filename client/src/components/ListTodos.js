import React, {useEffect, useState } from "react";
import EditTodos from './EditTodos';



const ListTodos = () => {
  
  const [ todos, setTodos ] = useState([]);
  
  
  
  //Delete todos
  const deleteTodo = async id => {
    try {
      const deleteTodo = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE"
      });
      //console.log(deleteTodo);
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (e) {
      console.error(e.message);
    }
  }
  
  
  
  
 // Get All Todos 
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos")
      const jsonData = await response.json();
      
      setTodos(jsonData);
    } catch (e) {
      console.error(e.message);
    }
  }
  useEffect(() => {
    getTodos();
  }, []);
  
 // console.log(todos.description);
  
  return( 
    <>
    <h1>List Todos</h1>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
    {/*
      <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>*/}
      {/*
      <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr>
        <td>July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
      </tr> */}
      {todos.map(todo => (
        <tr key={todo.todo_id}>
        <td>{todo.description}</td>
        <td>
        <EditTodos todo={todo} /> 
        </td>
        <td>
        <button 
             className='btn btn-danger' 
             onClick={() => deleteTodo(todo.todo_id)}
             > 
             Delete 
        </button>
        </td>
        </tr>
      ))}
      
    </tbody>
  </table>


   </>
   )
};

export default ListTodos;