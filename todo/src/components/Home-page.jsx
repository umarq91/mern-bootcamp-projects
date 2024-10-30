import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Todo";
import { db, auth } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useUser } from "../user-context/User-context";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const style = {
  bg: `min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500`,
  container: `bg-white max-w-[600px] w-full p-8 rounded-lg shadow-2xl`,
  heading: `text-4xl font-bold text-center mb-8 text-gray-800`,
  form: `flex flex-col space-y-4`,
  input: `border border-gray-300 p-3 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500`,
  button: `bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-blue-700 transition duration-300`,
  select: `border border-gray-300 p-3 rounded-lg text-lg`,
  count: `text-center text-gray-700 mt-6`,
  showInputsButton: `bg-green-500 text-white py-3 px-6 rounded-lg mt-6 flex items-center justify-center hover:bg-green-600 transition duration-300`,
  todoList: `space-y-4 mt-8`,
};

function Homepage() {
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState(""); // Category state
  const [showInputs, setShowInputs] = useState(false); // Control input visibility
  const { user, todos, setTodos } = useUser();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  // Add todo to firebase
  const createTodo = async (e) => {
    e.preventDefault();
    if (!input || !user || !dueDate || !category) return;

    const value = input.trim();
    setInput("");
    setDueDate("");
    setCategory("");
    setShowInputs(false); // Hide inputs after submission

    await addDoc(collection(db, "todos"), {
      text: value,
      completed: false,
      uid: user.uid,
      dueDate: dueDate,
      category: category, // Store the selected category
    });

    // Toast notification for the added todo
    toast.success(`Todo "${value}" added under ${category} due on ${dueDate}`);
  };

  // Read todos from firebase
  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "todos"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, [user]);

  // Update todo (toggle complete)
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // Update todo (navigate to update page)
  const updateTodo = async (todo) => {
    navigate(`/update/${todo.id}`, { state: { todo } });
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        {user && (
          <>
            {!showInputs ? (
              <motion.button
                onClick={() => setShowInputs(true)}
                className={style.showInputsButton}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <AiOutlinePlus size={30} className="mr-2" />
                Add Todo
              </motion.button>
            ) : (
              <motion.form
                onSubmit={createTodo}
                className={style.form}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className={style.input}
                  type="text"
                  placeholder="Add Todo"
                  required
                />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className={style.input}
                  required
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={style.select}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="Personal">Personal</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Work">Work</option>
                  <option value="Wishlist">Wishlist</option>
                </select>

                <motion.button
                  className={style.button}
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AiOutlinePlus size={30} className="mr-2" />
                  Add Todo
                </motion.button>
              </motion.form>
            )}
          </>
        )}

        <ul className={style.todoList}>
          <AnimatePresence>
            {todos?.map((todo, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Todo
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        {todos?.length < 1 ? null : (
          <p className={style.count}>{`You have ${todos.length} todos`}</p>
        )}
      </div>

      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
}

export default Homepage;
