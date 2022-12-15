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
  completed: boolean;
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
          text: "resolve that bad basdddddddug",
          completed: false,
        },
        {
          id: "asd5",
          text: "resolve that bad bddddug",
          completed: false,
        },
        {
          id: "asd6",
          text: "resolve that bad basddddddddddddug",
          completed: false,
        },
        {
          id: "asd8",
          text: "resolve that bad baddddddddddug",
          completed: false,
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

  const toggleCompletedSubTask = (
    todoIndex: number,
    todos: Todo[],
    subtaskIndex: number
  ) => {
    const newTodos = [...todos];
    newTodos[todoIndex].subtasks![subtaskIndex!].completed =
      !newTodos[todoIndex].subtasks![subtaskIndex!].completed;
    setTodos(newTodos);
    console.log(todos);
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

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
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
