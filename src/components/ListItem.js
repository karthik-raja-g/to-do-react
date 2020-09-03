import React, { useState, useEffect } from 'react'
import styles from './ListItem.module.css'
function ListItem(props) {
    console.log(props)
    const[count,setCount] = useState(0)
    useEffect(() => {
        setCount(props.taskCount)
    },[props.taskCount])
    return (
        <div className= {styles.listItem +" row py-2 my-3 w-100 m-0"} >
            <div className="col-lg-2">
                <img src='/assets/images/checklist.svg' className="img-fluid" alt="owner"/>    
            </div>
            <div className="col-lg-8 text-left pt-2" >
                <p id={props.id} onClick={props.clickHandler}>{props.task}</p>      
            </div>
            <div className="col-lg-2 pt-2">
                            {/* <p>{props.item.completedTasks ? props.item.completedTasks : 0} | {props.item.taskCount}</p> */}
                <p>{count}</p>
            </div>
        </div>
    )
}

export default ListItem
