import { useState } from "react";
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
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "asd1",
      title: "Work",
      subtitle: "do this task",
      notes: "resolve that bug",
      priority: "MEDIUM",
      subtasks: [
        {
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
        {
          id: "asd5",
          text: "resolve that bad bddddug",
        },
        {
          id: "asd6",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddug",
        },
        {
          id: "asd8",
          text: "resolve that bad badddddddddddddddddddddddddddug",
        },
      ],
      completed: false,
    },
  ]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const toggleCompletedTodo = (index: number, todos: Todo[]) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const updateTodo = (updatedTodo: Todo) => {
    const updatedListOfTodos = todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        todo = updatedTodo;
      }
      return todo;
    });
    setTodos(updatedListOfTodos);
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
              toggleCompletedTodo={() => toggleCompletedTodo(index, todos)}
              updateTodo={updateTodo}
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
