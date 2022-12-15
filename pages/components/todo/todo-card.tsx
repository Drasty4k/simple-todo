import { useState } from "react";
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
  toggleCompletedTodo: () => void;
  updateTodo: (updatedTodo: Todo) => void;
};

const TodoCard: React.FC<Props> = ({
  id,
  title,
  subtitle,
  notes,
  priority,
  subtasks,
  completed,
  toggleCompletedTodo,
  updateTodo
}) => {
  const [showEditModal, setShowEditModal] = useState<boolean>(true);
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
          <button onClick={() => toggleCompletedTodo()}>Done</button>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <h4 className={styles.subtitle}>{subtitle}</h4>
        <p className={styles.notes}>{notes}</p>
        <div className={styles.priority}>
          <p>Priority:</p>
          <p>{priority}</p>
        </div>
        <hr />
        <h4 className={styles.subtasksTitle}>Subtasks:</h4>
        <ul className={styles.subtasksContainer}>
          {subtasks?.map(({ id, text }) => (
            <li key={id}>
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
