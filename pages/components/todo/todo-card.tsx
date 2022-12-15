import { Subtask } from "../../index";
import styles from "./todo-card.module.scss";

type Props = {
  id: string;
  title: string;
  subtitle: string;
  notes: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  subtasks?: Subtask[];
};

const TodoCard: React.FC<Props> = ({
  title,
  subtitle,
  notes,
  priority,
  subtasks,
}) => {
  return (
    <li className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <h4 className={styles.subtitle}>{subtitle}</h4>
      <p className={styles.notes}>{notes}</p>
      <div className={styles.priority}>
        <p>Priority:</p>
        <p>{priority}</p>
      </div>
      <hr />
      <p className={styles.subtasksTitle}>Subtasks:</p>
      <ul className={styles.subtasksContainer}>
        {subtasks?.map(({ id, text }) => (
          <li key={id}>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default TodoCard;
