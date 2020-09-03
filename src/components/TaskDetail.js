import React,{useContext, useState, useEffect} from 'react'
import { TodoContext } from '../App'
import Task from './Task'
import DatePicker from "react-datepicker";
import Classnames from 'classnames/bind'
import styles from './TaskDetails.module.css'

 
import "react-datepicker/dist/react-datepicker.css";

function TaskDetail(props) {
    const {itemId,taskId} = props
    // const taskId = params.taskId;
    const todoContext = useContext(TodoContext)
    const[notes,setNotes] = useState('')
    const[date,setDate] = useState(new Date())
    const item = itemId !==0 ? todoContext.state.list.find(item => item.id === itemId) : null
    const task = item && taskId ? item.tasks.find(task => task.id === taskId) : null
    
    useEffect(() => {
        setNotes(task ? task.notes : '')
        setDate(task ? task.dueDate : '')
    },[task])
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
    const handleSubmit = e => {
        e.preventDefault()
        console.log(e.target)
        console.log(e.target.value)
        todoContext.actionDispatcher({
            type:'UPDATE_TASK',
            itemId:itemId,
            taskId: taskId,
            dueDate: date,
            notes:notes
        })
    }
    const handleDelete = () => {
        todoContext.actionDispatcher({
            type:'DELETE_TASK',
            itemId:itemId,
            taskId:taskId,
            handleToggle:props.handleToggle
        })
    }
    const renderTask = () => {
        const taskClass = Classnames({
            [styles.bgWhite]:true,
            "p-3 my-2":true
        })
        const btnGroup = Classnames({
            [styles.btnGroup]:true
        })
        const cancelBtn = Classnames({
            [styles.button]:true,
            [styles.cancelBtn]:true
        })
        const submitBtn = Classnames({
            [styles.button]:true,
            [styles.submitBtn]:true
        })
            return task && 
            <div className={"p-0 m-0"}>
                <div className={taskClass}>
                    <Task {...task} clickHandler={handleClick} selectHandler={selectTask}/>
                </div>
                <div className={taskClass+" m-2"}>
                    <h3>Due date</h3>
                    <DatePicker selected={date} onChange={date => setDate(date) }/>
                </div>
                <div className={taskClass+" m-2"}>
                    <h3>Notes</h3>
                    <form onSubmit={handleSubmit}>
                        <textarea className={styles.textarea+" col-12"} cols="20" value={notes} onChange={e => setNotes(e.target.value)}/>
                        <div className={btnGroup}>
                            <button className={"mr-3 "+cancelBtn} onClick={() => setNotes(prevState => prevState)} type="button">Cancel</button>
                            <button className={submitBtn} type="submit">Save</button>
                        </div>
                    </form>
                </div>
                <div className={styles.absPos}>
                    <div className="row m-0">
                        <div className="col-lg-2">
                            <img src='/assets/images/transfer.png' className="img-fluid pr-4" alt="switch" onClick={props.handleToggle}/>    
                        </div>
                        <div className="col-lg-8">

                        </div>
                        <div className="col-lg-2">
                            <img src='/assets/images/bin.png' className="img-fluid pl-4" alt="trash" onClick={handleDelete}/>    
                        </div>
                    </div>
                </div>
            </div>
    }
    return (
        <div>
            {renderTask()}
        </div>
    )
}

export default React.memo(TaskDetail)
