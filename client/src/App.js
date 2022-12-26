
import React  from "react";
import InputTodo from './components/InputTodo'; 
import ListTodos from './components/ListTodos'

 function App() {
   return (
      <>
      <div class='container m-2'>
      <InputTodo />
      <ListTodos />
    </div>
    </>
   );
 };

export default App;