import React, { useMemo, useState } from "react";
import { Modal } from "react-responsive-modal";
import { IoSaveOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const EditTodoModal = ({ isSaving, todo, onSave, onClose }) => {
  const [title, setTitle] = useState(todo.title || "");
  const [description, setDescription] = useState(todo.description || "");

  const isNewTodo = useMemo(() => !todo?.id, [todo?.id]);

  const handleSave = () => {
    const updatedTodo = { ...todo, title, description };
    onSave(updatedTodo);
  };

  return (
    <Modal
      open={true}
      onClose={() => {
        if (isSaving) {
          toast.warning("Please wait while the request is processing");
        } else {
          onClose();
        }
      }}
      center
      classNames={{ modal: "rounded-xl w-full" }}
    >
      <div className="modal-content p-4 flex flex-col items-center gap-8">
        <h2 className="text-lg font-bold mb-4">
          {isNewTodo ? "Create" : "Edit"} Todo
        </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="input input-bordered w-full"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        ></textarea>
        <div className="flex gap-2 flex-wrap">
          <button
            disabled={isSaving}
            onClick={handleSave}
            className={`btn btn-primary w-full`}
          >
            Save
            {isSaving ? (
              <span className="loading loading-dots loading-sm" />
            ) : (
              <IoSaveOutline size={20} />
            )}
          </button>
          <button
            disabled={isSaving}
            onClick={onClose}
            className="btn btn-secondary w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditTodoModal;
