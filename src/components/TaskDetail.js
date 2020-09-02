import React,{useContext, useState, useEffect, useRef,useMemo} from 'react'
import { TodoContext } from '../App'
import Task from './Task'
import DatePicker from "react-datepicker";
 
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
    const renderTask = () => {
        // if(task) {
            return task && 
            <div className="p-3">
                <div className="p-3 my-2 border-black">
                    <Task {...task} clickHandler={handleClick} selectHandler={selectTask}/>
                </div>
                <div className="reminder p-3 my-2 border-darken-1">
                    <h3>Due date</h3>
                    <DatePicker selected={date} onChange={date => setDate(date) }/>
                </div>
                <div className="notes p-3 my-2 border-darken-1">
                    <h3>Notes</h3>
                    <form onSubmit={handleSubmit}>
                        <textarea cols="15" rows="10" value={notes} onChange={e => setNotes(e.target.value)}/>
                        <button className="btn btn-danger" onClick={() => setNotes(prevState => prevState)} type="button">Cancel</button>
                        <button className="btn btn-success" type="submit">Save</button>
                    </form>
                </div>
            </div>
        // }
    }
    return (
        <div>
            {renderTask()}
        </div>
    )
}

export default React.memo(TaskDetail)
