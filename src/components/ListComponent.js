import React,{useContext, useState} from 'react'
import { TodoContext } from '../App'
import OwnerInfo from './OwnerInfo'
import ListItem from './ListItem'

function ListComponent() {

    const todoContext = useContext(TodoContext)
    const [newItem,setNewItem] = useState('')

    const addNewItem = (e) => {
        if(e.keyCode === 13 && newItem !== '') {
            todoContext.actionDispatcher({
                type:'ADD_ITEM',
                task:newItem
            })
            setNewItem('')
        }
        return
    }
     function onSelectItem(id){
        todoContext.actionDispatcher({
            type:'SELECT_ITEM',
            id:id
        })
        // console.log(id)
    }
    return (
        <div style={{border:'1px solid black'}}>
            <OwnerInfo name={todoContext.state.owner}/>
            <div>
                {/* {todoContext.state.list.map(item => <ListItem key={item.id} item={item} onClick={() => console.log(item.id)}/>)} */}
                {/* {todoContext.state.list.map(item => <ListItem key={item.id} item={item} onClick={() => onSelectItem(item.id)}/>)} */}
                {todoContext.state.list.map(item =>
                    <div key={item.id} onClick={() => onSelectItem(item.id)}>
                        <ListItem item={item} />
                    </div>)}
            </div>
            <div >
                <input type="text" value={newItem} placeholder="New List" onChange={(e)=>setNewItem(e.target.value)} onKeyUp={addNewItem} />
            </div>
        </div>
    )
}

export default ListComponent
