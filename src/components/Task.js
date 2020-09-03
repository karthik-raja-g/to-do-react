import React from 'react'
import styles from './Task.module.css'
function Task(props) {
    console.log(props)
    const canToggle = props.canToggle ? props.canToggle : false
    const isChecked = () => {
        const check = styles.checkbox;
        if(props.isCompleted) {
            return check+' '+styles.completed
        }
        return check
      }
    const handleClick = (e) => {
        props.selectHandler(e,canToggle)
    }
    return (
        <div className={styles.task+" row m-0 py-3"} >
            <div className="col-lg-1 pl-4 pt-2">
                <div className={isChecked()} id={props.id} onClick={props.clickHandler}></div>
            </div>
            <div className="col-lg-10 text-left pt-1">
                <p className={props.isCompleted && styles.taskCompleted } id={props.id} onClick={handleClick}>{props.title}</p>
            </div>
        </div>
    )
}

export default Task