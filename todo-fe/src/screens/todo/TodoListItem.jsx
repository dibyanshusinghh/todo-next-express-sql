import React, { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GrRevert } from "react-icons/gr";

const TodoListItem = ({
  todo,
  handleEdit,
  handleDelete,
  handleMarkComplete,
  handleMarkIncomplete,
}) => {
  console.log("todo -> ", todo.is_completed)
  return (
    <li
      className={`flex gap-2 items-center justify-between w-full border-b-[1px] p-4 rounded-xl ${
        todo.is_completed ? "bg-success bg-opacity-10 shadow-none" : ''
      }`}
    >
      <div className="flex flex-col">
        <span className={`font-bold ${todo.is_completed ? "line-through" : ""}`}>
          {todo.title}
        </span>
        {todo.description}
      </div>
      <div className="flex gap-2">
        <button
          className="btn btn-square btn-primary"
          onClick={() => handleEdit(todo)}
        >
          <FaRegEdit size={15} />
        </button>
        <button
          className="btn btn-square btn-error text-white"
          onClick={() => handleDelete(todo)}
        >
          <MdDeleteOutline size={20} />
        </button>
        {todo.is_completed ? (
          <button
            className="btn btn-square btn-warning text-white"
            onClick={() => handleMarkIncomplete(todo)}
          >
            <GrRevert size={20} />
          </button>
        ) : (
          <button
            className="btn btn-square btn-success text-white"
            onClick={() => handleMarkComplete(todo)}
          >
            <IoMdCheckmarkCircleOutline size={20} />
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoListItem;
