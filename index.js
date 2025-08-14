// This line of code below will load your configuration from .env as long as it exists
require("dotenv").config();

// mongoose package is used to communicate with your MongoDB Cluster
const mongoose = require("mongoose");

// You will need to replace the databaseUrl with the URL of your MongoDB Cluster
const databaseUrl = process.env.DB_URL;


/*
// This code will connect to your MongoDB cluster
mongoose.connect(databaseUrl)
// The .then() method prints out a message if you successfully connected to your MongoDB Cluster
.then(() => console.log("Connected to MongoDB"))
// If there is an error connecting to your cluster it will get printed to the console
.catch((err) => console.error(err.message));
*/

mongoose.connect(databaseUrl)
  .then(() => {
    console.log("Connected to MongoDB");
    return getTodos(); // dump all todos
  })
  .catch((err) => console.error(err.message));


/**
 * Example of a MongoDB Table being structured
 * In this example the todoScheme has a title that is a string
 * content that is a string
 * and isComplete value that is a boolean
 */
const todoSchema = new mongoose.Schema({
    title: String,
    content: String,
    isComplete: Boolean,
}, { timestamps: true });

// After creating the schema you need to use mongoose.model to be able to interact with DB model
const Todo = mongoose.model('Todo', todoSchema);

// Function to Create Todo
async function createTodo(){
    const payload = {
        title: "Leeroy Jet Gibbs",
        content: "Corgi",
        isComplete: false,
    };
    const newTodo = new Todo(payload);
    // safeguard to prevent duplicate objects being created by title
    const exists = await Todo.findOne({ title: payload.title });
    if (exists) {
        return
    }
    const result = await newTodo.save();
    console.log(result);
}

// Function to get all Todos from the Database
async function getTodos(){
    const result = await Todo.find({ });
    console.log("All Todos:", result);
    console.log(result.length);
}

// Function to get a Todo by its title 
async function getTodoByTitle(){
    const result = await Todo.findOne({ title: "Fun Guy Kawhi" });
    if (result) {
        console.log(result);
        return;
    }
    console.log("404 Not Found");
}

// Function to get Todo by its id
async function getTodoById(){
    const id = "111111111111111111111111"; // replace with a valid id from YOUR TODOS table
    const result = await Todo.findById(id);
    if (result) {
        console.log(result);
        return;
    }
    console.log("404 Not Found");
}

// Function to update a Todo by a complex query
async function updateTodo(){
    const query = { title: "Fun Guy Kawhi" };
    const updatedPayload = { isComplete: true };
    const newVersion = { new: true };
    const result = await Todo.findOneAndUpdate(query, updatedPayload, newVersion);
    console.log(result);
}

// Function to update Todo by its id
async function updateTodoById(){
    const todoId = ""; // replace with a valid id from YOUR TODOS table
    const updatedPayload = { content: "Updated Todo Content by its _id" };
    const newVersion =  { new: true };
    const result = await Todo.findByIdAndUpdate(todoId, updatedPayload, newVersion);
    console.log(result);
}


// Function to delete Todo by a complex query
async function deleteTodo(){
    // mocking the creation of a new Todo to eventually be deleted
    const newTodo = new Todo({
        title: "Crazy Steveino",
        content: "WHO CARES ITS GONNA GET REMOVED",
        isComplete: true,
    });
    await newTodo.save();
    // Delete the Todo by its title
    const result = await Todo.deleteOne({ title: "Crazy Steveino" });
    console.log(result);
}


// Function to delete Todo by its id
async function deleteTodoById(){}

// Under this comment, call your functions to be able to execute them
updateTodo();

