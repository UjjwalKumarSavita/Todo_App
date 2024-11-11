import React, { useState, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

const Todo = ({ isAuthenticated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  const [editTodo, setEditTodo] = useState(null); // State for the todo being edited
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_ADDRESS}todo/getalltodos`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // add auth token here
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

        const data = await response.json();
        console.log(data);

        setTodos(data.todos);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };

    fetchTodos();
  }, [isAuthenticated]);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleToggle = () => {
    setShowCompleted(!showCompleted);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_ADDRESS}todo/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      // Update the local state by removing the deleted todo
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    if (title.trim() === "") {
      alert("Please add a title");
      return;
    }

    const newTodo = { title, description, isCompleted: false };

    try {
      const response = await fetch(
        import.meta.env.VITE_BASE_ADDRESS + "todo/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adding the token here
          },
          body: JSON.stringify(newTodo),
        }
      );

      if (response.ok) {
        const savedTodo = await response.json();
        console.log(savedTodo);

        setTodos([...todos, savedTodo.newTodo]); // Add the new task to the list
        saveToLS();
      } else {
        console.error("Failed to create todo");
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }

    setTitle("");
    setDescription("");
  };

  const handleCheck = async (e) => {
    const id = e.target.name;
    console.log(id);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_ADDRESS}todo/${id}/togglestatus`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      // Update todo in local state
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo); // Set the todo to be edited
    setNewTitle(todo.title); // Pre-fill the form with current values
    setNewDescription(todo.description);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedTodo = {
      title: newTitle,
      description: newDescription,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_ADDRESS}todo/update/${editTodo._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedTodo),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedData = await response.json();

      // Update the local state with the updated todo
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === editTodo._id
            ? { ...todo, title: newTitle, description: newDescription }
            : todo
        )
      );
      setEditTodo(null); // Clear the edit form
      setNewTitle("");
      setNewDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditTodo(null); // Close the edit form without saving changes
  };

  return (
    <div className="flex w-[100%] h-[90vh] ">
      <div className=" m-auto flex flex-col gap-4 h-[80vh] w-[90vw] sm:w-[80vw] md:w-[60vw] xl:w-[40vw] p-6 container rounded-[16px] ">
        <div className="self-center font-bold text-xl underline">
          Schedule your To-Do's at one place
        </div>
        <div className="addtodo flex flex-col gap-2">
          <div className="font-bold text-md">Add a Task</div>
          <div className="flex gap-4 flex-col">
            <input
              onChange={(e) => setTitle(e.target.value)}
              className="taskinput rounded-lg"
              type="text"
              placeholder="Title"
              value={title}
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              className="taskinput rounded-lg"
              type="text"
              placeholder="Description"
              value={description}
            />
            <button
              disabled={title.length <= 0}
              onClick={handleAdd}
              className="bg-[#46d2ffb5] text-[#000] hover:bg-[#00befb] hover:text-black rounded-lg py-1 px-5 font-bold hover:font-semibold disabled:bg-[#3c8da5cc] hover:cursor-pointer"
            >
              Save
            </button>
          </div>
          <div className="showcmpbtn flex items-center gap-2">
            <input
              onChange={handleToggle}
              type="checkbox"
              checked={showCompleted}
            />
            <span className="text-xs font-semibold">Show Finished Tasks</span>
          </div>
        </div>
        <div className="w-[100%] rounded-full h-[3px] bg-black"></div>

        <div className="font-bold text-md">Your To-Do's List</div>
        <div className="todos flex flex-col gap-2 overflow-auto scroll-smooth">
          {todos.length === 0 && <div>You have no task scheduled</div>}
          {todos.map(
            (item) =>
              (showCompleted || !item.isCompleted) && (
                <div
                  key={item._id}
                  className="todo flex justify-between border border-black p-2 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="checkbtn">
                      <input
                        onChange={handleCheck}
                        className="taskcheck"
                        type="checkbox"
                        checked={item.isCompleted}
                        name={item._id}
                      />
                    </div>
                    <div className={item.isCompleted ? "line-through" : "text"}>
                      <span className="overflow-anywhere">{item.title}</span>
                      <span className="text-xs block">{item.description}</span>
                    </div>
                  </div>
                  <div className="edtdltbtn button flex gap-4">
                    <button hidden={item.isCompleted} onClick={() => handleEdit(item)}>
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this task?"
                          )
                        ) {
                          handleDelete(item._id);
                        }
                      }}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
          )}
          {editTodo && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-lg w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] shadow-lg">
                <h3 className="text-2xl font-semibold text-center mb-6 text-[#333]">
                  Edit Todo
                </h3>
                <form onSubmit={handleUpdate}>
                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-[#555] mb-2"
                    >
                      Title:
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full p-3 border-2 border-[#ddd] rounded-md focus:outline-none focus:ring-2 focus:ring-[#46d2ffb5] transition duration-200"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-[#555] mb-2"
                    >
                      Description:
                    </label>
                    <textarea
                      id="description"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="w-full p-3 border-2 border-[#ddd] rounded-md focus:outline-none focus:ring-2 focus:ring-[#46d2ffb5] transition duration-200"
                      required
                    />
                  </div>

                  <div className="flex justify-between gap-4">
                    <button
                      type="submit"
                      className="w-full bg-[#46d2ffb5] text-white py-2 px-4 rounded-lg hover:bg-[#00befb] hover:font-semibold transition duration-300"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="w-full bg-[#f44336] text-white py-2 px-4 rounded-lg hover:bg-[#d32f2f] hover:font-semibold transition duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
