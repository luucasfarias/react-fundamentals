import { Header } from './components/Header'
import nextId from "react-id-generator";
import styles from './App.module.css'
import './global.css'
import { PlusCircle, Trash, TrashSimple } from 'phosphor-react'
import { WithoutTask } from './components/WithoutTask'
import { ChangeEvent, FormEvent, useState } from 'react'

interface Task {
  id: string;
  name: string;
  isFinish: boolean;
}

export function App() {
  const [newTask, setNewTask] = useState<Task>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [removeTasks, setRemoveTasks] = useState<Task[]>([]);
  const [totalTasks, setTotalTasks] = useState(0);
  const [totalFinishTasks, setTotalFinishTasks] = useState(0);


  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    const task = {
      id: nextId(),
      name: event.target.value,
      isFinish: false
    };

    setNewTask({...task});
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    
    setTasks([...tasks, { id: newTask?.id!, name: newTask?.name!, isFinish: false }]);

    setNewTask({id: '', name: '', isFinish: false});

    setTotalTasks(tasks.length + 1);
  }

  function handleFinishTask(finishTask: Task) {
    
    const updateTask = tasks.map((item) => {
      if (item.id === finishTask.id) {
        finishTask = { ...finishTask, isFinish: !finishTask.isFinish };
        return finishTask;
      } else {
        return item;
      }
    })

    setTasks(updateTask);

    checkFinishTasks(finishTask);
    
  }

  function checkFinishTasks(taskChecked: Task) {
    const test = tasks.filter((item) => {
      console.log(item);
      
      return item.isFinish === true;
    });

    if (taskChecked.isFinish) {
      setTotalFinishTasks(test.length + 1);
    } else {
      setTotalFinishTasks(test.length - 1);
    }
  }

  function handleRemoveTask(removeTask: Task) { 
    const updateTasks = tasks.filter((task) => {
      return task.id !== removeTask.id
    });

    setTasks(updateTasks);
    setTotalTasks(tasks.length - 1);
    checkFinishTasks(removeTask);
  }

  return (
    <div>
      <header>
        <Header />
      </header>

      <main>
        <form onSubmit={handleCreateNewTask}>
          <div className={styles.containerTask}>
            <input className={styles.inputTask} name="inputNewTask"
              type="text" placeholder="Adicione uma nova tarefa"
              onChange={handleNewTaskChange} />

            <button className={styles.btnCreateTask} onClick={handleCreateNewTask}>Criar <PlusCircle size={20} /></button>
          </div>
        </form>

        <div className={styles.containerCardListTask}>
          <div className={styles.collumnName}>
            <div className={styles.tasksCreated}>
              <span>Tarefas criadas <div className={styles.badge}>{totalTasks}</div></span>
            </div>
            <div className={styles.completeTasks}>
              <span>Concluídas <div className={styles.badgeFinish}>{totalFinishTasks} de {tasks.length}</div></span>
            </div>
          </div>

          {
            tasks.length > 0 ?
              (
                tasks.map((task, index) => {
                  return (
                    <div key={task.id} className={styles.cardTasks}>
                      <div className={styles.taskName}>
                        <input type="checkbox" name="finishTask"
                        onClick={() => handleFinishTask(task)} />
                        <label className={`${task.isFinish ? styles.finishTask : ''}`}  htmlFor="finishTask">{task.name}</label>
                      </div>
                      <button type='button' onClick={() => handleRemoveTask(task)}><Trash size={20} /></button>
                    </div>
                  );
                })
              )
            :
            <WithoutTask/>
          }



        </div>
      </main>
    </div>
  )
}
