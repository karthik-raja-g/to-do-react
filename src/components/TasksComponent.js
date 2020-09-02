import React,{useContext, useState, useEffect, useRef,useMemo} from 'react'
import styles from './TasksComponent.module.css'
import { TodoContext } from '../App'
import Task from './Task';

function TasksComponent(params) {
    const itemId = params.itemId;
    console.log(itemId)
    const todoContext = useContext(TodoContext)
    // const itemId = todoContext.state.currentItemId;
    const task = useRef();
    const [item,setItem] = useState({})
    const [newTask,setTask] = useState('')

    useEffect(() => {
        console.log('in effect')
        // const setCurrent = () => {
        //     setItem(todoContext.state.list.find(item => item.id === itemId))
        //     task.current = item
        // }
        // setCurrent()
        setItem(todoContext.state.list.find(item => item.id === itemId))

    },[itemId])

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
    const handleClick = e => {
        console.log(e.target)
        console.log(e.target.id)
        todoContext.actionDispatcher({
            type:'TOGGLE_TASK',
            taskId: e.target.id,
            itemId:itemId
        })
    }
    return(
        <div>
            <h3>kkk</h3>
            {console.log(item)}
            {
                item === undefined || item.subtasks === undefined ? 
                <h3>Select an item</h3> :
                // console.log(item)

                item.subtasks.map( subtask => 
                    <Task key={subtask.id} {...subtask} clickHandler={handleClick}/>
                )
            }
            {
                (item !== undefined ) &&
                <div>
                    <input type="text" value={newTask} placeholder="Add to-do" onChange={(e)=>setTask(e.target.value)} onKeyUp={addNewTask} />
                </div>
            }
            
        </div>
    )
}

// function CurrentTask() {
//     const todoContext = useContext(TodoContext)
//     const item = React.memo(() => todoContext.state.list.find(item => item.id = todoContext.state.currentItemId),[todoContext.state.currentItemId])
//     return (
//         <div item={item}>sss</div>
//     )
// }

export default React.memo(TasksComponent)
