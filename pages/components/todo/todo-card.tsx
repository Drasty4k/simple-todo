import { Dispatch, SetStateAction, useState } from "react";
import { Priority, Subtask, Todo } from "../../index";
import AddTodoModal from "../add-todo-modal/add-todo-modal";
import styles from "./todo-card.module.scss";

type Props = {
  id: string;
  title: string;
  subtitle: string;
  notes: string;
  priority: Priority;
  subtasks?: Subtask[];
  completed: boolean;
  todoIndex: number;
  allTodos: Todo[];
  toggleCompletedTodo: (index: number, todos: Todo[]) => void
  toggleCompletedSubTask: (
    todoIndex: number,
    todos: Todo[],
    subtaskIndex: number
  ) => void;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (id: string) => void;
};

const TodoCard: React.FC<Props> = ({
  id,
  title,
  subtitle,
  notes,
  priority,
  subtasks,
  completed,
  todoIndex,
  allTodos,
  toggleCompletedTodo,
  toggleCompletedSubTask,
  updateTodo,
  deleteTodo
}) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const toggleModal = () => {
    setShowEditModal((prev) => !prev);
  };
  return (
    <>
      <li
        className={`${styles.container} ${completed ? styles.greenBorder : ""}`}
      >
        <div className={styles.headerButtons}>
          <button onClick={toggleModal}>Edit</button>
          <button onClick={() => toggleCompletedTodo(todoIndex, allTodos)}>Done</button>
          <button onClick={() => deleteTodo(id)}>Delete</button>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <h4 className={styles.subtitle}>{subtitle}</h4>
        <p className={styles.notes}>{notes}</p>
        <div className={styles.priority}>
          <p>Priority:</p>
          <p><b>{priority}</b></p>
        </div>
        <hr />
        <h4 className={styles.subtasksTitle}>Subtasks:</h4>
        <ul className={styles.subtasksContainer}>
          {subtasks?.map(({ id, text, completed }, index) => (
            <li
              key={id}
              style={
                completed
                  ? { textDecoration: "line-through", opacity: ".8" }
                  : {}
              }
            >
              <input
                type="checkbox"
                checked={completed}
                onChange={() =>
                  toggleCompletedSubTask(todoIndex, allTodos, index)
                }
              />
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </li>
      {showEditModal && (
        <AddTodoModal
          type="EDIT"
          close={toggleModal}
          currentTodo={{
            id,
            title,
            subtitle,
            notes,
            priority,
            subtasks,
            completed,
          }}
          updateTodo={updateTodo}
        />
      )}
    </>
  );
};

export default TodoCard;
