import styles from './Header.module.css';
import logoTodoList from '../assets/logo.svg';

export function Header() {
  return (
    <div className={styles.header}>
      <img src={logoTodoList} alt="Logo todoList" />
    </div>
  );
}