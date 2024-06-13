import React from "react";
import { Modal } from "react-responsive-modal";

const DeleteConfirmationModal = ({ todo, onConfirm, onClose }) => {
  const handleConfirmDelete = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      center
      classNames={{ modal: "rounded-xl" }}
    >
      <div className="modal-content p-4">
        <h2 className="text-lg font-bold mb-4">Delete Todo</h2>
        <p className="mb-4">
          Are you sure you want to delete{" "}
          <span className="font-bold">{todo.title}</span>?
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleConfirmDelete}
            className="btn btn-primary mr-2"
          >
            Yes
          </button>
          <button onClick={onClose} className="btn ">
            No
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
