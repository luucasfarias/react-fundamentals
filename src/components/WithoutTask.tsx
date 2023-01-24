import styles from './WithoutTask.module.css'
import noTaskImg from '../assets/clipboard.png'

export function WithoutTask() {
  return (
    <div className={styles.withoutTask}>
      <div className={styles.containerImg}>
        <img src={noTaskImg} alt="nao tem task" />
      </div>
      <div className={styles.containerTextInfo}>
        <strong>Você ainda não tem tarefas cadastras</strong>
        <span>Crie tarefas e organize seus itens a fazer</span>
      </div>
    </div>
  )
}