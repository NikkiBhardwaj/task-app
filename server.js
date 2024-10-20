const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

let tasks = []; // In-memory array to store tasks

// 1. Create a new task (POST)
app.post('/tasks', (req, res) => {
    const { title, description, completed } = req.body;
    
    // Basic validation to ensure title and description are provided
    if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
    }

    // Create new task object
    const newTask = {
        id: tasks.length + 1,  // Assign a unique ID based on array length
        title,
        description,
        completed: completed || false,  // Default completed status to false if not provided
    };

    tasks.push(newTask);  // Add the new task to the array
    res.status(201).json(newTask);  // Send the created task as the response with status 201
});

// 2. Retrieve all tasks (GET)
app.get('/tasks', (req, res) => {
    res.json(tasks);  // Return all tasks in the array
});

// 3. Retrieve a specific task by ID (GET)
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);  // Get task ID from URL params
    const task = tasks.find(t => t.id === taskId);  // Find task by ID

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });  // Return 404 if task not found
    }

    res.json(task);  // Return the found task as JSON
});

// 4. Update a task by ID (PUT/PATCH)
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);  // Get task ID from URL params
    const { title, description, completed } = req.body;  // Destructure fields from request body

    const task = tasks.find(t => t.id === taskId);  // Find task by ID

    if (!task) {
        return res.status(404).json({ message: 'Task not found' });  // Return 404 if task not found
    }

    // Update fields if they exist in the request body
    if (title) task.title = title;
    if (description) task.description = description;
    if (typeof completed !== 'undefined') task.completed = completed;

    res.json(task);  // Return the updated task
});

// 5. Delete a task by ID (DELETE)
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);  // Get task ID from URL params
    const taskIndex = tasks.findIndex(t => t.id === taskId);  // Find the index of the task

    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });  // Return 404 if task not found
    }

    tasks.splice(taskIndex, 1);  // Remove the task from the array
    res.status(204).send();  // Return a 204 No Content response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
