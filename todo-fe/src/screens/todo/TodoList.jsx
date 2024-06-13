import React, { useState, useEffect } from "react";
import {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "@/services/todoService";
import EditTodoModal from "./EditTodoModal";
import DeleteConfirmationModal from "./DeleteTodoModal";
import { toast } from "react-toastify";
import { IoIosAddCircleOutline } from "react-icons/io";
import TodoListItem from "./TodoListItem";
import { LuListTodo } from "react-icons/lu";

const TODO_EMPTY_STATE = {
  title: "",
  description: "",
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(TODO_EMPTY_STATE);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchTodos = async () => {
    try {
      const todosData = await getAllTodos();
      setTodos(todosData);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setShowEditModal(true);
  };

  const handleAddTodoClick = () => {
    setShowEditModal(true);
    setSelectedTodo(TODO_EMPTY_STATE);
  };

  const handleDelete = (todo) => {
    setSelectedTodo(todo);
    setShowDeleteModal(true);
  };

  const handleMarkComplete = async (todo) => {
    try {
      const data = {
        ...todo,
        is_completed: true,
      };
      await updateTodo(todo.id, data);
      fetchTodos(); // Refresh todos after marking as complete
      toast.success("Kudos! You completed a todo.");
    } catch (error) {
      console.error("Error marking todo as complete:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleMarkIncomplete = async (todo) => {
    try {
      const data = {
        ...todo,
        is_completed: false,
      };
      await updateTodo(todo.id, data);
      fetchTodos(); // Refresh todos after marking as complete
      toast.info("Completed Todo Reverted!");
    } catch (error) {
      console.error("Error marking todo as complete:", error);
    }
  };

  const handleSaveEdit = async (updatedTodo) => {
    try {
      if (updatedTodo.id) {
        setIsSaving(true);
        await updateTodo(updatedTodo.id, updatedTodo);
        fetchTodos(); // Refresh todos after saving edit
        setShowEditModal(false);
        setIsSaving(false);
        toast.info("Todo Updated");
      } else {
        setIsSaving(true);
        await addTodo(updatedTodo);
        fetchTodos(); // Refresh todos after saving edit
        setShowEditModal(false);
        setIsSaving(false);
        toast.info("Todo Created");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error updating todo:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteTodo(selectedTodo.id);
      fetchTodos(); // Refresh todos after deletion
      setShowDeleteModal(false);
      toast.info("Todo deleted");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="w-full max-w-[768px]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          Todoo
          <LuListTodo size={40} />
        </h1>
        <button className="btn btn-primary" onClick={handleAddTodoClick}>
          Add
          <IoIosAddCircleOutline size={20} />
        </button>
      </div>
      <ul
        className={`min-h-[25vh] flex flex-col items-center justify-start rounded-2xl shadow border bg-base-100 ${
          todos.length === 0 && "justify-center"
        }`}
      >
        {todos.map((todo) => (
          <TodoListItem
            key={todo.id}
            todo={todo}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleMarkComplete={handleMarkComplete}
            handleMarkIncomplete={handleMarkIncomplete}
          />
        ))}
        {todos.length === 0 && (
          <li className="flex flex-col gap-4 items-center justify-center font-bold">
            No Todos Found
            <button className="btn btn-primary" onClick={handleAddTodoClick}>
              Create New
              <IoIosAddCircleOutline size={20} />
            </button>
          </li>
        )}
      </ul>
      {showEditModal && (
        <EditTodoModal
          isSaving={isSaving}
          todo={selectedTodo}
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          todo={selectedTodo}
          onConfirm={handleConfirmDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default TodoList;
