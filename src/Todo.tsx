import React, {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "./firebase";

type TodoProperties = {
  user: User | null;
};

const Todo = ({ user }: TodoProperties) => {
  const [todos, setTodos] = useState<Record<string, string>[]>([]);
  const [todo, setTodo] = useState("");

  const fetchTodos = useCallback(async () => {
    getDocs(
      query(collection(db, "todos"), where("author", "==", user?.uid))
    ).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
      console.log(newData);
    });
  }, [user?.uid]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      try {
        const docRef = await addDoc(collection(db, "todos"), {
          todo: todo,
          author: user?.uid,
        });
        console.log("Document written with ID: ", docRef.id);
        setTodo("");
        fetchTodos();
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    [fetchTodos, todo, user?.uid]
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      try {
        await deleteDoc(doc(db, "todos", id));
        console.log("Document deleted with ID: ", id);
        fetchTodos();
      } catch (e) {
        console.error("Error deleting document: ", e);
      }
    },
    [fetchTodos]
  );

  return (
    <section className="todo-container">
      <h2>Your todo list</h2>
      <div className="todo">
        <form onSubmit={addTodo}>
          <div className="input-container">
            <input
              type="text"
              placeholder="What do you need to do today?"
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
        </form>

        <div className="todo-content">
          <p>List of things to do:</p>
          {todos?.length === 0 && <p>No todos yet</p>}
          {todos?.length > 0 && (
            <ul>
              {todos?.map((todo, i) => (
                <li key={i}>
                  {todo.todo}
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default Todo;
