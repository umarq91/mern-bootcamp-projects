import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion"; // For animations

const style = {
  container: `max-w-[500px] w-full m-auto mt-10 rounded-lg shadow-lg bg-white p-6`,
  form: `flex flex-col space-y-4`,
  input: `border border-gray-300 p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-purple-500`,
  button: `p-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-300`,
  cancelButton: `p-3 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition-colors duration-300`,
  title: `text-3xl font-semibold text-center text-gray-900 mb-6`,
};

const UpdateTodo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const todo = location.state.todo;
  const [updatedText, setUpdatedText] = useState(todo.text);

  // Handle updating the todo
  const updateTodo = async (e) => {
    e.preventDefault();
    if (!updatedText) return;
    await updateDoc(doc(db, "todos", todo.id), {
      text: updatedText,
    });
    navigate("/");
  };

  // Cancel the update and navigate back
  const cancelUpdate = () => {
    navigate("/"); 
  };

  return (
    <motion.div
      className={style.container}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className={style.title}>Update Todo</h3>
      <form onSubmit={updateTodo} className={style.form}>
        <input
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          className={style.input}
          type="text"
          placeholder="Enter new task"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={style.button}
          type="submit"
        >
          Update Todo
        </motion.button>
      </form>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={cancelUpdate}
        className={style.cancelButton}
      >
        Cancel
      </motion.button>
    </motion.div>
  );
};

export default UpdateTodo;
