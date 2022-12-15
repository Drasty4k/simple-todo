import { nanoid } from "nanoid";
import {
  Dispatch,
  FormEvent,
  Ref,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { Priority, Todo } from "../../index";
import styles from "./add-todo-modal.module.scss";

type Props = {
  close: () => void;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

const AddTodoModal: React.FC<Props> = ({ close, setTodos }) => {
  const [priority, setPriority] = useState<Priority>(null);
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const ignoreClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.stopPropagation();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTodo();
    close();
  };

  const createTodo = () => {
    const id = nanoid(10);
    const newTodo: Todo = {
      id,
      title,
      subtitle,
      notes,
      priority,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const allInputsEmpty = () => {
    return Boolean(!title || !subtitle || !notes || !priority);
  };

  return (
    <div className={styles.container} onClick={close}>
      <div className={styles.formContainer} onClick={ignoreClick}>
        <form onSubmit={onSubmit}>
          <div className={styles.priorityButtons}>
            <button
              type="button"
              onClick={() => setPriority("LOW")}
              style={{ opacity: priority === "LOW" ? "1" : ".5" }}
            >
              Low
            </button>
            <button
              type="button"
              onClick={() => setPriority("MEDIUM")}
              style={{ opacity: priority === "MEDIUM" ? "1" : ".5" }}
            >
              Medium
            </button>
            <button
              type="button"
              onClick={() => setPriority("HIGH")}
              style={{ opacity: priority === "HIGH" ? "1" : ".5" }}
            >
              High
            </button>
          </div>
          <div className={styles.title}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.subtitle}>
            <label htmlFor="subtitle">Subtitle</label>
            <input
              id="subtitle"
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          <div className={styles.notes}>
            <label htmlFor="notes">Notes</label>
            <input
              id="notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={styles.addTodoBtn}
            disabled={allInputsEmpty()}
            style={
              allInputsEmpty() ? { cursor: "not-allowed", opacity: ".6" } : {}
            }
          >
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
