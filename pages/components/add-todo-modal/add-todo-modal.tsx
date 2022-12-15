import { FormEvent } from "react";
import styles from "./add-todo-modal.module.scss";

type Props = {
  close: () => void;
};

const AddTodoModal: React.FC<Props> = ({ close }) => {
  const ignoreClick = (event: React.MouseEvent<Element, MouseEvent>) => {
    event.stopPropagation();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    close();
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
            <input id="title" type="text" />
          </div>
          <div className={styles.subtitle}>
            <label htmlFor="subtitle">Subtitle</label>
            <input id="subtitle" type="text" />
          </div>
          <div className={styles.notes}>
            <label htmlFor="notes">Notes</label>
            <input id="notes" type="text" />
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
