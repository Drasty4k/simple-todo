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
  const titleRef = useRef<HTMLInputElement>(null);
  const subtitleRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLInputElement>(null);

  const ignoreClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.stopPropagation();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTodo();
    close();
  };

  const createTodo = () => {
    const title = titleRef?.current?.value as string;
    const subtitle = subtitleRef.current?.value as string;
    const notes = notesRef.current?.value as string;
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

  return (
    <div className={styles.container} onClick={close}>
      <div className={styles.formContainer} onClick={ignoreClick}>
        <form onSubmit={onSubmit}>
          <div className={styles.priorityButtons}>
            <button>Low</button>
            <button>Medium</button>
            <button>High</button>
          </div>
          <div className={styles.title}>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" ref={titleRef} />
          </div>
          <div className={styles.subtitle}>
            <label htmlFor="subtitle">Subtitle</label>
            <input id="subtitle" type="text" ref={subtitleRef} />
          </div>
          <div className={styles.notes}>
            <label htmlFor="notes">Notes</label>
            <input id="notes" type="text" ref={notesRef} />
          </div>
          <button type="submit" className={styles.addTodoBtn}>
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
