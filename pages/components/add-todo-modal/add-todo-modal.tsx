import { nanoid } from "nanoid";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Priority, Subtask, Todo } from "../../index";
import styles from "./add-todo-modal.module.scss";

type Props = {
  close: () => void;
  setTodos?: Dispatch<SetStateAction<Todo[]>>;
  updateTodo?: (updatedTodo: Todo) => void;
  currentTodo?: Todo;
  type: "ADD" | "EDIT";
};

const AddTodoModal: React.FC<Props> = ({
  type,
  close,
  setTodos,
  currentTodo,
  updateTodo,
}) => {
  const [priority, setPriority] = useState<Priority>(currentTodo?.priority!);
  const [title, setTitle] = useState<string>("" || currentTodo?.title!);
  const [subtitle, setSubtitle] = useState<string>(
    "" || currentTodo?.subtitle!
  );
  const [notes, setNotes] = useState<string>("" || currentTodo?.notes!);
  const [subtasks, setSubtasks] = useState<Subtask[]>(
    currentTodo?.subtasks! ? currentTodo?.subtasks! : []
  );
  const [subtaskText, setSubtaskText] = useState<string>("");

  const ignoreClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.stopPropagation();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (type === "ADD") {
      createTodo();
    } else {
      editTodo();
    }
    close();
  };

  const createTodo = () => {
    if (!setTodos) return;
    const id = nanoid(10);
    const newTodo: Todo = {
      id,
      title,
      subtitle,
      notes,
      priority,
      subtasks,
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const editTodo = () => {
    if (!updateTodo) return;
    const updatedTodo: Todo = {
      id: currentTodo?.id!,
      title,
      subtitle,
      notes,
      priority,
      subtasks,
      completed: false,
    };
    updateTodo(updatedTodo);
  };

  const addSubtask = () => {
    const newSubtask = {
      id: nanoid(10),
      text: subtaskText,
    };
    setSubtasks((prev) => [newSubtask, ...prev]);
    setSubtaskText("");
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
          <hr />
          <div className={styles.addSubtask}>
            <div className={styles.subtask}>
              <label htmlFor="subtask">Subtask</label>
              <input
                id="subtask"
                type="text"
                value={subtaskText}
                onChange={(e) => setSubtaskText(e.target.value)}
              />
            </div>
            <button type="button" onClick={addSubtask}>
              Add
            </button>
          </div>
          <ul className={styles.subtasksContainer}>
            {subtasks.map((subtask) => (
              <li key={subtask.id}>
                <p
                  contentEditable={type === "EDIT"}
                  onBlur={(e) => (subtask.text = e.currentTarget.innerText!)}
                >
                  {subtask.text}
                </p>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className={styles.addTodoBtn}
            disabled={allInputsEmpty()}
            style={
              allInputsEmpty() ? { cursor: "not-allowed", opacity: ".6" } : {}
            }
          >
            {type === "ADD" ? "Add Todo" : "Edit Todo"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
