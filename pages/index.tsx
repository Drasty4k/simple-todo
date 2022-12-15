import { useState } from "react";
import AddTodoModal from "./components/add-todo-modal/add-todo-modal";
import styles from "./index.module.scss";

export default function Home() {
  const [showModal, setShowModal] = useState(true);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <button onClick={toggleModal}>Add Todo</button>
      {showModal && <AddTodoModal close={toggleModal} />}
    </div>
  );
}
