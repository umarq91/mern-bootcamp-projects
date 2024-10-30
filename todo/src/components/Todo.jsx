import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; // For animation
import { format, isPast, isToday } from "date-fns"; // For date formatting and checking

const style = {
  li: `flex justify-between items-start bg-white shadow-lg p-4 my-2 rounded-md transition-all duration-300`,
  liComplete: `flex justify-between items-start bg-green-100 shadow-md p-4 my-2 rounded-md transition-all duration-300`,
  row: `flex items-start`,
  text: `ml-2 cursor-pointer text-gray-800 font-medium`,
  textComplete: `ml-2 cursor-pointer line-through text-gray-400`,
  button: `cursor-pointer flex items-center bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition-colors duration-200`,
  updateButton: `cursor-pointer flex items-center bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors duration-200`,
  modalBackdrop: `fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center`,
  modalContainer: `bg-white rounded-lg p-6 shadow-lg z-50`,
  modalHeader: `text-xl font-semibold text-gray-800 mb-4`,
  modalBody: `text-gray-600 mb-4`,
  modalButton: `bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mr-2 transition-colors duration-200`,
  modalCancelButton: `bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200`,
  dueDate: `text-sm font-medium`,
  dueDateOverdue: `text-red-500`,
  dueDateToday: `text-orange-500`,
  category: `bg-blue-100 text-blue-700 py-1 px-2 rounded-full text-xs font-semibold`,
  checkbox: `h-5 w-5 cursor-pointer`, // Improved checkbox styling
};

const Todo = ({ todo, toggleComplete, deleteTodo, updateTodo }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    deleteTodo(todo.id);
    setShowModal(false); // Close the modal after deletion
  };

  // Format the due date and determine if it's overdue or today
  const formattedDueDate = format(new Date(todo.dueDate), "MMM d, yyyy");
  const isDueToday = isToday(new Date(todo.dueDate));
  const isDueOverdue = isPast(new Date(todo.dueDate)) && !isDueToday;

  return (
    <>
      <motion.li
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={todo.completed ? style.liComplete : style.li}
      >
        <div className={style.row}>
          <input
            onChange={() => toggleComplete(todo)}
            type="checkbox"
            checked={todo.completed}
            className={style.checkbox} // Applying improved checkbox style
          />
          <div className="ml-2"> {/* Added margin for spacing */}
            <p
              onClick={() => toggleComplete(todo)}
              className={todo.completed ? style.textComplete : style.text}
            >
              {todo.text}
            </p>
            <div className="flex space-x-4 mt-1">
              {/* Display Due Date */}
              <span className={`${style.dueDate} ${isDueOverdue ? style.dueDateOverdue : isDueToday ? style.dueDateToday : "text-gray-500"}`}>
                Due: {formattedDueDate} {isDueOverdue && "(Overdue)"}
                {isDueToday && " (Today)"}
              </span>

              {/* Display Category */}
              <span className={style.category}>{todo.category}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => updateTodo(todo)} className={style.updateButton}>
            Update
          </button>
          <button onClick={() => setShowModal(true)} className={style.button}>
            <FaRegTrashAlt />
          </button>
        </div>
      </motion.li>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className={style.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={style.modalContainer}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className={style.modalHeader}>Confirm Deletion</h2>
              <p className={style.modalBody}>
                Are you sure you want to delete this task? This action cannot be undone.
              </p>
              <div className="flex justify-end">
                <button onClick={handleDelete} className={style.modalButton}>
                  Delete
                </button>
                <button onClick={() => setShowModal(false)} className={style.modalCancelButton}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Todo;
