import React from 'react'
import styles from './Task.module.css'
function Task(props) {
    console.log(props)
    const isChecked = () => {
        const check = styles.checkbox;
        if(props.isCompleted) {
            return check+' '+styles.completed
        }
        return check
      }
    return (
        <div className="row" >
            <div className="col-lg-2">
                <div className={isChecked()+' float-right'} id={props.id} onClick={props.clickHandler}></div>
            </div>
            <div className="col-lg-10 text-left">
                <h4 className={props.isCompleted && styles.taskCompleted } id={props.id} onClick={props.selectHandler}>{props.title}</h4>
            </div>
        </div>
    )
}

export default Task