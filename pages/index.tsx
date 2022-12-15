import { useState } from "react";
import AddTodoModal from "./components/add-todo-modal/add-todo-modal";
import TodoCard from "./components/todo/todo-card";
import styles from "./index.module.scss";

export type Todo = {
  id: string;
  title: string;
  subtitle: string;
  notes: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  subtasks?: Subtask[];
};

export type Subtask = {
  id: string;
  text: string;
}

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
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
        {
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
        {
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
      ],
    },
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
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
        {
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
        {
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
      ],
    },
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
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
        {
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
        {
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
      ],
    },
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
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
        {
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
        {
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
      ],
    },
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
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
        {
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
        {
          id: "asd3",
          text: "resolve that bad basdddddddddddddasdddddddddddddddddddddddddddddddddddddddddddddddddug",
        },
      ],
    },
  ]);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <button onClick={toggleModal} className={styles.addBtn}>
        +
      </button>
      <ul className={styles.todosContainer}>
        {todos?.map(
          ({ id, title, subtitle, notes, priority, subtasks }, index) => (
            <TodoCard
              key={id}
              id={id}
              title={title}
              subtitle={subtitle}
              notes={notes}
              priority={priority}
              subtasks={subtasks}
            />
          )
        )}
      </ul>
      {showModal && <AddTodoModal close={toggleModal} />}
    </div>
  );
}
