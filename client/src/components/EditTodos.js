import React, { useState } from 'react';

const EditTodos = ({ todo }) => {
 const [ description, setDescription ] = useState(todo.description);
 
 
 // edit description function
 const updateDescription = async e => {
   e.preventDefault();
   try{
     const body = { description }
     const response = await fetch(`http://localhost:3000/todos/${todo.todo_id}`,{
       method: "PUT",
       headers: {"Content-Type":"application/json"},
       body : JSON.stringify(body)
     })
     
     window.location = '/';
   } catch(e){
     console.error(e.message);
   }
 }
 
  return(
    <>

    <button type="button" class="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>Edit</button>


  <div id={`id${todo.todo_id}`}
  onClick={() => setDescription(todo.description)}
  class="modal fade"
  role="dialog">
   <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"
        onClick={() => setDescription(todo.description)}
        >&times;</button>
         <h4 class="modal-title">Edit Todos</h4>
    </div>
      
    <div class="modal-body">
      <input type='text' className='form-control' value={description} 
      onChange={e => setDescription(e.target.value)}
      />
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal"
        onClick={e => updateDescription(e)}
        >Edit</button>
        <button type="button" class="btn btn-success" data-dismiss="modal"
        onClick={() => setDescription(todo.description)}
        >Close</button>
    </div>
    </div>
    </div>
  </div>
  < />
);
};

export default EditTodos;