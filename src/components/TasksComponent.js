import React,{useContext, useState, useEffect, useRef,useMemo} from 'react'
import styles from './TasksComponent.module.css'
import { TodoContext } from '../App'
import Task from './Task';

function TasksComponent(params) {
    const itemId = params.itemId;
    console.log(itemId)
    const todoContext = useContext(TodoContext)
    // const itemId = todoContext.state.currentItemId;
    const [item,setItem] = useState({})
    const [newTask,setTask] = useState('')

    useEffect(() => {
        console.log('in effect')
        console.log(todoContext.state)
        setItem(todoContext.state.list.find(item => item.id === itemId))

    })

    const addNewTask = (e) => {
        if(e.keyCode === 13 && newTask !== '') {
            todoContext.actionDispatcher({
                type:'ADD_TASK',
                task:newTask,
                id:itemId
            })
            setTask('')
        }
        return
    }

    const selectTask = e => {
        todoContext.actionDispatcher({
            type:'SELECT_TASK',
            taskId: e.target.id,
            itemId: itemId
        })
    }
    const handleClick = e => {
        console.log(e.target)
        console.log(e.target.id)
        todoContext.actionDispatcher({
            type:'TOGGLE_TASK',
            taskId: parseInt(e.target.id),
            itemId:itemId
        })
    }
    const renderTaskList = () => {
        if(item === undefined || item.tasks === undefined){
            return <h3>Select an item</h3>
        }
        return (
            <React.Fragment>
                <div className={styles.banner}>
                    <h3>{item.task}</h3>
                </div>
                {item.tasks.map( subtask => 
                    <Task key={subtask.id} {...subtask} clickHandler={handleClick} selectHandler={selectTask}/>
                )}
                <div>
                    <input type="text" value={newTask} placeholder="Add to-do" onChange={(e)=>setTask(e.target.value)} onKeyUp={addNewTask} />
                </div>
            </React.Fragment>
        )
    }
    return(
        <div>
            {console.log(item)}
            {renderTaskList()}
            
        </div>
    )
}

export default TasksComponent
