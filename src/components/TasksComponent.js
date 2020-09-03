import React,{useContext, useState, useEffect, useRef,useMemo} from 'react'
import styles from './TasksComponent.module.css'
import { TodoContext } from '../App'
import Task from './Task';
import Classnames from 'classnames'


function TasksComponent(props) {
    console.log(props)
    const itemId = props.itemId;
    console.log(itemId)
    const todoContext = useContext(TodoContext)
    const [item,setItem] = useState({})
    const [newTask,setTask] = useState('')

    useEffect(() => {
        console.log('in effect')
        console.log(todoContext.state)
        setItem(todoContext.state.list.find(item => item.id === itemId))
    },[itemId, todoContext.state])

    const addNewTask = (e) => {
        if(e.keyCode === 13 && newTask !== '') {
            console.log(e)
            todoContext.actionDispatcher({
                type:'ADD_TASK',
                task:newTask,
                id:itemId
            })
            setTask('')
        }
        return
    }

    const selectTask = (e,canToggle) => {
        console.log(canToggle)
        todoContext.actionDispatcher({
            type:'SELECT_TASK',
            taskId: e.target.id,
            itemId: itemId
        })
        canToggle && props.handleToggle()
    }
    const handleClick = (e) => {
        console.log(e.target)
        console.log(e.target.id)
        // props.handleToggle()
        todoContext.actionDispatcher({
            type:'TOGGLE_TASK',
            taskId: parseInt(e.target.id),
            itemId:itemId
        })
    }

    const renderTaskList = () => {
        // const addTask = css({
        //     [styles.addTask]:true,
        //     "d-flex p-3":true
        // })
        const addTask = Classnames({
            [styles.addTask]:true,
            "d-flex p-3":true
        })
        if(item === undefined || item.tasks === undefined){
            return (
                <div className={styles.taskMainContent}>
                    <div className={styles.banner+" d-flex px-2 pb-2"}>
                        <h2>Select an item</h2>
                        <img src='/assets/images/idea.svg' className="img-fluid" alt="bulb"/>    
                    </div>
                </div>
            )
        }

        return (
            <React.Fragment>
                <div className={styles.taskMainContent}>
                    <div className={styles.banner+" d-flex px-2 pb-2"}>
                        <h2>{item.task}</h2>
                        <img src='/assets/images/idea.svg' className="img-fluid" alt="bulb"/>    
                    </div>
                    {item.tasks.map( subtask => 
                        <Task key={subtask.id} {...subtask} clickHandler={handleClick} selectHandler={selectTask} canToggle={true} />
                    )}
                    <div className={addTask}>
                    <img src='/assets/images/plus.png' className="img-fluid pr-4" alt="bulb"/>    

                        <input type="text" className="inputItem w-100"
                        value={newTask} 
                        placeholder="Add to-do" 
                        onChange={(e)=>setTask(e.target.value)} 
                        onKeyUp={addNewTask} />
                    </div>
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
