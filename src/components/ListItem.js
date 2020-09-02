import React,{useContext} from 'react'
import { TodoContext } from '../App'
import styles from './ListItem.module.css'
function ListItem(props) {
    const todoContext = useContext(TodoContext)

    // const onSelectItem = (id) => {
    //     todoContext.actionDispatcher({
    //         action:'SELECT_ITEM',
    //         id:id
    //     })
    // }
    return (
        <div className={`${styles.listItem} d-flex`}>
            <img src='/assets/images/pic1.png' className="img-fluid" alt="owner"/>    
            <p>{props.item.task}</p>
            <p>{props.item.subTaskCount}</p>
        </div>
    )
}

export default ListItem
