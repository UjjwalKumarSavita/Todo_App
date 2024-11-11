import Todo from '../models/Todo.js'

export const createTodo=  async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log(title,description);
    
    const userId = req.userId; // The user ID from the verified JWT token
    console.log(userId);
    
    const newTodo = new Todo({
      title,
      description,
      userId,
    });
    console.log(newTodo
    );
    

    await newTodo.save();
    res.status(201).json({ message: 'Todo created successfully', newTodo });
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo', error });
  }
};

export const getAllTodos=  async (req, res) => {
  try {
    const userId = req.userId; // userId from the JWT middleware
    const todos = await Todo.find({ userId });

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos', error });
  }
};

export const toggleStatus =async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await Todo.findOne({ _id: id, userId: req.userId });
  
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      // Toggle the isCompleted status
      todo.isCompleted = !todo.isCompleted;
      await todo.save();
  
      res.status(200).json({ message: 'Todo updated successfully', todo });
    } catch (error) {
      res.status(500).json({ message: 'Error updating todo', error });
    }
  };


// Controller to delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;  // Extract todo ID from the route parameter
    const userId = req.userId;  // User ID from the JWT token

    // Find the todo by its ID and ensure it belongs to the authenticated user
    const todo = await Todo.findOneAndDelete({ _id: id, userId });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Return success response
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo', error });
  }
};

export const updateTodo = async (req, res) => {
    try {
      const { id } = req.params;  // Extract todo ID from route parameter
      const { title, description } = req.body;  // Extract updated data from the request body
      const userId = req.userId;  // User ID from the JWT token
  
      // Find the todo and ensure it belongs to the authenticated user
      const todo = await Todo.findOne({ _id: id, userId });
  
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      // Update the todo with the new title and description
      todo.title = title;
      todo.description = description;
  
      // Save the updated todo
      await todo.save();
  
      res.status(200).json({ message: 'Todo updated successfully', updatedTodo: todo });
    } catch (error) {
      res.status(500).json({ message: 'Error updating todo', error });
    }
  };

