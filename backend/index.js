const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const pool = require('./db')
const port = 3000
const cors = require('cors');

app.use(express.json()); //res.body
app.use(cors());


app.get('/', (req, res) => {
  res.json({
    info: 'project kztodo with postgresql databases '
  })
})




// ROUTS //
//get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo;");
    res.json(allTodos.rows);
  } catch (e) {
    console.error(e.message);
  }
})




// post new todos
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
   res.json(newTodo.rows[0]);
   
  } catch (e) {
    console.error(e.message);
  }
});




//get todos by id
app.get('/todos/:id', async (req, res) => {
   try {
     //console.log(req.params);
     const { id } = req.params;
     const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
     res.json(todo.rows[0]);     
   } catch (e) {
   console.error(e.message);
  }
});




//update a todos
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",
    [description, id]);
    res.json("Todo was updated successfully !")
  } catch (e) {
    console.error(e.message);
  }
})


//delete a todos
app.delete('/todos/:id', async (req, res ) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
    res.json("Todo was deleted");
  } catch (e) {
    console.error(e.message);
  }
  
})


// Start the server
app.listen(port, () => {
  console.log('Server listening on port', port);
});
