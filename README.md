# task-app
## Setup
1. Clone the repository or download the zip file.
2. Run `npm install` to install dependencies.
3. Start the server with `node server.js`.

## Endpoints
- `POST /tasks`: Add a new task.
  - Request body: `{ "title": "Task Title", "description": "Task Description", "completed": false }`
- `GET /tasks`: Get all tasks.
- `GET /tasks/:id`: Get a task by ID.
- `PUT /tasks/:id`: Update a task by ID.
- `DELETE /tasks/:id`: Delete a task by ID.

## Example
```bash
curl -X POST http://localhost:3000/tasks -d '{"title": "Sample Task", "description": "This is a task", "completed": false}' -H "Content-Type: application/json"
