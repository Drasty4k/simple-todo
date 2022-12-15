import { useEffect, useState } from "react";
import AddTodoModal from "./components/add-todo-modal/add-todo-modal";
import TodoCard from "./components/todo/todo-card";
import styles from "./index.module.scss";

export type Priority = "LOW" | "MEDIUM" | "HIGH" | null;

export type Todo = {
  id: string;
  title: string;
  subtitle: string;
  notes: string;
  priority: Priority;
  subtasks?: Subtask[];
  completed: boolean;
};

export type Subtask = {
  id: string;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>();

  useEffect(() => {
    if (todos?.length! > 0) return;
    const todosFromLocalStorage = localStorage.getItem("todos");
    if (todosFromLocalStorage) {
      const todosFromLocalStorageParsed = JSON.parse(todosFromLocalStorage);
      setTodos([...todosFromLocalStorageParsed]);
      console.log(todosFromLocalStorageParsed);
    }
  }, [todos]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const toggleCompletedTodo = (index: number, todos: Todo[]) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const toggleCompletedSubTask = (
    todoIndex: number,
    todos: Todo[],
    subtaskIndex: number
  ) => {
    const newTodos = [...todos];
    newTodos[todoIndex].subtasks![subtaskIndex!].completed =
      !newTodos[todoIndex].subtasks![subtaskIndex!].completed;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const updateTodo = (updatedTodo: Todo) => {
    const updatedListOfTodos = todos?.map((todo) => {
      if (todo.id === updatedTodo.id) {
        todo = updatedTodo;
      }
      return todo;
    });
    setTodos(updatedListOfTodos);
    localStorage.setItem("todos", JSON.stringify(updatedListOfTodos));
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos?.filter((todo) => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div className={styles.container}>
      <button onClick={toggleModal} className={styles.addBtn}>
        +
      </button>
      <ul className={styles.todosContainer}>
        {todos?.map(
          (
            { id, title, subtitle, notes, priority, subtasks, completed },
            index,
            todos
          ) => (
            <TodoCard
              key={id}
              id={id}
              title={title}
              subtitle={subtitle}
              notes={notes}
              priority={priority}
              subtasks={subtasks}
              completed={completed}
              todoIndex={index}
              allTodos={todos}
              toggleCompletedTodo={toggleCompletedTodo}
              updateTodo={updateTodo}
              toggleCompletedSubTask={toggleCompletedSubTask}
              deleteTodo={deleteTodo}
            />
          )
        )}
      </ul>
      {showModal && (
        <AddTodoModal type="ADD" close={toggleModal} setTodos={setTodos} />
      )}
    </div>
  );
}
