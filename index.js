// This line of code below will load your configuration from .env as long as it exists
require("dotenv").config();

// mongoose package is used to communicate with your MongoDB Cluster
const mongoose = require("mongoose");

// You will need to replace the databaseUrl with the URL of your MongoDB Cluster
const databaseUrl = process.env.DB_URL;

// This code will connect to your MongoDB cluster
mongoose.connect(databaseUrl)
// The .then() method prints out a message if you successfully connected to your MongoDB Cluster
.then(() => console.log("Connected to MongoDB"))
// If there is an error connecting to your cluster it will get printed to the console
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
        title: "Fun Guy Kawhi",
        content: "Kawhi is a fun guy (fungi)!",
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
    const result = await Todo.find({ content: /a/ });
    console.log(result);
    console.log(result.length);
}


// Function to get a Todo by its title 
async function getTodoByTitle(){}

// Function to get Todo by its id
async function getTodoById(){}

// Function to update a Todo by a complex query
async function updateTodo(){}

// Function to update Todo by its id
async function updateTodoById(){}

// Function to delete Todo by a complex query
async function deleteTodo(){}

// Function to delete Todo by its id
async function deleteTodoById(){}

// Under this comment, call your functions to be able to execute them