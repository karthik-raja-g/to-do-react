import React,{useReducer, useState} from 'react';
import './App.css';
import ListComponent from './components/ListComponent';
import TasksComponent from './components/TasksComponent';
import CurrentItem from './components/CurrentItem';

export const TodoContext = React.createContext();
const initialState = {
  owner:'karthik',
  id:Math.floor(Math.random() * 100),
  createdOn:'',
  list:[
    {
      id:1,
      task:'sss',
      subtasks:[
        {
          id:Math.floor(Math.random() * 100),
          title:'',
          reminder:'',
          dueDate:'',
          notes:'',
          isCompleted:false
        }
      ],
      subTaskCount:0,
      isCompleted:false
    }
  ],
  currentItemId: 0,
  currentTaskId: 0,
  currentSubTaskId: 0
}

const reducer = (prevState,action) => {
  switch(action.type) {
    case 'ITEM_SELECT':
      return{
        ...prevState,
        owner : 'lothbrok'}
      case 'ADD_ITEM':
        const item = {
          id:Math.floor(Math.random() * 100),
          task:action.task,
          subtasks:[],
          subTaskCount:0,
          isCompleted:false
        }
        const newList = [...prevState.list]
        newList.push(item)
        return {
          ...prevState,
          list: newList
        }
      case 'SELECT_ITEM':
        return {
          ...prevState,
          currentItemId:action.id
        }
      case 'ADD_TASK': 
      const task = {
        id:Math.floor(Math.random() * 100),
        title:action.task,
        reminder:'',
        isCompleted: false,
        dueDate:'',
        notes:''
      }
      const oldItem = prevState.list.find(task => task.id === action.id)
      const oldTasks = prevState.list.filter(task => task.id !== action.id)
      oldItem.subtasks = oldItem.subtasks.concat(task)

      console.log(
        oldTasks.concat(oldItem)
      )
        return{
          ...prevState,
          list:oldTasks.concat(oldItem)
        }
        case 'TOGGLE_TASK':
          const allSubtasks = prevState.list.find(item => item.id === action.itemId).subtasks
          const prevItem = prevState.list.map(item => item.subtasks.find(subtask => subtask.id === action.taskId))
          console.log(allSubtasks)
          console.log(prevItem)
          return prevState
    default:
      return prevState
  }
}

function App() {
  const [currentState,dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <div className="container-fluid">
        <div className="todo-header p-1 bg-info text-left">
          To-Do
        </div>
        <div className="row">
          <TodoContext.Provider value={{state:currentState, actionDispatcher:dispatch}}>
            <div className="col-lg-3">
              <ListComponent />
            </div>
            <div className="col-lg-5">
              <TasksComponent itemId={currentState.currentItemId}/>
            </div>
          </TodoContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
